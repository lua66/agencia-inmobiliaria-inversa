import React, { useState } from 'react';
import { Logo } from './Logo';
import { translations } from '../locales/translations';
import { Language, Theme } from '../types';
import { useRouter, PageRoute } from '../router/RouterContext';
import { Sun, Moon, Globe, User, Menu, X, Bell, Lock } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenPersonalArea: () => void;
  onOpenNotifications: () => void;
  onOpenAgentCrm: () => void;
  unreadNotificationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  theme,
  onToggleTheme,
  onOpenPersonalArea,
  onOpenNotifications,
  onOpenAgentCrm,
  unreadNotificationsCount = 2,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { currentPath, navigate } = useRouter();

  const t = translations[lang].nav;

  // Pages structure with responsive full/short labels
  const navLinks: { path: PageRoute; label: string; shortLabel: string; hashSection?: string }[] = [
    { path: '/', label: 'Inicio', shortLabel: 'Inicio' },
    { path: '/vender', label: t.seller, shortLabel: 'Vender' },
    { path: '/comprar', label: t.buyer, shortLabel: 'Comprar' },
    { path: '/proyectos', label: t.projects, shortLabel: 'Casos' },
    { path: '/nosotros', label: 'Nosotros', shortLabel: 'Nosotros' },
    { path: '/contacto', label: t.contact, shortLabel: 'Contacto' }
  ];

  const handleLinkClick = (path: PageRoute, hashSection?: string) => {
    navigate(path, hashSection);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 overflow-hidden">
        
        {/* Brand Lockup / Logo */}
        <button
          type="button"
          onClick={() => handleLinkClick('/')}
          className="flex items-center text-left group focus:outline-none shrink-0"
        >
          <Logo variant="horizontal" size="sm" />
        </button>

        {/* Primary Navigation Links (Desktop / Laptop) */}
        <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 text-xs font-medium tracking-wide shrink min-w-0">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => handleLinkClick(link.path, link.hashSection)}
                className={`transition-colors whitespace-nowrap py-1 relative px-1 xl:px-1.5 ${
                  isActive 
                    ? 'text-sky-600 dark:text-sky-400 font-semibold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {/* Short label on laptop (1024-1280px), full label on xl screens */}
                <span className="hidden xl:inline">{link.label}</span>
                <span className="inline xl:hidden">{link.shortLabel}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Essential Actions: Notificaciones, Idioma, Tema, Área Personal, Menú */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Notifications Button */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors shrink-0"
            title="Notificaciones de proyecto"
            aria-label="Notificaciones"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors uppercase"
              aria-label="Seleccionar idioma"
            >
              <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>{lang}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1 z-50">
                <button
                  type="button"
                  onClick={() => { onLanguageChange('es'); setLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${lang === 'es' ? 'text-sky-600 dark:text-sky-400 font-semibold bg-slate-100 dark:bg-slate-800/60' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  Español (ES)
                </button>
                <button
                  type="button"
                  onClick={() => { onLanguageChange('ca'); setLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${lang === 'ca' ? 'text-sky-600 dark:text-sky-400 font-semibold bg-slate-100 dark:bg-slate-800/60' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  Català (CA)
                </button>
                <button
                  type="button"
                  onClick={() => { onLanguageChange('en'); setLangDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs ${lang === 'en' ? 'text-sky-600 dark:text-sky-400 font-semibold bg-slate-100 dark:bg-slate-800/60' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  English (EN)
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Light <-> Dark) */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors shrink-0"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Personal Area Portal Button */}
          <button
            type="button"
            onClick={onOpenPersonalArea}
            className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition-colors shrink-0"
            title={t.personalArea}
          >
            <User className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
            <span className="hidden xl:inline">{t.personalArea}</span>
          </button>

          {/* Exclusive Agent CRM Access Button (with password protection) */}
          <button
            type="button"
            onClick={onOpenAgentCrm}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 bg-amber-100/80 dark:bg-amber-950/40 hover:bg-amber-200/80 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-700/60 transition-colors shrink-0 shadow-sm"
            title="Acceso Exclusivo Agente Inmobiliario (CRM)"
            aria-label="Acceso CRM Agente"
          >
            <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="hidden lg:inline font-bold">CRM Agente</span>
          </button>

          {/* Mobile/Tablet Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors shrink-0"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-sky-600 dark:text-sky-400" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile/Tablet Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl transition-colors">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => handleLinkClick(link.path, link.hashSection)}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentPath === link.path 
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => { onOpenPersonalArea(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors shadow-md shadow-sky-900/20"
            >
              <User className="w-4 h-4 text-white" />
              <span>{t.personalArea} (Panel de Cliente)</span>
            </button>

            <button
              type="button"
              onClick={() => { onOpenAgentCrm(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors"
            >
              <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Acceso Exclusivo Agente (CRM Clientes)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
