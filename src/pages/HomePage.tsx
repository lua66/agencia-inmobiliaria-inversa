import React from 'react';
import { Hero } from '../components/Hero';
import { CycleSection } from '../components/CycleSection';
import { DifferentiationSection } from '../components/DifferentiationSection';
import { TransformationSlider } from '../components/TransformationSlider';
import { SellerSection } from '../components/SellerSection';
import { BuyerSection } from '../components/BuyerSection';
import { RenovationEcosystem } from '../components/RenovationEcosystem';
import { ProfessionalsSection } from '../components/ProfessionalsSection';
import { ProjectTrackerDemo } from '../components/ProjectTrackerDemo';
import { AboutSection } from '../components/AboutSection';
import { StrategicActionType } from '../components/StrategicCTAButton';
import { Language } from '../types';
import { useRouter } from '../router/RouterContext';

interface HomePageProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onOpenActionModal
}) => {
  const { navigate } = useRouter();

  const handleSelectPath = (path: 'vender' | 'comprar') => {
    navigate(path === 'vender' ? '/vender' : '/comprar');
  };

  return (
    <div>
      {/* 1. Hero Principal */}
      <Hero
        lang={lang}
        onOpenActionModal={onOpenActionModal}
        onSelectPath={handleSelectPath}
      />

      {/* 2. Ciclo 360°: Antes, Durante y Después */}
      <CycleSection
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />

      {/* 3. Diferenciación: ¿Por qué Inversa? */}
      <DifferentiationSection
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />

      {/* 4. Casos Reales con Slider Antes / Después */}
      <TransformationSlider
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />

      {/* 5. Vender: Visión general y calculadora */}
      <SellerSection
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />

      {/* 6. Comprar: Visión general y oportunidades */}
      <BuyerSection
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />

      {/* 7. Ecosistema de Reformas & Diseño */}
      <RenovationEcosystem
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />

      {/* 8. Red de Profesionales y Gremios */}
      <ProfessionalsSection
        lang={lang}
      />

      {/* 9. Consola en Tiempo Real de Seguimiento */}
      <ProjectTrackerDemo
        lang={lang}
      />

      {/* 10. Sobre Nosotros */}
      <AboutSection
        lang={lang}
        onOpenActionModal={onOpenActionModal}
      />
    </div>
  );
};
