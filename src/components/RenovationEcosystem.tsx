import React from 'react';
import { translations } from '../locales/translations';
import { Language } from '../types';
import { Sparkles, Building2, Paintbrush, Hammer, Leaf, UtensilsCrossed, ShieldCheck, ArrowRight } from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from './StrategicCTAButton';

interface RenovationEcosystemProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const RenovationEcosystem: React.FC<RenovationEcosystemProps> = ({
  lang,
  onOpenActionModal
}) => {
  const t = translations[lang].renovations;

  const icons = [Building2, Paintbrush, Hammer, Leaf, UtensilsCrossed, ShieldCheck];

  return (
    <section id="reformas" className="py-24 bg-slate-100/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
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

          {/* 7-Step Budget Journey Formula */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] sm:text-xs font-bold text-sky-700 dark:text-sky-300 tracking-wider shadow-sm dark:shadow-none transition-colors">
            <span>NECESIDAD</span>
            <span className="text-slate-400 dark:text-slate-600">→</span>
            <span>ANÁLISIS</span>
            <span className="text-slate-400 dark:text-slate-600">→</span>
            <span>PROFESIONAL</span>
            <span className="text-slate-400 dark:text-slate-600">→</span>
            <span>PRESUPUESTO</span>
            <span className="text-slate-400 dark:text-slate-600">→</span>
            <span>APROBACIÓN</span>
            <span className="text-slate-400 dark:text-slate-600">→</span>
            <span>REFORMA</span>
            <span className="text-slate-400 dark:text-slate-600">→</span>
            <span className="text-emerald-600 dark:text-emerald-400">SEGUIMIENTO</span>
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {t.services.map((service, idx) => {
            const IconComponent = icons[idx] || Hammer;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 shadow-sm dark:shadow-none transition-all duration-300 flex flex-col justify-between hover:translate-y-[-2px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-sky-600 dark:text-sky-400 font-semibold">
                  <span>Partidas s/ PRESTO + 21% IVA</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic Callout CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-blue-50 dark:from-sky-950/40 dark:via-slate-900 dark:to-blue-950/40 border border-sky-200 dark:border-sky-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md dark:shadow-none transition-colors">
          <div>
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white transition-colors">
              ¿Tienes en mente un proyecto o reforma para tu vivienda?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl transition-colors">
              Nuestros arquitectos evalúan tu espacio in situ para ofrecerte un anteproyecto y presupuesto cerrado con total transparencia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StrategicCTAButton
              actionType="appointment"
              label="PIDE UNA CITA TÉCNICA"
              onClick={() => onOpenActionModal('appointment')}
              size="md"
              variant="glow"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
