import React from 'react';
import { Logo } from './Logo';
import { translations } from '../locales/translations';
import { Language } from '../types';
import { useRouter, PageRoute } from '../router/RouterContext';
import { Wifi, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { StrategicCTAButton, StrategicActionType } from './StrategicCTAButton';

interface FooterProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenActionModal
}) => {
  const t = translations[lang].footer;
  const navT = translations[lang].nav;
  const { navigate } = useRouter();

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* Contact & Navigation Strip */}
      <div id="contacto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-200 dark:border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-left focus:outline-none"
            >
              <Logo variant="horizontal" size="sm" className="mb-2" />
            </button>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {t.tagline}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Transformando el sector inmobiliario desde hace más de 10 años. Baremos oficiales PRESTO y compromiso de acompañamiento antes, durante y después.
            </p>
          </div>

          {/* Páginas Principales (Internal Linking for SEO & Google Indexing) */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Páginas de la Web
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Portada e Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/vender')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Quiero Vender (Propietarios)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/comprar')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Quiero Comprar (Compradores)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/proyectos')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Casos Reales y Reformas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/nosotros')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Sobre Nosotros y Equipo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contacto')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Sedes y Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Sedes Físicas */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Sedes Centrales
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Barcelona: Passeig de Gràcia 48</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Madrid: Calle Velázquez 32</span>
              </li>
              <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>Valencia: Calle Colón 18</span>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/contacto')}
                  className="text-sky-600 dark:text-sky-400 text-xs font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Ver todas las delegaciones</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto Directo & Acciones */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Atención Directa
            </h4>
            <div className="space-y-2 text-xs mb-4">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                <span className="font-mono">+34 934 810 920</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>hola@inmobiliariainversa.com</span>
              </div>
            </div>

            <div className="space-y-2">
              <StrategicCTAButton
                actionType="valuation"
                label={navT.valuationCTA}
                onClick={() => onOpenActionModal('valuation')}
                size="sm"
                variant="primary"
                className="w-full text-xs"
              />
              <StrategicCTAButton
                actionType="appointment"
                label={navT.appointmentCTA}
                onClick={() => onOpenActionModal('appointment')}
                size="sm"
                variant="outline"
                className="w-full text-xs"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>© 2026 Agencia Inmobiliaria Inversa. Todos los derechos reservados.</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer">Aviso Legal y Transparencia</span>
          <span>·</span>
          <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer">Política de Privacidad (RGPD)</span>
          <span>·</span>
          <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer">Política de Cookies</span>
          <span>·</span>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400/80">
            <Wifi className="w-3 h-3" />
            <span>Sincronización PWA Activa</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
