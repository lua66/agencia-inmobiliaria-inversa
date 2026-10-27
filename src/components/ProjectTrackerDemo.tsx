import React, { useState } from 'react';
import { mockProjectMilestones } from '../data/mockData';
import { translations } from '../locales/translations';
import { Language, ProjectMilestone } from '../types';
import { CheckCircle2, Clock, FileText, Camera, Sparkles, MessageSquare } from 'lucide-react';

interface ProjectTrackerDemoProps {
  lang: Language;
}

export const ProjectTrackerDemo: React.FC<ProjectTrackerDemoProps> = ({ lang }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<ProjectMilestone>(mockProjectMilestones[3]);
  const [chatMessage, setChatMessage] = useState('');
  const [messagesList, setMessagesList] = useState([
    { sender: 'Director de Obra (Arq. Martín)', text: 'Buenos días. Hoy se ha completado el nivelado de solados y mañana inician con el microcemento.', time: '10:45' },
    { sender: 'Tú (Cliente)', text: '¡Excelente! ¿Las luminarias empotradas del pasillo ya están testeadas?', time: '11:15' },
    { sender: 'Director de Obra (Arq. Martín)', text: 'Sí, todas las líneas de baja tensión han pasado el test de aislamiento con éxito.', time: '11:30' }
  ]);

  const t = translations[lang].tracker;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessagesList([...messagesList, { sender: 'Tú (Cliente)', text: chatMessage, time: 'Ahora' }]);
    setChatMessage('');
  };

  return (
    <section className="py-24 bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-500/20 text-sky-700 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            {t.title}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
            {t.subtitle}
          </p>
        </div>

        {/* The Live Project Console Showcase */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl transition-colors">
          
          {/* Top Project Badge Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
            <div>
              <div className="inline-block px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
                {t.liveBadge}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white transition-colors">
                {t.projectLabel}
              </h3>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase block">{t.progressLabel}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base font-mono tabular-nums">74%</span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase block">{t.budgetLabel}</span>
                <span className="font-bold text-sky-600 dark:text-sky-400 text-base font-mono tabular-nums">48.200 € / 65.000 €</span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase block">{t.daysLeftLabel}</span>
                <span className="font-bold text-slate-900 dark:text-white text-base font-mono tabular-nums">18 días</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Interactive Phases & Milestones (col-span-5) */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Fases de la Transformación
              </h4>

              {mockProjectMilestones.map((m) => {
                const isSelected = selectedMilestone.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMilestone(m)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-slate-50 dark:bg-slate-950 border-sky-500 shadow-md shadow-sky-900/10 dark:shadow-sky-950'
                        : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {m.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />}
                        {m.status === 'in_progress' && <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-pulse" />}
                        {m.status === 'upcoming' && <div className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-600" />}
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{m.phase}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{m.percentage}%</span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium pl-6 line-clamp-1">{m.title}</p>
                    
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-500 pl-6 mt-1.5 font-mono">
                      <span>{m.date}</span>
                      <span>·</span>
                      <span>{m.photosCount} fotos</span>
                      <span>·</span>
                      <span>{m.documentsCount} docs</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Milestone Details, Documentation & Communication (col-span-7) */}
            <div className="lg:col-span-7 space-y-6 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    {selectedMilestone.phase}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    selectedMilestone.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800' :
                    selectedMilestone.status === 'in_progress' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800' :
                    'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                  }`}>
                    {selectedMilestone.status === 'completed' ? 'Completado' : selectedMilestone.status === 'in_progress' ? 'En Ejecución' : 'Pendiente'}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors">
                  {selectedMilestone.title}
                </h4>
                
                <p className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 leading-relaxed transition-colors">
                  {selectedMilestone.notes}
                </p>
              </div>

              {/* Photos & Docs Strip */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Álbum de Obra</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{selectedMilestone.photosCount} fotos en alta resolución</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">Certificados y Facturas</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{selectedMilestone.documentsCount} documentos validados</span>
                  </div>
                </div>
              </div>

              {/* Direct Communication Channel with Technical Lead */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-3">
                  <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>Canal Directo con la Dirección Técnica</span>
                </div>

                {/* Message list */}
                <div className="space-y-2 max-h-36 overflow-y-auto p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800/80 mb-3 text-xs">
                  {messagesList.map((msg, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span className="font-semibold text-slate-700 dark:text-slate-400">{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-200 dark:border-slate-800/50">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat form */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Escribe una consulta a tu director de obra..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Enviar
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
