import React from 'react';
import { 
  Building2, 
  Search, 
  Hammer, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Compass,
  FileCheck2
} from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { opportunitiesList } from '../data/mockData';
import { useRouter } from '../router/RouterContext';

interface ComprarParaReformarPageProps {
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const ComprarParaReformarPage: React.FC<ComprarParaReformarPageProps> = ({ onOpenActionModal }) => {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-sky-600 dark:hover:text-sky-400">Inicio</button>
        <span>/</span>
        <button onClick={() => navigate('/comprar')} className="hover:text-sky-600 dark:hover:text-sky-400">Comprar</button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">Comprar para Reformar</span>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Servicio Integral: Encuentra → Compra → Transforma</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
          Comprar y Transformar tu Nueva Vivienda
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          No te conformes con distribuciones anticuadas o acabados genéricos elegidos por terceros. Te ayudamos a encontrar una vivienda con alto potencial arquitectónico y la convertimos en exactamente lo que imaginas, con presupuesto PRESTO cerrado antes de firmar arras.
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

      {/* Concept Infographic: ENCUENTRA -> COMPRA -> TRANSFORMA */}
      <section className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Metodología Inversa</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
            El Recorrido: Encuentra → Compra → Transforma
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Seguridad técnica total antes de desembolsar dinero en arras o hipoteca.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">ENCUENTRA</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Rastreamos el mercado buscando viviendas a reformar con excelente ubicación, buena orientación y precio por m² con margen de revalorización.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">COMPRA</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Un arquitecto te acompaña a la visita técnica para calcular el coste real de obra según baremos PRESTO (+21% IVA) y negociar el precio con argumentos técnicos sólidos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">TRANSFORMA</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Diseño, licencias municipales y dirección integral de la obra con nuestra red de industriales cualificados. Llave en mano, fecha cerrada y garantía por contrato.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties with Renovation Potential */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
              Viviendas con Alto Potencial de Transformación
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Oportunidades auditadas con estimación de reforma s/ baremos PRESTO e IVA desglosado.
            </p>
          </div>
          <button
            onClick={() => navigate('/proyectos')}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Ver casos finalizados</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opportunitiesList.map(opp => (
            <div 
              key={opp.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={opp.image} 
                  alt={opp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-md">
                  Potencial: {opp.potentialScore}/10
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-600 text-white font-bold">
                  {opp.currentPrice.toLocaleString('es-ES')} €
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 block font-mono">{opp.location} · {opp.neighborhood}</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{opp.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{opp.transformationConcept}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">+ Obra PRESTO (21% IVA):</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      ~{opp.estimatedRenoCost.toLocaleString('es-ES')} €
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenActionModal('appointment')}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
                  >
                    Visita Técnica
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-white text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-serif max-w-2xl mx-auto">
          ¿Buscas una vivienda para transformarla a tu gusto?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Cuéntanos qué zona te interesa y qué presupuesto manejas. Un asesor técnico te presentará opciones con anteproyecto preliminar de reforma.
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
