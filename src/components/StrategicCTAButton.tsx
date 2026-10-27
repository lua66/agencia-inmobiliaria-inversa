import React from 'react';
import { Home, Calendar, Sparkles, ArrowUpRight } from 'lucide-react';

export type StrategicActionType = 'valuation' | 'appointment';

interface StrategicCTAButtonProps {
  actionType: StrategicActionType;
  label?: string;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'glow';
  className?: string;
  iconOnly?: boolean;
}

export const StrategicCTAButton: React.FC<StrategicCTAButtonProps> = ({
  actionType,
  label,
  onClick,
  size = 'md',
  variant = 'primary',
  className = '',
  iconOnly = false
}) => {
  const isValuation = actionType === 'valuation';
  
  const defaultLabel = isValuation ? 'VALORA TU VIVIENDA' : 'PIDE UNA CITA';
  const displayLabel = label || defaultLabel;

  // Size styles
  const sizeClasses = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-xs font-semibold px-4 py-2.5 gap-2 tracking-wide',
    lg: 'text-sm font-semibold px-6 py-3.5 gap-2.5 tracking-wider'
  }[size];

  // Base styling adhering to the brand sapphire / ocean blue and slate palette
  const getVariantClasses = () => {
    if (isValuation) {
      if (variant === 'glow') {
        return 'bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] border border-sky-400/30';
      }
      if (variant === 'outline') {
        return 'bg-transparent text-sky-400 hover:text-white border border-sky-500/40 hover:bg-sky-500/10 hover:border-sky-400';
      }
      return 'bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-950/50 border border-sky-400/20 active:scale-[0.98]';
    } else {
      // Appointment
      if (variant === 'glow') {
        return 'bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 text-white border border-slate-700 dark:border-slate-600 hover:border-sky-400 shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98]';
      }
      if (variant === 'outline') {
        return 'bg-transparent text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:border-slate-400 dark:hover:border-slate-500';
      }
      return 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700/60 shadow-sm active:scale-[0.98]';
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      data-strategic-action={actionType}
      className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap select-none font-medium ${sizeClasses} ${getVariantClasses()} ${className}`}
      title={displayLabel}
    >
      {isValuation ? (
        <Home className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4 text-sky-300'} />
      ) : (
        <Calendar className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4 text-sky-400'} />
      )}
      
      {!iconOnly && <span>{displayLabel}</span>}
      
      {!iconOnly && (
        <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
};
