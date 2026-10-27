import React from 'react';
import { Hammer, Sparkles, ArrowRight, FileCheck2, CheckCircle2 } from 'lucide-react';
import { opportunitiesList } from '../data/mockData';
import { StrategicActionType } from './StrategicCTAButton';
import { translations } from '../locales/translations';
import { Language } from '../types';

interface BuyerSectionProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const BuyerSection: React.FC<BuyerSectionProps> = ({
  lang,
  onOpenActionModal
}) => {
  const t = translations[lang].buyer;

  return (
    <section id="comprar" className="py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Hammer className="w-3.5 h-3.5" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            {t.title}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
            {t.subtitle}
          </p>
        </div>

        {/* The Two Buyer Pathways (Decision Cards) */}
        <div className="mb-20">
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white mb-6 transition-colors">
            {t.subPathsTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Buyer Pathway A: Comprar lista para entrar */}
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold font-mono tracking-widest text-slate-600 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
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
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Inmuebles seleccionados con filtro de calidades</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Verificación registral y técnica previa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Gestión de hipoteca y escrituración</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onOpenActionModal('appointment')}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t.pathA.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                </button>
              </div>
            </div>

            {/* Buyer Pathway B: Comprar y transformar */}
            <div className="relative p-7 rounded-3xl bg-white dark:bg-slate-950 border-2 border-blue-500/40 shadow-xl shadow-blue-100 dark:shadow-blue-950/40 flex flex-col justify-between overflow-hidden transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full pointer-events-none" />

              <div>
                <span className="text-[10px] font-bold font-mono tracking-widest text-blue-700 dark:text-blue-300 uppercase bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded border border-blue-200 dark:border-blue-800">
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
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Búsqueda con ojo arquitectónico y estructural</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Visita presencial y anteproyecto de viabilidad</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Reforma coordinada con equipo homologado s/ PRESTO</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => onOpenActionModal('appointment')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-900/20"
                >
                  <span>{t.pathB.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* The 6-Stage Buyer Journey (Encuentra → Compra → Transforma) */}
        <div className="mb-20">
          <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-8 flex items-center gap-2 transition-colors">
            <span>{t.roadmapTitle}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {t.steps.map((step, index) => (
              <div
                key={step.num}
                className="relative p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between hover:border-blue-500/40 transition-colors"
              >
                <div>
                  <div className="text-2xl font-black font-serif text-blue-600 dark:text-blue-400/80 mb-2 tabular-nums">
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
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-blue-500/50">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities Showcase */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white transition-colors">
                {t.opportunitiesTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 transition-colors">
                {t.opportunitiesDesc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-sky-700 dark:text-sky-400 bg-white dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <FileCheck2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Estimaciones s/ Cuadros PRESTO + 21% IVA</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opportunitiesList.map((opp) => (
              <div
                key={opp.id}
                className="group rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 overflow-hidden shadow-md dark:shadow-xl flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Image with Tag */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={opp.image}
                      alt={opp.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {opp.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-medium text-sky-300 border border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono">
                      Potencial: {opp.potentialScore}/10
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      {opp.location} · {opp.neighborhood}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                      {opp.title}
                    </h4>

                    {/* Specs strip */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
                      <span>{opp.sqm} m²</span>
                      <span>·</span>
                      <span>{opp.rooms} habs</span>
                      <span>·</span>
                      <span>{opp.baths} baños</span>
                    </div>

                    {/* Transformation Blueprint Concept */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 mb-4 transition-colors">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Concepto de Transformación:</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300">
                        {opp.transformationConcept}
                      </p>
                    </div>

                    {/* Financial Matrix with explicit IVA indication */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 transition-colors">
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Precio Inmueble</span>
                        <p className="font-bold text-slate-800 dark:text-slate-200 tabular-nums font-mono">{opp.currentPrice.toLocaleString('es-ES')} €</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Reforma Estimada (IVA inc.)</span>
                        <p className="font-bold text-amber-600 dark:text-amber-400 tabular-nums font-mono">+{opp.estimatedRenoCost.toLocaleString('es-ES')} €*</p>
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-1 italic">
                      * Baremada s/ PRESTO con 21% IVA. Requiere visita técnica in situ para presupuesto definitivo.
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => onOpenActionModal('appointment')}
                    className="w-full py-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Solicitar Visita Técnica In Situ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
