import { TransformationCase, OpportunityProperty, TradeProfessional, ProjectMilestone, NotificationItem } from '../types';

export const transformationCases: TransformationCase[] = [
  {
    id: 't-1',
    title: 'Reforma Integral & Redistribución · Ático Pau Claris',
    location: 'Eixample Dret, Barcelona',
    category: 'integral',
    beforeImage: '/src/assets/images/living_room_before_renovation_1790762437182.jpg',
    afterImage: '/src/assets/images/living_room_after_renovation_1790762450162.jpg',
    originalPrice: 420000,
    renovationCost: 78650, // 65.000 € base + 21% IVA = 78.650 €
    finalMarketValue: 610000,
    valueAddedPct: 45.2,
    durationWeeks: 10,
    energyBefore: 'F',
    energyAfter: 'A',
    description: 'De piso oscuro y compartimentado de los años 80 a espacio abierto bañado por luz natural. Medición técnica con partidas desglosadas s/ base PRESTO, solados de roble y climatización por aerotermia.',
    highlights: ['Medición partida por partida PRESTO', 'Apertura de muros de carga visada', 'Instalaciones completas + 21% IVA', 'Plusvalía neta récord post-obra']
  },
  {
    id: 't-2',
    title: 'Transformación Cocina Gourmet & Zona Social · Recoletos',
    location: 'Barrio de Salamanca, Madrid',
    category: 'cocina',
    beforeImage: '/src/assets/images/living_room_before_renovation_1790762437182.jpg',
    afterImage: '/src/assets/images/kitchen_luxury_transformation_1790762461387.jpg',
    originalPrice: 610000,
    renovationCost: 48400, // 40.000 € base + 21% IVA
    finalMarketValue: 745000,
    valueAddedPct: 22.1,
    durationWeeks: 6,
    energyBefore: 'E',
    energyAfter: 'B',
    description: 'Integración de cocina cerrada en imponente isla escultórica de piedra sinterizada con extracción integrada y carpintería a medida. Presupuesto cerrado tras inspección técnica in situ.',
    highlights: ['Visita e inspección técnica previa', 'Presupuesto cerrado con IVA 21%', 'Extracción de superficie silenciosa', 'Vendido en 14 días']
  },
  {
    id: 't-3',
    title: 'Rehabilitación Integral de Edificio & Fachada · Gran Vía',
    location: 'Valencia Centro',
    category: 'fachada',
    beforeImage: '/src/assets/images/living_room_before_renovation_1790762437182.jpg',
    afterImage: '/src/assets/images/building_facade_restoration_1790762473893.jpg',
    originalPrice: 780000,
    renovationCost: 111320, // 92.000 € base + 21% IVA
    finalMarketValue: 1060000,
    valueAddedPct: 35.8,
    durationWeeks: 14,
    energyBefore: 'G',
    energyAfter: 'A',
    description: 'Restauración de cantería original, balconeras de hierro forjado con doble acristalamiento acústico y aislamiento SATE con subvención NextGen gestionada.',
    highlights: ['Memoria técnica visada por colegio', 'Cuadro de precios oficial de edificación', 'Aislamiento acústico 42dB', 'Triple impacto de revalorización']
  }
];

export const opportunitiesList: OpportunityProperty[] = [
  {
    id: 'opp-1',
    title: 'Piso Señorial con Techos Altos para Diseñar',
    location: 'Calle Provença, Eixample',
    neighborhood: 'Barcelona',
    currentPrice: 345000,
    estimatedRenoCost: 62920, // 52.000 € base + 21% IVA
    projectedValue: 485000,
    sqm: 112,
    rooms: 3,
    baths: 2,
    potentialScore: 9.6,
    image: '/src/assets/images/living_room_after_renovation_1790762450162.jpg',
    transformationConcept: 'Espacio diáfano con suite principal, cocina abierta con isla y vestidor a medida. Estimación s/ baremos PRESTO.',
    viableRenovations: ['Redistribución en suite', 'Climatización por conductos', 'Suelo continuo de microcemento o roble'],
    tags: ['Estimación PRESTO + IVA', 'Visita Técnica Necesaria', 'Finca Regia']
  },
  {
    id: 'opp-2',
    title: 'Ático con Terraza Panorámica a Revalorizar',
    location: 'Paseo de la Habana, Chamartín',
    neighborhood: 'Madrid',
    currentPrice: 520000,
    estimatedRenoCost: 78650, // 65.000 € base + 21% IVA
    projectedValue: 710000,
    sqm: 135,
    rooms: 3,
    baths: 2,
    potentialScore: 9.8,
    image: '/src/assets/images/hero_architectural_penthouse_1790762421218.jpg',
    transformationConcept: 'Fusión de terraza exterior con salón mediante cerramientos de vidrio plegable sin perfiles. Sujeto a visita in situ.',
    viableRenovations: ['Apertura total a terraza', 'Cocina abierta premium', 'Domótica integral'],
    tags: ['Terraza 35m²', 'Normativa PRESTO', 'Gran Margen de Ganancia']
  },
  {
    id: 'opp-3',
    title: 'Vivienda Clásica con Gran Margen en Ruzafa',
    location: 'Calle Sueca, Ruzafa',
    neighborhood: 'Valencia',
    currentPrice: 220000,
    estimatedRenoCost: 45980, // 38.000 € base + 21% IVA
    projectedValue: 320000,
    sqm: 94,
    rooms: 2,
    baths: 2,
    potentialScore: 9.2,
    image: '/src/assets/images/kitchen_luxury_transformation_1790762461387.jpg',
    transformationConcept: 'Restauración de mosaico hidráulico original combinado con interiorismo contemporáneo e instalaciones nuevas.',
    viableRenovations: ['Recuperación hidráulica', 'Baños integrados de microcemento', 'Cocina de diseño'],
    tags: ['Carácter Histórico', 'Precios Oficiales PRESTO', 'Alta Rentabilidad']
  }
];

