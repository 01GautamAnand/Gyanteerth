import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { initiatives } from 'virtual:content';

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

export default function InitiativesPage() {
  const siteUrl = 'https://gyanteerth.org';
  const pageUrl = `${siteUrl}/initiatives`;

  return (
    <>
      <Helmet>
        <title>Our Initiatives — Gyanteerth Educational Society</title>
        <meta name="description" content="Gyanteerth's academic programmes — olympiads, inter-school championships, science exhibitions, educator development, conferences, student leadership, and institutional collaboration." />
        <meta property="og:title" content="Our Initiatives — Gyanteerth Educational Society" />
        <meta property="og:description" content="A comprehensive range of academic competitions, educator development programmes, and institutional initiatives across India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          name: 'Our Initiatives — Gyanteerth Educational Society',
          url: pageUrl,
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${siteUrl}/#organization` },
        }).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* PAGE HERO */}
        <section className="relative bg-primary text-primary-foreground overflow-hidden" aria-label="Page header">
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/media/images/pages/initiatives/hero"
              alt=""
              className="w-full h-full object-cover opacity-20"
              loading="eager"
              fetchPriority="high"
              width={1600}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>{initiatives.hero.label}</SectionLabel>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl xl:text-6xl font-heading text-primary-foreground leading-[1.1] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {initiatives.hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg text-primary-foreground/70 leading-relaxed"
              >
                {initiatives.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* OVERVIEW */}
        <section className="bg-background" aria-label="Overview">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="lg:col-span-3"
              >
                <div className="lg:sticky lg:top-28">
                  <div className="h-[2px] w-10 bg-accent mb-6" />
                  <SectionLabel>Overview</SectionLabel>
                  <h2
                    className="text-3xl lg:text-4xl font-heading text-primary leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {initiatives.overview.heading}
                  </h2>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="lg:col-span-9"
              >
                {initiatives.overview.body.map((para) => (
                  <motion.p
                    key={para.id}
                    variants={fadeUp}
                    className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-5 last:mb-0"
                  >
                    {para.text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* QUICK-NAV INDEX */}
        <section className="bg-muted border-y border-border" aria-label="Programme categories">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
            >
              {initiatives.categories.map((cat) => (
                <motion.a
                  key={cat.id}
                  href={`#${cat.id}`}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center p-3 bg-background border border-border hover:border-accent hover:bg-accent/5 transition-all duration-200 group"
                >
                  <span
                    className="text-xl font-heading text-accent/60 group-hover:text-accent transition-colors leading-none mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                    aria-hidden="true"
                  >
                    {cat.number}
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors leading-tight">
                    {cat.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROGRAMME CATEGORIES — alternating navy / off-white */}
        {initiatives.categories.map((cat, idx) => {
          const isDark = idx % 2 !== 0;
          return (
            <section
              key={cat.id}
              id={cat.id}
              className={isDark ? 'bg-primary text-primary-foreground' : 'bg-background'}
              aria-label={cat.heading}
            >
              {isDark && <GoldDivider />}
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                  {/* Label column */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="lg:col-span-3"
                  >
                    <div className="lg:sticky lg:top-28">
                      <span
                        className={`block text-7xl font-heading leading-none mb-4 ${isDark ? 'text-accent/15' : 'text-accent/25'}`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                        aria-hidden="true"
                      >
                        {cat.number}
                      </span>
                      <SectionLabel>{cat.label}</SectionLabel>
                      <h2
                        className={`text-2xl lg:text-3xl font-heading leading-tight ${isDark ? 'text-primary-foreground' : 'text-primary'}`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {cat.heading}
                      </h2>
                    </div>
                  </motion.div>

                  {/* Content column */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="lg:col-span-9"
                  >
                    <motion.p
                      variants={fadeUp}
                      className={`text-base lg:text-lg leading-relaxed mb-10 ${isDark ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}
                    >
                      {cat.description}
                    </motion.p>

                    {/* Programme list */}
                    <motion.div variants={stagger} className="space-y-px">
                      {cat.programmes.map((prog) => (
                        <motion.div
                          key={prog.id}
                          variants={fadeUp}
                          className={`flex flex-col sm:flex-row gap-3 sm:gap-8 p-5 border-l-2 border-accent ${isDark ? 'bg-primary-foreground/5' : 'bg-muted'}`}
                        >
                          <div className="sm:w-64 shrink-0">
                            <p
                              className={`text-sm font-semibold leading-snug ${isDark ? 'text-primary-foreground' : 'text-primary'}`}
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {prog.name}
                            </p>
                          </div>
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                            {prog.detail}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              {isDark && <GoldDivider />}
            </section>
          );
        })}

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
              <p className="text-sm text-muted-foreground italic">
                {initiatives.note}
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground" aria-label="Participate">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeUp}>
                <h2
                  className="text-3xl lg:text-4xl font-heading text-primary-foreground mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {initiatives.cta.heading}
                </h2>
                <p className="text-primary-foreground/65 text-base leading-relaxed">
                  {initiatives.cta.body}
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                {initiatives.cta.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-accent text-accent text-sm font-semibold tracking-wide hover:bg-accent hover:text-primary transition-all duration-200"
                  >
                    <span>{link.label}</span>
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
