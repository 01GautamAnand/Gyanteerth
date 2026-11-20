import { useState, type FormEvent } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { contact } from 'virtual:content';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

function GoldDivider() {
  return (
    <div className="flex items-center justify-center w-full py-2">
      <div className="flex-1 h-[1px] bg-accent/40" />
      <div className="mx-4 w-2 h-2 rotate-45 bg-accent/60 shrink-0" />
      <div className="flex-1 h-[1px] bg-accent/40" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
      {children}
    </p>
  );
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const organisation = String(formData.get('organisation') ?? '').trim();
    const enquiryType = String(formData.get('enquiry_type') ?? '');
    const message = String(formData.get('message') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: message || 'New contact form submission' }],
            data: {
              'Organisation / Institution': organisation,
              'Nature of Enquiry': enquiryType,
            },
          },
          user: { email, name },
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        throw new Error(json.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ct-name" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="ct-name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label htmlFor="ct-email" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            id="ct-email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="ct-organisation" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
          Organisation / Institution
        </label>
        <input
          id="ct-organisation"
          name="organisation"
          type="text"
          placeholder="Name of your school or organisation (if applicable)"
          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label htmlFor="ct-enquiry-type" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
          Nature of Enquiry <span className="text-destructive">*</span>
        </label>
        <select
          id="ct-enquiry-type"
          name="enquiry_type"
          required
          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">Select the nature of your enquiry</option>
          {contact.enquiryTypes.map((eq) => (
            <option key={eq.id} value={eq.label}>
              {eq.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="ct-message" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="ct-message"
          name="message"
          rows={6}
          required
          placeholder="Please describe your enquiry in detail…"
          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-destructive border border-destructive/30 bg-destructive/5 px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-primary text-sm font-semibold tracking-wide hover:bg-accent/90 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Submitting…' : 'Send Enquiry'}
      </button>

      {status === 'success' && (
        <p role="status" className="text-sm border px-4 py-3" style={{ color: 'hsl(var(--success))', borderColor: 'hsl(var(--success) / 0.3)', backgroundColor: 'hsl(var(--success) / 0.05)' }}>
          Thank you for your enquiry. We will respond within five working days.
        </p>
      )}
    </form>
  );
}

export default function ContactPage() {
  const siteUrl = 'https://gyanteerth.org';
  const pageUrl = `${siteUrl}/contact`;

  return (
    <>
      <Helmet>
        <title>Contact Us — Gyanteerth Educational Society</title>
        <meta name="description" content="Contact Gyanteerth Educational Society — registered office address, email, and enquiry forms for membership, programmes, partnerships, and general correspondence." />
        <meta property="og:title" content="Contact Us — Gyanteerth Educational Society" />
        <meta property="og:description" content="Write to Gyanteerth for membership, programme, partnership, or general enquiries." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': `${pageUrl}#webpage`,
          name: 'Contact Us — Gyanteerth Educational Society',
          url: pageUrl,
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${siteUrl}/#organization` },
        }).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* HERO */}
        <section className="bg-primary text-primary-foreground" aria-label="Page header">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
              <motion.div variants={fadeUp}><SectionLabel>{contact.hero.label}</SectionLabel></motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl xl:text-6xl font-heading text-primary-foreground leading-[1.1] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {contact.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-primary-foreground/70 leading-relaxed">
                {contact.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* OFFICE DETAILS + ENQUIRY TYPES */}
        <section className="bg-background" aria-label="Office details and enquiry types">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

              {/* Office details */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="lg:col-span-4"
              >
                <div className="lg:sticky lg:top-28">
                  <div className="h-[2px] w-10 bg-accent mb-6" />
                  <SectionLabel>{contact.officeDetails.label}</SectionLabel>
                  <h2
                    className="text-2xl lg:text-3xl font-heading text-primary mb-8"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {contact.officeDetails.heading}
                  </h2>

                  <div className="space-y-6">
                    {/* Address */}
                    <div>
                      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2">Address</p>
                      <address className="not-italic text-sm text-foreground leading-relaxed">
                        <span>{contact.officeDetails.address.line1}</span><br />
                        <span>{contact.officeDetails.address.line2}</span><br />
                        <span>{contact.officeDetails.address.country}</span>
                      </address>
                    </div>

                    {/* Email */}
                    <div>
                      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2">Email</p>
                      <p className="text-sm text-foreground">{contact.officeDetails.email}</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2">Telephone</p>
                      <p className="text-sm text-foreground">{contact.officeDetails.phone}</p>
                    </div>

                    {/* Hours */}
                    <div>
                      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-2">Office Hours</p>
                      <p className="text-sm text-foreground">{contact.officeDetails.hours}</p>
                    </div>
                  </div>

                  {/* Quick links */}
                  <div className="mt-10 pt-8 border-t border-border space-y-3">
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">Quick Links</p>
                    <a href="/membership" className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors group">
                      <span className="text-accent group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                      Membership Enquiry
                    </a>
                    <a href="/network" className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors group">
                      <span className="text-accent group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                      Network &amp; Partnerships
                    </a>
                    <a href="/initiatives" className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors group">
                      <span className="text-accent group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                      Our Initiatives
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Enquiry types */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="lg:col-span-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border mb-16">
                  {contact.enquiryTypes.map((eq) => (
                    <motion.div key={eq.id} variants={fadeUp} className="bg-muted p-6 border-l-2 border-accent">
                      <h3
                        className="text-sm font-heading text-primary mb-2"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {eq.label}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{eq.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Form */}
                <motion.div variants={fadeUp}>
                  <div className="h-[2px] w-10 bg-accent mb-6" />
                  <SectionLabel>{contact.formSection.label}</SectionLabel>
                  <h2
                    className="text-2xl lg:text-3xl font-heading text-primary mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {contact.formSection.heading}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-8">{contact.formSection.body}</p>
                  <ContactForm />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ALTERNATE CHANNELS STRIP */}
        <section className="bg-primary text-primary-foreground" aria-label="Other ways to connect">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-primary-foreground/10"
            >
              <motion.div variants={fadeUp} className="bg-primary px-8 py-10">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">Membership</p>
                <p className="text-sm text-primary-foreground/65 leading-relaxed mb-4">
                  For institutional membership applications and category guidance, visit the Membership page.
                </p>
                <a href="/membership" className="text-xs font-semibold tracking-wide uppercase text-accent hover:text-accent/80 transition-colors">
                  Membership Page →
                </a>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-primary px-8 py-10">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">Partnerships</p>
                <p className="text-sm text-primary-foreground/65 leading-relaxed mb-4">
                  For network participation, host institution arrangements, and academic partnerships, visit the Network page.
                </p>
                <a href="/network" className="text-xs font-semibold tracking-wide uppercase text-accent hover:text-accent/80 transition-colors">
                  Network Page →
                </a>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-primary px-8 py-10">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">Programmes</p>
                <p className="text-sm text-primary-foreground/65 leading-relaxed mb-4">
                  For enquiries about Gyanteerth's academic programmes, competitions, and educator development initiatives.
                </p>
                <a href="/initiatives" className="text-xs font-semibold tracking-wide uppercase text-accent hover:text-accent/80 transition-colors">
                  Initiatives Page →
                </a>
              </motion.div>
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* PLACEHOLDER NOTICE */}
        <section className="bg-muted" aria-label="Publication notice">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="border border-border bg-background p-6"
            >
              <p className="text-sm text-muted-foreground italic">{contact.note}</p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
