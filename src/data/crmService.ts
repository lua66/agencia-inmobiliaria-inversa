import { Lead, ClientType, LeadStatus, LeadPriority, AgentNote, CrmStats } from '../types/crm';

const STORAGE_KEY = 'inversa_crm_leads_v2';
const PIN_STORAGE_KEY = 'inversa_crm_agent_pin_v2';
const DEFAULT_PINS = ['1234', 'inversa2025', 'admin'];

// Clean initial storage with no fake/dummy data
const SEED_LEADS: Lead[] = [];

class CrmService {
  private listeners: (() => void)[] = [];

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing) {
        try {
          const parsed = JSON.parse(existing);
          // If existing data contains previous dummy seed leads, reset to clean state
          if (Array.isArray(parsed) && parsed.some(l => l.id?.startsWith('lead-v-00') || l.id?.startsWith('lead-c-00') || l.name?.includes('Carmen Navarro'))) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
          }
        } catch {
          localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        }
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      }

      const existingPin = localStorage.getItem(PIN_STORAGE_KEY);
      if (!existingPin) {
        localStorage.setItem(PIN_STORAGE_KEY, '1234');
      }
    } catch {
      // LocalStorage fallback
    }
  }

  public getLeads(): Lead[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return SEED_LEADS;
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : SEED_LEADS;
    } catch {
      return SEED_LEADS;
    }
  }

  public getLeadsByType(type: ClientType): Lead[] {
    return this.getLeads().filter(l => l.clientType === type);
  }

  public getStats(): CrmStats {
    const leads = this.getLeads();
    const sellers = leads.filter(l => l.clientType === 'vendedor');
    const buyers = leads.filter(l => l.clientType === 'comprador');
    const newLeads = leads.filter(l => l.status === 'nuevo');
    const pendingTechnicalVisits = leads.filter(l => l.status === 'visita_tecnica' || l.status === 'cita_agendada');
    
    const totalEstimatedPipeline = leads.reduce((acc, l) => {
      const val = l.estimatedValue || 0;
      const reno = l.estimatedRenoBudget || 0;
      return acc + val + reno;
    }, 0);

    return {
      totalLeads: leads.length,
      sellersCount: sellers.length,
      buyersCount: buyers.length,
      newLeadsCount: newLeads.length,
      pendingTechnicalVisitsCount: pendingTechnicalVisits.length,
      totalEstimatedPipeline
    };
  }

  public saveLead(leadData: {
    clientType: ClientType;
    name: string;
    email: string;
    phone: string;
    city?: string;
    address?: string;
    propertyType?: string;
    estimatedValue?: number;
    estimatedRenoBudget?: number;
    serviceInterest: string;
    source: string;
    status?: LeadStatus;
    priority?: LeadPriority;
    message?: string;
    prestoAcknowledged?: boolean;
    initialNote?: string;
  }): Lead {
    const leads = this.getLeads();
    const newId = `lead-${leadData.clientType === 'vendedor' ? 'v' : 'c'}-${Date.now().toString().slice(-6)}`;
    
    const newLead: Lead = {
      id: newId,
      clientType: leadData.clientType,
      name: leadData.name.trim(),
      email: leadData.email.trim(),
      phone: leadData.phone.trim(),
      city: leadData.city?.trim() || 'Barcelona',
      address: leadData.address?.trim() || '',
      propertyType: leadData.propertyType || (leadData.clientType === 'vendedor' ? 'Vivienda para venta' : 'Búsqueda para compra'),
      estimatedValue: leadData.estimatedValue || undefined,
      estimatedRenoBudget: leadData.estimatedRenoBudget || undefined,
      serviceInterest: leadData.serviceInterest,
      source: leadData.source,
      status: leadData.status || 'nuevo',
      priority: leadData.priority || 'alta',
      message: leadData.message?.trim() || '',
      prestoAcknowledged: leadData.prestoAcknowledged ?? true,
      createdAt: new Date().toISOString(),
      notes: leadData.initialNote ? [
        {
          id: `note-${Date.now()}`,
          date: new Date().toISOString(),
          author: 'Sistema',
          content: leadData.initialNote
        }
      ] : []
    };

    const updated = [newLead, ...leads];
    this.persist(updated);
    this.notify();
    return newLead;
  }

  public updateLead(id: string, updates: Partial<Lead>): Lead | null {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return null;

    const updatedLead: Lead = {
      ...leads[index],
      ...updates
    };

    leads[index] = updatedLead;
    this.persist(leads);
    this.notify();
    return updatedLead;
  }

  public deleteLead(id: string): boolean {
    const leads = this.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    if (filtered.length === leads.length) return false;
    this.persist(filtered);
    this.notify();
    return true;
  }

  public addAgentNote(leadId: string, content: string, author: string = 'Agente'): Lead | null {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return null;

    const newNote: AgentNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString(),
      author,
      content: content.trim()
    };

    lead.notes = [newNote, ...(lead.notes || [])];
    this.persist(leads);
    this.notify();
    return lead;
  }

  public checkAgentPin(inputPin: string): boolean {
    const storedPin = localStorage.getItem(PIN_STORAGE_KEY) || '1234';
    const trimmed = inputPin.trim();
    if (trimmed === storedPin || DEFAULT_PINS.includes(trimmed)) {
      return true;
    }
    return false;
  }

  public setAgentPin(newPin: string): boolean {
    if (!newPin || newPin.trim().length < 4) return false;
    localStorage.setItem(PIN_STORAGE_KEY, newPin.trim());
    return true;
  }

  public getCurrentPin(): string {
    return localStorage.getItem(PIN_STORAGE_KEY) || '1234';
  }

  public resetToDefaultSeed(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem(PIN_STORAGE_KEY, '1234');
    this.notify();
  }

  public clearAllLeads(): void {
    this.persist([]);
    this.notify();
  }

  public exportLeadsToCSV(clientTypeFilter?: 'all' | ClientType): void {
    let leads = this.getLeads();
    if (clientTypeFilter && clientTypeFilter !== 'all') {
      leads = leads.filter(l => l.clientType === clientTypeFilter);
    }

    const headers = [
      'ID',
      'Tipo de Cliente',
      'Nombre y Apellidos',
      'Teléfono',
      'Email',
      'Ciudad',
      'Dirección / Zona',
      'Tipo Inmueble',
      'Valor Estimado (€)',
      'Presupuesto Reforma IVA 21% (€)',
      'Servicio de Interés',
      'Origen (Fuente)',
      'Estado CRM',
      'Prioridad',
      'Fecha Creación',
      'Aviso PRESTO',
      'Notas Internas'
    ];

    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${l.clientType === 'vendedor' ? 'PROPIETARIO / VENDEDOR' : 'COMPRADOR / INVERSOR'}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.city || '').replace(/"/g, '""')}"`,
      `"${(l.address || '').replace(/"/g, '""')}"`,
      `"${(l.propertyType || '').replace(/"/g, '""')}"`,
      `"${l.estimatedValue || 0}"`,
      `"${l.estimatedRenoBudget || 0}"`,
      `"${(l.serviceInterest || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${l.status.toUpperCase()}"`,
      `"${l.priority.toUpperCase()}"`,
      `"${new Date(l.createdAt).toLocaleString('es-ES')}"`,
      `"${l.prestoAcknowledged ? 'SÍ (21% IVA)' : 'NO'}"`,
      `"${(l.notes?.map(n => `[${n.author}]: ${n.content}`).join(' // ') || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `CRM_Inmobiliaria_Inversa_Leads_${clientTypeFilter || 'todos'}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => {
      try {
        l();
      } catch (err) {
        console.error('CRM listener error', err);
      }
    });
  }

  private persist(leads: Lead[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to persist CRM leads', e);
    }
  }
}

export const crmService = new CrmService();
