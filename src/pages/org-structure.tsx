import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { org_structure } from 'virtual:content';

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

export default function OrgStructurePage() {
  const siteUrl = 'https://gyanteerth.org';
  const pageUrl = `${siteUrl}/org-structure`;

  return (
    <>
      <Helmet>
        <title>Organisational Structure — Gyanteerth Educational Society</title>
        <meta name="description" content="Gyanteerth's multi-tiered organisational structure — central administration, academic committees, state and regional coordination, institutional representation, and operational departments." />
        <meta property="og:title" content="Organisational Structure — Gyanteerth" />
        <meta property="og:description" content="How Gyanteerth Educational Society is organised across central, state, regional, and institutional levels." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          name: 'Organisational Structure — Gyanteerth Educational Society',
          url: pageUrl,
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${siteUrl}/#organization` },
        }).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* PAGE HERO */}
        <section className="bg-primary text-primary-foreground" aria-label="Page header">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>{org_structure.hero.label}</SectionLabel>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl xl:text-6xl font-heading text-primary-foreground leading-[1.1] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {org_structure.hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg text-primary-foreground/70 leading-relaxed"
              >
                {org_structure.hero.subheadline}
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
                    {org_structure.overview.heading}
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
                {org_structure.overview.body.map((para) => (
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

        {/* STRUCTURAL TIERS — alternating navy / off-white */}
        {org_structure.tiers.map((tier, idx) => {
          const isDark = idx % 2 !== 0;
          return (
            <section
              key={tier.id}
              className={isDark ? 'bg-primary text-primary-foreground' : 'bg-muted'}
              aria-label={tier.heading}
            >
              {isDark && <GoldDivider />}
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
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
                        className={`block text-6xl font-heading leading-none mb-4 ${isDark ? 'text-accent/20' : 'text-accent/30'}`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                        aria-hidden="true"
                      >
                        {tier.number}
                      </span>
                      <SectionLabel>{tier.label}</SectionLabel>
                      <h2
                        className={`text-2xl lg:text-3xl font-heading leading-tight ${isDark ? 'text-primary-foreground' : 'text-primary'}`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {tier.heading}
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
                      {tier.description}
                    </motion.p>

                    {/* Units table */}
                    <motion.div variants={fadeUp} className="space-y-px">
                      {tier.units.map((unit) => (
                        <div
                          key={unit.id}
                          className={`flex flex-col sm:flex-row gap-3 sm:gap-8 p-5 border-l-2 border-accent ${isDark ? 'bg-primary-foreground/5' : 'bg-background'}`}
                        >
                          <div className="sm:w-56 shrink-0">
                            <p
                              className={`text-sm font-semibold ${isDark ? 'text-primary-foreground' : 'text-primary'}`}
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {unit.name}
                            </p>
                          </div>
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                            {unit.role}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              {isDark && <GoldDivider />}
            </section>
          );
        })}

        {/* OPERATIONAL DEPARTMENTS */}
        <section className="bg-primary text-primary-foreground" aria-label="Operational Departments">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14"
            >
              <SectionLabel>{org_structure.departments.label}</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary-foreground mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {org_structure.departments.heading}
              </h2>
              <p className="text-primary-foreground/65 text-base max-w-xl">
                {org_structure.departments.intro}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-foreground/10"
            >
              {org_structure.departments.items.map((dep) => (
                <motion.div
                  key={dep.id}
                  variants={fadeUp}
                  className="bg-primary p-8 hover:bg-primary-foreground/5 transition-colors duration-200"
                >
                  <h3
                    className="text-lg font-heading text-primary-foreground mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {dep.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed">
                    {dep.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* PLACEHOLDER NOTICE */}
        <section className="bg-muted" aria-label="Publication notice">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="border border-border bg-background p-6"
            >
              <p className="text-sm text-muted-foreground italic">
                {org_structure.note}
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
