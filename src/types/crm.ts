export type ClientType = 'vendedor' | 'comprador';

export type LeadStatus =
  | 'nuevo'
  | 'contactado'
  | 'cita_agendada'
  | 'visita_tecnica'
  | 'presupuesto_enviado'
  | 'cerrado'
  | 'descartado';

export type LeadPriority = 'alta' | 'media' | 'baja';

export interface AgentNote {
  id: string;
  date: string;
  author: string;
  content: string;
}

export interface Lead {
  id: string;
  clientType: ClientType; // 'vendedor' (Propietario) o 'comprador' (Comprador/Inversor)
  name: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  propertyType?: string; // ej: "Piso 95m² - 3 hab.", "Ático con terraza", etc.
  estimatedValue?: number; // Valor estimado de venta o presupuesto de compra
  estimatedRenoBudget?: number; // Presupuesto estimado obra / reforma (con IVA 21%)
  serviceInterest: string; // ej: "Vender con reforma previa", "Comprar y transformar", "Valoración In Situ PRESTO"
  source: string; // ej: "Calculadora de Potencial", "Solicitud Cita", "Formulario Contacto", "Registro Manual"
  status: LeadStatus;
  priority: LeadPriority;
  message?: string;
  notes: AgentNote[];
  createdAt: string;
  prestoAcknowledged?: boolean; // Aviso normativo PRESTO + IVA 21% verificado
  nextFollowUpDate?: string;
}

export interface CrmStats {
  totalLeads: number;
  sellersCount: number;
  buyersCount: number;
  newLeadsCount: number;
  pendingTechnicalVisitsCount: number;
  totalEstimatedPipeline: number;
}
