import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MOCK_CREATORS } from './data/mockCreators';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CreatorPortfolio } from './pages/CreatorPortfolio';
import { Home } from './pages/Home';
import { LegalPage } from './pages/LegalPage';
import type { CreatorProfile } from './types/creator';
import { shuffleArray } from './utils/shuffle';

function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const STATIC_TITLES: Record<string, string> = {
      '/': 'რგოლი — ქართველი კრეატორების პორტფოლიო პლატფორმა',
      '/about': 'ჩვენ შესახებ — რგოლი',
      '/contact': 'კონტაქტი — რგოლი',
      '/terms': 'მომსახურების წესები და პირობები — რგოლი',
      '/privacy': 'კონფიდენციალურობის პოლიტიკა — რგოლი',
      '/cookies': 'ქუქი-ფაილების პოლიტიკა — რგოლი',
      '/code-of-conduct': 'ქცევისა და კონტენტის ეთიკის კოდექსი — რგოლი',
    };

    if (STATIC_TITLES[pathname]) {
      document.title = STATIC_TITLES[pathname];
    }
  }, [pathname]);

  return null;
}

export function App() {
  // Randomize once on every initial page load; stays stable across filtering and navigation.
  const [shuffledCreators] = useState<CreatorProfile[]>(() =>
    shuffleArray(MOCK_CREATORS),
  );

  return (
    <BrowserRouter>
      <PageMeta />
      <Routes>
        {/* Main Rgoli Platform Directory & Info Pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home creators={shuffledCreators} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<LegalPage doc="terms" />} />
          <Route path="/privacy" element={<LegalPage doc="privacy" />} />
          <Route path="/cookies" element={<LegalPage doc="cookies" />} />
          <Route
            path="/code-of-conduct"
            element={<LegalPage doc="code-of-conduct" />}
          />
        </Route>

        {/* Standalone Creator Personal Micro-Site & Catch-All 404 */}
        <Route path="/:slug" element={<CreatorPortfolio />} />
        <Route path="*" element={<CreatorPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
