import { useState, type FormEvent } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { membership } from 'virtual:content';

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

function MembershipEnquiryForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_gotcha')) return;

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const institution = String(formData.get('institution') ?? '').trim();
    const designation = String(formData.get('designation') ?? '').trim();
    const category = String(formData.get('category') ?? '');
    const state = String(formData.get('state') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact/membership-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: message || 'New membership enquiry submission' }],
            data: {
              'Institution / Organisation': institution,
              'Designation': designation,
              'Membership Category': category,
              'State / UT': state,
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
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="mb-name" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="mb-name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label htmlFor="mb-email" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            id="mb-email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="mb-institution" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
            Institution / Organisation <span className="text-destructive">*</span>
          </label>
          <input
            id="mb-institution"
            name="institution"
            type="text"
            required
            placeholder="Name of your school or organisation"
            className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label htmlFor="mb-designation" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
            Designation
          </label>
          <input
            id="mb-designation"
            name="designation"
            type="text"
            placeholder="e.g. Principal, Director"
            className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="mb-category" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
            Membership Category
          </label>
          <select
            id="mb-category"
            name="category"
            className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
          >
            <option value="">Select a category</option>
            <option value="Institutional Member">Institutional Member</option>
            <option value="Organisational Member">Organisational Member</option>
            <option value="Associate Member">Associate Member</option>
            <option value="Life Member">Life Member</option>
            <option value="Not Sure">Not Sure — Please Advise</option>
          </select>
        </div>
        <div>
          <label htmlFor="mb-state" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
            State / Union Territory
          </label>
          <input
            id="mb-state"
            name="state"
            type="text"
            placeholder="e.g. Maharashtra, Delhi"
            className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mb-message" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
          Message
        </label>
        <textarea
          id="mb-message"
          name="message"
          rows={5}
          placeholder="Please share any additional information about your institution or your interest in membership…"
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
        {status === 'sending' ? 'Submitting…' : 'Submit Enquiry'}
      </button>

      {status === 'success' && (
        <p role="status" className="text-sm text-success border border-success/30 bg-success/5 px-4 py-3">
          Thank you for your membership enquiry. Our team will respond within five working days.
        </p>
      )}
    </form>
  );
}

export default function MembershipPage() {
  const siteUrl = 'https://gyanteerth.org';
  const pageUrl = `${siteUrl}/membership`;

  return (
    <>
      <Helmet>
        <title>Institutional Membership — Gyanteerth Educational Society</title>
        <meta name="description" content="Join Gyanteerth as a member institution — membership categories, eligibility, benefits, and the application process for schools and educational organisations across India." />
        <meta property="og:title" content="Institutional Membership — Gyanteerth Educational Society" />
        <meta property="og:description" content="Membership categories, benefits, and the application process for schools and educational organisations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          name: 'Institutional Membership — Gyanteerth Educational Society',
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
              <motion.div variants={fadeUp}><SectionLabel>{membership.hero.label}</SectionLabel></motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl xl:text-6xl font-heading text-primary-foreground leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {membership.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-primary-foreground/70 leading-relaxed">
                {membership.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* OVERVIEW */}
        <section className="bg-background" aria-label="Overview">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-3">
                <div className="lg:sticky lg:top-28">
                  <div className="h-[2px] w-10 bg-accent mb-6" />
                  <SectionLabel>Overview</SectionLabel>
                  <h2 className="text-3xl lg:text-4xl font-heading text-primary leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                    {membership.overview.heading}
                  </h2>
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-9">
                {membership.overview.body.map((para) => (
                  <motion.p key={para.id} variants={fadeUp} className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-5 last:mb-0">
                    {para.text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* MEMBERSHIP CATEGORIES */}
        <section className="bg-primary text-primary-foreground" aria-label="Membership categories">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
              <SectionLabel>{membership.categories.label}</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-heading text-primary-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {membership.categories.heading}
              </h2>
              <p className="text-primary-foreground/60 text-base max-w-xl">{membership.categories.intro}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary-foreground/10">
              {membership.categories.items.map((cat) => (
                <motion.div key={cat.id} variants={fadeUp} className="bg-primary p-8 lg:p-10">
                  <div className="flex items-start gap-5 mb-5">
                    <span className="text-4xl font-heading text-accent/30 leading-none shrink-0 mt-1" style={{ fontFamily: 'var(--font-heading)' }} aria-hidden="true">{cat.number}</span>
                    <div>
                      <h3 className="text-xl font-heading text-primary-foreground leading-snug mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{cat.title}</h3>
                      <p className="text-xs font-semibold tracking-wide uppercase text-accent/80">{cat.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-primary-foreground/65 leading-relaxed mb-6">{cat.description}</p>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">Eligibility</p>
                    <ul className="space-y-2">
                      {cat.eligibility.map((el) => (
                        <li key={el.id} className="flex items-start gap-3 text-sm text-primary-foreground/60">
                          <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">—</span>
                          <span>{el.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* BENEFITS */}
        <section className="bg-muted" aria-label="Member benefits">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
              <SectionLabel>{membership.benefits.label}</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-heading text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                {membership.benefits.heading}
              </h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {membership.benefits.items.map((b) => (
                <motion.div key={b.id} variants={fadeUp} className="bg-background p-7 border-t-2 border-accent">
                  <h3 className="text-sm font-heading text-primary mb-3 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* APPLICATION PROCESS */}
        <section className="bg-background" aria-label="Application process">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
              <div className="h-[2px] w-10 bg-accent mb-6" />
              <SectionLabel>{membership.process.label}</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-heading text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                {membership.process.heading}
              </h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {membership.process.steps.map((step) => (
                <motion.div key={step.id} variants={fadeUp} className="bg-muted p-8">
                  <span className="block text-5xl font-heading text-accent/25 leading-none mb-4" style={{ fontFamily: 'var(--font-heading)' }} aria-hidden="true">{step.number}</span>
                  <h3 className="text-base font-heading text-primary mb-3 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ENQUIRY FORM */}
        <section className="bg-primary text-primary-foreground" aria-label="Membership enquiry">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <SectionLabel>{membership.enquirySection.label}</SectionLabel>
                  <h2 className="text-3xl lg:text-4xl font-heading text-primary-foreground leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    {membership.enquirySection.heading}
                  </h2>
                  <p className="text-primary-foreground/65 text-base leading-relaxed">{membership.enquirySection.body}</p>
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-8 bg-background p-8 lg:p-10">
                <MembershipEnquiryForm />
              </motion.div>
            </div>
          </div>
          <GoldDivider />
        </section>

        {/* PLACEHOLDER NOTICE */}
        <section className="bg-muted" aria-label="Publication notice">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border border-border bg-background p-6">
              <p className="text-sm text-muted-foreground italic">{membership.note}</p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
