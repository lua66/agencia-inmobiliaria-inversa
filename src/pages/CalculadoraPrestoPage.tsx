import React from 'react';
import { 
  Calculator, 
  FileCheck2, 
  AlertTriangle, 
  Layers, 
  Info, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Hammer
} from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { ValueCalculator } from '../components/ValueCalculator';
import { useRouter } from '../router/RouterContext';

interface CalculadoraPrestoPageProps {
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const CalculadoraPrestoPage: React.FC<CalculadoraPrestoPageProps> = ({ onOpenActionModal }) => {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-sky-600 dark:hover:text-sky-400">Inicio</button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Calculadora de Reforma PRESTO</span>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-semibold tracking-wide">
          <Calculator className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Base Oficial de Precios de Edificación · Desglose 21% IVA</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
          Calculadora de Reforma y Revalorización PRESTO
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Estima el coste real de intervenir una vivienda según los cuadros de precios estándar de la edificación en España (Bases PRESTO). Descubre el incremento de valor de mercado proyectado y la plusvalía neta estimada.
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

      {/* Mandatory Technical Disclaimer */}
      <section className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <h2 className="text-xs font-bold uppercase tracking-wider">Aviso de Rigor: Presupuestos Vinculantes vs Orientativos</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px] sm:text-xs">
          Esta herramienta ofrece cálculos orientativos fundamentados en promedios del Colegio de Arquitectos y cuadros de precios PRESTO. <strong>Ningún presupuesto es vinculante ni definitivo hasta la inspección técnica in situ</strong> por parte de nuestro técnico para auditar grosor de forjados, estado de bajantes y calidades exactas. Todos los presupuestos contemplan el <strong>21% de IVA legal</strong> aplicable en España.
        </p>
      </section>

      {/* The Interactive Calculator Component */}
      <section className="space-y-6">
        <ValueCalculator lang="es" onOpenActionModal={onOpenActionModal} />
      </section>

      {/* Guide to PRESTO Construction Chapters */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
            Capítulos de Obra Incluidos en la Medición PRESTO
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Transparencia partida por partida para que sepas a dónde va cada euro de tu inversión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">Capítulo 01</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Demoliciones y Gestión Ecológica</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Derribo controlado de tabiques no estructurales, picado de alicatados y retirada de escombros en vertedero autorizado con canon medioambiental.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">Capítulo 02</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Albañilería y Trasdosados Acústicos</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Tabiquería seca Pladur con aislamiento de lana de roca, recrecido de soleras autonivelantes y falsos techos registrables.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">Capítulo 03</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Fontanería y Sanitarios</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Canalizaciones de polietileno reticulado (PEX) sin uniones en suelo, griferías empotradas y sanitarios suspendidos con cisterna oculta.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">Capítulo 04</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Electricidad REBT e Iluminación</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Cuadro general de protección según normativa actual, cableado libre de halógenos, tomas RJ45 y foseados de luz indirecta LED.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">Capítulo 05</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Climatización y Eficiencia Energética</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Instalación de bomba de calor por aerotermia para frío/calor, conductos con control zonal Airzone y ventilación con recuperación de calor.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">Capítulo 06</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Carpinterías y Acabados de Suelos</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Ventanas de aluminio con rotura de puente térmico y vidrio bajo emisivo acústico, parquet multicapa de roble o microcemento pulido.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif max-w-2xl mx-auto">
          ¿Quieres un presupuesto oficial PRESTO cerrado tras revisión in situ?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Pide una cita técnica. Nuestro arquitecto realizará la visita presencial sin compromiso para medir todas las partidas de tu vivienda.
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
