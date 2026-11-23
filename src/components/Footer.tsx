import { Link } from 'react-router-dom';

const LEGAL_LINKS = [
  { to: '/terms', label: 'მომსახურების წესები და პირობები' },
  { to: '/privacy', label: 'კონფიდენციალურობის პოლიტიკა' },
  { to: '/cookies', label: 'ქუქი-ფაილების პოლიტიკა' },
  { to: '/code-of-conduct', label: 'ქცევისა და კონტენტის ეთიკის კოდექსი' },
] as const;

const SOCIAL_LINKS = [
  { href: 'https://instagram.com/rgoli.ge', label: 'Instagram' },
  { href: 'https://facebook.com/rgoli.ge', label: 'Facebook' },
  { href: 'https://linkedin.com/company/rgoli', label: 'LinkedIn' },
] as const;

interface FooterProps {
  onOpenCookieSettings: () => void;
}

export function Footer({ onOpenCookieSettings }: FooterProps) {
  return (
    <footer className="mt-24 border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-[1360px] px-6 py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            {/* Left Column — Brand & Vertical Primary Navigation */}
            <div className="md:col-span-4">
              <Link to="/" className="inline-flex items-baseline">
                <span className="text-[19px] font-bold tracking-[-0.03em] text-[#0D0E11]">
                  რგოლი
                </span>
              </Link>
              <p className="mt-2.5 max-w-xs text-[14px] leading-relaxed text-[#6B7280]">
                ქართველი კრეატორების პორტფოლიო პლატფორმა
              </p>

              <nav
                aria-label="ქვედა ნავიგაცია"
                className="mt-4 flex flex-col items-start space-y-2.5"
              >
                <Link
                  to="/about"
                  className="text-[14px] text-[#0D0E11]/80 transition-colors duration-200 hover:text-[#0D0E11]"
                >
                  ჩვენ შესახებ
                </Link>
                <Link
                  to="/contact"
                  className="text-[14px] text-[#0D0E11]/80 transition-colors duration-200 hover:text-[#0D0E11]"
                >
                  კონტაქტი
                </Link>
              </nav>
            </div>

            {/* Middle Column — 5 Legal Links (No Section Header) */}
            <div className="md:col-span-5">
              <ul className="space-y-2.5">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-[14px] text-[#0D0E11]/80 transition-colors duration-200 hover:text-[#0D0E11]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={onOpenCookieSettings}
                    className="cursor-pointer text-left text-[14px] text-[#0D0E11]/80 transition-colors duration-200 hover:text-[#0D0E11]"
                  >
                    ქუქი-ფაილების პარამეტრები
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Column — Official Email & Vertical Social Links */}
            <div className="md:col-span-3">
              <a
                href="mailto:info@rgoli.ge"
                className="inline-block text-[14px] font-medium text-[#0D0E11] transition-colors duration-200 hover:text-[#00C84B]"
              >
                info@rgoli.ge
              </a>

              <div className="mt-4 flex flex-col items-start space-y-2.5">
                {SOCIAL_LINKS.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[14px] text-[#6B7280] transition-colors duration-200 hover:text-[#0D0E11]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="mt-10 border-t border-[#E5E7EB]/60 pt-6 text-xs text-[#6B7280]">
            © {new Date().getFullYear()} რგოლი
          </div>
        </div>
      </footer>
  );
}
