import { Link } from 'react-router';

const footerColumns = [
  {
    heading: 'Organisation',
    links: [
      { label: 'About Gyanteerth', href: '/about' },
      { label: 'Vision & Mission', href: '/vision-mission' },
      { label: 'Governance & Leadership', href: '/governance' },
      { label: 'Organisational Structure', href: '/structure' },
    ],
  },
  {
    heading: 'Our Work',
    links: [
      { label: 'Our Initiatives', href: '/initiatives' },
      { label: 'Institutional Network', href: '/network' },
      { label: 'Institutional Membership', href: '/membership' },
      { label: 'News & Announcements', href: '/news' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Membership Enquiry', href: '/membership' },
      { label: 'Partnership Enquiry', href: '/contact' },
      { label: 'Institutional Enquiry', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Gold rule */}
      <div className="h-[1px] w-full bg-accent/60" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/media/images/logo/horizontal/dark"
                alt="Gyanteerth Educational Society"
                className="block h-auto max-h-10 w-auto max-w-[180px] object-contain"
              />
            </Link>
            <p className="text-primary-foreground/65 text-sm leading-relaxed mb-6">
              An independent educational society dedicated to academic excellence, intellectual development, and institutional collaboration across India.
            </p>
            <div className="h-[1px] w-12 bg-accent" />
          </div>

          {/* Nav columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/65 hover:text-primary-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/45 tracking-wide">
            © 2026 Gyanteerth Educational Society. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/30 tracking-wide">
            Independent Educational Society · Pan-India
          </p>
        </div>
      </div>
    </footer>
  );
}
