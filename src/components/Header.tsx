import { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  AddPortfolioModal,
  type AccessModalMode,
} from './AddPortfolioModal';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-[14px] transition-colors duration-200 ${
    isActive ? 'text-[#0D0E11] font-medium' : 'text-[#6B7280] hover:text-[#0D0E11]'
  }`;

export function Header() {
  const [modalMode, setModalMode] = useState<AccessModalMode | null>(null);
  const handleCloseModal = useCallback(() => setModalMode(null), []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#E5E7EB]/60 bg-[#F8F9FA]/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1360px] items-center justify-between gap-3 px-4 sm:px-6">
          {/* Left — Transparent RGOLI Brand Logo */}
          <Link
            to="/"
            aria-label="რგოლი — მთავარი გვერდი"
            className="group inline-flex shrink-0 items-center"
          >
            <img
              src="/logo.png"
              alt="RGOLI"
              className="h-6 w-auto select-none transition-opacity duration-200 group-hover:opacity-80 sm:h-7"
            />
          </Link>

          {/* Right — Navigation + Hairline Divider + Auth / Create CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            <nav
              aria-label="მთავარი ნავიგაცია"
              className="hidden items-center gap-6 sm:flex"
            >
              <NavLink to="/about" className={navLinkClass}>
                ჩვენ შესახებ
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                კონტაქტი
              </NavLink>
            </nav>

            <span
              aria-hidden="true"
              className="mx-1 hidden h-4 w-[1px] bg-[#E5E7EB] sm:block"
            />

            <button
              type="button"
              onClick={() => setModalMode('login')}
              className="cursor-pointer px-2 py-1 text-[14px] font-medium whitespace-nowrap text-[#0D0E11] transition-colors duration-200 hover:text-[#00C84B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D0E11] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F9FA] rounded-md"
            >
              შესვლა
            </button>

            <button
              type="button"
              onClick={() => setModalMode('create')}
              className="cursor-pointer rounded-full bg-[#0D0E11] px-3.5 py-2 text-[13px] font-medium whitespace-nowrap text-white transition-colors duration-200 hover:bg-[#00E054] hover:text-[#0D0E11] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D0E11] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F9FA] sm:px-4"
            >
              პორტფოლიოს შექმნა
            </button>
          </div>
        </div>
      </header>

      <AddPortfolioModal mode={modalMode} onClose={handleCloseModal} />
    </>
  );
}
