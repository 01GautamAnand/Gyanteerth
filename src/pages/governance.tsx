import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { governance } from 'virtual:content';

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

export default function GovernancePage() {
  const siteUrl = 'https://gyanteerth.org';
  const pageUrl = `${siteUrl}/governance`;

  return (
    <>
      <Helmet>
        <title>Governance & Leadership — Gyanteerth Educational Society</title>
        <meta name="description" content="Gyanteerth's governance structure, office bearers, standing committees, advisory council, and institutional governance principles." />
        <meta property="og:title" content="Governance & Leadership — Gyanteerth" />
        <meta property="og:description" content="The governing body, office bearers, committees, and advisory council of Gyanteerth Educational Society." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          name: 'Governance & Leadership — Gyanteerth Educational Society',
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
                <SectionLabel>{governance.hero.label}</SectionLabel>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl xl:text-6xl font-heading text-primary-foreground leading-[1.1] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {governance.hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg text-primary-foreground/70 leading-relaxed"
              >
                {governance.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* GOVERNANCE OVERVIEW */}
        <section className="bg-background" aria-label="Governance Overview">
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
                    {governance.overview.heading}
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
                {governance.overview.body.map((para) => (
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

        {/* GOVERNANCE PRINCIPLES */}
        <section className="bg-muted" aria-label="Governance Principles">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {governance.principles.items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="bg-background p-6 border-t-2 border-accent"
                >
                  <h3
                    className="text-base font-heading text-primary mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* GENERAL BODY */}
        <section className="bg-background" aria-label="General Body">
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
                  <SectionLabel>{governance.general_body.label}</SectionLabel>
                  <h2
                    className="text-3xl lg:text-4xl font-heading text-primary leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {governance.general_body.heading}
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
                {governance.general_body.body.map((para) => (
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

        {/* OFFICE BEARERS */}
        <section className="bg-primary text-primary-foreground" aria-label="Office Bearers">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-4"
            >
              <SectionLabel>{governance.executive.label}</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary-foreground mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {governance.executive.heading}
              </h2>
              <p className="text-sm text-primary-foreground/45 italic mb-12">
                {governance.executive.note}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-px"
            >
              {governance.executive.members.map((member) => (
                <motion.div
                  key={member.id}
                  variants={fadeUp}
                  className="bg-primary hover:bg-primary-foreground/5 transition-colors duration-200 p-8 lg:p-10 border-b border-primary-foreground/10 last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="w-20 h-20 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center shrink-0">
                      <span
                        className="text-2xl font-heading text-primary-foreground/30"
                        style={{ fontFamily: 'var(--font-heading)' }}
                        aria-hidden="true"
                      >
                        {member.title.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                          {member.title}
                        </p>
                      </div>
                      <h3
                        className="text-xl lg:text-2xl font-heading text-primary-foreground mb-1"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-sm text-primary-foreground/45 italic mb-4">
                        {member.qualification}
                      </p>
                      <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-2xl">
                        {member.profile}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* STANDING COMMITTEES */}
        <section className="bg-background" aria-label="Standing Committees">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14"
            >
              <SectionLabel>{governance.committees.label}</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {governance.committees.heading}
              </h2>
              <p className="text-muted-foreground text-base max-w-xl">
                {governance.committees.intro}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {governance.committees.items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="border-l-2 border-accent pl-8 py-2"
                >
                  <h3
                    className="text-xl font-heading text-primary mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ADVISORY COUNCIL */}
        <section className="bg-muted" aria-label="Advisory Council">
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
                  <SectionLabel>{governance.advisory.label}</SectionLabel>
                  <h2
                    className="text-3xl lg:text-4xl font-heading text-primary leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {governance.advisory.heading}
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
                {governance.advisory.body.map((para) => (
                  <motion.p
                    key={para.id}
                    variants={fadeUp}
                    className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-5 last:mb-0"
                  >
                    {para.text}
                  </motion.p>
                ))}
                <motion.div
                  variants={fadeUp}
                  className="mt-8 p-6 border border-border bg-background"
                >
                  <p className="text-sm text-muted-foreground italic">
                    {governance.advisory.note}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
