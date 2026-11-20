import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { news } from 'virtual:content';

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

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const siteUrl = 'https://gyanteerth.org';
  const pageUrl = `${siteUrl}/news`;

  return (
    <>
      <Helmet>
        <title>News & Announcements — Gyanteerth Educational Society</title>
        <meta name="description" content="Official announcements, organisational updates, forthcoming events, achievements, and publications from Gyanteerth Educational Society." />
        <meta property="og:title" content="News & Announcements — Gyanteerth Educational Society" />
        <meta property="og:description" content="Official announcements, events, achievements, and publications from Gyanteerth Educational Society." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          name: 'News & Announcements — Gyanteerth Educational Society',
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
              <motion.div variants={fadeUp}><SectionLabel>{news.hero.label}</SectionLabel></motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl xl:text-6xl font-heading text-primary-foreground leading-[1.1] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {news.hero.headline}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-primary-foreground/70 leading-relaxed">
                {news.hero.subheadline}
              </motion.p>
            </motion.div>
          </div>
          <GoldDivider />
        </section>

        {/* FEATURED ANNOUNCEMENT */}
        <section className="bg-muted" aria-label="Featured announcement">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-primary text-primary-foreground p-8 lg:p-12 border-l-4 border-accent"
            >
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent border border-accent/40 px-3 py-1">
                  {news.featured.tag}
                </span>
                <span className="text-xs text-primary-foreground/50">{news.featured.date}</span>
              </div>
              <h2
                className="text-2xl lg:text-3xl font-heading text-primary-foreground leading-snug mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {news.featured.headline}
              </h2>
              <p className="text-primary-foreground/65 text-base leading-relaxed max-w-3xl mb-6">
                {news.featured.summary}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-accent">
                {news.featured.readMoreLabel}
                <span aria-hidden="true">→</span>
              </span>
            </motion.div>
          </div>
        </section>

        {/* FILTER + GRID */}
        <section className="bg-background" aria-label="All news and announcements">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">

            {/* Category filter — rendered inline from content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-wrap gap-2 mb-12"
              role="group"
              aria-label="Filter by category"
            >
              {news.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all duration-200 border ${
                    activeCategory === cat.label
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-accent hover:text-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* News grid — full list rendered, CSS visibility drives the filter */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border"
            >
              {news.items.map((item) => (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  className={`bg-background p-7 flex flex-col ${
                    activeCategory !== 'All' && item.tag !== activeCategory ? 'hidden' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-semibold tracking-[0.12em] uppercase text-accent border border-accent/30 px-2.5 py-0.5">
                      {item.tag}
                    </span>
                    <time className="text-xs text-muted-foreground">{item.date}</time>
                  </div>
                  <h3
                    className="text-base font-heading text-primary leading-snug mb-3 flex-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.headline}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {item.summary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-accent mt-auto">
                    Read More <span aria-hidden="true">→</span>
                  </span>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* STAY INFORMED */}
        <section className="bg-primary text-primary-foreground" aria-label="Stay informed">
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
                <SectionLabel>{news.subscribeSection.label}</SectionLabel>
                <h2
                  className="text-3xl lg:text-4xl font-heading text-primary-foreground mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {news.subscribeSection.heading}
                </h2>
                <p className="text-primary-foreground/65 text-base leading-relaxed">
                  {news.subscribeSection.body}
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-accent text-accent text-sm font-semibold tracking-wide hover:bg-accent hover:text-primary transition-all duration-200"
                >
                  Contact Us
                </a>
                <a
                  href="/membership"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-primary-foreground/30 text-primary-foreground/70 text-sm font-semibold tracking-wide hover:border-primary-foreground/60 hover:text-primary-foreground transition-all duration-200"
                >
                  Membership Enquiry
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
              <p className="text-sm text-muted-foreground italic">{news.note}</p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
