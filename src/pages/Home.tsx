import { useMemo, useState } from 'react';
import { CreatorCard } from '../components/CreatorCard';
import { getCreatorsByCategory } from '../data/mockCreators';
import {
  CATEGORY_FILTER_LABELS,
  CREATOR_CATEGORIES,
  type CategoryFilter,
  type CreatorProfile,
} from '../types/creator';

const FILTER_OPTIONS: readonly CategoryFilter[] = ['all', ...CREATOR_CATEGORIES];

interface HomeProps {
  creators: readonly CreatorProfile[];
}

export function Home({ creators }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const visibleCreators = useMemo(
    () => getCreatorsByCategory(activeCategory, creators),
    [activeCategory, creators],
  );

  return (
    <main className="mx-auto max-w-[1360px] px-4 pt-8 pb-4 sm:px-6">
      {/* Minimalist Borderless Category Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <nav
          aria-label="კატეგორიების ფილტრი"
          className="-mx-4 flex flex-1 items-center gap-1.5 overflow-x-auto px-4 py-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {FILTER_OPTIONS.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={`inline-flex shrink-0 cursor-pointer items-center rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D0E11] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F9FA] ${
                  isActive
                    ? 'bg-[#0D0E11] text-white'
                    : 'bg-transparent text-[#6B7280] hover:text-[#0D0E11]'
                }`}
              >
                {CATEGORY_FILTER_LABELS[category]}
              </button>
            );
          })}
        </nav>

        <span className="hidden shrink-0 text-[13px] tabular-nums text-[#6B7280] md:inline-block">
          {visibleCreators.length} კრეატორი
        </span>
      </div>

      {/* Identity-First Creator Showcase Grid */}
      <section
        aria-label="კრეატორების დირექტორია"
        className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visibleCreators.map((creator, index) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            priority={index < 3}
          />
        ))}
      </section>
    </main>
  );
}
