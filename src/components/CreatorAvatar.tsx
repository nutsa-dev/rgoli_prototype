import { useEffect, useState } from 'react';

function getGeorgianInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '';
  }
  if (parts.length === 1) {
    return Array.from(parts[0]).slice(0, 2).join('');
  }
  const first = Array.from(parts[0])[0] ?? '';
  const last = Array.from(parts[parts.length - 1])[0] ?? '';
  return `${first}${last}`;
}

interface CreatorAvatarProps {
  fullName: string;
  avatarUrl?: string;
  /** 'md' = 56×56 directory card; 'lg' = 80×80 / 96×96 portfolio hero */
  size?: 'md' | 'lg';
  /** When true, adapts monogram palette to the active portfolio CSS variables */
  themed?: boolean;
  priority?: boolean;
}

const SIZE_CLASSES: Record<'md' | 'lg', { box: string; text: string }> = {
  md: {
    box: 'h-14 w-14',
    text: 'text-[16px]',
  },
  lg: {
    box: 'h-20 w-20 sm:h-24 sm:w-24',
    text: 'text-[22px] sm:text-[26px]',
  },
};

export function CreatorAvatar({
  fullName,
  avatarUrl,
  size = 'md',
  themed = false,
  priority = false,
}: CreatorAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [avatarUrl]);

  const trimmedUrl = avatarUrl?.trim() ?? '';
  const showImage = trimmedUrl.length > 0 && !imageFailed;
  const { box, text } = SIZE_CLASSES[size];

  if (showImage) {
    return (
      <img
        src={trimmedUrl}
        alt={fullName}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setImageFailed(true)}
        className={`${box} shrink-0 rounded-full object-cover ring-1 ${
          themed
            ? 'bg-[var(--bg-surface)] ring-[var(--border-subtle)]'
            : 'bg-gray-100 ring-black/[0.06]'
        }`}
      />
    );
  }

  const initials = getGeorgianInitials(fullName);

  return (
    <div
      role="img"
      aria-label={fullName}
      className={`${box} ${text} inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold tracking-wider ${
        themed
          ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
          : 'bg-[#0D0E11] text-white'
      }`}
    >
      {initials}
    </div>
  );
}
