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
import { ConversionModal } from './components/ConversionModal';
import { PersonalAreaModal } from './components/PersonalAreaModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { StrategicActionType } from './components/StrategicCTAButton';
import { Language, Theme, NotificationItem } from './types';
import { mockNotifications } from './data/mockData';

function AppContent() {
  const [lang, setLang] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('dark');
  const { currentPath } = useRouter();

  // Modals state
  const [conversionModalOpen, setConversionModalOpen] = useState<boolean>(false);
  const [conversionActionType, setConversionActionType] = useState<StrategicActionType>('valuation');
  const [personalAreaOpen, setPersonalAreaOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

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
        </main>
      </div>

      {/* Footer across all pages with SEO internal linking */}
      <Footer
        lang={lang}
        onOpenActionModal={handleOpenActionModal}
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
