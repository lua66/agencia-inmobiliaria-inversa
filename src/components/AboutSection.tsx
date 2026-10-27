import React from 'react';
import { translations } from '../locales/translations';
import { Language } from '../types';
import { Sparkles } from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from './StrategicCTAButton';

interface AboutSectionProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  lang,
  onOpenActionModal
}) => {
  const t = translations[lang].about;

  return (
    <section id="nosotros" className="py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Text Narrative (col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-500/20 text-sky-700 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {t.eyebrow}
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
              {t.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light transition-colors">
              {t.p1}
            </p>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal dark:font-light transition-colors">
              {t.p2}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <StrategicCTAButton
                actionType="appointment"
                label="CONOCE A NUESTRO EQUIPO"
                onClick={() => onOpenActionModal('appointment')}
                size="md"
                variant="primary"
              />
            </div>
          </div>

          {/* Right Image Grid / Trust Card (col-span-5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
              <img
                src="/src/assets/images/building_facade_restoration_1790762473893.jpg"
                alt="Rehabilitación arquitectónica integral"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xl font-bold font-serif text-white">10+ Años</p>
                <p className="text-xs text-sky-300 mt-0.5">
                  Acompañando a personas y familias a transformar sus espacios en su mejor versión.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* The 3 Pillars Bento */}
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white text-center mb-8 transition-colors">
            {t.pillarsTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none transition-colors">
              <span className="text-2xl font-bold font-serif text-sky-600 dark:text-sky-400 block mb-2">01</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 transition-colors">{t.pillar1Title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">{t.pillar1Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none transition-colors">
              <span className="text-2xl font-bold font-serif text-blue-600 dark:text-blue-400 block mb-2">02</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 transition-colors">{t.pillar2Title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">{t.pillar2Desc}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none transition-colors">
              <span className="text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400 block mb-2">03</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 transition-colors">{t.pillar3Title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">{t.pillar3Desc}</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
