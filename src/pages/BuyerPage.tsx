import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BuyerSection } from '../components/BuyerSection';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { Language } from '../types';
import { Hammer, Sparkles, HelpCircle, ChevronDown, ChevronUp, Search, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BuyerPageProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const BuyerPage: React.FC<BuyerPageProps> = ({
  lang,
  onOpenActionModal
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Qué es el modelo "Encuentra → Compra → Transforma"?',
      a: 'A diferencia de una inmobiliaria convencional que solo te enseña pisos terminados a precios inflados, nosotros te ayudamos a localizar viviendas bien ubicadas pero con margen de mejora. Nuestro equipo de arquitectos te acompaña a las visitas para proyectar la reforma antes de comprar, asegurando que el coste total (compra + obra) sea muy inferior al valor final de mercado.'
    },
    {
      q: '¿Puedo comprar una vivienda lista para entrar a vivir?',
      a: 'Por supuesto. Disponemos de una cartera seleccionada de viviendas ya reformadas y auditadas bajo nuestros exigentes estándares de calidad arquitectónica y eficiencia energética.'
    },
    {
      q: '¿Me acompañará un arquitecto o técnico a visitar la vivienda?',
      a: 'Sí. En el modelo de transformación, concertamos visitas técnicas presenciales conjuntas para auditar la estructura, bajantes, estado del edificio y posibilidades de redistribución antes de que firmes arras.'
    },
    {
      q: '¿Cómo se financia una compra con reforma?',
      a: 'Te asesoramos en fórmulas de hipotecas conjuntas de compra + reforma, donde la entidad financiera valora el inmueble tras la ejecución de la obra y te permite financiar tanto la compra como la intervención con las mejores condiciones.'
    },
    {
      q: '¿Todos los presupuestos de obra tienen el 21% de IVA incluido?',
      a: 'Sí. En Agencia Inmobiliaria Inversa velamos por la máxima transparencia. Todas nuestras estimaciones se basan en baremos oficiales PRESTO e incluyen el IVA legal aplicable (21% o el 10% reducido en reformas con aportación de materiales inferior al 40%).'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Breadcrumbs for SEO */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40">
        <Breadcrumbs items={[{ label: 'Compradores: Quiero Comprar' }]} />
      </div>

      {/* Dedicated Page Hero */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Hammer className="w-3.5 h-3.5" />
            <span>Servicio para Compradores con Visión</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Encuentra una vivienda y conviértela en lo que imaginas
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No te limites al catálogo cerrado de los portales tradicionales. Te acompañamos desde la prospección técnica y la negociación hasta el proyecto y ejecución de la reforma.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <StrategicCTAButton
              actionType="appointment"
              label="SOLICITAR ASESORÍA Y BÚSQUEDA A MEDIDA"
              onClick={() => onOpenActionModal('appointment')}
              size="lg"
              variant="glow"
            />
            <StrategicCTAButton
              actionType="valuation"
              label="REVISAR VIABILIDAD DE UN INMUEBLE QUE HAS VISTO"
              onClick={() => onOpenActionModal('valuation')}
              size="lg"
              variant="outline"
            />
          </div>

          {/* Quick Pillars Grid */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <Compass className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Ojo Arquitectónico</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Detectamos oportunidades que otros descartan por su estado estético.</p>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Seguridad Contractual</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Presupuestos cerrados s/ PRESTO, plazos garantizados y seguros de RC.</p>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Ahorro y Revalorización</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Consigue una vivienda a estrenar por un 20-30% menos que el mercado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Buyer Section Component */}
      <BuyerSection
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />

      {/* Buyer FAQ Section (Great for Google FAQ Schema & SEO) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            <span>Guía para Compradores</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Preguntas Frecuentes al Comprar una Vivienda
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Te resolvemos todas las dudas sobre licencias, presupuestos e hipotecas de reforma.
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
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-500 shrink-0" />
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

        <div className="mt-12 p-8 rounded-3xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/30 text-center space-y-4">
          <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
            ¿Has visto una vivienda en venta y no sabes si su reforma es viable?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Facilítanos el enlace o la dirección y nuestro equipo técnico te elaborará un anteproyecto de viabilidad previo para que no compres a ciegas.
          </p>
          <StrategicCTAButton
            actionType="appointment"
            label="PIDE UNA CITA CON NUESTRO EQUIPO ARQUITECTÓNICO"
            onClick={() => onOpenActionModal('appointment')}
            size="md"
            variant="glow"
          />
        </div>
      </section>

    </div>
  );
};
