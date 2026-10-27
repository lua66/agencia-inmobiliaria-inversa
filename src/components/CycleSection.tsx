import React from 'react';
import { translations } from '../locales/translations';
import { Language } from '../types';
import { Sparkles, Compass, CheckCircle2, ArrowRight, Layers, Key } from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from './StrategicCTAButton';

interface CycleSectionProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const CycleSection: React.FC<CycleSectionProps> = ({
  lang,
  onOpenActionModal
}) => {
  const t = translations[lang].cycle;
  const solutionsT = translations[lang].solutions;

  const phaseIcons = [Layers, Compass, Key];

  return (
    <section id="ciclo" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
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

        {/* 3 Pillars: ANTES · DURANTE · DESPUÉS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {t.stages.map((stage, idx) => {
            const Icon = phaseIcons[idx] || Layers;
            return (
              <div
                key={stage.phase}
                className="group relative p-7 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 shadow-sm dark:shadow-none transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold font-mono tracking-widest text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-200 dark:border-sky-500/20">
                      {stage.badge}
                    </span>
                    <span className="text-2xl font-serif font-black text-slate-300 dark:text-slate-800 group-hover:text-sky-500/30 transition-colors">
                      {stage.phase}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">
                    {stage.title}
                  </h3>

                  <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 mb-6 transition-colors">
                    {stage.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-600 dark:text-sky-400">
                  <span>Acompañamiento especializado</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Solutions Architecture Block */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl transition-colors">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block mb-1">
              {solutionsT.eyebrow}
            </span>
            <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-2 transition-colors">
              {solutionsT.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
              {solutionsT.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutionsT.lines.map((line) => (
              <div
                key={line.num}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <span className="text-sm font-bold font-mono text-sky-600 dark:text-sky-400 block mb-1.5">{line.num}</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 transition-colors">{line.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">{line.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              ¿Quieres evaluar qué camino se adapta mejor a tu vivienda o compra?
            </p>
            <div className="flex items-center gap-3">
              <StrategicCTAButton
                actionType="appointment"
                label="HABLAR CON UN ASESOR TÉCNICO"
                onClick={() => onOpenActionModal('appointment')}
                size="sm"
                variant="glow"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
