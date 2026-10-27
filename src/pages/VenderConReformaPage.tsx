import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Users, 
  Hammer,
  BadgePercent
} from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { TransformationSlider } from '../components/TransformationSlider';
import { useRouter } from '../router/RouterContext';

interface VenderConReformaPageProps {
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const VenderConReformaPage: React.FC<VenderConReformaPageProps> = ({ onOpenActionModal }) => {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb for Google Indexation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-sky-600 dark:hover:text-sky-400">Inicio</button>
        <span>/</span>
        <button onClick={() => navigate('/vender')} className="hover:text-sky-600 dark:hover:text-sky-400">Vender</button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Vender con Reforma Estratégica</span>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Estrategia de Revalorización Inmobiliaria · Plusvalía Optimizada</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
          Vender con Reforma Estratégica Previa
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          No malvendas tu propiedad en mal estado sufriendo negociaciones agresivas a la baja. Analizamos el potencial de la vivienda, estudiamos las mejoras clave y coordinamos industriales homologados para preparar el inmueble antes de su comercialización.
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

      {/* Honest Commitment & Technical Warning */}
      <section className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <h2 className="text-xs font-bold uppercase tracking-wider">Criterio Profesional: Sin Promesas Vacías</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px] sm:text-xs">
          En Agencia Inmobiliaria Inversa nunca prometemos subidas automáticas de precio ni plazos mágicos sin auditoría previa. Estudiamos caso a caso: si una reforma no va a generar una plusvalía neta superior al coste de la obra (computando el <strong>21% de IVA legal</strong>), te recomendaremos con total honestidad vender la vivienda tal como está.
        </p>
      </section>

      {/* Real Transformation Before & After Slider */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
            Resultados Reales de Intervenciones Estratégicas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compara el estado original y la transformación arquitectónica de nuestras operaciones gestionadas.
          </p>
        </div>
        <TransformationSlider lang="es" onOpenActionModal={onOpenActionModal} />
      </section>

      {/* The 3-Phase Cycle: ANTES, DURANTE Y DESPUÉS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
            El Ciclo Completo: Antes, Durante y Después
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Acompañamos al vendedor en todas las fases del proceso inmobiliario con un único interlocutor técnico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phase 1: ANTES */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <span>1</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Fase Preliminar</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">ANTES de la Venta</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Valoración e inspección in situ de la vivienda.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Detección de puntos críticos y mejoras de alto retorno.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Proyecto de obra y presupuesto PRESTO con 21% IVA cerrado.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Ejecución y dirección de obra por industriales homologados.</span>
              </li>
            </ul>
          </div>

          {/* Phase 2: DURANTE */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <span>2</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Fase Comercial</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">DURANTE la Operación</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Home Staging profesional y reportaje fotográfico HDR.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Comercialización premium en portales nacionales e internacionales.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Filtrado riguroso de compradores con solvencia acreditada.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Defensa del precio de venta sin aceptar rebajas desproporcionadas.</span>
              </li>
            </ul>
          </div>

          {/* Phase 3: DESPUÉS */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <span>3</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Fase de Cierre</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">DESPUÉS de la Venta</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Formalización en notaría y redacción de contratos con garantías.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Entrega de libro del edificio y certificados de instalaciones.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Gestión de plusvalía municipal y liquidación fiscal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Garantía decenal y seguimiento post-venta para ambas partes.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif max-w-2xl mx-auto">
          ¿Quieres saber si te conviene mejorar tu vivienda antes de vender?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Solicita una valoración in situ sin compromiso. Te presentaremos la comparativa económica entre venta tal como está y venta con reforma estratégica.
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
