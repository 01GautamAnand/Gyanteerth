import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { vision_mission } from 'virtual:content';

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

export default function VisionMissionPage() {
  const siteUrl = 'https://gyanteerth.org';
  const pageUrl = `${siteUrl}/vision-mission`;

  return (
    <>
      <Helmet>
        <title>Vision, Mission & Objectives — Gyanteerth Educational Society</title>
        <meta name="description" content="Gyanteerth's long-term vision, mission statement, core objectives, institutional philosophy, and commitment to educational development across India." />
        <meta property="og:title" content="Vision, Mission & Objectives — Gyanteerth" />
        <meta property="og:description" content="The foundational principles guiding Gyanteerth Educational Society's work and direction." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          name: 'Vision, Mission & Objectives — Gyanteerth Educational Society',
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
                <SectionLabel>{vision_mission.hero.label}</SectionLabel>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl xl:text-6xl font-heading text-primary-foreground leading-[1.1] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {vision_mission.hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg text-primary-foreground/70 leading-relaxed"
              >
                {vision_mission.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* VISION */}
        <section className="bg-background" aria-label="Our Vision">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Sticky label column */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="lg:col-span-3"
              >
                <div className="lg:sticky lg:top-28">
                  <div className="h-[2px] w-10 bg-accent mb-6" />
                  <SectionLabel>{vision_mission.vision.label}</SectionLabel>
                  <h2
                    className="text-3xl lg:text-4xl font-heading text-primary leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {vision_mission.vision.heading}
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
                  className="text-xl lg:text-2xl font-heading text-primary italic leading-relaxed mb-10 border-l-4 border-accent pl-8"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {vision_mission.vision.statement}
                </motion.p>
                {vision_mission.vision.elaboration.map((para) => (
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

        {/* MISSION */}
        <section className="bg-muted" aria-label="Our Mission">
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
                  <SectionLabel>{vision_mission.mission.label}</SectionLabel>
                  <h2
                    className="text-3xl lg:text-4xl font-heading text-primary leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {vision_mission.mission.heading}
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
                <motion.p
                  variants={fadeUp}
                  className="text-xl lg:text-2xl font-heading text-primary italic leading-relaxed mb-10 border-l-4 border-accent pl-8"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {vision_mission.mission.statement}
                </motion.p>
                {vision_mission.mission.elaboration.map((para) => (
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

        {/* OBJECTIVES */}
        <section className="bg-primary text-primary-foreground" aria-label="Our Objectives">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14"
            >
              <SectionLabel>{vision_mission.objectives.label}</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary-foreground mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {vision_mission.objectives.heading}
              </h2>
              <p className="text-primary-foreground/65 text-base max-w-xl">
                {vision_mission.objectives.intro}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary-foreground/10"
            >
              {vision_mission.objectives.items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="bg-primary p-8 lg:p-10 relative group hover:bg-primary-foreground/5 transition-colors duration-200"
                >
                  <span
                    className="absolute top-4 right-6 text-7xl font-heading text-accent/10 select-none pointer-events-none leading-none"
                    style={{ fontFamily: 'var(--font-heading)' }}
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                  <div className="relative z-10">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                      {item.number}
                    </p>
                    <h3
                      className="text-lg lg:text-xl font-heading text-primary-foreground mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-primary-foreground/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* INSTITUTIONAL PHILOSOPHY */}
        <section className="bg-background" aria-label="Institutional Philosophy">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="h-[2px] w-12 bg-accent mb-8" />
                <blockquote
                  className="text-2xl lg:text-3xl xl:text-4xl font-heading text-primary italic leading-[1.3]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  "{vision_mission.philosophy.pullquote}"
                </blockquote>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <motion.div variants={fadeUp}>
                  <SectionLabel>{vision_mission.philosophy.label}</SectionLabel>
                  <h2
                    className="text-2xl lg:text-3xl font-heading text-primary mb-6"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {vision_mission.philosophy.heading}
                  </h2>
                </motion.div>
                {vision_mission.philosophy.body.map((para) => (
                  <motion.p
                    key={para.id}
                    variants={fadeUp}
                    className="text-base text-muted-foreground leading-relaxed mb-4 last:mb-0"
                  >
                    {para.text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMMITMENT */}
        <section className="bg-muted" aria-label="Our Commitment">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14"
            >
              <SectionLabel>Our Commitment</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {vision_mission.commitment.heading}
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {vision_mission.commitment.items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="bg-background p-8 border-t-2 border-accent"
                >
                  <h3
                    className="text-xl font-heading text-primary mb-4"
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

        {/* EXPLORE MORE */}
        <section className="bg-primary text-primary-foreground" aria-label="Explore more">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-10"
            >
              <h2
                className="text-2xl lg:text-3xl font-heading text-primary-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {vision_mission.cta.heading}
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-col sm:flex-row gap-4"
            >
              {vision_mission.cta.links.map((link) => (
                <motion.div key={link.id} variants={fadeUp}>
                  <a
                    href={link.href}
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-accent text-accent text-sm font-semibold tracking-wide hover:bg-accent hover:text-primary transition-all duration-200"
                  >
                    <span>{link.label}</span>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
