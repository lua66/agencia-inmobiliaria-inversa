import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Ruler, 
  Calculator,
  Compass,
  FileSpreadsheet
} from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { ValueCalculator } from '../components/ValueCalculator';
import { PropertyValuationCalculator } from '../components/PropertyValuationCalculator';
import { useRouter } from '../router/RouterContext';

interface ValoracionPageProps {
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const ValoracionPage: React.FC<ValoracionPageProps> = ({ onOpenActionModal }) => {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb & Structured Heading for Google */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-sky-600 dark:hover:text-sky-400">Inicio</button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Valoración Inmobiliaria Técnica</span>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-semibold tracking-wide">
          <FileCheck2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Auditoría In Situ · Cuadros Oficiales PRESTO · IVA 21%</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
          Valoración Inmobiliaria Técnica y Estudio de Revalorización
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Más allá de una simple tasación automática por algoritmo: un arquitecto colegiado audita presencialmente el estado real de la vivienda, detecta vicios ocultos y mide el potencial de plusvalía con presupuesto PRESTO desglosado.
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <StrategicCTAButton
            actionType="valuation"
            label="VALORA TU VIVIENDA"
            onClick={() => onOpenActionModal('valuation')}
            size="lg"
            variant="glow"
          />
          <StrategicCTAButton
            actionType="appointment"
            label="PIDE UNA CITA TÉCNICA"
            onClick={() => onOpenActionModal('appointment')}
            size="lg"
            variant="secondary"
          />
        </div>
      </header>

      {/* Technical Warning Box */}
      <section className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <h2 className="text-xs font-bold uppercase tracking-wider">Protocolo de Rigor Técnico y Transparencia Legal</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px] sm:text-xs">
          Las tasaciones online y portales automáticos calculan medias por código postal sin contemplar estado de bajantes, muros de carga, carpinterías ni eficiencia energética. En Agencia Inmobiliaria Inversa ningún informe es vinculante sin la revisión física in situ. Todas las estimaciones de obra aplican el <strong>21% de IVA legal</strong> obligatorio en España.
        </p>
      </section>

      {/* Interactive Spanish Property Valuation Calculator */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
            Calculadora de Valoración de Vivienda en Toda España
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Selecciona tu provincia, tipología, estado de la vivienda y superficie para obtener el valor estimado de mercado y el potencial con transformación.
          </p>
        </div>
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <PropertyValuationCalculator lang="es" />
        </div>
      </section>

      {/* 4 Pillars of our In Situ Valuation */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
          ¿En qué consiste la Valoración In Situ de Inmobiliaria Inversa?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <Ruler className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">1. Medición Láser y Planimetría</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Levantamiento de plano con cotas exactas, superficie útil real comprobada frente a datos catastrales y registro de la propiedad.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">2. Auditoría Estructural e ITE</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Revisión de forjados, estado de bajantes comunitarias, cuadro eléctrico según REBT e ITE de la finca para evitar sorpresas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">3. Cuadro de Partidas PRESTO</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Medición de capítulos constructivos según los baremos oficiales de edificación en España, con precios reales de mercado y 21% IVA.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">4. Comparativa de Rentabilidad</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Estudio honesto: ¿te conviene vender tal como está o reformar antes? Analizamos cuál de los dos caminos genera mayor beneficio neto.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 border border-sky-500/20 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif max-w-2xl mx-auto">
          Descubre el verdadero valor y potencial de tu inmueble
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Solicita tu visita técnica sin coste ni compromiso. Nuestro técnico colegiado te entregará el informe de valoración in situ en menos de 48 horas.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <StrategicCTAButton
            actionType="valuation"
            label="VALORA TU VIVIENDA"
            onClick={() => onOpenActionModal('valuation')}
            size="lg"
            variant="glow"
          />
          <StrategicCTAButton
            actionType="appointment"
            label="PIDE UNA CITA"
            onClick={() => onOpenActionModal('appointment')}
            size="lg"
            variant="secondary"
          />
        </div>
      </section>

    </div>
  );
};
