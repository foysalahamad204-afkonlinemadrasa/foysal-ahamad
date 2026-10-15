import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: 'dark' | 'light';
  variant?: 'full' | 'icon' | 'badge';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  textColor = 'dark',
  variant = 'full',
}) => {
  const iconDimensions = {
    sm: { box: 36, stroke: 1.5 },
    md: { box: 48, stroke: 1.8 },
    lg: { box: 64, stroke: 2 },
    xl: { box: 92, stroke: 2.2 },
  }[size];

  const textSizeClasses = {
    sm: { title: 'text-sm font-bold', sub: 'text-[10px] tracking-wider' },
    md: { title: 'text-base sm:text-lg font-bold', sub: 'text-[11px] sm:text-xs tracking-wider' },
    lg: { title: 'text-xl sm:text-2xl font-extrabold', sub: 'text-xs sm:text-sm tracking-wider' },
    xl: { title: 'text-2xl sm:text-3xl font-extrabold', sub: 'text-sm sm:text-base tracking-widest' },
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Islamic Emblem Icon */}
      <div 
        className="relative flex items-center justify-center shrink-0 rounded-2xl p-1.5 transition-transform hover:scale-105"
        style={{
          width: iconDimensions.box,
          height: iconDimensions.box,
          background: 'radial-gradient(circle at 30% 30%, #065F46 0%, #064E3B 55%, #022C22 100%)',
          boxShadow: '0 4px 14px 0 rgba(6, 78, 59, 0.35), inset 0 1px 1px 0 rgba(255, 215, 0, 0.4)',
          border: '1.5px solid #D97706'
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Octagram background pattern */}
          <polygon
            points="50,6 63,19 81,19 81,37 94,50 81,63 81,81 63,81 50,94 37,81 19,81 19,63 6,50 19,37 19,19 37,19"
            stroke="#CCA43B"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            fill="none"
          />

          {/* Inner Golden Ring */}
          <circle cx="50" cy="50" r="39" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />

          {/* Crescent Moon & Star at Top */}
          <path
            d="M50 13C47.5 13 45.5 14.8 45.5 17.2C45.5 19.6 47.5 21.4 50 21.4C50.5 21.4 51 21.3 51.5 21.1C49.8 20.4 48.6 18.9 48.6 17.2C48.6 15.5 49.8 14 51.5 13.3C51 13.1 50.5 13 50 13Z"
            fill="#FBBF24"
          />
          <polygon
            points="53.5,16 54.2,17.4 55.7,17.5 54.5,18.4 54.9,19.9 53.5,19 52.2,19.9 52.6,18.4 51.4,17.5 52.9,17.4"
            fill="#FBBF24"
          />

          {/* Open Holy Quran (Mushaf) with Golden Bookmark */}
          {/* Left Page */}
          <path
            d="M50 42C44 38 34 38 23 41V67C34 64 44 64 50 68V42Z"
            fill="#FFFDF7"
            stroke="#D97706"
            strokeWidth="1.6"
          />
          {/* Left Page script lines */}
          <line x1="28" y1="47" x2="45" y2="46" stroke="#064E3B" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
          <line x1="28" y1="52" x2="45" y2="51" stroke="#064E3B" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
          <line x1="28" y1="57" x2="45" y2="56" stroke="#064E3B" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
          <line x1="31" y1="62" x2="42" y2="61" stroke="#D97706" strokeWidth="1" strokeLinecap="round" opacity="0.8" />

          {/* Right Page */}
          <path
            d="M50 42C56 38 66 38 77 41V67C66 64 56 64 50 68V42Z"
            fill="#FFFDF7"
            stroke="#D97706"
            strokeWidth="1.6"
          />
          {/* Right Page script lines */}
          <line x1="55" y1="46" x2="72" y2="47" stroke="#064E3B" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
          <line x1="55" y1="51" x2="72" y2="52" stroke="#064E3B" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
          <line x1="55" y1="56" x2="72" y2="57" stroke="#064E3B" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
          <line x1="58" y1="61" x2="69" y2="62" stroke="#D97706" strokeWidth="1" strokeLinecap="round" opacity="0.8" />

          {/* Rehal (Book Stand) */}
          <path
            d="M32 68L22 84M68 68L78 84M34 81L66 81"
            stroke="#CCA43B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M50 68L42 81M50 68L58 81"
            stroke="#FBBF24"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Subtle Golden Ray Beams */}
          <path
            d="M50 38V32M40 37L35 32M60 37L65 32"
            stroke="#FBBF24"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>

        {/* Mini Golden Monogram Badge */}
        <div className="absolute -bottom-1 -right-1 bg-amber-500 text-emerald-950 font-black text-[8px] px-1 rounded-sm shadow-sm border border-amber-300">
          FS
        </div>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`${textSizeClasses.title} font-serif tracking-tight ${
                textColor === 'light' ? 'text-white' : 'text-[#064E3B]'
              }`}
            >
              FS Darul Quran
            </span>
            <span className="text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded">
              Online Academy
            </span>
          </div>
          <span
            className={`${textSizeClasses.sub} font-sans font-medium uppercase ${
              textColor === 'light' ? 'text-amber-300' : 'text-amber-800'
            }`}
          >
            Quran • Sunnah • Better Ummah
          </span>
        </div>
      )}
    </div>
  );
};
