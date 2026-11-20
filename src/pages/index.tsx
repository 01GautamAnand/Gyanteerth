import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { home } from 'virtual:content';

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

// ─── Divider ─────────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center justify-center w-full py-2">
      <div className="flex-1 h-[1px] bg-accent/40" />
      <div className="mx-4 w-2 h-2 rotate-45 bg-accent/60 shrink-0" />
      <div className="flex-1 h-[1px] bg-accent/40" />
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
      {children}
    </p>
  );
}

export default function HomePage() {
  const siteUrl = 'https://gyanteerth.org';

  return (
    <>
      <Helmet>
        <title>Gyanteerth Educational Society — Advancing Education Across India</title>
        <meta
          name="description"
          content="Gyanteerth is an independent educational society dedicated to academic excellence, institutional collaboration, and the advancement of educational opportunities across India."
        />
        <meta property="og:title" content="Gyanteerth Educational Society" />
        <meta property="og:description" content="Advancing Education. Connecting Institutions. Inspiring Excellence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          '@id': `${siteUrl}/#organization`,
          name: 'Gyanteerth Educational Society',
          url: siteUrl,
          description: 'An independent educational society dedicated to academic excellence, intellectual development, and institutional collaboration across India.',
          areaServed: 'IN',
        }).replace(/</g, '\u003c')}</script>
      </Helmet>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col justify-center" aria-label="Hero">
          <img
            src="/media/images/pages/home/hero"
            alt="Grand academic convocation hall"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1080}
          />
          {/* Deep navy overlay */}
          <div className="absolute inset-0 bg-primary/85 pointer-events-none" />
          {/* Subtle gold bottom rule */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent/50 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-4xl"
            >
              <motion.p
                variants={fadeUp}
                className="text-xs font-semibold tracking-[0.25em] uppercase text-accent mb-6"
              >
                Gyanteerth Educational Society
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground leading-[1.1] mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {home.hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg lg:text-xl text-primary-foreground/75 leading-relaxed max-w-2xl mb-12"
              >
                {home.hero.subheadline}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/initiatives"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-accent text-accent text-sm font-semibold tracking-wide hover:bg-accent hover:text-primary transition-all duration-200"
                >
                  {home.hero.cta_primary}
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-primary-foreground/30 text-primary-foreground/80 text-sm font-semibold tracking-wide hover:border-primary-foreground hover:text-primary-foreground transition-all duration-200"
                >
                  {home.hero.cta_secondary}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── STATS BAND ───────────────────────────────────────────────────── */}
        <section className="bg-primary border-t border-accent/30" aria-label="Key statistics">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {home.stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-center lg:text-left"
                >
                  <div
                    className="text-2xl lg:text-3xl font-heading text-accent mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs tracking-[0.15em] uppercase text-primary-foreground/55">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTRODUCTION ─────────────────────────────────────────────────── */}
        <section className="bg-primary text-primary-foreground" aria-label="Introduction">
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
                  className="text-3xl lg:text-4xl xl:text-5xl font-heading leading-[1.2] text-primary-foreground/90 italic"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  "{home.intro.pullquote}"
                </blockquote>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <SectionLabel>About the Society</SectionLabel>
                <p className="text-base lg:text-lg text-primary-foreground/70 leading-relaxed">
                  {home.intro.body}
                </p>
                <div className="mt-8">
                  <Link
                    to="/about"
                    className="text-sm font-semibold tracking-wide text-accent border-b border-accent/40 pb-0.5 hover:border-accent transition-colors duration-200"
                  >
                    Learn More About Gyanteerth →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
          <GoldDivider />
        </section>

        {/* ── VISION / MISSION / OBJECTIVES ────────────────────────────────── */}
        <section className="bg-background" aria-label="Vision, Mission and Objectives">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14"
            >
              <SectionLabel>Our Purpose</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Vision, Mission & Objectives
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border"
            >
              {[
                { title: home.vision.vision_title, text: home.vision.vision_text },
                { title: home.vision.mission_title, text: home.vision.mission_text },
                { title: home.vision.objectives_title, text: home.vision.objectives_text },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="px-0 md:px-10 py-10 md:py-0 first:pl-0 last:pr-0"
                >
                  <div className="h-[2px] w-10 bg-accent mb-6" />
                  <h3
                    className="text-xl font-heading text-primary mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── INITIATIVES ──────────────────────────────────────────────────── */}
        <section className="bg-primary text-primary-foreground" aria-label="Our Initiatives">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14"
            >
              <SectionLabel>What We Do</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary-foreground"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Our Initiatives
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary-foreground/10"
            >
              {home.initiatives.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className="relative bg-primary p-8 lg:p-10 group hover:bg-primary-foreground/5 transition-colors duration-200"
                >
                  {/* Oversized gold numeral behind */}
                  <span
                    className="absolute top-4 right-6 text-7xl lg:text-8xl font-heading text-accent/10 select-none pointer-events-none leading-none"
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

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-12 text-center"
            >
              <Link
                to="/initiatives"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-accent text-accent text-sm font-semibold tracking-wide hover:bg-accent hover:text-primary transition-all duration-200"
              >
                View All Initiatives
              </Link>
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* ── INSTITUTIONAL NETWORK ────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-background" aria-label="Institutional Network">
          <img
            src="/media/images/pages/home/network-map"
            alt="Map of India representing Gyanteerth's national network"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            loading="lazy"
            width={1920}
            height={1080}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Our Reach</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl lg:text-4xl xl:text-5xl font-heading text-primary mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {home.network.heading}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-10">
                {home.network.body}
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  to="/network"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  {home.network.cta}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── GOVERNANCE PREVIEW ───────────────────────────────────────────── */}
        <section className="bg-muted" aria-label="Governance and Leadership">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-14 text-center"
            >
              <SectionLabel>Governance</SectionLabel>
              <h2
                className="text-3xl lg:text-4xl font-heading text-primary mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {home.governance.heading}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
                {home.governance.subheading}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {home.governance.leaders.map((leader) => (
                <motion.div
                  key={leader.id}
                  variants={fadeUp}
                  className="bg-primary text-primary-foreground p-8 border-t-2 border-accent"
                >
                  {/* Placeholder avatar */}
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mb-6">
                    <span className="text-primary-foreground/30 text-2xl font-heading" style={{ fontFamily: 'var(--font-heading)' }}>
                      {leader.title.charAt(0)}
                    </span>
                  </div>
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">
                    {leader.title}
                  </p>
                  <h3
                    className="text-lg font-heading text-primary-foreground mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {leader.name}
                  </h3>
                  <p className="text-xs text-primary-foreground/45 italic">
                    {leader.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-10 text-center"
            >
              <Link
                to="/governance"
                className="text-sm font-semibold tracking-wide text-primary border-b border-primary/30 pb-0.5 hover:border-primary transition-colors duration-200"
              >
                View Full Governance Structure →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── MEMBERSHIP INVITATION ────────────────────────────────────────── */}
        <section className="bg-background border-y border-border" aria-label="Membership Invitation">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="h-[2px] w-10 bg-accent mb-6" />
                <h2
                  className="text-3xl lg:text-4xl xl:text-5xl font-heading text-primary leading-[1.15]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {home.membership.heading}
                </h2>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8">
                  {home.membership.body}
                </p>
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-accent text-accent text-sm font-semibold tracking-wide hover:bg-accent hover:text-primary transition-all duration-200"
                >
                  {home.membership.cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── NEWS & ANNOUNCEMENTS ─────────────────────────────────────────── */}
        <section className="bg-muted" aria-label="News and Announcements">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
            >
              <div>
                <SectionLabel>Latest Updates</SectionLabel>
                <h2
                  className="text-3xl lg:text-4xl font-heading text-primary"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {home.news.heading}
                </h2>
              </div>
              <Link
                to="/news"
                className="text-sm font-semibold tracking-wide text-accent border-b border-accent/40 pb-0.5 hover:border-accent transition-colors duration-200 shrink-0"
              >
                {home.news.cta} →
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {home.news.items.map((item) => (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  className="bg-background p-8 border-t-2 border-border hover:border-accent transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <time className="text-xs text-muted-foreground">{item.date}</time>
                  </div>
                  <h3
                    className="text-base lg:text-lg font-heading text-primary mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.excerpt}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT STRIP ────────────────────────────────────────────────── */}
        <section className="bg-primary text-primary-foreground" aria-label="Contact information">
          <GoldDivider />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Get in Touch</SectionLabel>
                <h2
                  className="text-2xl lg:text-3xl font-heading text-primary-foreground mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Official Contact
                </h2>
                <div className="space-y-3 text-sm text-primary-foreground/65">
                  <p>{home.contact.address}</p>
                  <p>{home.contact.email}</p>
                  <p>{home.contact.phone}</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-10 py-4 border border-accent text-accent text-sm font-semibold tracking-wide hover:bg-accent hover:text-primary transition-all duration-200"
                >
                  {home.contact.cta}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
