import { Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCreatorRoleLabel,
  isVideoPortfolioItem,
  type CreatorProfile,
} from '../types/creator';
import { CreatorAvatar } from './CreatorAvatar';

interface CreatorCardProps {
  creator: CreatorProfile;
  priority?: boolean;
}

export function CreatorCard({ creator, priority = false }: CreatorCardProps) {
  const firstItem = creator.portfolioItems[0];
  const isVideoShowcase =
    creator.role === 'videographer' ||
    creator.role === 'content-creator' ||
    (creator.role === 'other' &&
      firstItem !== undefined &&
      isVideoPortfolioItem(firstItem));
  const featuredVideo = isVideoShowcase
    ? creator.portfolioItems.find(isVideoPortfolioItem)
    : undefined;
  const topSkills = creator.skills.slice(0, 2);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleMouseEnter = () => {
    if (!featuredVideo) {
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
    if (!featuredVideo) {
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

  return (
    <Link
      to={`/${creator.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-[#E5E7EB]/80 bg-white p-4 transition-all duration-300 hover:border-[#0D0E11]/25 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D0E11] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F9FA]"
    >
      {/* Top Identity Header */}
      <div className="flex items-start gap-3.5">
        <CreatorAvatar
          fullName={creator.fullName}
          avatarUrl={creator.avatarUrl}
          size="md"
          priority={priority}
        />

        <div className="min-w-0 flex-1">
          <h2 className="text-[16px] font-semibold leading-snug text-[#0D0E11] transition-colors duration-200 group-hover:text-[#0D0E11]/80">
            {creator.fullName}
          </h2>
          <p className="mt-0.5 text-[13px] leading-snug text-[#6B7280]">
            {getCreatorRoleLabel(creator)}
          </p>

          {topSkills.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {topSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block rounded-md bg-[#F8F9FA] px-2 py-0.5 text-[11px] font-medium text-[#4B5563]"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Featured Work Showcase */}
      <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 ring-1 ring-inset ring-black/[0.04]">
        <img
          src={creator.coverWorkUrl}
          alt={`${creator.fullName} — პორტფოლიოს ნამუშევარი`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]"
        />

        {featuredVideo && (
          <>
            <video
              ref={videoRef}
              src={featuredVideo.videoUrl}
              poster={creator.coverWorkUrl}
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
              aria-label="ვიდეო პორტფოლიო"
              className={`pointer-events-none absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-black/35 p-2 text-white ring-1 ring-white/15 backdrop-blur-md transition-opacity duration-300 ${
                isHovering && isVideoReady ? 'opacity-75' : 'opacity-100'
              }`}
            >
              <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
            </span>
          </>
        )}
      </div>
    </Link>
  );
}
