export type Language = 'es' | 'ca' | 'en';
export type Theme = 'dark' | 'light';

export type UserRole = 'seller' | 'buyer' | 'professional' | 'investor';

export interface TransformationCase {
  id: string;
  title: string;
  location: string;
  category: 'integral' | 'cocina' | 'fachada' | 'redistribucion';
  beforeImage: string;
  afterImage: string;
  originalPrice: number;
  renovationCost: number;
  finalMarketValue: number;
  valueAddedPct: number;
  durationWeeks: number;
  energyBefore: 'G' | 'F' | 'E' | 'D';
  energyAfter: 'A' | 'B' | 'C';
  description: string;
  highlights: string[];
}

export interface OpportunityProperty {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  currentPrice: number;
  estimatedRenoCost: number;
  projectedValue: number;
  sqm: number;
  rooms: number;
  baths: number;
  potentialScore: number;
  image: string;
  transformationConcept: string;
  viableRenovations: string[];
  tags: string[];
}

export interface TradeProfessional {
  id: string;
  name: string;
  company: string;
  specialty: string;
  experienceYears: number;
  completedProjects: number;
  rating: number;
  verified: boolean;
  avatar: string;
  badges: string[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  phase: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  date: string;
  percentage: number;
  documentsCount: number;
  photosCount: number;
  notes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'info';
  read: boolean;
  category: 'budget' | 'project' | 'appointment' | 'valuation';
}
