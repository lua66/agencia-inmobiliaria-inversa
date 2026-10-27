import React from 'react';
import { Home, Hammer, ArrowRight, Sparkles } from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from './StrategicCTAButton';
import { translations } from '../locales/translations';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
  onSelectPath: (path: 'vender' | 'comprar') => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenActionModal,
  onSelectPath
}) => {
  const t = translations[lang].hero;
  const navT = translations[lang].nav;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-20 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
      
      {/* Background Architectural Canvas with subtle gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_architectural_penthouse_1790762421218.jpg"
          alt="Transformación arquitectónica inmobiliaria de alta gama"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.92] dark:brightness-[0.30] contrast-[1.05] dark:contrast-[1.08] scale-105 transform duration-1000 ease-out transition-all"
        />
        {/* Light & Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/85 to-slate-50/60 dark:from-slate-950 dark:via-slate-950/70 dark:to-slate-950/40 transition-colors" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200/40 dark:from-sky-950/40 via-transparent to-transparent transition-colors" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Architectural Concept Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/30 backdrop-blur-md mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span className="text-[11px] font-semibold tracking-widest text-sky-700 dark:text-sky-300 uppercase">
            {t.tagline}
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.12] mb-5 font-serif transition-colors">
          {t.title}
        </h1>

        {/* Brand Motto Banner */}
        <p className="text-sm sm:text-base font-semibold text-sky-600 dark:text-sky-400 tracking-wide uppercase mb-4 transition-colors">
          {t.motto}
        </p>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal dark:font-light transition-colors">
          {t.subtitle}
        </p>

        {/* Two Fundamental Pathways Selection Container */}
        <div className="mb-12 max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 mb-4 transition-colors">
            {t.pathPrompt}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
            
            {/* Pathway 1: SELLER */}
            <div 
              onClick={() => onSelectPath('vender')}
              role="button"
              tabIndex={0}
              className="group relative p-6 rounded-2xl bg-white/90 dark:bg-slate-900/85 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/60 backdrop-blur-md shadow-lg dark:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:translate-y-[-2px]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-bl-full pointer-events-none group-hover:bg-sky-500/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Home className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-sky-700 dark:text-sky-300 border border-slate-200 dark:border-slate-700 uppercase">
                    {t.sellerPathBadge}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                  {t.sellerPathTitle}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 transition-colors">
                  {t.sellerPathDesc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-sky-600 dark:text-sky-400">
                <span>Vender tal cual o mejorar antes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* Pathway 2: BUYER */}
            <div 
              onClick={() => onSelectPath('comprar')}
              role="button"
              tabIndex={0}
              className="group relative p-6 rounded-2xl bg-white/90 dark:bg-slate-900/85 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 backdrop-blur-md shadow-lg dark:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:translate-y-[-2px]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Hammer className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 uppercase">
                    {t.buyerPathBadge}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  {t.buyerPathTitle}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 transition-colors">
                  {t.buyerPathDesc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Comprar lista o transformar a medida</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

          </div>
        </div>

        {/* Primary Strategic Actions Banner */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 mb-14">
          <StrategicCTAButton
            actionType="valuation"
            label={navT.valuationCTA}
            onClick={() => onOpenActionModal('valuation')}
            size="lg"
            variant="glow"
          />
          <StrategicCTAButton
            actionType="appointment"
            label={navT.appointmentCTA}
            onClick={() => onOpenActionModal('appointment')}
            size="lg"
            variant="outline"
          />
        </div>

        {/* Quantitative Proof Metrics */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto transition-colors">
          <div className="p-3 text-center">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tabular-nums transition-colors">10+</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 transition-colors">{t.statYears}</p>
          </div>
          <div className="p-3 text-center">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-sky-600 dark:text-sky-400 tabular-nums transition-colors">+450</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 transition-colors">{t.statRenovated}</p>
          </div>
          <div className="p-3 text-center">
            <p className="text-lg sm:text-xl font-bold font-serif text-emerald-600 dark:text-emerald-400 transition-colors">360°</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 transition-colors">{t.statValueIncrease}</p>
          </div>
          <div className="p-3 text-center">
            <p className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white tabular-nums transition-colors">100%</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 transition-colors">{t.statNetwork}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
