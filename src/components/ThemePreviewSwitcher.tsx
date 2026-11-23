import {
  Check,
  ChevronDown,
  Columns2,
  LayoutGrid,
  RotateCcw,
  Rows2,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_PORTFOLIO_THEME,
  FONT_PRESETS,
  LAYOUT_PRESETS,
  PALETTE_PRESETS,
  RADIUS_VISUAL_PRESETS,
  clampRadiusPx,
  getEffectiveThemeColors,
  isThemeDark,
  loadGoogleFont,
  normalizeHex,
  resolveFontStack,
  type PortfolioThemeConfig,
} from '../types/theme';

interface CompactColorInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

function CompactColorInput({
  id,
  label,
  value,
  onChange,
}: CompactColorInputProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleTextChange = (raw: string) => {
    if (raw.trim() === '') {
      setDraft('');
      return;
    }
    const formatted = raw.startsWith('#') ? raw : `#${raw}`;
    setDraft(formatted.toUpperCase());
    const valid = normalizeHex(formatted);
    if (valid) {
      onChange(valid);
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block truncate text-[10px] font-medium text-[#6B7280]"
      >
        {label}
      </label>
      <div className="mt-1 flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F8F9FA] px-1.5 py-1 focus-within:border-[#0D0E11] focus-within:bg-white">
        <input
          type="color"
          aria-label={`${label} — პალიტრა`}
          value={value}
          onChange={(event) => handleTextChange(event.target.value)}
          className="h-4 w-4 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0"
        />
        <input
          id={id}
          type="text"
          maxLength={7}
          spellCheck={false}
          value={draft}
          onChange={(event) => handleTextChange(event.target.value)}
          onBlur={() => setDraft(value)}
          className="w-full min-w-0 bg-transparent font-mono text-[10px] font-medium uppercase text-[#0D0E11] focus:outline-none"
        />
      </div>
    </div>
  );
}

interface ThemePreviewSwitcherProps {
  theme: PortfolioThemeConfig;
  defaultTheme?: PortfolioThemeConfig;
  suppressEscape?: boolean;
  onChange: (next: PortfolioThemeConfig) => void;
}

export function ThemePreviewSwitcher({
  theme,
  defaultTheme = DEFAULT_PORTFOLIO_THEME,
  suppressEscape = false,
  onChange,
}: ThemePreviewSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [fontQuery, setFontQuery] = useState('');
  const [radiusDraft, setRadiusDraft] = useState(String(theme.radiusPx));
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setRadiusDraft(String(theme.radiusPx));
  }, [theme.radiusPx]);

  useEffect(() => {
    if (!isOpen) {
      setIsFontDropdownOpen(false);
      return;
    }
    if (suppressEscape) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isFontDropdownOpen) {
          setIsFontDropdownOpen(false);
        } else {
          setIsOpen(false);
        }
      }
    };
    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFontDropdownOpen(false);
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen, isFontDropdownOpen, suppressEscape]);

  const effective = getEffectiveThemeColors(theme);
  const isDark = isThemeDark(theme);

  const filteredFonts = useMemo(() => {
    const query = fontQuery.trim().toLowerCase();
    if (!query) {
      return FONT_PRESETS;
    }
    return FONT_PRESETS.filter(
      (preset) =>
        preset.name.toLowerCase().includes(query) ||
        preset.styleLabel.toLowerCase().includes(query),
    );
  }, [fontQuery]);

  const applyFont = (rawFontName: string) => {
    const cleaned = rawFontName.trim();
    if (!cleaned) {
      return;
    }
    loadGoogleFont(cleaned);
    onChange({ ...theme, font: cleaned });
    setFontQuery('');
    setIsFontDropdownOpen(false);
  };

  const handleCustomFontSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyFont(fontQuery);
  };

  const handleRadiusNumberChange = (raw: string) => {
    setRadiusDraft(raw);
    if (raw.trim() === '') {
      return;
    }
    const parsed = Number(raw);
    if (!Number.isNaN(parsed)) {
      onChange({ ...theme, radiusPx: clampRadiusPx(parsed) });
    }
  };

  const handleRadiusBlur = () => {
    const parsed = Number(radiusDraft);
    const next = Number.isNaN(parsed)
      ? theme.radiusPx
      : clampRadiusPx(parsed);
    setRadiusDraft(String(next));
    if (next !== theme.radiusPx) {
      onChange({ ...theme, radiusPx: next });
    }
  };

  const defaultEffective = getEffectiveThemeColors(defaultTheme);
  const isModified =
    effective.bg !== defaultEffective.bg ||
    effective.text !== defaultEffective.text ||
    effective.accent !== defaultEffective.accent ||
    theme.font !== defaultTheme.font ||
    theme.radiusPx !== defaultTheme.radiusPx ||
    theme.layout !== defaultTheme.layout;

  return (
    <div
      ref={containerRef}
      className="fixed right-5 bottom-5 z-40 flex flex-col items-end"
      style={{
        fontFamily: '"Noto Sans Georgian", "Inter", sans-serif',
        letterSpacing: '-0.01em',
      }}
    >
      {/* Expanded Controls Popover — Compact, No Awkward Scrollbar on Desktop */}
      {isOpen && (
        <div
          role="region"
          aria-label="თემის პრევიუს პარამეტრები"
          className="mb-2.5 w-[min(336px,calc(100vw-2.5rem))] max-h-[86vh] space-y-3.5 overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white/95 p-4 text-[#0D0E11] shadow-2xl backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2.5">
            <span className="text-[12px] font-semibold text-[#0D0E11]">
              თემის პრევიუ
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="პანელის დახურვა"
              className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-[#F8F9FA] hover:text-[#0D0E11]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 1. Curated 4 Multi-Color Palette Presets + 3 Compact Individual HEX Inputs */}
          <div className="space-y-2.5">
            <p className="text-[11px] font-medium text-[#6B7280]">პალიტრა</p>

            <div className="grid grid-cols-2 gap-1.5">
              {PALETTE_PRESETS.map((preset) => {
                const active =
                  effective.bg === preset.bgColor &&
                  effective.text === preset.textColor &&
                  effective.accent === preset.accentColor;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      onChange({
                        ...theme,
                        bgColor: preset.bgColor,
                        textColor: preset.textColor,
                        accentColor: preset.accentColor,
                      })
                    }
                    className={`flex cursor-pointer items-center justify-between gap-1.5 rounded-xl border px-2.5 py-2 text-left text-[11px] font-medium transition-colors ${
                      active
                        ? 'border-[#0D0E11] bg-[#F8F9FA] text-[#0D0E11]'
                        : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#0D0E11]/35 hover:text-[#0D0E11]'
                    }`}
                  >
                    <span className="truncate">{preset.label}</span>
                    <span className="inline-flex shrink-0 items-center -space-x-1">
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-black/15"
                        style={{ backgroundColor: preset.bgColor }}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-black/15"
                        style={{ backgroundColor: preset.textColor }}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
                        style={{ backgroundColor: preset.accentColor }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <CompactColorInput
                id="theme-bg-hex"
                label="ფონის ფერი"
                value={effective.bg}
                onChange={(hex) =>
                  onChange({
                    ...theme,
                    bgColor: hex,
                    textColor: undefined,
                  })
                }
              />
              <CompactColorInput
                id="theme-text-hex"
                label="ტექსტის ფერი"
                value={effective.text}
                onChange={(hex) =>
                  onChange({
                    ...theme,
                    textColor: hex,
                  })
                }
              />
              <CompactColorInput
                id="theme-accent-hex"
                label="აქცენტის ფერი"
                value={effective.accent}
                onChange={(hex) =>
                  onChange({
                    ...theme,
                    accentColor: hex,
                  })
                }
              />
            </div>
          </div>

          {/* 2. Distinct Georgian Font Picker Dropdown + Custom Google Font Input */}
          <div className="border-t border-[#E5E7EB] pt-3">
            <p className="text-[11px] font-medium text-[#6B7280]">ფონტი</p>

            <button
              type="button"
              aria-expanded={isFontDropdownOpen}
              onClick={() => setIsFontDropdownOpen((prev) => !prev)}
              className="mt-1.5 flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] px-3 py-2 text-left transition-colors hover:border-[#0D0E11]/40 hover:bg-white"
            >
              <span
                className="truncate text-[13px] font-medium text-[#0D0E11]"
                style={{ fontFamily: resolveFontStack(theme.font) }}
              >
                {theme.font}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[#6B7280] transition-transform duration-200 ${
                  isFontDropdownOpen ? 'rotate-180 text-[#0D0E11]' : ''
                }`}
              />
            </button>

            {isFontDropdownOpen && (
              <div className="mt-2 rounded-xl border border-[#E5E7EB] bg-white p-2 shadow-lg">
                <form
                  onSubmit={handleCustomFontSubmit}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="text"
                    value={fontQuery}
                    onChange={(event) => setFontQuery(event.target.value)}
                    placeholder="ფონტის სახელი, მაგ: Syne..."
                    autoFocus
                    className="min-w-0 flex-1 rounded-lg border border-[#E5E7EB] bg-[#F8F9FA] px-2.5 py-1.5 text-[11px] text-[#0D0E11] placeholder:text-[#6B7280]/75 focus:border-[#0D0E11] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!fontQuery.trim()}
                    className="shrink-0 cursor-pointer rounded-lg bg-[#0D0E11] px-2.5 py-1.5 text-[11px] font-medium text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    გამოყენება
                  </button>
                </form>

                <div className="mt-2 max-h-[212px] space-y-1 overflow-y-auto">
                  {filteredFonts.map((preset) => {
                    const active =
                      theme.font.toLowerCase() === preset.name.toLowerCase();
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        aria-pressed={active}
                        onClick={() => applyFont(preset.name)}
                        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition-colors ${
                          active
                            ? 'bg-[#F8F9FA] text-[#0D0E11]'
                            : 'text-[#0D0E11]/85 hover:bg-[#F8F9FA]'
                        }`}
                      >
                        <span className="min-w-0">
                          <span
                            className="block truncate text-[12px] font-semibold text-[#0D0E11]"
                            style={{
                              fontFamily: preset.stack,
                              letterSpacing: preset.letterSpacing,
                            }}
                          >
                            Aa ბგ — {preset.name}
                          </span>
                          <span className="mt-0.5 block truncate text-[10px] text-[#6B7280]">
                            {preset.styleLabel}
                          </span>
                        </span>

                        {active && (
                          <Check
                            className="h-3.5 w-3.5 shrink-0"
                            style={{ color: effective.accent }}
                          />
                        )}
                      </button>
                    );
                  })}

                  {filteredFonts.length === 0 && fontQuery.trim() && (
                    <p className="px-2 py-2 text-[11px] leading-relaxed text-[#6B7280]">
                      დააჭირე <strong className="text-[#0D0E11]">Enter</strong>-ს
                      ან „გამოყენება“-ს Google Font-ის ჩასატვირთად.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 3. Visual Corner Radius Control */}
          <div className="border-t border-[#E5E7EB] pt-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-[#6B7280]">
                კუთხეების ფორმა
              </p>
              <span className="font-mono text-[11px] font-medium tabular-nums text-[#6B7280]">
                {theme.radiusPx}px
              </span>
            </div>

            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              {RADIUS_VISUAL_PRESETS.map((preset) => {
                const active = theme.radiusPx === preset.px;
                return (
                  <button
                    key={preset.px}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onChange({ ...theme, radiusPx: preset.px })}
                    className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border px-2 py-1.5 transition-colors ${
                      active
                        ? 'border-[#0D0E11] bg-[#0D0E11] text-white'
                        : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#0D0E11]/35 hover:text-[#0D0E11]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-[20px] w-[20px] border-2 ${preset.previewClass} ${
                        active ? 'border-white' : 'border-[#0D0E11]/60'
                      }`}
                    />
                    <span className="text-[10px] font-medium leading-none">
                      {preset.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="range"
                aria-label="კუთხის რადიუსი პიქსელებში"
                min={0}
                max={48}
                step={1}
                value={theme.radiusPx}
                onChange={(event) =>
                  onChange({
                    ...theme,
                    radiusPx: clampRadiusPx(Number(event.target.value)),
                  })
                }
                style={{ accentColor: effective.accent }}
                className="h-1.5 flex-1 cursor-pointer rounded-full bg-[#E5E7EB]"
              />

              <div className="flex w-[64px] shrink-0 items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F8F9FA] px-2 py-1 focus-within:border-[#0D0E11] focus-within:bg-white">
                <input
                  type="number"
                  aria-label="კუთხის რადიუსის მნიშვნელობა"
                  min={0}
                  max={48}
                  value={radiusDraft}
                  onChange={(event) =>
                    handleRadiusNumberChange(event.target.value)
                  }
                  onBlur={handleRadiusBlur}
                  className="w-full min-w-0 bg-transparent text-right font-mono text-[11px] font-semibold tabular-nums text-[#0D0E11] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="ml-0.5 font-mono text-[10px] text-[#6B7280]">
                  px
                </span>
              </div>
            </div>
          </div>

          {/* 4. Works Grid Layout (3 · 2 · 1 Columns) */}
          <div className="border-t border-[#E5E7EB] pt-3">
            <p className="text-[11px] font-medium text-[#6B7280]">განლაგება</p>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              {LAYOUT_PRESETS.map((preset) => {
                const active = theme.layout === preset.id;
                const Icon =
                  preset.id === 'grid-3'
                    ? LayoutGrid
                    : preset.id === 'grid-2'
                      ? Columns2
                      : Rows2;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onChange({ ...theme, layout: preset.id })}
                    className={`inline-flex cursor-pointer items-center justify-center gap-1 rounded-lg border py-1.5 text-[11px] font-medium transition-colors ${
                      active
                        ? 'border-[#0D0E11] bg-[#0D0E11] text-white'
                        : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#0D0E11]/30 hover:text-[#0D0E11]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. One-Click Reset to Creator Default Palette */}
          <div className="border-t border-[#E5E7EB] pt-3">
            <button
              type="button"
              disabled={!isModified}
              onClick={() => onChange(defaultTheme)}
              className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] py-2 text-[12px] font-medium text-[#0D0E11] transition-colors hover:border-[#0D0E11] hover:bg-white disabled:cursor-default disabled:opacity-45 disabled:hover:border-[#E5E7EB] disabled:hover:bg-[#F8F9FA]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>საწყისზე დაბრუნება</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Pill */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-medium shadow-xl transition-all duration-200 hover:scale-[1.02] ${
          isDark
            ? 'bg-[#F3F4F6] text-[#0B0C0E] ring-1 ring-white/20'
            : 'bg-[#0D0E11] text-white ring-1 ring-black/10'
        }`}
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        <span>თემის პრევიუ</span>
      </button>
    </div>
  );
}
