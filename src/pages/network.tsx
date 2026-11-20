import { useState, type FormEvent } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { network } from 'virtual:content';

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

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-4 ${light ? 'text-accent' : 'text-accent'}`}>
      {children}
    </p>
  );
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

function NetworkEnquiryForm() {
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
    const enquiryType = String(formData.get('enquiry_type') ?? '');
    const message = String(formData.get('message') ?? '').trim();

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact/network-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: message || 'New network enquiry submission' }],
            data: {
              'Institution / Organisation': institution,
              'Enquiry Type': enquiryType,
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
          <label htmlFor="nw-name" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
            Full Name <span className="text-destructive">*</span>
          </label>
          <input
            id="nw-name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label htmlFor="nw-email" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
            Email Address <span className="text-destructive">*</span>
          </label>
          <input
            id="nw-email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="nw-institution" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
          Institution / Organisation <span className="text-destructive">*</span>
        </label>
        <input
          id="nw-institution"
          name="institution"
          type="text"
          required
          placeholder="Name of your school or organisation"
          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label htmlFor="nw-enquiry-type" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
          Nature of Enquiry
        </label>
        <select
          id="nw-enquiry-type"
          name="enquiry_type"
          className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">Select an option</option>
          <option value="Academic Programme Partnership">Academic Programme Partnership</option>
          <option value="Host Institution">Host Institution</option>
          <option value="Knowledge Partnership">Knowledge Partnership</option>
          <option value="Outreach Partnership">Outreach Partnership</option>
          <option value="General Network Enquiry">General Network Enquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="nw-message" className="block text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1.5">
          Message
        </label>
        <textarea
          id="nw-message"
          name="message"
          rows={5}
          placeholder="Please describe your interest in the Gyanteerth network…"
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
          Thank you for your enquiry. Our team will respond within five working days.
        </p>
      )}
    </form>
  );
}

export default function NetworkPage() {
  const siteUrl = 'https://gyanteerth.org';
  const pageUrl = `${siteUrl}/network`;

  return (
    <>
      <Helmet>
        <title>Institutional Network — Gyanteerth Educational Society</title>
        <meta name="description" content="Gyanteerth's national institutional network — member schools, educational organisations, host institutions, and partnership opportunities across India." />
        <meta property="og:title" content="Institutional Network — Gyanteerth Educational Society" />
        <meta property="og:description" content="A national network of schools and educational organisations committed to academic excellence across India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          name: 'Institutional Network — Gyanteerth Educational Society',
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
              <motion.div variants={fadeUp}><SectionLabel>{network.hero.label}</SectionLabel></motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl xl:text-6xl font-heading text-primary-foreground leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {network.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-primary-foreground/70 leading-relaxed">
                {network.hero.subheadline}
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
                    {network.overview.heading}
                  </h2>
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-9">
                {network.overview.body.map((para) => (
                  <motion.p key={para.id} variants={fadeUp} className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-5 last:mb-0">
                    {para.text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS BAND */}
        <section className="bg-primary text-primary-foreground" aria-label="Network statistics">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/10">
              {network.networkStats.map((stat) => (
                <motion.div key={stat.id} variants={fadeUp} className="bg-primary px-8 py-10 text-center">
                  <p className="text-3xl lg:text-4xl font-heading text-accent mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{stat.number}</p>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary-foreground/60">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* INSTITUTION TYPES */}
        <section className="bg-muted" aria-label="Types of member institutions">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
              <SectionLabel>{network.institutionTypes.label}</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-heading text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {network.institutionTypes.heading}
              </h2>
              <p className="text-muted-foreground text-base max-w-xl">{network.institutionTypes.intro}</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {network.institutionTypes.types.map((type) => (
                <motion.div key={type.id} variants={fadeUp} className="bg-background p-8 relative overflow-hidden">
                  <span className="absolute top-4 right-6 text-5xl font-heading text-accent/15 leading-none select-none" style={{ fontFamily: 'var(--font-heading)' }} aria-hidden="true">{type.number}</span>
                  <h3 className="text-base font-heading text-primary mb-3 pr-10 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>{type.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PARTNERSHIPS */}
        <section className="bg-primary text-primary-foreground" aria-label="Institutional partnerships">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <SectionLabel>{network.partnerships.label}</SectionLabel>
                  <h2 className="text-3xl lg:text-4xl font-heading text-primary-foreground leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    {network.partnerships.heading}
                  </h2>
                  <p className="text-primary-foreground/65 text-base leading-relaxed">{network.partnerships.body}</p>
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-8 space-y-px">
                {network.partnerships.types.map((pt) => (
                  <motion.div key={pt.id} variants={fadeUp} className="flex flex-col sm:flex-row gap-4 p-6 border-l-2 border-accent bg-primary-foreground/5">
                    <div className="sm:w-52 shrink-0">
                      <p className="text-sm font-semibold text-primary-foreground" style={{ fontFamily: 'var(--font-heading)' }}>{pt.title}</p>
                    </div>
                    <p className="text-sm text-primary-foreground/60 leading-relaxed">{pt.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          <GoldDivider />
        </section>

        {/* HOST INSTITUTIONS */}
        <section className="bg-background" aria-label="Host institutions">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-4">
                <div className="h-[2px] w-10 bg-accent mb-6" />
                <SectionLabel>{network.hostInstitutions.label}</SectionLabel>
                <h2 className="text-3xl lg:text-4xl font-heading text-primary leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  {network.hostInstitutions.heading}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">{network.hostInstitutions.body}</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-8">
                <div className="space-y-3">
                  {network.hostInstitutions.benefits.map((b, idx) => (
                    <motion.div key={b.id} variants={fadeUp} className="flex items-start gap-4 p-5 bg-muted border-l-2 border-accent">
                      <span className="text-accent font-heading text-sm shrink-0 mt-0.5" style={{ fontFamily: 'var(--font-heading)' }} aria-hidden="true">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm text-foreground leading-relaxed">{b.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ENQUIRY FORM */}
        <section className="bg-muted" aria-label="Network enquiry">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <div className="h-[2px] w-10 bg-accent mb-6" />
                  <SectionLabel>{network.enquirySection.label}</SectionLabel>
                  <h2 className="text-3xl lg:text-4xl font-heading text-primary leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    {network.enquirySection.heading}
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed">{network.enquirySection.body}</p>
                </div>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-8 bg-background p-8 lg:p-10">
                <NetworkEnquiryForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* PLACEHOLDER NOTICE */}
        <section className="bg-background" aria-label="Publication notice">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border border-border bg-muted p-6">
              <p className="text-sm text-muted-foreground italic">{network.note}</p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
