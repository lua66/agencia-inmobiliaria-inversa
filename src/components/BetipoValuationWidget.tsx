import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface BetipoValuationWidgetProps {
  onSuccess?: () => void;
}

export const BetipoValuationWidget: React.FC<BetipoValuationWidgetProps> = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadWidget() {
      try {
        setLoading(true);
        setError(null);

        const target = document.getElementById('btp-valuation-widget');
        if (!target) return;

        // Fetch widget via local proxy route to bypass Betipo's 500 origin restriction
        const proxyUrl = '/api/betipo/api/widget-by-inmobiliaria/3584440f-e21b-46cb-adc9-ec3c980c3c6b';
        let response = await fetch(proxyUrl);
        
        // If proxy not reachable, try direct fallback
        if (!response.ok) {
          response = await fetch('https://api.betipo.es/api/widget-by-inmobiliaria/3584440f-e21b-46cb-adc9-ec3c980c3c6b');
        }

        if (!response.ok) {
          throw new Error(`El servicio de valoración no está disponible temporalmente (${response.status})`);
        }

        const data = await response.json();
        if (!isMounted) return;

        const { html, css, jscript } = data;

        // 1. Inject or update Betipo CSS stylesheet
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

        // 3. Patch JS so internal API calls (catastro, leads, etc.) are routed through the proxy
        const patchedJs = (jscript || '').replaceAll('https://api.betipo.es', '/api/betipo');

        // Remove any previous instance of the script
        const oldScript = document.getElementById('btp-widget-js');
        if (oldScript) {
          oldScript.remove();
        }

        // Execute patched Betipo script
        const scriptEl = document.createElement('script');
        scriptEl.id = 'btp-widget-js';
        scriptEl.textContent = patchedJs;
        document.body.appendChild(scriptEl);

      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : 'Error al conectar con el servidor de valoración';
        console.error('Error cargando el widget de valoración Betipo:', err);
        if (isMounted) {
          setError(errMsg);
          setLoading(false);
        }
      }
    }

    loadWidget();

    return () => {
      isMounted = false;
    };
  }, [retryKey]);

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
          <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-600 text-amber-800 dark:text-amber-200 text-xs flex flex-col items-center gap-3 text-center">
            <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-semibold text-sm">No se pudo cargar la herramienta de valoración</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setRetryKey(k => k + 1)}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-500 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reintentar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
