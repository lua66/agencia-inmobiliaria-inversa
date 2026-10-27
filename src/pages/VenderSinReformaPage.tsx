import React from 'react';
import { 
  Home, 
  Clock, 
  CheckCircle2, 
  Camera, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  Sparkles,
  Search,
  Scale
} from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { useRouter } from '../router/RouterContext';

interface VenderSinReformaPageProps {
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const VenderSinReformaPage: React.FC<VenderSinReformaPageProps> = ({ onOpenActionModal }) => {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-sky-600 dark:hover:text-sky-400">Inicio</button>
        <span>/</span>
        <button onClick={() => navigate('/vender')} className="hover:text-sky-600 dark:hover:text-sky-400">Vender</button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Vender Tal Como Está</span>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 text-xs font-semibold tracking-wide">
          <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Plan Comercial Directo · Cero Obras · Sin Complicaciones</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
          Vende tu Vivienda Tal Como Está
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Si necesitas vender rápido por traslado laboral, herencia o simplemente prefieres no meterte en obras ni reformas previas, nuestro Plan Comercial Directo te proporciona una venta ágil, tasación realista y máxima difusión a compradores solventes.
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

      {/* 4 Steps to Sell As-Is */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
          Cómo gestionamos la venta directa de tu inmueble
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">1. Tasación Realista de Mercado</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Fijamos un precio competitivo basado en operaciones reales cerradas ante notario en tu zona, no en expectativas infladas que queman el piso.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">2. Reportaje Visual Profesional</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Fotografía de arquitectura con gran angular y luz natural, tour virtual y plano acotado para destacar los puntos fuertes de la propiedad.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">3. Cruce con Cartera de Compradores</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Conectamos inmediatamente tu inmueble con nuestra base de datos de inversores y familias que buscan vivienda para reformarla ellos mismos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">4. Gestión Jurídica y Notaría</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Revisión registral, nota simple actualizada, certificado de no infracción urbanística y acompañamiento presencial en firma notarial.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison: As-Is vs Strategic Renovation */}
      <section className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
            ¿Dudas entre vender tal como está o reformar antes?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            En nuestra visita técnica in situ te entregamos un cuadro comparativo con números exactos para que elijas libremente con datos en la mano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">Opción 1: Venta Directa As-Is</span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Vender Tal Como Está</h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>✔ Cero desembolso económico previo.</li>
              <li>✔ Puesta inmediata en el mercado en menos de 7 días.</li>
              <li>✔ Ideal si requieres liquidez urgente o no resides en la ciudad.</li>
              <li>⚠ El comprador descontará el coste de la obra en su oferta.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-sky-300 dark:border-sky-800 space-y-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Opción 2: Mejora Estratégica</span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Mejorar Antes de Vender</h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>✔ Revalorización neta superior a la inversión de obra.</li>
              <li>✔ Evita objeciones y negociaciones agresivas a la baja.</li>
              <li>✔ Venta en menos de 30 días de media.</li>
              <li>✔ Coordinación integral llave en mano por Inmobiliaria Inversa.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif max-w-2xl mx-auto">
          ¿Quieres una valoración realista para venta directa?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Contacta con nuestros técnicos para agendar una visita preliminar. Te daremos un rango de precio veraz y un plan de comercialización inmediato.
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
