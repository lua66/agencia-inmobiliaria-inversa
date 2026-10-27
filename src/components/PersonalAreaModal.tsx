import React, { useState } from 'react';
import { X, User, ShieldCheck, Wifi, Download, Sparkles, FileText } from 'lucide-react';
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
            Mis Proyectos Activos (1)
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'saved'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Viviendas Guardadas ({opportunitiesList.length})
          </button>
          <button
            onClick={() => setActiveTab('budgets')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'budgets'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Presupuestos & Tasaciones (2)
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'documents'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-bold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Documentación Técnica
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                      Reforma Integral en Curso
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Ático Pau Claris, Eixample Dret</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Progreso global:</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono ml-2">74%</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-2 mb-4 overflow-hidden">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: '74%' }} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                    <span className="text-[10px] text-slate-500 block">Fase actual</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Suelos & Acabados</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                    <span className="text-[10px] text-slate-500 block">Presupuesto</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400 font-mono">65.000 € (Cerrado)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                    <span className="text-[10px] text-slate-500 block">Entrega prevista</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">18 Oct 2026</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                    <span className="text-[10px] text-slate-500 block">Director de Obra</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Arq. Martín V.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/40 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">¿Quieres añadir un nuevo proyecto o vivienda?</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">Nuestro equipo puede valorar cualquier nuevo inmueble.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { onClose(); onOpenActionModal('valuation'); }}
                  className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
                >
                  Nueva Valoración
                </button>
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {opportunitiesList.map((opp) => (
                <div key={opp.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex gap-3 shadow-sm dark:shadow-none">
                  <img src={opp.image} alt={opp.title} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">{opp.title}</h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{opp.location}</p>
                    <p className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono mt-1">
                      {opp.currentPrice.toLocaleString('es-ES')} €
                    </p>
                    <span className="text-[9px] text-emerald-600 dark:text-emerald-400">Potencial: {opp.potentialScore}/10</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'budgets' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">Presupuesto Ejecutivo Obra Pau Claris</h5>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Validado y visado por colegio de arquitectos</p>
                </div>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">65.000 € (Aprobado)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">Estudio de Revalorización Vivienda Provença</h5>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">Tasación comparativa previa a reforma</p>
                </div>
                <span className="font-mono font-bold text-sky-600 dark:text-sky-400">+97.000 € plusvalía</span>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-2 text-xs">
              {[
                { name: 'Licencia_Obras_Mayores_Ajuntament.pdf', size: '2.4 MB', date: '12 Sep 2026' },
                { name: 'Plano_Ejecutivo_Redistribucion_3D.dwg', size: '18.1 MB', date: '15 Sep 2026' },
                { name: 'Certificado_Eficiencia_Energetica_A.pdf', size: '1.1 MB', date: '28 Sep 2026' },
                { name: 'Poliza_Seguro_Responsabilidad_Civil.pdf', size: '840 KB', date: '01 Sep 2026' }
              ].map((doc, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <div>
                      <span className="text-slate-800 dark:text-slate-200 font-medium">{doc.name}</span>
                      <span className="text-[10px] text-slate-500 block font-mono">{doc.size} · {doc.date}</span>
                    </div>
                  </div>
                  <button className="p-2 rounded bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-sky-600 dark:text-sky-400 border border-slate-200 dark:border-slate-700">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
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
