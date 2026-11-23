import {
  ArrowLeft,
  Check,
  Images,
  Link2,
  MapPin,
  Play,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CreatorAvatar } from '../components/CreatorAvatar';
import { ProjectCaseModal } from '../components/ProjectCaseModal';
import { ThemePreviewSwitcher } from '../components/ThemePreviewSwitcher';
import { VideoLightboxModal } from '../components/VideoLightboxModal';
import { getCreatorBySlug } from '../data/mockCreators';
import {
  getCreatorRoleLabel,
  isProjectPortfolioItem,
  isVideoPortfolioItem,
  type PortfolioItem,
  type ProjectPortfolioItem,
  type VideoPortfolioItem,
} from '../types/creator';
import {
  DEFAULT_PORTFOLIO_THEME,
  buildThemeStyle,
  isThemeDark,
  loadGoogleFont,
  type PortfolioThemeConfig,
  type ThemeLayoutPreset,
} from '../types/theme';
import { formatBrandName } from '../utils/format';

type WorkFilter = 'all' | 'video' | 'project';

function formatWhatsAppHandle(url: string): string {
  const digits = url.replace(/\D/g, '');
  if (digits.startsWith('995') && digits.length === 12) {
    return `+995 ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
  }
  return digits ? `+${digits}` : 'WhatsApp';
}

interface CuratedWorkItemProps {
  item: PortfolioItem;
  layout: ThemeLayoutPreset;
  priority: boolean;
  onSelect: (item: PortfolioItem) => void;
}

function CuratedWorkItem({
  item,
  layout,
  priority,
  onSelect,
}: CuratedWorkItemProps) {
  const isVideo = isVideoPortfolioItem(item);
  const coverSrc = isVideo ? item.thumbnailUrl : item.coverImageUrl;
  const galleryCount = isVideo ? 0 : item.galleryImages.length;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleMouseEnter = () => {
    if (!isVideo) {
      return;
    }
    setIsHovering(true);
    const videoEl = videoRef.current;
    if (videoEl) {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore browser autoplay/abort rejections silently
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isVideo) {
      return;
    }
    setIsHovering(false);
    setIsVideoReady(false);
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.pause();
      videoEl.currentTime = 0;
    }
  };

  const isEditorialVerticalVideo =
    layout === 'editorial-1' && isVideo && item.aspectRatio !== '16:9';

  const videoAspectClass = isVideo
    ? item.aspectRatio === '16:9'
      ? 'aspect-video'
      : item.aspectRatio === '4:5'
        ? 'aspect-[4/5]'
        : item.aspectRatio === '1:1'
          ? 'aspect-square'
          : 'aspect-[9/16]'
    : '';

  const aspectClass = isVideo
    ? videoAspectClass
    : layout === 'editorial-1'
      ? 'aspect-[16/10]'
      : layout === 'grid-2'
        ? 'aspect-[4/3]'
        : 'aspect-[4/5]';

  return (
    <article
      className={
        isEditorialVerticalVideo ? 'mx-auto w-full max-w-[420px]' : undefined
      }
    >
      <button
        type="button"
        onClick={() => {
          handleMouseLeave();
          onSelect(item);
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group block w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg-primary)]"
      >
        {/* Pure Visual Framing */}
        <div
          className={`relative w-full overflow-hidden rounded-[var(--radius-card)] bg-[var(--bg-surface)] transition-[border-radius] duration-300 ${aspectClass}`}
        >
          <img
            src={coverSrc}
            alt={item.title}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.02]"
          />

          {isVideo ? (
            <>
              <video
                ref={videoRef}
                src={item.videoUrl}
                poster={item.thumbnailUrl}
                muted
                loop
                playsInline
                preload="none"
                onPlaying={() => setIsVideoReady(true)}
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  isHovering && isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <span
                aria-label="ვიდეო ნამუშევარი"
                className="pointer-events-none absolute top-3.5 right-3.5 z-10 inline-flex items-center justify-center rounded-full bg-black/40 p-2.5 text-white ring-1 ring-[var(--accent)]/60 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)] group-hover:ring-transparent"
              >
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              </span>
            </>
          ) : (
            galleryCount > 1 && (
              <span className="pointer-events-none absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white ring-1 ring-white/15 backdrop-blur-md">
                <Images className="h-3 w-3" />
                <span>1 / {galleryCount}</span>
              </span>
            )
          )}
        </div>

        {/* Clean Single-Row Metadata Directly Beneath Visual */}
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold leading-snug text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent)]">
            {item.title}
          </h3>
          <span className="shrink-0 text-[13px] text-[var(--text-muted)]">
            {formatBrandName(item.clientName)}
          </span>
        </div>
      </button>
    </article>
  );
}

export function CreatorPortfolio() {
  const params = useParams<{ slug?: string; '*': string }>();
  const slug = params.slug ?? params['*'] ?? '';
  const creator = getCreatorBySlug(slug);

  const defaultTheme = creator?.defaultTheme ?? DEFAULT_PORTFOLIO_THEME;
  const [theme, setTheme] = useState<PortfolioThemeConfig>(() => defaultTheme);
  const [workFilter, setWorkFilter] = useState<WorkFilter>('all');
  const [activeVideo, setActiveVideo] = useState<VideoPortfolioItem | null>(
    null,
  );
  const [activeProject, setActiveProject] =
    useState<ProjectPortfolioItem | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const linkTimerRef = useRef<number | null>(null);
  const emailTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (linkTimerRef.current !== null) {
      window.clearTimeout(linkTimerRef.current);
      linkTimerRef.current = null;
    }
    if (emailTimerRef.current !== null) {
      window.clearTimeout(emailTimerRef.current);
      emailTimerRef.current = null;
    }
    setTheme(creator?.defaultTheme ?? DEFAULT_PORTFOLIO_THEME);
    setWorkFilter('all');
    setActiveVideo(null);
    setActiveProject(null);
    setLinkCopied(false);
    setEmailCopied(false);
    document.title = creator
      ? `${creator.fullName} — რგოლი`
      : 'გვერდი ვერ მოიძებნა — რგოლი';
  }, [slug, creator]);

  useEffect(() => {
    loadGoogleFont(theme.font);
  }, [theme.font]);

  useEffect(() => {
    return () => {
      if (linkTimerRef.current !== null) {
        window.clearTimeout(linkTimerRef.current);
      }
      if (emailTimerRef.current !== null) {
        window.clearTimeout(emailTimerRef.current);
      }
    };
  }, []);

  const videoCount = useMemo(
    () =>
      creator ? creator.portfolioItems.filter(isVideoPortfolioItem).length : 0,
    [creator],
  );

  const projectCount = useMemo(
    () =>
      creator
        ? creator.portfolioItems.filter(isProjectPortfolioItem).length
        : 0,
    [creator],
  );

  const hasBothTypes = videoCount > 0 && projectCount > 0;

  const visibleItems = useMemo(() => {
    if (!creator) {
      return [];
    }
    if (workFilter === 'video') {
      return creator.portfolioItems.filter(isVideoPortfolioItem);
    }
    if (workFilter === 'project') {
      return creator.portfolioItems.filter(isProjectPortfolioItem);
    }
    return creator.portfolioItems;
  }, [creator, workFilter]);

  const handleCopyPortfolioLink = async () => {
    if (!creator) {
      return;
    }
    const shareUrl = `https://rgoli.ge/${creator.slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      return;
    }
    setLinkCopied(true);
    if (linkTimerRef.current !== null) {
      window.clearTimeout(linkTimerRef.current);
    }
    linkTimerRef.current = window.setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setEmailCopied(true);
    if (emailTimerRef.current !== null) {
      window.clearTimeout(emailTimerRef.current);
    }
    emailTimerRef.current = window.setTimeout(() => {
      setEmailCopied(false);
    }, 2000);
  };

  const handleSelectWork = useCallback((item: PortfolioItem) => {
    if (isVideoPortfolioItem(item)) {
      setActiveVideo(item);
    } else {
      setActiveProject(item);
    }
  }, []);

  const handleCloseVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  const handleCloseProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  if (!creator) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F9FA] px-6 text-center text-[#0D0E11]">
        <p className="text-[12px] font-medium text-[#6B7280]">404</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-[-0.025em] sm:text-[34px]">
          კრეატორი ვერ მოიძებნა
        </h1>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#6B7280]">
          მისამართი{' '}
          <span className="font-medium text-[#0D0E11]">rgoli.ge/{slug}</span>{' '}
          ამჟამად არ არსებობს ან გადატანილია.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0D0E11] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#00E054] hover:text-[#0D0E11]"
        >
          <ArrowLeft className="h-4 w-4" />
          რგოლზე დაბრუნება
        </Link>
      </div>
    );
  }

  const themeStyle = buildThemeStyle(theme);
  const isDark = isThemeDark(theme);
  const cityLabel = creator.location ?? 'თბილისი';

  const contactChannels = [
    creator.contacts.email && {
      key: 'email',
      label: 'Email',
      handle: creator.contacts.email,
      isEmail: true,
    },
    creator.contacts.whatsapp && {
      key: 'whatsapp',
      label: 'WhatsApp',
      handle: formatWhatsAppHandle(creator.contacts.whatsapp),
      href: creator.contacts.whatsapp,
      isEmail: false,
    },
    creator.contacts.instagram && {
      key: 'instagram',
      label: 'Instagram',
      handle: `@${creator.contacts.instagram
        .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
        .replace(/\/$/, '')}`,
      href: creator.contacts.instagram,
      isEmail: false,
    },
    creator.contacts.tiktok && {
      key: 'tiktok',
      label: 'TikTok',
      handle: creator.contacts.tiktok
        .replace(/^https?:\/\/(www\.)?tiktok\.com\//i, '')
        .replace(/\/$/, ''),
      href: creator.contacts.tiktok,
      isEmail: false,
    },
    creator.contacts.behance && {
      key: 'behance',
      label: 'Behance',
      handle: creator.contacts.behance
        .replace(/^https?:\/\/(www\.)?behance\.net\//i, '')
        .replace(/\/$/, ''),
      href: creator.contacts.behance,
      isEmail: false,
    },
    creator.contacts.linkedin && {
      key: 'linkedin',
      label: 'LinkedIn',
      handle: creator.contacts.linkedin
        .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '')
        .replace(/\/$/, ''),
      href: creator.contacts.linkedin,
      isEmail: false,
    },
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    handle: string;
    href?: string;
    isEmail: boolean;
  }>;

  return (
    <div
      style={{
        ...themeStyle,
        fontFamily: 'var(--font-family)',
        letterSpacing: 'var(--font-tracking)',
      }}
      className="flex min-h-screen flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300"
    >
      {/* Ultra-Clean Top Bar — No Duplicate Creator Name */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--bg-primary)_88%,transparent)] backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-6">
          <Link
            to="/"
            aria-label="რგოლი — მთავარი გვერდი"
            className="group inline-flex shrink-0 items-center"
          >
            <img
              src="/logo.png"
              alt="RGOLI"
              className={`h-6 w-auto select-none transition-opacity duration-200 group-hover:opacity-80 sm:h-7 ${
                isDark ? 'invert hue-rotate-180' : ''
              }`}
            />
          </Link>

          <nav
            aria-label="სექციების ნავიგაცია"
            className="flex items-center gap-6 text-[13px] font-medium text-[var(--text-muted)]"
          >
            <a
              href="#works"
              className="transition-colors hover:text-[var(--text-primary)]"
            >
              ნამუშევრები
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-[var(--text-primary)]"
            >
              კონტაქტი
            </a>
          </nav>
        </div>
      </header>

      {/* Main Standalone Website Body */}
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6">
        {/* SECTION 1: Balanced Two-Column Asymmetric Hero */}
        <section className="grid grid-cols-1 gap-8 border-b border-[var(--border-subtle)] py-12 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-12">
          {/* Left Column: Horizontal Identity Row & Core Strengths */}
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-5">
              <CreatorAvatar
                fullName={creator.fullName}
                avatarUrl={creator.avatarUrl}
                size="lg"
                themed
                priority
              />

              <div className="min-w-0">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  {creator.fullName}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14px] font-medium sm:text-[15px]">
                  <span className="text-[var(--text-primary)]">
                    {getCreatorRoleLabel(creator)}
                  </span>
                  <span aria-hidden="true" className="text-[var(--text-muted)]">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1 text-[var(--text-muted)]">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{cityLabel}</span>
                  </span>
                </div>
              </div>
            </div>

            {creator.skills.length > 0 && (
              <div
                aria-label="ძლიერი მხარეები"
                className="mt-6 flex flex-wrap gap-2"
              >
                {creator.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[var(--radius-tag)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--text-primary)] transition-[border-radius,color,background-color,border-color] duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Bio & Immediate Contact Bar */}
          <div className="flex flex-col justify-between">
            <p className="text-[15px] leading-relaxed text-[var(--text-primary)]/85 sm:text-[16px]">
              {creator.bio}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {contactChannels.map((channel) =>
                channel.isEmail ? (
                  <button
                    key={channel.key}
                    type="button"
                    onClick={() => handleCopyEmail(channel.handle)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-[var(--radius-tag)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
                  >
                    <span>{emailCopied ? 'დაკოპირდა' : channel.label}</span>
                    {emailCopied && (
                      <Check
                        className="h-3 w-3"
                        style={{ color: 'var(--accent)' }}
                      />
                    )}
                  </button>
                ) : (
                  <a
                    key={channel.key}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-[var(--radius-tag)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
                  >
                    {channel.label}
                  </a>
                ),
              )}

              {/* Primary-Accent Single-Link Copy Action */}
              <button
                type="button"
                onClick={handleCopyPortfolioLink}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-[var(--radius-tag)] bg-[var(--accent)] px-3.5 py-1.5 text-[12px] font-semibold text-[var(--accent-ink)] transition-opacity duration-200 hover:opacity-90"
              >
                {linkCopied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Link2 className="h-3.5 w-3.5" />
                )}
                <span>{linkCopied ? 'დაკოპირდა' : 'ბმულის კოპირება'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Curated Works (3-Column Default + Vertical Video Ratios) */}
        <section
          id="works"
          aria-labelledby="works-heading"
          className="scroll-mt-20 py-12 md:py-16"
        >
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h2
              id="works-heading"
              className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]"
            >
              ნამუშევრები
            </h2>

            {hasBothTypes && (
              <nav
                aria-label="ნამუშევრების ფილტრი"
                className="flex flex-wrap items-center gap-2 text-[13px]"
              >
                {(
                  [
                    {
                      key: 'all' as const,
                      label: `ყველა (${creator.portfolioItems.length})`,
                    },
                    { key: 'video' as const, label: `ვიდეო (${videoCount})` },
                    {
                      key: 'project' as const,
                      label: `პროექტები (${projectCount})`,
                    },
                  ] as const
                ).map((tab) => {
                  const isActive = workFilter === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setWorkFilter(tab.key)}
                      className={`cursor-pointer rounded-[var(--radius-tag)] px-3.5 py-1.5 transition-colors ${
                        isActive
                          ? 'bg-[var(--accent)] font-semibold text-[var(--accent-ink)]'
                          : 'bg-transparent font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            )}
          </div>

          <div
            className={
              theme.layout === 'editorial-1'
                ? 'mx-auto flex max-w-3xl flex-col gap-16'
                : theme.layout === 'grid-2'
                  ? 'grid grid-cols-1 items-start gap-x-10 gap-y-14 md:grid-cols-2'
                  : 'grid grid-cols-1 items-start gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'
            }
          >
            {visibleItems.map((item, index) => (
              <CuratedWorkItem
                key={item.id}
                item={item}
                layout={theme.layout}
                priority={index < 3}
                onSelect={handleSelectWork}
              />
            ))}
          </div>
        </section>

        {/* SECTION 3: Architectural Direct Contact (Zero Filler Headlines) */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-14 md:py-16"
        >
          <h2
            id="contact-heading"
            className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]"
          >
            კონტაქტი
          </h2>

          <div
            className={`mt-6 grid gap-3 ${
              contactChannels.length === 1
                ? 'grid-cols-1'
                : contactChannels.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : contactChannels.length === 3
                    ? 'grid-cols-1 sm:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {contactChannels.map((channel) =>
              channel.isEmail ? (
                <button
                  key={channel.key}
                  type="button"
                  onClick={() => handleCopyEmail(channel.handle)}
                  className="group flex cursor-pointer flex-col justify-between rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 text-left transition-colors hover:border-[var(--accent)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-medium text-[var(--text-muted)]">
                      {channel.label}
                    </span>
                    {emailCopied && (
                      <Check
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: 'var(--accent)' }}
                      />
                    )}
                  </div>
                  <p className="mt-3 truncate text-[14px] font-semibold text-[var(--text-primary)]">
                    {emailCopied ? 'დაკოპირდა' : channel.handle}
                  </p>
                </button>
              ) : (
                <a
                  key={channel.key}
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 transition-colors hover:border-[var(--accent)]"
                >
                  <span className="text-[12px] font-medium text-[var(--text-muted)]">
                    {channel.label}
                  </span>
                  <p className="mt-3 truncate text-[14px] font-semibold text-[var(--text-primary)]">
                    {channel.handle}
                  </p>
                </a>
              ),
            )}
          </div>
        </section>
      </main>

      {/* Discrete Platform Attribution Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-10">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 text-[12px] text-[var(--text-muted)]">
          <span>
            © {new Date().getFullYear()} {creator.fullName}
          </span>

          <Link
            to="/"
            className="font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            შექმნილია რგოლზე
          </Link>
        </div>
      </footer>

      {/* Floating Demo Theme Switcher Pill */}
      <ThemePreviewSwitcher
        theme={theme}
        defaultTheme={defaultTheme}
        suppressEscape={Boolean(activeVideo || activeProject)}
        onChange={setTheme}
      />

      {/* Full-Screen Project & Video Lightbox Modals */}
      <VideoLightboxModal item={activeVideo} onClose={handleCloseVideo} />

      <ProjectCaseModal item={activeProject} onClose={handleCloseProject} />
    </div>
  );
}
