import React from 'react';
import { Home, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ValueCalculator } from './ValueCalculator';
import { StrategicActionType } from './StrategicCTAButton';
import { translations } from '../locales/translations';
import { Language } from '../types';

interface SellerSectionProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const SellerSection: React.FC<SellerSectionProps> = ({
  lang,
  onOpenActionModal
}) => {
  const t = translations[lang].seller;

  return (
    <section id="vender" className="py-24 bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-500/30 text-sky-700 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Home className="w-3.5 h-3.5" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            {t.title}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
            {t.subtitle}
          </p>
        </div>

        {/* The Two Seller Pathways */}
        <div className="mb-20">
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white mb-6 transition-colors">
            {t.subPathsTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pathway A: Vender tal como está */}
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold font-mono tracking-widest text-slate-600 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
                  {t.pathA.tag}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2 transition-colors">
                  {t.pathA.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6 transition-colors">
                  {t.pathA.desc}
                </p>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Valoración realista s/ mercado actual</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Reportaje fotográfico profesional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Gestión de compradores solventes</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onOpenActionModal('valuation')}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t.pathA.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                </button>
              </div>
            </div>

            {/* Pathway B: Saber si conviene mejorar antes de vender */}
            <div className="relative p-7 rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-500/40 shadow-xl shadow-sky-100 dark:shadow-sky-950/40 flex flex-col justify-between overflow-hidden transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-bl-full pointer-events-none" />

              <div>
                <span className="text-[10px] font-bold font-mono tracking-widest text-sky-700 dark:text-sky-300 uppercase bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded border border-sky-200 dark:border-sky-800">
                  {t.pathB.tag}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2 transition-colors">
                  {t.pathB.title}
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed mb-6 transition-colors">
                  {t.pathB.desc}
                </p>

                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Inspección in situ de arquitectura y estado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Estudio comparativo de mejoras con mayor ROI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Coordinación de obra s/ baremos PRESTO con IVA 21%</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onOpenActionModal('valuation')}
                  className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2 shadow-md shadow-sky-900/20"
                >
                  <span>{t.pathB.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* The 6-Stage Seller Process Timeline */}
        <div className="mb-20">
          <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-8 flex items-center gap-2 transition-colors">
            <span>{t.roadmapTitle}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {t.steps.map((step, index) => (
              <div
                key={step.num}
                className="relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between hover:border-sky-500/40 transition-colors"
              >
                <div>
                  <div className="text-2xl font-black font-serif text-sky-600 dark:text-sky-400/80 mb-2 tabular-nums">
                    {step.num}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2 leading-snug transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal transition-colors">
                    {step.desc}
                  </p>
                </div>

                {index < t.steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-sky-500/50">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Interactive ROI & Valuation Calculator */}
        <ValueCalculator lang={lang} onOpenActionModal={onOpenActionModal} />

      </div>
    </section>
  );
};
