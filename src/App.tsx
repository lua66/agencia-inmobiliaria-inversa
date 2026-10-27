import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './router/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SellerPage } from './pages/SellerPage';
import { BuyerPage } from './pages/BuyerPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ValoracionPage } from './pages/ValoracionPage';
import { VenderConReformaPage } from './pages/VenderConReformaPage';
import { VenderSinReformaPage } from './pages/VenderSinReformaPage';
import { ComprarParaReformarPage } from './pages/ComprarParaReformarPage';
import { InformeTecnicoPreCompraPage } from './pages/InformeTecnicoPreCompraPage';
import { CalculadoraPrestoPage } from './pages/CalculadoraPrestoPage';
import { LegalPage } from './pages/LegalPage';
import { ConversionModal } from './components/ConversionModal';
import { PersonalAreaModal } from './components/PersonalAreaModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { AgentLoginModal } from './components/AgentLoginModal';
import { AgentCrmModal } from './components/AgentCrmModal';
import { StrategicActionType } from './components/StrategicCTAButton';
import { Language, Theme, NotificationItem } from './types';


function AppContent() {
  const [lang, setLang] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('dark');
  const { currentPath } = useRouter();

  // Modals state
  const [conversionModalOpen, setConversionModalOpen] = useState<boolean>(false);
  const [conversionActionType, setConversionActionType] = useState<StrategicActionType>('valuation');
  const [personalAreaOpen, setPersonalAreaOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  // Agent Exclusive CRM Security State
  const [agentLoginOpen, setAgentLoginOpen] = useState<boolean>(false);
  const [agentCrmOpen, setAgentCrmOpen] = useState<boolean>(false);
  const [isAgentAuthenticated, setIsAgentAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('inversa_agent_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Notifications: start clean with 0 unread alerts
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Handle Dark / Light mode class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenActionModal = (type: StrategicActionType) => {
    setConversionActionType(type);
    setConversionModalOpen(true);
  };

  const handleOpenAgentCrm = () => {
    if (isAgentAuthenticated) {
      setAgentCrmOpen(true);
    } else {
      setAgentLoginOpen(true);
    }
  };

  const handleAgentLoginSuccess = () => {
    setIsAgentAuthenticated(true);
    try {
      sessionStorage.setItem('inversa_agent_auth', 'true');
    } catch {}
    setAgentLoginOpen(false);
    setAgentCrmOpen(true);
  };

  const handleAgentLogout = () => {
    setIsAgentAuthenticated(false);
    try {
      sessionStorage.removeItem('inversa_agent_auth');
    } catch {}
    setAgentCrmOpen(false);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans antialiased selection:bg-sky-500/25 selection:text-sky-300 flex flex-col justify-between`}>
      
      <div>
        {/* Navigation Top Bar */}
        <Navbar
          lang={lang}
          onLanguageChange={setLang}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenPersonalArea={() => setPersonalAreaOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenAgentCrm={handleOpenAgentCrm}
          unreadNotificationsCount={unreadCount}
        />

        {/* Dynamic Multi-Page Content based on Route */}
        <main>
          {currentPath === '/' && (
            <HomePage
              lang={lang}
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/vender' && (
            <SellerPage
              lang={lang}
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/comprar' && (
            <BuyerPage
              lang={lang}
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/proyectos' && (
            <ProjectsPage
              lang={lang}
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/nosotros' && (
            <AboutPage
              lang={lang}
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/contacto' && (
            <ContactPage
              lang={lang}
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/valoracion-inmobiliaria' && (
            <ValoracionPage
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/vender-con-reforma' && (
            <VenderConReformaPage
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/vender-sin-reforma' && (
            <VenderSinReformaPage
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/comprar-para-reformar' && (
            <ComprarParaReformarPage
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/informe-tecnico-pre-compra' && (
            <InformeTecnicoPreCompraPage
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/calculadora-reforma-presto' && (
            <CalculadoraPrestoPage
              onOpenActionModal={handleOpenActionModal}
            />
          )}

          {currentPath === '/aviso-legal' && (
            <LegalPage type="aviso-legal" />
          )}

          {currentPath === '/politica-privacidad' && (
            <LegalPage type="politica-privacidad" />
          )}

          {currentPath === '/politica-cookies' && (
            <LegalPage type="politica-cookies" />
          )}
        </main>
      </div>

      {/* Footer across all pages with SEO internal linking */}
      <Footer
        lang={lang}
        onOpenActionModal={handleOpenActionModal}
        onOpenAgentCrm={handleOpenAgentCrm}
      />

      {/* Strategic Conversion Modal */}
      <ConversionModal
        isOpen={conversionModalOpen}
        onClose={() => setConversionModalOpen(false)}
        actionType={conversionActionType}
        lang={lang}
      />

      {/* Personal Area Client Portal Modal */}
      <PersonalAreaModal
        isOpen={personalAreaOpen}
        onClose={() => setPersonalAreaOpen(false)}
        lang={lang}
        onOpenActionModal={handleOpenActionModal}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      {/* Agent Exclusive Login Modal (Password / PIN) */}
      <AgentLoginModal
        isOpen={agentLoginOpen}
        onClose={() => setAgentLoginOpen(false)}
        onSuccess={handleAgentLoginSuccess}
      />

      {/* Agent Exclusive CRM Modal (Separating Vendedores & Compradores) */}
      <AgentCrmModal
        isOpen={agentCrmOpen}
        onClose={() => setAgentCrmOpen(false)}
        onLogout={handleAgentLogout}
      />

    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
