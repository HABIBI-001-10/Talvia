import logoWhite from '../assets/logo-white.png';
import logoBlack from '../assets/logo-black.png';
import logoRaw from '../assets/exact-logo-raw.png';

interface TalviaLogoProps {
  variant?: 'dark' | 'white' | 'raw' | 'auto';
  className?: string;
  showTagline?: boolean;
}

export default function TalviaLogo({
  variant = 'auto',
  className = 'h-9 md:h-10',
  showTagline = false,
}: TalviaLogoProps) {
  if (variant === 'raw') {
    return (
      <div className="flex items-center gap-2 group">
        <img
          src={logoRaw}
          alt="TALVIA Consultancy — Global Education & Overseas Admissions Advisory"
          className={`${className} w-auto object-contain rounded-lg transition-transform duration-200 group-hover:scale-105`}
        />
        {showTagline && (
          <span className="text-[10px] uppercase tracking-[0.22em] font-medium text-slate-400">
            Education Without Borders
          </span>
        )}
      </div>
    );
  }

  const isWhite = variant === 'white';
  const logoSrc = isWhite ? logoWhite : logoBlack;

  return (
    <div className="flex items-center gap-2 select-none group">
      <div className="flex flex-col">
        <div className="flex items-center">
          <img
            src={logoSrc}
            alt="TALVIA Consultancy — Global Education & Overseas Admissions Advisory"
            className={`${className} w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
          />
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
