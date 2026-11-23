import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  VIDEO_PLATFORM_LABELS,
  type VideoPortfolioItem,
} from '../types/creator';
import { formatClientLabel } from '../utils/format';

interface VideoLightboxModalProps {
  item: VideoPortfolioItem | null;
  onClose: () => void;
}

export function VideoLightboxModal({ item, onClose }: VideoLightboxModalProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  const platformLabel = VIDEO_PLATFORM_LABELS[item.platform];
  const hasLongDescription = item.description.length > 115;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0E11]/90 p-4 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      {/* Unified Height-Matched Split Container */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-5xl flex-col items-stretch overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xl md:w-auto md:flex-row"
      >
        {/* Left Video Area — Dictates Exact Natural Height on Desktop */}
        <div className="flex min-w-0 shrink-0 items-center justify-center bg-black md:min-h-[320px] md:max-w-[calc(64rem-360px)]">
          <video
            key={item.id}
            src={item.videoUrl}
            poster={item.thumbnailUrl}
            controls
            autoPlay
            playsInline
            className="block max-h-[45vh] w-full object-contain md:max-h-[80vh] md:w-auto md:max-w-full"
          />
        </div>

        {/* Right Info Panel — Stretches to Exact Pixel Height of Video on Desktop */}
        <aside className="flex min-h-0 flex-1 flex-col bg-[var(--bg-surface)] md:relative md:w-[360px] md:flex-none md:shrink-0 md:border-l md:border-[var(--border-subtle)]">
          <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6 md:absolute md:inset-0">
            {/* Pinned Header: Platform Badge + Close Button */}
            <div className="flex shrink-0 items-center justify-between gap-3 pb-4">
              <span className="inline-flex items-center rounded-[var(--radius-tag)] border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1 text-[12px] font-medium text-[var(--text-primary)]">
                {platformLabel}
              </span>

              <button
                type="button"
                onClick={onClose}
                aria-label="დახურვა"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Middle Content: Title, Client, Description, ჩემი როლი */}
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <h2
                id="video-modal-title"
                className="text-[19px] font-bold leading-snug tracking-[-0.02em] text-[var(--text-primary)] sm:text-[21px]"
              >
                {item.title}
              </h2>

              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[var(--text-muted)]">
                <span>{formatClientLabel(item.clientName)}</span>
                {item.year && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{item.year}</span>
                  </>
                )}
              </div>

              <div className="mt-3.5">
                <p
                  className={`text-[14px] leading-[1.65] text-[var(--text-primary)]/85 ${
                    hasLongDescription && !isDescriptionExpanded
                      ? 'line-clamp-3'
                      : ''
                  }`}
                >
                  {item.description}
                </p>

                {hasLongDescription && (
                  <button
                    type="button"
                    onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                    className="mt-1.5 cursor-pointer text-[12px] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    {isDescriptionExpanded ? 'ნაკლების ნახვა' : 'მეტის ნახვა'}
                  </button>
                )}
              </div>

              {/* Dedicated "ჩემი როლი" Block */}
              <div className="mt-4 border-t border-[var(--border-subtle)] pt-4 pb-2">
                <p className="text-[12px] font-semibold tracking-wide text-[var(--text-muted)]">
                  ჩემი როლი
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--text-primary)]">
                  {item.myRole}
                </p>
              </div>
            </div>

            {/* Pinned Bottom External Action CTA */}
            <div className="mt-4 shrink-0 border-t border-[var(--border-subtle)] pt-4">
              <a
                href={item.externalSocialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-[var(--radius-tag)] bg-[var(--accent)] px-5 py-3 text-[13px] font-semibold text-[var(--accent-ink)] transition-opacity duration-200 hover:opacity-90"
              >
                ნახე ორიგინალი ({platformLabel})
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