export const tradeProfessionals: TradeProfessional[] = [
  {
    id: 'pro-1',
    name: 'Estudio ArqNovum',
    company: 'Arquitectura & Dirección Facultativa',
    specialty: 'Arquitectura & Reformas Estructurales',
    experienceYears: 14,
    completedProjects: 128,
    rating: 4.9,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badges: ['Normativa PRESTO', 'Colegiado COAC', 'Presupuesto con IVA Desglosado']
  },
  {
    id: 'pro-2',
    name: 'Atelier Habitat Interiorismo',
    company: 'Diseño de Interiores & Estilismo',
    specialty: 'Interiorismo & Render 3D',
    experienceYears: 11,
    completedProjects: 94,
    rating: 5.0,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    badges: ['Premio Diseño 2024', 'Medición In Situ', 'Home Staging']
  },
  {
    id: 'pro-3',
    name: 'Construcciones & Obras Vértice',
    company: 'Constructora Integral Homologada',
    specialty: 'Albañilería, Instalaciones & Climatización',
    experienceYears: 18,
    completedProjects: 240,
    rating: 4.9,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badges: ['Seguro RC 1M€', 'Partidas PRESTO', 'Certificado Aerotermia']
  },
  {
    id: 'pro-4',
    name: 'Ecoeficiencia Mediterránea',
    company: 'Ingeniería Energética & Sostenibilidad',
    specialty: 'Aislamiento SATE & Aerotermia',
    experienceYears: 9,
    completedProjects: 86,
    rating: 4.8,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    badges: ['Gestión Subvenciones NextGen', 'Certificador Energético']
  }
];

export const mockProjectMilestones: ProjectMilestone[] = [
  {
    id: 'm-1',
    title: 'Estudio Previo, Inspección In Situ y Licencias',
    phase: 'Fase 1: Trámites',
    status: 'completed',
    date: '12 Sep 2026',
    percentage: 100,
    documentsCount: 4,
    photosCount: 6,
    notes: 'Inspección presencial completada, mediciones s/ PRESTO visadas y licencia de obras mayores concedida por el Ayuntamiento.'
  },
  {
    id: 'm-2',
    title: 'Demolición selectiva y desescombro ecológico',
    phase: 'Fase 2: Estructura',
    status: 'completed',
    date: '22 Sep 2026',
    percentage: 100,
    documentsCount: 2,
    photosCount: 14,
    notes: 'Apertura de espacio central y retirada controlada de tabiquería no portante. Muros saneados y certificados.'
  },
  {
    id: 'm-3',
    title: 'Nuevas Instalaciones (Fontanería, Electricidad, Clima)',
    phase: 'Fase 3: Instalaciones',
    status: 'completed',
    date: '28 Sep 2026',
    percentage: 100,
    documentsCount: 3,
    photosCount: 18,
    notes: 'Puntos de agua y luz canalizados según plano ejecutivo. Preinstalación de conductos de aerotermia lista.'
  },
  {
    id: 'm-4',
    title: 'Revestimientos, Suelos de Roble & Microcemento',
    phase: 'Fase 4: Acabados',
    status: 'in_progress',
    date: 'En curso (Semana 4 de 7)',
    percentage: 65,
    documentsCount: 1,
    photosCount: 22,
    notes: 'Colocación de tarima de roble natural y aplicación de base de microcemento en baños principales.'
  },
  {
    id: 'm-5',
    title: 'Mobiliario de Cocina, Iluminación & Puesta a Punto',
    phase: 'Fase 5: Equipamiento',
    status: 'upcoming',
    date: 'Previsto: 14 Oct 2026',
    percentage: 0,
    documentsCount: 2,
    photosCount: 0,
    notes: 'Montaje de isla de mármol, electrodomésticos integrados y luminarias de diseño.'
  }
];

export const mockNotifications: NotificationItem[] = [];

