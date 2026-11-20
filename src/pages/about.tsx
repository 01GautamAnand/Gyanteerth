import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { about } from 'virtual:content';

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

export default function AboutPage() {
  const siteUrl = 'https://gyanteerth.org';
  const pageUrl = `${siteUrl}/about`;

  return (
    <>
      <Helmet>
        <title>About Gyanteerth — Independent Educational Society</title>
        <meta name="description" content="Learn about Gyanteerth Educational Society — its founding philosophy, purpose, organisational history, and educational approach." />
        <meta property="og:title" content="About Gyanteerth Educational Society" />
        <meta property="og:description" content="An independent national organisation committed to academic excellence, institutional collaboration, and educational advancement across India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${pageUrl}#webpage`,
          name: 'About Gyanteerth Educational Society',
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
                <SectionLabel>{about.hero.label}</SectionLabel>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl xl:text-6xl font-heading text-primary-foreground leading-[1.1] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {about.hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg text-primary-foreground/70 leading-relaxed"
              >
                {about.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* INTRODUCTION */}
        <section className="bg-background" aria-label="Introduction">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="lg:col-span-7"
              >
                <motion.div variants={fadeUp}>
                  <SectionLabel>Introduction</SectionLabel>
                  <h2
                    className="text-3xl lg:text-4xl font-heading text-primary mb-8"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {about.intro.heading}
                  </h2>
                </motion.div>
                {about.intro.body.map((para) => (
                  <motion.p
                    key={para.id}
                    variants={fadeUp}
                    className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-5 last:mb-0"
                  >
                    {para.text}
                  </motion.p>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="lg:col-span-5"
              >
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-full h-full border border-accent/30 pointer-events-none" />
                  <img
                    src="/media/images/pages/about/editorial-1"
                    alt="Academic library and learning environment"
                    className="w-full h-72 lg:h-96 object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOUNDING PHILOSOPHY */}
        <section className="bg-primary text-primary-foreground" aria-label="Founding Philosophy">
          <GoldDivider />
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
                  className="text-2xl lg:text-3xl xl:text-4xl font-heading text-primary-foreground/90 italic leading-[1.3]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  "{about.philosophy.pullquote}"
                </blockquote>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
              >
                <motion.div variants={fadeUp}>
                  <SectionLabel>Founding Philosophy</SectionLabel>
                  <h2
                    className="text-2xl lg:text-3xl font-heading text-primary-foreground mb-6"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {about.philosophy.heading}
                  </h2>
                </motion.div>
                {about.philosophy.body.map((para) => (
                  <motion.p
                    key={para.id}
                    variants={fadeUp}
                    className="text-base text-primary-foreground/70 leading-relaxed mb-4 last:mb-0"
                  >
                    {para.text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </div>
          <GoldDivider />
        </section>

        {/* PURPOSE & IDENTITY */}
        <section className="bg-background" aria-label="Purpose and Identity">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14"
            >
              <SectionLabel>Purpose & Identity</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {about.purpose.heading}
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {about.purpose.items.map((item) => (
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

        {/* ORGANISATIONAL HISTORY */}
        <section className="bg-muted" aria-label="Organisational History">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14"
            >
              <SectionLabel>Our Journey</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {about.history.heading}
              </h2>
              <p className="text-sm text-muted-foreground italic">{about.history.note}</p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              <div
                className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[1px] bg-accent/30 pointer-events-none"
                aria-hidden="true"
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="space-y-10"
              >
                {about.history.milestones.map((ms, idx) => (
                  <motion.div
                    key={ms.id}
                    variants={fadeUp}
                    className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div
                      className="absolute left-[10px] md:left-1/2 top-2 w-4 h-4 rounded-full bg-accent border-2 border-background md:-translate-x-1/2 shrink-0"
                      aria-hidden="true"
                    />
                    <div className={`pl-10 md:pl-0 md:w-1/2 ${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                      <span
                        className="text-2xl font-heading text-accent"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {ms.year}
                      </span>
                    </div>
                    <div className={`pl-10 md:pl-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                      <h3
                        className="text-base lg:text-lg font-heading text-primary mb-2"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {ms.event}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {ms.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* EDUCATIONAL APPROACH */}
        <section className="bg-primary text-primary-foreground" aria-label="Educational Approach">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14"
            >
              <SectionLabel>How We Work</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary-foreground mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {about.approach.heading}
              </h2>
              <p className="text-primary-foreground/65 text-base max-w-xl">
                {about.approach.subheading}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary-foreground/10"
            >
              {about.approach.principles.map((p) => (
                <motion.div
                  key={p.id}
                  variants={fadeUp}
                  className="bg-primary p-10 relative group hover:bg-primary-foreground/5 transition-colors duration-200"
                >
                  <span
                    className="absolute top-6 right-8 text-7xl font-heading text-accent/10 select-none pointer-events-none leading-none"
                    style={{ fontFamily: 'var(--font-heading)' }}
                    aria-hidden="true"
                  >
                    {p.number}
                  </span>
                  <div className="relative z-10">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
                      {p.number}
                    </p>
                    <h3
                      className="text-xl font-heading text-primary-foreground mb-4"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm text-primary-foreground/60 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* EXPLORE MORE */}
        <section className="bg-background" aria-label="Explore more">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-10"
            >
              <h2
                className="text-2xl lg:text-3xl font-heading text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {about.cta.heading}
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-col sm:flex-row gap-4"
            >
              {about.cta.links.map((link) => (
                <motion.div key={link.id} variants={fadeUp}>
                  <a
                    href={link.href}
                    className="inline-flex items-center justify-center px-8 py-3.5 border border-primary text-primary text-sm font-semibold tracking-wide hover:bg-primary hover:text-primary-foreground transition-all duration-200"
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
