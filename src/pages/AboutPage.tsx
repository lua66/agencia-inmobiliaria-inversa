import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AboutSection } from '../components/AboutSection';
import { ProfessionalsSection } from '../components/ProfessionalsSection';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { Language } from '../types';
import { ShieldCheck, HeartHandshake, Sparkles, Building, Award, CheckCircle2, Users, FileCheck2 } from 'lucide-react';

interface AboutPageProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  lang,
  onOpenActionModal
}) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Breadcrumbs for SEO */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40">
        <Breadcrumbs items={[{ label: 'Sobre Nosotros' }]} />
      </div>

      {/* Hero */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nuestra Historia y Misión</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Una nueva forma de entender la compraventa y la transformación inmobiliaria
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Nacimos con una convicción clara: una vivienda no es solo un inmueble para comercializar, sino una oportunidad para crear un espacio extraordinario y revalorizar el patrimonio de las personas.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <StrategicCTAButton
              actionType="appointment"
              label="HABLAR CON NUESTRO EQUIPO"
              onClick={() => onOpenActionModal('appointment')}
              size="lg"
              variant="glow"
            />
            <StrategicCTAButton
              actionType="valuation"
              label="SOLICITAR VALORACIÓN TÉCNICA"
              onClick={() => onOpenActionModal('valuation')}
              size="lg"
              variant="outline"
            />
          </div>
        </div>
      </section>

      {/* Core About Content */}
      <AboutSection
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />

      {/* Corporate Pillars & Ethics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Nuestros Principios de Solvencia y Ética Profesional
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            La confianza se demuestra con hechos, números auditados y garantías por contrato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Rigor Normativo PRESTO</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Desterramos los presupuestos aproximados "a ojo". Todas las mediciones se fundamentan en bases oficiales de la construcción en España.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Protección Jurídica Total</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Seguro de responsabilidad civil de hasta 1.000.000 € y cláusulas de penalización por desvío de plazos que protegen al cliente.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Acompañamiento 360°</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No nos desentendemos cuando se firma la compraventa: coordinamos la obra, supervisamos acabados y entregamos llaves en mano.
            </p>
          </div>
        </div>
      </section>

      {/* Network of Professionals */}
      <ProfessionalsSection
        lang={lang}
      />

    </div>
  );
};
