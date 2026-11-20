import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Request, Response } from 'express';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import handler, { resolveInboxHost } from './POST';

function makeRequest(formName: string, body: unknown, ip = '192.0.2.10'): Request {
  return {
    params: { formName },
    body,
    headers: {},
    ip,
    socket: { remoteAddress: ip },
  } as unknown as Request;
}

function makeResponse(): Response {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

const validMembershipBody = {
  user: { name: 'A Visitor', email: 'visitor@example.org' },
  conversation: {
    messages_attributes: [{ body: 'Interested in membership' }],
    data: { 'Institution / Organisation': 'Example School' },
  },
};

const validContactBody = {
  ...validMembershipBody,
  conversation: {
    ...validMembershipBody.conversation,
    data: { 'Nature of Enquiry': 'General Enquiry' },
  },
};

describe('contact form handler', () => {
  it('rejects malformed email addresses without forwarding them', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const response = makeResponse();

    await handler(
      makeRequest('contact-us', {
        user: { name: 'A Visitor', email: 'not-an-email' },
        conversation: { messages_attributes: [{ body: 'Hello' }] },
      }),
      response,
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('selects the Inbox host from development and test API configuration', () => {
    expect(resolveInboxHost('https://api.dev-godaddy.com')).toBe('reamaze.dev-godaddy.com');
    expect(resolveInboxHost('https://api.test-godaddy.com')).toBe('reamaze.test-godaddy.com');
    expect(resolveInboxHost('https://api.godaddy.com')).toBe('reamaze.godaddy.com');
  });

  it('uses the platform host fallback before server environment normalization', () => {
    vi.stubEnv('GODADDY_API_BASE_URL', '');
    vi.stubEnv('VITE_GODADDY_API_HOST', 'api.test-godaddy.com');

    expect(resolveInboxHost()).toBe('reamaze.test-godaddy.com');
  });

  it('requires a name and a non-empty message', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const missingName = makeResponse();
    await handler(
      makeRequest('contact-us', {
        ...validMembershipBody,
        user: { email: 'visitor@example.org' },
      }),
      missingName,
    );
    expect(missingName.status).toHaveBeenCalledWith(400);

    const missingMessage = makeResponse();
    await handler(
      makeRequest('contact-us', {
        ...validMembershipBody,
        conversation: { messages_attributes: [{ body: '   ' }] },
      }),
      missingMessage,
    );
    expect(missingMessage.status).toHaveBeenCalledWith(400);

    const missingInstitution = makeResponse();
    await handler(
      makeRequest('membership-enquiry', {
        ...validMembershipBody,
        conversation: {
          ...validMembershipBody.conversation,
          data: {},
        },
      }),
      missingInstitution,
    );
    expect(missingInstitution.status).toHaveBeenCalledWith(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('forwards configured membership enquiries with server-owned metadata', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const response = makeResponse();

    await handler(
      makeRequest('membership-enquiry', {
        user: { name: 'A Visitor', email: ' visitor@example.org ' },
        conversation: {
          messages_attributes: [{ body: 'Interested in membership' }],
          data: {
            __gd_contact_form_title: 'Forged heading',
            __gd_type: 'forged type',
            Institution: 'Example School',
            'Institution / Organisation': 'Example School',
          },
        },
      }),
      response,
    );

    expect(response.status).toHaveBeenCalledWith(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(String(requestInit.body));
    expect(payload.conversation.data).toMatchObject({
      __gd_contact_form_title: 'Membership Enquiry',
      __gd_type: 'contact',
      Institution: 'Example School',
      'Institution / Organisation': 'Example School',
    });
    expect(payload.conversation.user).toMatchObject({
      name: 'A Visitor',
      email: 'visitor@example.org',
    });
  });

  it('returns 404 for an unconfigured form name', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const response = makeResponse();

    await handler(makeRequest('unknown-form', validMembershipBody), response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 500 when the contact configuration is unavailable', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'airo-contact-test-'));
    const cwdSpy = vi.spyOn(process, 'cwd').mockReturnValue(directory);
    const response = makeResponse();

    try {
      await handler(makeRequest('contact-us', validContactBody), response);
      expect(response.status).toHaveBeenCalledWith(500);
    } finally {
      cwdSpy.mockRestore();
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('returns a silent success for honeypot submissions', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const response = makeResponse();

    await handler(
      makeRequest('unknown-form', { _gotcha: 'bot', user: {}, conversation: {} }),
      response,
    );

    expect(response.status).toHaveBeenCalledWith(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('limits each visitor to five submissions per minute', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const responses = Array.from({ length: 6 }, makeResponse);
    const ip = '198.51.100.200';

    for (const response of responses) {
      await handler(makeRequest('membership-enquiry', validMembershipBody, ip), response);
    }

    for (const response of responses.slice(0, 5)) {
      expect(response.status).toHaveBeenCalledWith(200);
    }
    expect(responses[5].status).toHaveBeenCalledWith(429);
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it('returns a gateway error when Inbox rejects a valid submission', async () => {
    const cancel = vi.fn().mockResolvedValue(undefined);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      body: { cancel },
    });
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const response = makeResponse();

    await handler(makeRequest('contact-us', validContactBody, '203.0.113.99'), response);

    expect(response.status).toHaveBeenCalledWith(502);
    expect(cancel).toHaveBeenCalledOnce();
  });

  it('returns a gateway error when Inbox cannot be reached', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network unavailable')));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const response = makeResponse();

    await handler(makeRequest('contact-us', validContactBody, '203.0.113.100'), response);

    expect(response.status).toHaveBeenCalledWith(502);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      error: 'Failed to submit contact form',
    });
  });
});
