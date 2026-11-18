interface TalviaLogoProps {
  variant?: 'dark' | 'white' | 'raw' | 'auto';
  className?: string;
  showTagline?: boolean;
  loading?: 'eager' | 'lazy';
}

const LOGO_PATHS = {
  raw: {
    webp: '/exact-logo-raw.webp',
    png: '/exact-logo-raw.png',
  },
  white: {
    webp: '/logo-white.webp',
    png: '/logo-white.png',
  },
  dark: {
    webp: '/logo-black.webp',
    png: '/logo-black.png',
  },
};

export default function TalviaLogo({
  variant = 'auto',
  className = 'h-9 md:h-10',
  showTagline = false,
  loading = 'eager',
}: TalviaLogoProps) {
  if (variant === 'raw') {
    return (
      <div className="flex items-center gap-2 group">
        <picture>
          <source srcSet={LOGO_PATHS.raw.webp} type="image/webp" />
          <img
            src={LOGO_PATHS.raw.png}
            alt="TALVIA Consultancy — Global Education & Overseas Admissions Advisory"
            className={`${className} w-auto object-contain rounded-lg transition-transform duration-200 group-hover:scale-105`}
            width={260}
            height={85}
            loading={loading}
            decoding="async"
          />
        </picture>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-[0.22em] font-medium text-slate-400">
            Education Without Borders
          </span>
        )}
      </div>
    );
  }

  const isWhite = variant === 'white';
  const logoSrcWebp = isWhite ? LOGO_PATHS.white.webp : LOGO_PATHS.dark.webp;
  const logoSrc = isWhite ? LOGO_PATHS.white.png : LOGO_PATHS.dark.png;

  return (
    <div className="flex items-center gap-2 select-none group">
      <div className="flex flex-col">
        <div className="flex items-center">
          <picture>
            <source srcSet={logoSrcWebp} type="image/webp" />
            <img
              src={logoSrc}
              alt="TALVIA Consultancy — Global Education & Overseas Admissions Advisory"
              className={`${className} w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
              width={260}
              height={85}
              loading={loading}
              decoding="async"
            />
          </picture>
        </div>
        {showTagline && (
          <span
            className={`text-[9.5px] uppercase tracking-[0.24em] font-medium mt-0.5 ${
              isWhite ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Global Education • Education Without Borders
          </span>
        )}
      </div>
    </div>
  );
}
