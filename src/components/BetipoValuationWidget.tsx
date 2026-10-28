import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface BetipoValuationWidgetProps {
  onSuccess?: () => void;
}

export const BetipoValuationWidget: React.FC<BetipoValuationWidgetProps> = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadWidget() {
      try {
        setLoading(true);
        setError(null);

        const target = document.getElementById('btp-valuation-widget');
        if (!target) return;

        // Fetch the official widget configuration from Betipo API
        const response = await fetch('https://api.betipo.es/api/widget-by-inmobiliaria/3584440f-e21b-46cb-adc9-ec3c980c3c6b');
        if (!response.ok) {
          throw new Error(`Error en servidor Betipo (${response.status})`);
        }
        
        const { html, css, jscript } = await response.json();
        if (!isMounted) return;

        // 1. Inject or update CSS stylesheet
        let styleEl = document.getElementById('btp-widget-css') as HTMLStyleElement | null;
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'btp-widget-css';
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = css;

        // 2. Mount HTML inside target div
        target.innerHTML = html;
        setLoading(false);

        // 3. Inject & execute Betipo JS (re-created on mount to rebind events)
        const oldScript = document.getElementById('btp-widget-js');
        if (oldScript) {
          oldScript.remove();
        }

        const scriptEl = document.createElement('script');
        scriptEl.id = 'btp-widget-js';
        scriptEl.textContent = jscript;
        document.body.appendChild(scriptEl);

      } catch (err) {
        console.error('Error cargando el widget de valoración Betipo:', err);
        if (isMounted) {
          // Fallback: standard cdn script tag
          const existingCdn = document.getElementById('btp-cdn-script');
          if (!existingCdn) {
            const script = document.createElement('script');
            script.id = 'btp-cdn-script';
            script.src = 'https://cdn.betipo.es/widget.js';
            script.async = true;
            document.body.appendChild(script);
          }
          setLoading(false);
        }
      }
    }

    loadWidget();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Official Betipo Widget Container */}
      <div
        id="btp-valuation-widget"
        data-widget-id="3584440f-e21b-46cb-adc9-ec3c980c3c6b"
        className="w-full min-h-[420px] flex items-center justify-center transition-all"
      >
        {loading && (
          <div className="py-16 flex flex-col items-center justify-center space-y-3 text-slate-500 dark:text-slate-400">
            <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
            <p className="text-xs font-medium">Cargando herramienta oficial de valoración...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-600 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
