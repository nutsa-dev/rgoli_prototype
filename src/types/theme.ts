import type { CSSProperties } from 'react';

export type ThemeLayoutPreset = 'grid-3' | 'grid-2' | 'editorial-1';

export interface PortfolioThemeConfig {
  /** Primary canvas background HEX, e.g. #F8F9FA */
  bgColor: string;
  /** Optional manual primary ink HEX override; auto-computed from bgColor luminance when unset */
  textColor?: string;
  /** Primary interactive & editorial accent HEX, e.g. #00E054 */
  accentColor: string;
  /** Active font display name (curated preset or any Google Font family name) */
  font: string;
  /** Corner radius in pixels (0–48) driving cards and proportional button/pill radii */
  radiusPx: number;
  layout: ThemeLayoutPreset;
}

export const DEFAULT_PORTFOLIO_THEME: PortfolioThemeConfig = {
  bgColor: '#F8F9FA',
  textColor: '#0D0E11',
  accentColor: '#00E054',
  font: 'Noto Sans Georgian',
  radiusPx: 12,
  layout: 'grid-3',
};

interface PaletteComboPreset {
  id: string;
  label: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}

export const PALETTE_PRESETS: readonly PaletteComboPreset[] = [
  {
    id: 'rgoli-default',
    label: 'რგოლი Default',
    bgColor: '#F8F9FA',
    textColor: '#0D0E11',
    accentColor: '#00E054',
  },
  {
    id: 'obsidian-dark',
    label: 'Obsidian Dark',
    bgColor: '#0B0C0E',
    textColor: '#F3F4F6',
    accentColor: '#00E054',
  },
  {
    id: 'swiss-red',
    label: 'Swiss Red',
    bgColor: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#FF2A00',
  },
  {
    id: 'arctic-navy',
    label: 'Arctic Navy',
    bgColor: '#071324',
    textColor: '#F0F7FF',
    accentColor: '#00E5FF',
  },
] as const;

interface FontPresetMeta {
  name: string;
  styleLabel: string;
  stack: string;
  letterSpacing?: string;
}

export const FONT_PRESETS: readonly FontPresetMeta[] = [
  {
    name: 'Noto Sans Georgian',
    styleLabel: 'თანამედროვე სანს-სერიფი',
    stack:
      '"Noto Sans Georgian", "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
    letterSpacing: '-0.01em',
  },
  {
    name: 'Noto Serif Georgian',
    styleLabel: 'სარედაქციო სერიფი',
    stack: '"Noto Serif Georgian", Georgia, Cambria, "Times New Roman", serif',
    letterSpacing: '-0.005em',
  },
  {
    name: 'FiraGO',
    styleLabel: 'ტექნოლოგიური გროტესკი',
    stack: '"FiraGO", "Noto Sans Georgian", ui-sans-serif, system-ui, sans-serif',
    letterSpacing: '-0.01em',
  },
  {
    name: 'JetBrains Mono',
    styleLabel: 'მონოსპეის / კოდის სტილი',
    stack:
      '"JetBrains Mono", "Noto Sans Georgian", ui-monospace, SFMono-Regular, monospace',
    letterSpacing: '0.02em',
  },
  {
    name: 'BPG Nino Mtavruli',
    styleLabel: 'მთავრული დისპლეი',
    stack:
      '"BPG Nino Mtavruli", "Noto Sans Georgian", ui-sans-serif, system-ui, sans-serif',
    letterSpacing: '0.015em',
  },
  {
    name: 'ALK Life',
    styleLabel: 'ლიტერატურული / არტ',
    stack: '"ALK Life", "Noto Serif Georgian", Georgia, serif',
    letterSpacing: '0em',
  },
  {
    name: 'Montserrat',
    styleLabel: 'გეომეტრიული დისპლეი',
    stack:
      '"Montserrat", "Noto Sans Georgian", ui-sans-serif, system-ui, sans-serif',
    letterSpacing: '-0.01em',
  },
  {
    name: 'Playfair Display',
    styleLabel: 'ჟურნალის ედითორიალი',
    stack: '"Playfair Display", "Noto Serif Georgian", Georgia, serif',
    letterSpacing: '0em',
  },
] as const;

interface RadiusVisualPreset {
  px: number;
  label: string;
  previewClass: string;
}

export const RADIUS_VISUAL_PRESETS: readonly RadiusVisualPreset[] = [
  { px: 0, label: 'მკვეთრი', previewClass: 'rounded-none' },
  { px: 12, label: 'საშუალო', previewClass: 'rounded-[5px]' },
  { px: 24, label: 'რბილი', previewClass: 'rounded-[8px]' },
] as const;

interface LayoutPresetMeta {
  id: ThemeLayoutPreset;
  label: string;
}

export const LAYOUT_PRESETS: readonly LayoutPresetMeta[] = [
  { id: 'grid-3', label: '3 სვეტი' },
  { id: 'grid-2', label: '2 სვეტი' },
  { id: 'editorial-1', label: '1 სვეტი' },
] as const;

export function clampRadiusPx(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_PORTFOLIO_THEME.radiusPx;
  }
  return Math.max(0, Math.min(48, Math.round(value)));
}

