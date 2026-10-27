import React, { useState } from 'react';
import { Calculator, Clock, AlertTriangle, FileCheck2, Info } from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from './StrategicCTAButton';
import { Language } from '../types';

interface ValueCalculatorProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const ValueCalculator: React.FC<ValueCalculatorProps> = ({
  onOpenActionModal
}) => {
  const [sqm, setSqm] = useState<number>(90);
  const [currentCondition, setCurrentCondition] = useState<'outdated' | 'average' | 'poor'>('outdated');
  const [renovationTier, setRenovationTier] = useState<'staging' | 'partial' | 'integral'>('partial');
  const [zonePricePerM2] = useState<number>(3400);
  const [includeIva, setIncludeIva] = useState<boolean>(true);

  // Calculation formulas calibrated to realistic Spanish construction database standards (PRESTO)
  const baseValue = sqm * zonePricePerM2;

  // Condition penalty/discount
  const conditionFactor = {
    poor: 0.80,
    outdated: 0.86,
    average: 0.94
  }[currentCondition];

  const currentAsIsValue = Math.round(baseValue * conditionFactor);

  // Realistic Base Renovation cost per m2 (without IVA) based on PRESTO construction benchmarks
  const baseCostPerM2 = {
    staging: 140,     // Puesta a punto, pintura, iluminación, estilismo
    partial: 520,     // Cocina + 2 baños + parquet + electricidad parcial
    integral: 890     // Derribos, tabiquería, fontanería, electricidad completa, clima aerotermia, carpinterías
  }[renovationTier];

  const netRenoCost = Math.round(sqm * baseCostPerM2);
  const ivaAmount = Math.round(netRenoCost * 0.21); // 21% IVA
  const totalRenoCostWithIva = netRenoCost + ivaAmount;

  // Post renovation price uplift multiplier (real net market value surge)
  const upliftPct = {
    staging: 0.14,
    partial: 0.32,
    integral: 0.52
  }[renovationTier];

  const projectedValue = Math.round(currentAsIsValue * (1 + upliftPct));
  const netGain = projectedValue - currentAsIsValue - totalRenoCostWithIva;
  const roi = Math.round((netGain / (totalRenoCostWithIva || 1)) * 100);

  const daysToSell = {
    staging: 32,
    partial: 21,
    integral: 14
  }[renovationTier];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl transition-colors">
      
      {/* Header with PRESTO Standard Compliance Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">Calculadora de Potencial y Presupuesto Orientativo</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Estimación preliminar fundamentada en baremos de precios de la construcción (Bases PRESTO)</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-[11px] text-sky-700 dark:text-sky-300 font-mono shrink-0">
          <FileCheck2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Normativa PRESTO · IVA 21%</span>
        </div>
      </div>

      {/* Mandatory Technical Disclaimer Box */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-500/40 text-xs text-amber-900 dark:text-amber-200/90 flex items-start gap-3 transition-colors">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-800 dark:text-amber-300">
            Aviso de Transparencia y Rigor Técnico:
          </p>
          <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
            Los importes mostrados son <strong className="text-slate-900 dark:text-white">cálculos aproximados y meramente orientativos</strong> basados en los cuadros de precios estándar de edificación en España (PRESTO). <strong className="text-amber-700 dark:text-amber-300">Ningún presupuesto es definitivo ni vinculante hasta que el técnico o arquitecto visita y revisa la obra in situ</strong> para auditar estructura, estado de canalizaciones y calidades reales. Todas las partidas contemplan el <strong className="text-slate-900 dark:text-white">21% de IVA legal</strong> aplicable.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Inputs (col-span-6) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Surface Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span>Superficie de la vivienda</span>
              <span className="text-sky-600 dark:text-sky-400 font-mono text-sm">{sqm} m²</span>
            </div>
            <input
              type="range"
              min={40}
              max={260}
              step={5}
              value={sqm}
              onChange={(e) => setSqm(Number(e.target.value))}
              className="w-full accent-sky-500 h-2 bg-slate-200 dark:bg-slate-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
              <span>40 m²</span>
              <span>150 m²</span>
              <span>260 m²</span>
            </div>
          </div>

          {/* Current Condition */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Estado inicial de conservación
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCurrentCondition('poor')}
                className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                  currentCondition === 'poor'
                    ? 'bg-sky-50 dark:bg-sky-500/10 border-sky-500 text-sky-700 dark:text-sky-300 font-bold'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                A reformar integral
              </button>
              <button
                type="button"
                onClick={() => setCurrentCondition('outdated')}
                className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                  currentCondition === 'outdated'
                    ? 'bg-sky-50 dark:bg-sky-500/10 border-sky-500 text-sky-700 dark:text-sky-300 font-bold'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Antiguo (años 70-90)
              </button>
              <button
                type="button"
                onClick={() => setCurrentCondition('average')}
                className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                  currentCondition === 'average'
                    ? 'bg-sky-50 dark:bg-sky-500/10 border-sky-500 text-sky-700 dark:text-sky-300 font-bold'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                Conservado / Funcional
              </button>
            </div>
          </div>

          {/* Target Renovation Strategy */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Alcance de la intervención técnica
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setRenovationTier('staging')}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  renovationTier === 'staging'
                    ? 'bg-sky-50 dark:bg-sky-500/10 border-sky-500 text-slate-900 dark:text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-200">1. Puesta a punto & Estilismo Inmobiliario</span>
                  <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-bold">~140 €/m² base</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Pintura plástica premium, revisión de mecanismos, iluminación LED y estilismo.</p>
              </button>

              <button
                type="button"
                onClick={() => setRenovationTier('partial')}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  renovationTier === 'partial'
                    ? 'bg-sky-50 dark:bg-sky-500/10 border-sky-500 text-slate-900 dark:text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-200">2. Reforma Parcial Clave (Cocina + Baños + Suelos)</span>
                  <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-bold">~520 €/m² base</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Renovación integral de zonas húmedas, pavimentos, carpinterías interiores y cuadro eléctrico.</p>
              </button>

              <button
                type="button"
                onClick={() => setRenovationTier('integral')}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  renovationTier === 'integral'
                    ? 'bg-sky-50 dark:bg-sky-500/10 border-sky-500 text-slate-900 dark:text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-200">3. Transformación Integral & Eficiencia Energética</span>
                  <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-bold">~890 €/m² base</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Redistribución de espacios, fontanería/electricidad total, clima aerotermia y aislamiento A.</p>
              </button>
            </div>
          </div>

          {/* IVA Toggle & Transparency Info */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 transition-colors">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Desglose impositivo:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIncludeIva(false)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${!includeIva ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold' : 'text-slate-400 dark:text-slate-500'}`}
              >
                Base Imponible
              </button>
              <button
                type="button"
                onClick={() => setIncludeIva(true)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${includeIva ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 dark:text-slate-500'}`}
              >
                Incluye 21% IVA
              </button>
            </div>
          </div>

        </div>

        {/* Right Output Projections (col-span-6) */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-colors">
          
          <div className="space-y-3.5">
            
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-slate-500 dark:text-slate-400">Valor de venta en estado actual</span>
              <span className="font-semibold text-slate-900 dark:text-slate-300 font-mono text-sm">
                {currentAsIsValue.toLocaleString('es-ES')} €
              </span>
            </div>

            {/* Renovation itemized with Base and 21% IVA */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-xs shadow-sm dark:shadow-none transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Presupuesto obra (Base imponible PRESTO)</span>
                <span className="font-mono text-slate-900 dark:text-slate-300">{netRenoCost.toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                <span>+ 21% IVA de obra legal</span>
                <span className="font-mono">+{ivaAmount.toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex justify-between items-center pt-1.5 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white">
                <span>Coste Total Estimado Obra (con IVA)</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">{totalRenoCostWithIva.toLocaleString('es-ES')} €</span>
              </div>
            </div>

            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-slate-500 dark:text-slate-400">Valor estimado tras intervención</span>
              <span className="font-bold text-sky-600 dark:text-sky-400 font-mono text-base">
                {projectedValue.toLocaleString('es-ES')} €
              </span>
            </div>

            {/* Net Gain Card */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-gradient-to-br dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-300 dark:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                    Plusvalía Neta Extra para el Propietario (Descontado Obra e IVA)
                  </span>
                  <p className="text-2xl font-extrabold font-serif text-emerald-700 dark:text-emerald-400 tabular-nums mt-0.5">
                    +{netGain.toLocaleString('es-ES')} €
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Rentabilidad (ROI)</span>
                  <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">+{roi}%</p>
                </div>
              </div>
            </div>

            {/* Time metric */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-0.5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Tiempo medio estimado de venta post-reforma:</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">{daysToSell} días</span>
            </div>
          </div>

          <div className="pt-5">
            <StrategicCTAButton
              actionType="valuation"
              label="SOLICITAR REVISIÓN TÉCNICA Y PRESUPUESTO IN SITU"
              onClick={() => onOpenActionModal('valuation')}
              size="md"
              variant="glow"
              className="w-full text-xs"
            />
            <p className="text-center text-[10px] text-slate-500 mt-2">
              * Visita técnica sin compromiso para medición de partidas y confirmación de presupuesto vinculante.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
