import type { PortfolioThemeConfig } from './theme';

export type CoreCreatorCategory =
  | 'content-creator'
  | 'photographer'
  | 'videographer'
  | 'graphic-designer';

export type CreatorCategory = CoreCreatorCategory | 'other';

export type CategoryFilter = 'all' | CreatorCategory;

export const CORE_CREATOR_CATEGORIES: readonly CoreCreatorCategory[] = [
  'content-creator',
  'photographer',
  'videographer',
  'graphic-designer',
] as const;

export const CREATOR_CATEGORIES: readonly CreatorCategory[] = [
  'content-creator',
  'photographer',
  'videographer',
  'graphic-designer',
  'other',
] as const;

const CREATOR_CATEGORY_LABELS: Record<CreatorCategory, string> = {
  'content-creator': 'კონტენტ კრეატორი',
  photographer: 'ფოტოგრაფი',
  videographer: 'ვიდეოგრაფი',
  'graphic-designer': 'გრაფიკული დიზაინერი',
  other: 'სხვა',
};

export const CATEGORY_FILTER_LABELS: Record<CategoryFilter, string> = {
  all: 'ყველა',
  'content-creator': 'კონტენტ კრეატორი',
  photographer: 'ფოტოგრაფი',
  videographer: 'ვიდეოგრაფი',
  'graphic-designer': 'გრაფიკული დიზაინერი',
  other: 'სხვა',
};

type VideoPlatform = 'tiktok' | 'instagram' | 'youtube';

export const VIDEO_PLATFORM_LABELS: Record<VideoPlatform, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
};

type VideoAspectRatio = '9:16' | '16:9' | '4:5' | '1:1';

interface CreatorContacts {
  /** Full profile URL, e.g. https://instagram.com/username */
  instagram?: string;
  /** Full profile URL, e.g. https://tiktok.com/@username */
  tiktok?: string;
  /** WhatsApp deep link, e.g. https://wa.me/995599000000 */
  whatsapp?: string;
  /** Plain email address, e.g. info@rgoli.ge */
  email?: string;
  /** Optional Behance profile URL */
  behance?: string;
  /** Optional LinkedIn profile URL */
  linkedin?: string;
}

interface PortfolioItemBase {
  id: string;
  title: string;
  /** Client attribution in Georgian, e.g. "ბრენდისთვის: სტამბა" */
  clientName: string;
  description: string;
  /** Creator's specific deliverables / contribution on this work */
  myRole: string;
  /** Optional production year for subtle metadata display */
  year?: number;
}

export interface VideoPortfolioItem extends PortfolioItemBase {
  type: 'video';
  /** Direct MP4 file or preview URL for inline playback */
  videoUrl: string;
  /** Poster / thumbnail image displayed prior to playback */
  thumbnailUrl: string;
  /** Link to the original published post on TikTok, Instagram, or YouTube */
  externalSocialUrl: string;
  platform: VideoPlatform;
  /** Optional aspect ratio hint so vertical Reels/TikTok and horizontal films frame cleanly */
  aspectRatio?: VideoAspectRatio;
}

export interface ProjectPortfolioItem extends PortfolioItemBase {
  type: 'project';
  /** Primary hero image shown in the portfolio grid */
  coverImageUrl: string;
  /** Ordered gallery images (1 to many) rendered in the full project view */
  galleryImages: string[];
}

export type PortfolioItem = VideoPortfolioItem | ProjectPortfolioItem;

export interface CreatorProfile {
  id: string;
  /** URL-safe unique handle used for rgoli.ge/[slug] */
  slug: string;
  fullName: string;
  /** Optional portrait or brand mark URL; falls back to Georgian initials monogram when empty */
  avatarUrl?: string;
  /** Featured work preview displayed on the directory card */
  coverWorkUrl: string;
  role: CreatorCategory;
  /** Optional specific profession label for 'other' or custom roles (e.g. "UI/UX დიზაინერი", "3D არტისტი") */
  customRoleLabel?: string;
  /** Concise minimalist Georgian bio */
  bio: string;
  skills: string[];
  contacts: CreatorContacts;
  portfolioItems: PortfolioItem[];
  /** Optional city/location in Georgia, e.g. "თბილისი" */
  location?: string;
  /** Optional saved micro-site theme preset (Supabase-ready for future creator customization) */
  defaultTheme?: PortfolioThemeConfig;
}

export function getCreatorRoleLabel(
  creator: Pick<CreatorProfile, 'role' | 'customRoleLabel'>,
): string {
  const custom = creator.customRoleLabel?.trim();
  if (custom) {
    return custom;
  }
  return CREATOR_CATEGORY_LABELS[creator.role];
}

export function isVideoPortfolioItem(
  item: PortfolioItem,
): item is VideoPortfolioItem {
  return item.type === 'video';
}

export function isProjectPortfolioItem(
  item: PortfolioItem,
): item is ProjectPortfolioItem {
  return item.type === 'project';
}

