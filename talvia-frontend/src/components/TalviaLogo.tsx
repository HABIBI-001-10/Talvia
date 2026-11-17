import logoWhiteWebp from '../assets/logo-white.webp';
import logoWhite from '../assets/logo-white.png';
import logoBlackWebp from '../assets/logo-black.webp';
import logoBlack from '../assets/logo-black.png';
import logoRawWebp from '../assets/exact-logo-raw.webp';
import logoRaw from '../assets/exact-logo-raw.png';

interface TalviaLogoProps {
  variant?: 'dark' | 'white' | 'raw' | 'auto';
  className?: string;
  showTagline?: boolean;
  loading?: 'eager' | 'lazy';
}

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
          <source srcSet={logoRawWebp} type="image/webp" />
          <img
            src={logoRaw}
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
  const logoSrcWebp = isWhite ? logoWhiteWebp : logoBlackWebp;
  const logoSrc = isWhite ? logoWhite : logoBlack;

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
            className={`text-[9.5px] uppercase tracking-[0.24em] font-medium mt-0.5 ${isWhite ? 'text-slate-400' : 'text-slate-500'
              }`}
          >
            Global Education • Education Without Borders
          </span>
        )}
      </div>
    </div>
  );
}
