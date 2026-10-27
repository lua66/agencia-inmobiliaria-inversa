import React from 'react';
import { translations } from '../locales/translations';
import { Language } from '../types';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, Award } from 'lucide-react';
import { StrategicActionType } from './StrategicCTAButton';

interface DifferentiationSectionProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const DifferentiationSection: React.FC<DifferentiationSectionProps> = ({
  lang,
  onOpenActionModal
}) => {
  const t = translations[lang].diff;

  return (
    <section id="diferenciacion" className="py-24 bg-slate-100/70 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-500/20 text-sky-700 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            {t.title}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
            {t.subtitle}
          </p>
        </div>

        {/* Side by Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Traditional Agency */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-rose-200 dark:border-rose-950/40 shadow-sm dark:shadow-none flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center gap-2.5 mb-6 text-rose-500 dark:text-rose-400">
                <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-300">
                  {t.traditionalLabel}
                </h3>
              </div>

              <ul className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
                {t.traditionalPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-rose-500 font-bold mt-0.5">✕</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-900 text-[11px] text-slate-500 italic">
              Modelo basado en volumen de anuncios y baja implicación técnica.
            </div>
          </div>

          {/* Card 2: Agencia Inmobiliaria Inversa */}
          <div className="relative p-8 rounded-3xl bg-white dark:bg-slate-950 border-2 border-sky-500/50 shadow-xl shadow-sky-100 dark:shadow-sky-950/50 flex flex-col justify-between overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5 text-sky-600 dark:text-sky-400">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-500/20 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t.inversaLabel}
                  </h3>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 uppercase tracking-wider">
                  Modelo 360°
                </span>
              </div>

              <ul className="space-y-4 text-xs text-slate-700 dark:text-slate-200">
                {t.inversaPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                Solvencia técnica y compromiso real
              </span>
              <button
                type="button"
                onClick={() => onOpenActionModal('appointment')}
                className="text-xs font-semibold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-300 flex items-center gap-1 transition-colors"
              >
                <span>Descubrir servicio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