function resolveFontMeta(fontName: string): {
  stack: string;
  letterSpacing: string;
} {
  const trimmed = fontName.trim();
  const matched = FONT_PRESETS.find(
    (preset) => preset.name.toLowerCase() === trimmed.toLowerCase(),
  );
  if (matched) {
    return {
      stack: matched.stack,
      letterSpacing: matched.letterSpacing ?? '-0.01em',
    };
  }
  if (!trimmed) {
    return {
      stack: FONT_PRESETS[0].stack,
      letterSpacing: FONT_PRESETS[0].letterSpacing ?? '-0.01em',
    };
  }
  const safeName = trimmed.replace(/["\\]/g, '');
  return {
    stack: `"${safeName}", "Noto Sans Georgian", ui-sans-serif, system-ui, sans-serif`,
    letterSpacing: '-0.01em',
  };
}

export function resolveFontStack(fontName: string): string {
  return resolveFontMeta(fontName).stack;
}

/**
 * Dynamically injects a Google Fonts stylesheet into `document.head` for any
 * custom font name not already bundled in `index.html`. Deduplicated by font key.
 */
export function loadGoogleFont(fontName: string): void {
  if (typeof document === 'undefined') {
    return;
  }
  const trimmed = fontName.trim();
  if (!trimmed) {
    return;
  }

  const isBundled = FONT_PRESETS.some(
    (preset) => preset.name.toLowerCase() === trimmed.toLowerCase(),
  );
  if (isBundled) {
    return;
  }

  const key = trimmed.toLowerCase();
  if (
    document.head.querySelector(`link[data-rgoli-font="${CSS.escape(key)}"]`)
  ) {
    return;
  }

  const encodedFamily = encodeURIComponent(trimmed).replace(/%20/g, '+');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.dataset.rgoliFont = key;
  link.href = `https://fonts.googleapis.com/css2?family=${encodedFamily}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

/**
 * Validates and normalizes a `#RGB` or `#RRGGBB` input into uppercase `#RRGGBB`.
 */
export function normalizeHex(raw: string): string | null {
  const trimmed = raw.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [r, g, b] = trimmed.split('');
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(trimmed)) {
    return `#${trimmed}`.toUpperCase();
  }
  return null;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const int = parseInt(clean, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toByte = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)))
      .toString(16)
      .padStart(2, '0');
  return `#${toByte(r)}${toByte(g)}${toByte(b)}`.toUpperCase();
}

function mixHex(hexA: string, hexB: string, ratioB: number): string {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  const w = Math.max(0, Math.min(1, ratioB));
  return rgbToHex(
    r1 + (r2 - r1) * w,
    g1 + (g2 - g1) * w,
    b1 + (b2 - b1) * w,
  );
}

/**
 * WCAG 2.1 relative luminance (0 = black, 1 = white).
 */
function getRelativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const srgb = channel / 255;
    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isDarkHex(hex: string): boolean {
  return getRelativeLuminance(hex) < 0.36;
}

function getAutoTextColor(bgHex: string): string {
  const matchedPreset = PALETTE_PRESETS.find((p) => p.bgColor === bgHex);
  if (matchedPreset) {
    return matchedPreset.textColor;
  }
  return isDarkHex(bgHex) ? '#F3F4F6' : '#0D0E11';
}

export function getEffectiveThemeColors(theme: PortfolioThemeConfig): {
  bg: string;
  text: string;
  accent: string;
} {
  const bg = normalizeHex(theme.bgColor) ?? '#F8F9FA';
  const text = normalizeHex(theme.textColor ?? '') ?? getAutoTextColor(bg);
  const accent = normalizeHex(theme.accentColor) ?? '#00E054';
  return { bg, text, accent };
}

export function isThemeDark(theme: PortfolioThemeConfig): boolean {
  const { bg } = getEffectiveThemeColors(theme);
  return isDarkHex(bg);
}

export function buildThemeStyle(theme: PortfolioThemeConfig): CSSProperties {
  const { bg, text, accent } = getEffectiveThemeColors(theme);
  const darkBg = isDarkHex(bg);

  const fontMeta = resolveFontMeta(theme.font);
  const radius = clampRadiusPx(theme.radiusPx);
  const tagRadius =
    radius === 0 ? 0 : Math.min(24, Math.max(4, Math.round(radius * 0.65)));

  const textMuted = mixHex(bg, text, 0.58);
  const bgSurface = darkBg
    ? mixHex(bg, '#FFFFFF', 0.055)
    : bg === '#F8F9FA'
      ? '#FFFFFF'
      : mixHex(bg, '#FFFFFF', 0.6);
  const borderSubtle = darkBg
    ? mixHex(bg, '#FFFFFF', 0.14)
    : mixHex(bg, text, 0.12);
  const accentInk = isDarkHex(accent) ? '#FFFFFF' : '#0D0E11';

  return {
    '--bg-primary': bg,
    '--bg-surface': bgSurface,
    '--text-primary': text,
    '--text-muted': textMuted,
    '--border-subtle': borderSubtle,
    '--accent': accent,
    '--accent-ink': accentInk,
    '--font-family': fontMeta.stack,
    '--font-tracking': fontMeta.letterSpacing,
    '--radius-card': `${radius}px`,
    '--radius-tag': `${tagRadius}px`,
  } as CSSProperties;
}
