import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SellerSection } from '../components/SellerSection';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { Language } from '../types';
import { Home, ShieldCheck, TrendingUp, Calculator, HelpCircle, CheckCircle2, ChevronDown, ChevronUp, FileCheck2, ArrowRight } from 'lucide-react';

interface SellerPageProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const SellerPage: React.FC<SellerPageProps> = ({
  lang,
  onOpenActionModal
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Por qué me conviene analizar mi vivienda antes de ponerla en venta?',
      a: 'La mayoría de compradores descartan viviendas anticuadas o penalizan excesivamente el precio por el miedo a costes descontrolados de reforma. Analizar el inmueble antes permite identificar mejoras con alto retorno de inversión o presentar presupuestos cerrados y proyectos visuales que generan confianza inmediata en el comprador.'
    },
    {
      q: '¿Tengo que reformar obligatoriamente para vender con Agencia Inmobiliaria Inversa?',
      a: 'No. Ofrecemos dos vías claras: "Vender tal como está" (con reportaje profesional, valoración rigurosa y comercialización activa) o "Analizar y Mejorar antes de vender" si detectamos que una intervención genera una plusvalía neta ventajosa para ti.'
    },
    {
      q: '¿Cómo garantizáis que el presupuesto de obra no se desvíe?',
      a: 'Todos nuestros presupuestos preliminares se calculan sobre cuadros de precios estándar de edificación en España (Bases PRESTO) y se ratifican tras visita técnica presencial del arquitecto colegiado. Las partidas son cerradas y detalladas al milímetro con el 21% de IVA legal desglosado.'
    },
    {
      q: '¿Cuánto tiempo suele tardar la venta tras una puesta a punto o reforma?',
      a: 'En las viviendas acondicionadas o reformadas con nuestro estándar de diseño y calidades, el tiempo medio de venta se sitúa entre 14 y 32 días, reduciendo las negociaciones agresivas a la baja.'
    },
    {
      q: '¿Qué coste tiene la primera valoración técnica in situ?',
      a: 'La primera visita técnica y el estudio preliminar de viabilidad son totalmente gratuitos y sin compromiso por parte del propietario.'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Breadcrumbs for SEO */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40">
        <Breadcrumbs items={[{ label: 'Propietarios: Quiero Vender' }]} />
      </div>

      {/* Dedicated Page Hero */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" />
            <span>Guía para Propietarios y Vendedores</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Vende tu vivienda con solvencia técnica y el máximo valor de mercado
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No te limites a publicar un anuncio. Te ayudamos a decidir si te conviene vender tal como está o realizar una intervención estratégica para multiplicar el interés y el precio final.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <StrategicCTAButton
              actionType="valuation"
              label="SOLICITAR VALORACIÓN TÉCNICA IN SITU"
              onClick={() => onOpenActionModal('valuation')}
              size="lg"
              variant="glow"
            />
            <StrategicCTAButton
              actionType="appointment"
              label="HABLAR CON UN ARQUITECTO ASESOR"
              onClick={() => onOpenActionModal('appointment')}
              size="lg"
              variant="outline"
            />
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Metodología</span>
              <span className="font-bold text-sky-600 dark:text-sky-400 text-sm">Baremos PRESTO</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Inspección</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">100% In Situ</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Transparencia</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">+21% IVA Desglosado</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Compromiso</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Sin Exclusivas Forzadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Seller Section Component (Pathway cards + Roadmap + Value Calculator) */}
      <SellerSection
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />

      {/* FAQ Section specifically for Sellers (Great for Google FAQ Schema & SEO) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
            <span>Respuestas Claras</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Preguntas Frecuentes de Propietarios
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Todo lo que necesitas saber antes de comercializar tu inmueble.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sky-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-500/30 text-center space-y-4">
          <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
            ¿Quieres saber exactamente cuánto vale tu vivienda y qué mejoras compensan?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Un arquitecto o perito colegiado de nuestro equipo visitará tu inmueble para redactar un informe técnico orientativo sin coste ni compromiso.
          </p>
          <StrategicCTAButton
            actionType="valuation"
            label="SOLICITAR REVISIÓN TÉCNICA Y VALORACIÓN IN SITU"
            onClick={() => onOpenActionModal('valuation')}
            size="md"
            variant="glow"
          />
        </div>
      </section>

    </div>
  );
};
