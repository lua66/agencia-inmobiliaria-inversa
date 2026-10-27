import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TransformationSlider } from '../components/TransformationSlider';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { Language } from '../types';
import { transformationCases } from '../data/mockData';
import { Sparkles, TrendingUp, Clock, Zap, CheckCircle2, Award, FileCheck2, ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  lang,
  onOpenActionModal
}) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Breadcrumbs for SEO */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40">
        <Breadcrumbs items={[{ label: 'Casos Reales y Transformaciones' }]} />
      </div>

      {/* Hero */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Casos de Éxito Documentados</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Transformaciones reales con revalorización cuantificada
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Descubre cómo convertimos viviendas obsoletas o mal distribuidas en hogares de diseño de alta demanda, con presupuestos cerrados y plazos garantizados por contrato.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <StrategicCTAButton
              actionType="valuation"
              label="SOLICITAR AUDITORÍA DE MI VIVIENDA"
              onClick={() => onOpenActionModal('valuation')}
              size="lg"
              variant="glow"
            />
            <StrategicCTAButton
              actionType="appointment"
              label="PIDE UNA CITA CON NUESTRO EQUIPO"
              onClick={() => onOpenActionModal('appointment')}
              size="lg"
              variant="outline"
            />
          </div>
        </div>
      </section>

      {/* Main Interactive Slider */}
      <TransformationSlider
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />

      {/* Detailed Project Cards Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Detalle Técnico y Financiero de Obras Ejecutadas
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Cada proyecto se ejecuta con libros de obra digitalizados, certificaciones continuas y auditoría in situ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {transformationCases.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Images side-by-side thumbnail */}
                <div className="grid grid-cols-2 h-48 relative overflow-hidden">
                  <div className="relative h-full">
                    <img
                      src={item.beforeImage}
                      alt="Antes de la reforma"
                      className="w-full h-full object-cover filter saturate-50"
                    />
                    <span className="absolute top-2 left-2 bg-slate-950/80 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      ANTES
                    </span>
                  </div>
                  <div className="relative h-full">
                    <img
                      src={item.afterImage}
                      alt="Después de la reforma"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-sky-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      DESPUÉS
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block mb-1">
                    {item.location}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Financial Grid with PRESTO & IVA transparency */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400">Inversión Obra (con 21% IVA):</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {item.renovationCost.toLocaleString('es-ES')} €
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400">Plazo de Ejecución:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {item.durationWeeks} semanas
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Revalorización Neta:</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                        +{item.valueAddedPct}%
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onOpenActionModal('valuation')}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-sky-700 dark:text-sky-400 text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800"
                >
                  <span>Solicitar Estudio para mi Inmueble</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
