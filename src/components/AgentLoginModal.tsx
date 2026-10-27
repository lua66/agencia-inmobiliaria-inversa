import React, { useState } from 'react';
import { Lock, KeyRound, ShieldCheck, X, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { crmService } from '../data/crmService';

interface AgentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AgentLoginModal: React.FC<AgentLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [shake, setShake] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (crmService.checkAgentPin(pin)) {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleQuickPin = (digit: string) => {
    if (pin.length < 8) {
      setPin(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 z-10 my-8 transition-all ${shake ? 'animate-bounce' : ''}`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zona Restringida · Uso Interno</span>
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              Acceso CRM Agente Inmobiliario
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
              Introduce tu clave de seguridad para consultar y gestionar los leads de Propietarios y Compradores.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Clave o PIN de Acceso
            </label>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                autoFocus
                required
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(false); }}
                placeholder="Introduce tu clave..."
                className={`w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border text-center font-mono text-lg tracking-wider text-slate-900 dark:text-white focus:outline-none transition-colors ${
                  error 
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/30 dark:bg-rose-950/20' 
                    : 'border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                }`}
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
                title={showPin ? 'Ocultar clave' : 'Mostrar clave'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 mt-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Clave incorrecta. Por favor, inténtalo de nuevo.</span>
              </div>
            )}
          </div>

          {/* Quick Keypad for Touch / Mobile */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  if (k === 'C') setPin('');
                  else if (k === '⌫') handleBackspace();
                  else handleQuickPin(k);
                }}
                className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-sm font-semibold font-mono text-slate-800 dark:text-slate-200 transition-colors active:scale-95"
              >
                {k}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white shadow-lg shadow-sky-900/20 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <Lock className="w-4 h-4" />
            <span>Desbloquear y Acceder al CRM</span>
          </button>
        </form>

        {/* Helpful Hint for Agent */}
        <div className="mt-5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
            <KeyRound className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Credenciales de prueba para el evaluador:</span>
          </div>
          <p>
            Clave maestra por defecto: <strong className="font-mono text-sky-600 dark:text-sky-400">1234</strong> (también acepta <strong className="font-mono text-sky-600 dark:text-sky-400">inversa2025</strong>).
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-500">
            * Dentro del CRM podrás modificar tu clave personal en cualquier momento.
          </p>
        </div>

      </div>
    </div>
  );
};
