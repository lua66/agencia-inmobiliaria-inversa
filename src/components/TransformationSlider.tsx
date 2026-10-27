import React, { useState, useRef, useCallback } from 'react';
import { transformationCases } from '../data/mockData';
import { translations } from '../locales/translations';
import { Language } from '../types';
import { Sparkles, TrendingUp, Zap, Check } from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from './StrategicCTAButton';

interface TransformationSliderProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const TransformationSlider: React.FC<TransformationSliderProps> = ({
  lang,
  onOpenActionModal
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(transformationCases[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const t = translations[lang].slider;
  const currentCase = transformationCases.find((c) => c.id === selectedCaseId) || transformationCases[0];

  const handlePointerMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      handlePointerMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="proyectos" className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-500/20 text-sky-700 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t.eyebrow}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight mb-3 transition-colors">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 transition-colors">
            {t.subtitle}
          </p>

          {/* Project Selector Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {transformationCases.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedCaseId(item.id);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                  selectedCaseId === item.id
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-900/20 border border-sky-400/40'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none'
                }`}
              >
                {item.title.split('·')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-8 shadow-sm dark:shadow-none transition-colors">
          
          {/* Left / Main: The Interactive Image Splitter (col-span-7) */}
          <div className="lg:col-span-7 relative">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative h-[340px] sm:h-[440px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-200 dark:border-slate-700/60 shadow-xl"
            >
              {/* After Image (Full background) */}
              <img
                src={currentCase.afterImage}
                alt="Versión transformada"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-bold tracking-widest text-sky-400 uppercase">
                {t.after}
              </div>

              {/* Before Image (Clipped overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={currentCase.beforeImage}
                  alt="Estado original"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover filter saturate-75"
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                  {t.before}
                </div>
              </div>

              {/* Slider Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(56,189,248,0.8)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-white shadow-xl flex items-center justify-center text-[10px] text-white font-bold">
                  ↔
                </div>
              </div>
            </div>

            {/* Micro instructions */}
            <p className="text-center text-xs text-slate-500 mt-3 font-mono">
              ↔ Arrastra la barra o pulsa para comparar el antes y después
            </p>
          </div>

          {/* Right: Quantified Transformation Impact Breakdown (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                {currentCase.location}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 transition-colors">
                {currentCase.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed transition-colors">
                {currentCase.description}
              </p>
            </div>

            {/* Financial Impact Cards Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>{t.investment} (con 21% IVA)</span>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums font-mono transition-colors">
                  {currentCase.renovationCost.toLocaleString('es-ES')} €
                </p>
                <span className="text-[10px] text-slate-500 block">
                  {currentCase.durationWeeks} semanas · Baremos PRESTO
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-500/30 transition-colors">
                <div className="flex items-center gap-1.5 text-sky-700 dark:text-sky-400 text-xs mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{t.valueIncrease}</span>
                </div>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums font-mono">
                  +{currentCase.valueAddedPct}%
                </p>
                <span className="text-[10px] text-sky-700 dark:text-sky-300 font-medium block">
                  {currentCase.finalMarketValue.toLocaleString('es-ES')} € valor tasación
                </span>
              </div>

            </div>

            {/* Highlights List */}
            <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Actuaciones y Garantías Técnicas:
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                {currentCase.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div className="pt-2 flex flex-col gap-2">
              <StrategicCTAButton
                actionType="valuation"
                label="SOLICITAR AUDITORÍA IN SITU DE MI VIVIENDA"
                onClick={() => onOpenActionModal('valuation')}
                size="md"
                variant="primary"
                className="w-full text-xs"
              />
              <p className="text-[10px] text-slate-500 text-center">
                * Medición presencial por técnico colegiado con presupuesto cerrado s/ PRESTO.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
