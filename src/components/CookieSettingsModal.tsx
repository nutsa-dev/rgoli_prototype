import { Check, Lock, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_COOKIE_NAME = 'rgoli_consent';
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months

interface CookiePreferences {
  necessary: true;
  functional: boolean;
  analytics: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: true,
  analytics: false,
};

function readCookieValue(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const prefix = `${name}=`;
  const parts = document.cookie.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(prefix)) {
      return decodeURIComponent(trimmed.slice(prefix.length));
    }
  }
  return null;
}

function readStoredPreferences(): CookiePreferences {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES;
  }
  try {
    const raw =
      readCookieValue(CONSENT_COOKIE_NAME) ??
      window.localStorage.getItem(CONSENT_COOKIE_NAME);
    if (!raw) {
      return DEFAULT_PREFERENCES;
    }
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    return {
      necessary: true,
      functional:
        typeof parsed.functional === 'boolean' ? parsed.functional : true,
      analytics:
        typeof parsed.analytics === 'boolean' ? parsed.analytics : false,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookieSettingsModal({
  isOpen,
  onClose,
}: CookieSettingsModalProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(() =>
    readStoredPreferences(),
  );
  const [savedNotice, setSavedNotice] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      return;
    }
    setPreferences(readStoredPreferences());
    setSavedNotice(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const persist = (next: CookiePreferences) => {
    const serialized = JSON.stringify(next);
    try {
      document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(serialized)}; max-age=${CONSENT_MAX_AGE_SECONDS}; path=/; SameSite=Lax`;
    } catch {
      // Ignore restricted cookie errors
    }
    try {
      window.localStorage.setItem(CONSENT_COOKIE_NAME, serialized);
    } catch {
      // Ignore restricted storage errors
    }
    setPreferences(next);
    setSavedNotice(true);
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, 600);
  };

  const handleAcceptAll = () => {
    persist({ necessary: true, functional: true, analytics: true });
  };

  const handleSaveSelection = () => {
    persist(preferences);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0E11]/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white px-6 pt-6 pb-6 text-[#0D0E11] shadow-2xl sm:px-7 sm:pt-7 sm:pb-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6B7280]">
              კონფიდენციალურობა
            </p>
            <h2
              id="cookie-settings-title"
              className="mt-1 text-[20px] font-bold tracking-[-0.02em] text-[#0D0E11]"
            >
              ქუქი-ფაილების პარამეტრები
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="დახურვა"
            className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-[#F8F9FA] hover:text-[#0D0E11]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2.5 text-[13px] leading-relaxed text-[#6B7280]">
          მართეთ ქუქი-ფაილების კატეგორიები. დეტალური ინფორმაციისთვის იხილეთ{' '}
          <Link
            to="/cookies"
            onClick={onClose}
            className="font-medium text-[#0D0E11] underline underline-offset-4 hover:text-[#00C84B]"
          >
            ქუქი-ფაილების პოლიტიკა
          </Link>
          .
        </p>

        <div className="mt-5 divide-y divide-[#E5E7EB] rounded-xl border border-[#E5E7EB] bg-[#F8F9FA]/60">
          {/* 1. Necessary (Locked) */}
          <div className="flex items-start justify-between gap-4 p-4">
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[14px] font-semibold text-[#0D0E11]">
                  აუცილებელი (Necessary)
                </p>
                <Lock className="h-3.5 w-3.5 text-[#6B7280]" />
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-[#6B7280]">
                საჭიროა პლატფორმის გამართული მუშაობისა და უსაფრთხოებისთვის.
                გამორთვა შეუძლებელია.
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-[#E5E7EB] bg-white px-2.5 py-1 text-[11px] font-medium text-[#6B7280]">
              აქტიური
            </span>
          </div>

          {/* 2. Functional */}
          <div className="flex items-start justify-between gap-4 p-4">
            <div>
              <p className="text-[14px] font-semibold text-[#0D0E11]">
                ფუნქციური (Functional)
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-[#6B7280]">
                იმახსოვრებს ინტერფეისის პარამეტრებს, ენისა და თემის არჩევანს.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.functional}
              aria-label="ფუნქციური ქუქი-ფაილები"
              onClick={() =>
                setPreferences((prev) => ({
                  ...prev,
                  functional: !prev.functional,
                }))
              }
              className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                preferences.functional ? 'bg-[#0D0E11]' : 'bg-[#D1D5DB]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  preferences.functional ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 3. Analytics */}
          <div className="flex items-start justify-between gap-4 p-4">
            <div>
              <p className="text-[14px] font-semibold text-[#0D0E11]">
                ანალიტიკური (Analytics)
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-[#6B7280]">
                გვეხმარება პლატფორმის წარმადობისა და გამოყენებადობის
                გაუმჯობესებაში ანონიმური სტატისტიკით.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.analytics}
              aria-label="ანალიტიკური ქუქი-ფაილები"
              onClick={() =>
                setPreferences((prev) => ({
                  ...prev,
                  analytics: !prev.analytics,
                }))
              }
              className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                preferences.analytics ? 'bg-[#0D0E11]' : 'bg-[#D1D5DB]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleSaveSelection}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 text-[13px] font-medium text-[#0D0E11] transition-colors hover:border-[#0D0E11]"
          >
            {savedNotice ? (
              <>
                <Check className="h-4 w-4 text-[#00C84B]" />
                <span>შენახულია</span>
              </>
            ) : (
              <span>არჩევანის შენახვა</span>
            )}
          </button>

          <button
            type="button"
            onClick={handleAcceptAll}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#0D0E11] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#00E054] hover:text-[#0D0E11]"
          >
            ყველას მიღება
          </button>
        </div>
      </div>
    </div>
  );
}
