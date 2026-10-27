import React from 'react';
import { 
  ShieldAlert, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  Building2, 
  Clock, 
  Scale,
  ArrowRight
} from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { useRouter } from '../router/RouterContext';

interface InformeTecnicoPreCompraPageProps {
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const InformeTecnicoPreCompraPage: React.FC<InformeTecnicoPreCompraPageProps> = ({ onOpenActionModal }) => {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-sky-600 dark:hover:text-sky-400">Inicio</button>
        <span>/</span>
        <button onClick={() => navigate('/comprar')} className="hover:text-sky-600 dark:hover:text-sky-400">Comprar</button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Informe Técnico Pre-Compra</span>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide">
          <FileCheck2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Auditoría de Arquitecto Previo a Arras · Vicios Ocultos · Baremos PRESTO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
          Informe Técnico Pre-Compra de Viviendas
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Antes de entregar 30.000€ o 50.000€ en una señal o contrato de arras, nuestro arquitecto colegiado te acompaña al inmueble para auditar estructura, instalaciones, ITE comunitaria y viabilidad de redistribución con presupuesto real de reforma.
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <StrategicCTAButton
            actionType="appointment"
            label="PIDE UNA CITA TÉCNICA"
            onClick={() => onOpenActionModal('appointment')}
            size="lg"
            variant="glow"
          />
          <StrategicCTAButton
            actionType="valuation"
            label="VALORA TU VIVIENDA"
            onClick={() => onOpenActionModal('valuation')}
            size="lg"
            variant="secondary"
          />
        </div>
      </header>

      {/* Key Risks Avoided */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
            ¿Qué riesgos detecta nuestro arquitecto antes de comprar?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Comprar una vivienda a ciegas puede acarrear sobrecostes de decenas de miles de euros en averías estructurales ocultas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Patologías Estructurales e ITE</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Detección de aluminosis, flechas excesivas en forjados de madera o viguetas metálicas corroídas, humedades por capilaridad y derramas comunitarias pendientes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Instalaciones Obsoletas</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Comprobación de tuberías de plomo, bajantes con fibrocemento (amianto) y cuadros eléctricos fuera del REBT que obligan a acometidas nuevas de alto coste.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Viabilidad de Redistribución</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ¿Se puede tirar ese tabique para unir salón y cocina? Comprobamos muros de carga, pilares maestros y distancias a bajantes antes de soñar en vano.
            </p>
          </div>
        </div>
      </section>

      {/* Report Structure */}
      <section className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
          Contenido del Dictamen Técnico que Recibirás
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white">1. Levantamiento de Plano con Superficie Útil Real</strong>
              Comprobamos discrepancias entre metros útiles reales, metros construidos del catastro y metros registrales.
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white">2. Cuadro de Precios PRESTO (+21% IVA)</strong>
              Presupuesto detallado capítulo a capítulo para que sepas el dinero exacto que necesitarás invertir tras la compra.
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white">3. Poder de Negociación ante el Vendedor</strong>
              Utiliza el informe pericial visado para negociar una rebaja proporcional en el precio de venta final.
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 dark:text-white">4. Emisión Rápida en &lt; 48 Horas</strong>
              Sabemos que los inmuebles vuelan. Entregamos el informe completo en menos de dos días laborables.
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif max-w-2xl mx-auto">
          ¿Has visto un piso y quieres revisarlo con un arquitecto?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Pide cita técnica. Un profesional colegiado coordinará la visita conjunta para darte la tranquilidad que necesitas antes de comprar.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <StrategicCTAButton
            actionType="appointment"
            label="PIDE UNA CITA TÉCNICA"
            onClick={() => onOpenActionModal('appointment')}
            size="lg"
            variant="glow"
          />
          <StrategicCTAButton
            actionType="valuation"
            label="VALORA TU VIVIENDA"
            onClick={() => onOpenActionModal('valuation')}
            size="lg"
            variant="secondary"
          />
        </div>
      </section>

    </div>
  );
};
