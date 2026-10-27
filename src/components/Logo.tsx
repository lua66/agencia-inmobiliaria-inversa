import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'compact' | 'horizontal';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  // Responsive size metrics for the icon
  const iconSizeClasses = {
    sm: 'w-8 h-8 sm:w-10 sm:h-10',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-12 h-12 sm:w-16 sm:h-16'
  }[size];

  const textSizes = {
    sm: {
      agencia: 'text-[12px] sm:text-[15px] tracking-[0.14em] sm:tracking-[0.16em]',
      inmobiliaria: 'text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.24em]',
      inversa: 'text-[12px] sm:text-[15px] tracking-[0.14em] sm:tracking-[0.16em]'
    },
    md: {
      agencia: 'text-[15px] sm:text-[18px] tracking-[0.16em] sm:tracking-[0.18em]',
      inmobiliaria: 'text-[9px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.26em]',
      inversa: 'text-[15px] sm:text-[18px] tracking-[0.16em] sm:tracking-[0.18em]'
    },
    lg: {
      agencia: 'text-[18px] sm:text-[22px] tracking-[0.18em] sm:tracking-[0.2em]',
      inmobiliaria: 'text-[11px] sm:text-[13px] tracking-[0.24em] sm:tracking-[0.28em]',
      inversa: 'text-[18px] sm:text-[22px] tracking-[0.18em] sm:tracking-[0.2em]'
    }
  }[size];

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      
      {/* Buildings Skyline Icon Graphic */}
      <div className={`relative ${iconSizeClasses} shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_2px_8px_rgba(2,132,199,0.3)]">
          {/* Background buildings */}
          <path d="M42 35 L42 75 L52 75 L52 35 Z" fill="#0284c7" opacity="0.85" />
          <path d="M68 25 L68 75 L78 75 L78 25 Z" fill="#0369a1" />
          <path d="M30 48 L30 75 L40 75 L40 48 Z" fill="#38bdf8" />
          
          {/* Center tall building */}
          <path d="M55 12 L65 5 L65 75 L55 75 Z" fill="#0284c7" />
          <path d="M45 22 L55 15 L55 75 L45 75 Z" fill="#2563eb" />
          <path d="M80 42 L90 50 L90 75 L80 75 Z" fill="#0284c7" />

          {/* Windows grid lines (Bright White) */}
          <line x1="47" y1="30" x2="53" y2="30" stroke="white" strokeWidth="1.8" />
          <line x1="47" y1="40" x2="53" y2="40" stroke="white" strokeWidth="1.8" />
          <line x1="47" y1="50" x2="53" y2="50" stroke="white" strokeWidth="1.8" />
          <line x1="47" y1="60" x2="53" y2="60" stroke="white" strokeWidth="1.8" />
          
          <line x1="58" y1="20" x2="63" y2="20" stroke="white" strokeWidth="1.8" />
          <line x1="58" y1="30" x2="63" y2="30" stroke="white" strokeWidth="1.8" />
          <line x1="58" y1="40" x2="63" y2="40" stroke="white" strokeWidth="1.8" />
          <line x1="58" y1="50" x2="63" y2="50" stroke="white" strokeWidth="1.8" />
          <line x1="58" y1="60" x2="63" y2="60" stroke="white" strokeWidth="1.8" />

          {/* Base stylized waves */}
          <path d="M14 78 C35 70, 56 86, 76 76 C92 68, 105 82, 110 78" stroke="#38bdf8" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M20 86 C40 78, 64 94, 84 84 C96 77, 104 88, 108 85" stroke="#1d4ed8" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 3-Line Structured Brand Text:
            AGENCIA
        INMOBILIARIA
            INVERSA
      */}
      <div className="flex flex-col justify-center text-left leading-[1.08] shrink-0">
        {/* Line 1: AGENCIA */}
        <span className={`font-serif font-extrabold text-slate-900 dark:text-white ${textSizes.agencia} drop-shadow-sm transition-colors`}>
          AGENCIA
        </span>

        {/* Line 2: INMOBILIARIA */}
        <span className={`font-sans font-bold text-sky-600 dark:text-sky-300 uppercase py-[1px] ${textSizes.inmobiliaria} transition-colors`}>
          INMOBILIARIA
        </span>

        {/* Line 3: INVERSA */}
        <span className={`font-serif font-extrabold text-sky-600 dark:text-sky-400 ${textSizes.inversa} drop-shadow-sm transition-colors`}>
          INVERSA
        </span>
      </div>

    </div>
  );
};
