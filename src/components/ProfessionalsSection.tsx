import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Star, Award, X, FileCheck2 } from 'lucide-react';
import { tradeProfessionals } from '../data/mockData';
import { translations } from '../locales/translations';
import { Language } from '../types';

interface ProfessionalsSectionProps {
  lang: Language;
}

export const ProfessionalsSection: React.FC<ProfessionalsSectionProps> = ({ lang }) => {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  const t = translations[lang].pros;

  return (
    <section id="profesionales" className="py-24 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            {t.title}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Pillars of Verification with PRESTO & IVA transparency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between transition-colors">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 transition-colors">
                Baremos Normativa PRESTO
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                Desglose exhaustivo por partidas y mediciones oficiales de edificación en España, eliminando cifras irreales o presupuestos trampa.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between transition-colors">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 transition-colors">
                Inspección In Situ Obligatoria
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                Ningún presupuesto se cierra a ciegas. El arquitecto o técnico colegiado revisa la vivienda presencialmente antes del contrato.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between transition-colors">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 transition-colors">
                Transparencia IVA 21%
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                Claridad impositiva desde el primer minuto (+21% IVA general o 10% reducido en reformas con material &lt;40%), sin partidas ocultas.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between transition-colors">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 transition-colors">
                Garantía y Plazos Cerrados
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                Seguro de responsabilidad civil de hasta 1M€ y compromiso contractual de fecha de inicio y finalización de obra.
              </p>
            </div>
          </div>

        </div>

        {/* Verified Directory Showcase */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white transition-colors">
              Especialistas Homologados en Activo
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Auditoría técnica continua s/ PRESTO
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tradeProfessionals.map((pro) => (
              <div
                key={pro.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-500/20 border border-sky-200 dark:border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-sm shrink-0">
                      {pro.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight transition-colors">
                          {pro.name}
                        </h4>
                        <Award className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{pro.specialty}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Experiencia:</span>
                      <span className="text-slate-900 dark:text-slate-200 font-medium">{pro.experienceYears} años</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Proyectos ejecutados:</span>
                      <span className="text-slate-900 dark:text-slate-200 font-medium">{pro.completedProjects} obras</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Valoración clientes:</span>
                      <div className="flex items-center text-amber-500 dark:text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                        <span>{pro.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1">
                  {pro.badges.map((badge, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join the Network Callout */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">
              {t.joinProTitle}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl transition-colors">
              {t.joinProDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPartnerModalOpen(true)}
            className="px-6 py-3 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 text-xs font-semibold transition-all whitespace-nowrap"
          >
            {t.joinProCTA}
          </button>
        </div>

      </div>

      {/* Partner Application Modal */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setPartnerModalOpen(false)} />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-lg w-full z-10 shadow-2xl transition-colors">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Adhesión a la Red Homologada</h4>
              <button onClick={() => setPartnerModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {partnerSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h5 className="font-bold text-slate-900 dark:text-white text-base">Solicitud de Homologación Enviada</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Nuestro departamento de control técnico revisará tu acreditación y nos pondremos en contacto contigo en 48 horas.
                </p>
                <button
                  onClick={() => { setPartnerSubmitted(false); setPartnerModalOpen(false); }}
                  className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded-lg text-xs font-semibold text-white"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setPartnerSubmitted(true); }} className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-700 dark:text-slate-300 mb-1">Nombre o Empresa *</label>
                  <input required className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white" placeholder="Ej. Arquitectura & Obras Sl" />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 dark:text-slate-300 mb-1">Especialidad Principal *</label>
                  <input required className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white" placeholder="Ej. Dirección Facultativa, Climatización, Albañilería" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-700 dark:text-slate-300 mb-1">Teléfono *</label>
                    <input required type="tel" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white" placeholder="+34 600..." />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 dark:text-slate-300 mb-1">Email *</label>
                    <input required type="email" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white" placeholder="contacto@empresa.com" />
                  </div>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setPartnerModalOpen(false)} className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400">Cancelar</button>
                  <button type="submit" className="px-5 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white rounded-lg">Enviar Candidatura</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
