import React, { useState } from 'react';
import { X, User, ShieldCheck, Wifi, Download, Sparkles, FileText, FileCheck2 } from 'lucide-react';
import { mockProjectMilestones, opportunitiesList } from '../data/mockData';
import { StrategicActionType } from './StrategicCTAButton';
import { Language } from '../types';

interface PersonalAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const PersonalAreaModal: React.FC<PersonalAreaModalProps> = ({
  isOpen,
  onClose,
  onOpenActionModal
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'saved' | 'budgets' | 'documents'>('projects');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 max-h-[90vh] flex flex-col transition-colors">
        
        {/* Top Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white transition-colors">Panel Personal de Cliente</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                  Verificado
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Propietario / Comprador · ID: INV-2026-942</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Offline sync status */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
              <span>Sincronizado localmente</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-6 gap-2 overflow-x-auto text-xs font-semibold transition-colors">
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Mis Proyectos Activos (0)
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'saved'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Viviendas Guardadas (0)
          </button>
          <button
            onClick={() => setActiveTab('budgets')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'budgets'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Presupuestos & Tasaciones (0)
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'documents'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Documentación Técnica (0)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'projects' && (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  No tienes proyectos de reforma activos todavía
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Cuando inicies la venta o compra con transformación, podrás seguir aquí en tiempo real las fases de obra, fotos de avance del jefe de obra, certificados y plazos de entrega.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => { onClose(); onOpenActionModal('valuation'); }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-900/20"
                >
                  Solicitar Valoración In Situ
                </button>
                <button
                  type="button"
                  onClick={() => { onClose(); onOpenActionModal('appointment'); }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700"
                >
                  Pide una Cita Técnica
                </button>
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="py-12 text-center space-y-3 max-w-md mx-auto">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">No tienes viviendas guardadas en seguimiento</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explora nuestras oportunidades inmobiliarias para transformarlas a tu gusto y guárdalas para compararlas.
              </p>
            </div>
          )}

          {activeTab === 'budgets' && (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">Sin presupuestos PRESTO ni tasaciones previas</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tras la visita técnica de nuestro arquitecto in situ, recibirás aquí el cuadro de precios oficial desglosado con 21% de IVA legal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => { onClose(); onOpenActionModal('valuation'); }}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
              >
                Solicitar Medición Técnica
              </button>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="py-12 text-center space-y-3 max-w-md mx-auto">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <Download className="w-6 h-6" />
              </div>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">Carpeta Documental Vacía</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aquí podrás descargar tus planos ejecutivos 3D, licencias municipales concedidas, certificados energéticos A y contratos visados.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 transition-colors">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encriptación de grado bancario SSL 256-bit</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
