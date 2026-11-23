import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CookieSettingsModal } from './CookieSettingsModal';
import { Footer } from './Footer';
import { Header } from './Header';

export interface LayoutOutletContext {
  openCookieSettings: () => void;
}

export function Layout() {
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  const openCookieSettings = useCallback(() => {
    setIsCookieModalOpen(true);
  }, []);

  const closeCookieSettings = useCallback(() => {
    setIsCookieModalOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA] text-[#0D0E11]">
      <Header />
      <div className="flex-1">
        <Outlet context={{ openCookieSettings } satisfies LayoutOutletContext} />
      </div>
      <Footer onOpenCookieSettings={openCookieSettings} />
      <CookieSettingsModal
        isOpen={isCookieModalOpen}
        onClose={closeCookieSettings}
      />
    </div>
  );
}
