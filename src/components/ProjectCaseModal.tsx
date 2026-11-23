import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { ProjectPortfolioItem } from '../types/creator';
import { formatClientLabel } from '../utils/format';

interface ProjectCaseModalProps {
  item: ProjectPortfolioItem | null;
  onClose: () => void;
}

export function ProjectCaseModal({ item, onClose }: ProjectCaseModalProps) {
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

  const images =
    item.galleryImages.length > 0 ? item.galleryImages : [item.coverImageUrl];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0D0E11]/80 p-3 backdrop-blur-md sm:p-6 md:p-10"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="mx-auto w-full max-w-4xl overflow-clip rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xl"
      >
        {/* Sticky Minimal Header Control Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--bg-surface)_95%,transparent)] px-6 py-4 backdrop-blur-md sm:px-8">
          <div className="flex min-w-0 items-center gap-2.5 text-[13px] text-[var(--text-muted)]">
            {item.year && <span className="shrink-0">{item.year}</span>}
            {item.year && images.length > 1 && <span aria-hidden="true">·</span>}
            {images.length > 1 && (
              <span className="shrink-0 tabular-nums">
                {images.length} ფოტო
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="დახურვა"
            className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors hover:border-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Behance-Style Case Study Header */}
        <header className="px-6 pt-7 pb-7 sm:px-8 sm:pt-9 sm:pb-8">
          <h2
            id="project-modal-title"
            className="text-[24px] font-bold leading-tight tracking-[-0.025em] text-[var(--text-primary)] sm:text-[32px]"
          >
            {item.title}
          </h2>

          <p className="mt-1.5 text-[14px] font-medium text-[var(--text-muted)]">
            {formatClientLabel(item.clientName)}
          </p>

          <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-[var(--text-primary)]/85">
            {item.description}
          </p>

          {/* Dedicated "ჩემი როლი" Section */}
          <div className="mt-4 max-w-2xl border-t border-[var(--border-subtle)] pt-4">
            <p className="text-[12px] font-semibold tracking-wide text-[var(--text-muted)]">
              ჩემი როლი
            </p>
            <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--text-primary)]">
              {item.myRole}
            </p>
          </div>
        </header>

        {/* Continuous Vertical Image Stack */}
        <div className="flex w-full flex-col gap-4 px-4 pb-6 sm:px-8 sm:pb-10">
          {images.map((imageUrl, index) => (
            <img
              key={`${item.id}-img-${index}`}
              src={imageUrl}
              alt={`${item.title} — კადრი ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full rounded-[var(--radius-card)] bg-[var(--bg-primary)] object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
