import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Filter, 
  Download, 
  UserPlus, 
  Phone, 
  Mail, 
  MessageSquare, 
  Building2, 
  Home, 
  Calculator, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ChevronRight, 
  KeyRound, 
  LogOut, 
  FileSpreadsheet, 
  Sparkles,
  TrendingUp,
  Tag,
  FileCheck2
} from 'lucide-react';
import { Lead, ClientType, LeadStatus, LeadPriority } from '../types/crm';
import { crmService } from '../data/crmService';

interface AgentCrmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const AgentCrmModal: React.FC<AgentCrmModalProps> = ({
  isOpen,
  onClose,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'vendedor' | 'comprador'>('vendedor');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [newPinValue, setNewPinValue] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // New Lead Form State
  const [newLeadData, setNewLeadData] = useState({
    clientType: 'vendedor' as ClientType,
    name: '',
    phone: '',
    email: '',
    city: 'Barcelona',
    address: '',
    propertyType: '',
    estimatedValue: '',
    estimatedRenoBudget: '',
    serviceInterest: 'Valoración técnica in situ (PRESTO)',
    priority: 'alta' as LeadPriority,
    message: '',
    initialNote: ''
  });

  // Force re-render when storage updates
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = crmService.subscribe(() => {
      setTick(t => t + 1);
      // Keep selected lead in sync
      if (selectedLead) {
        const fresh = crmService.getLeads().find(l => l.id === selectedLead.id);
        if (fresh) setSelectedLead(fresh);
      }
    });
    return unsubscribe;
  }, [selectedLead]);

  if (!isOpen) return null;

  const leads = crmService.getLeads();
  const stats = crmService.getStats();

  // Filter leads based on active tab, search, and status
  const filteredLeads = leads.filter(lead => {
    if (activeTab !== 'all' && lead.clientType !== activeTab) {
      return false;
    }
    if (statusFilter !== 'all' && lead.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.name.toLowerCase().includes(q);
      const matchPhone = lead.phone.toLowerCase().includes(q);
      const matchEmail = lead.email.toLowerCase().includes(q);
      const matchCity = lead.city.toLowerCase().includes(q);
      const matchType = (lead.propertyType || '').toLowerCase().includes(q);
      const matchService = (lead.serviceInterest || '').toLowerCase().includes(q);
      return matchName || matchPhone || matchEmail || matchCity || matchType || matchService;
    }
    return true;
  });

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    crmService.updateLead(leadId, { status: newStatus });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    crmService.addAgentNote(selectedLead.id, newNoteText, 'Agente Inmobiliario');
    setNewNoteText('');
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('¿Confirmas que deseas archivar o eliminar este lead?')) {
      crmService.deleteLead(id);
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
    }
  };

  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    crmService.saveLead({
      clientType: newLeadData.clientType,
      name: newLeadData.name,
      phone: newLeadData.phone,
      email: newLeadData.email,
      city: newLeadData.city,
      address: newLeadData.address,
      propertyType: newLeadData.propertyType,
      estimatedValue: newLeadData.estimatedValue ? Number(newLeadData.estimatedValue) : undefined,
      estimatedRenoBudget: newLeadData.estimatedRenoBudget ? Number(newLeadData.estimatedRenoBudget) : undefined,
      serviceInterest: newLeadData.serviceInterest,
      source: 'Registro Manual Agente',
      priority: newLeadData.priority,
      message: newLeadData.message,
      initialNote: newLeadData.initialNote || 'Lead dado de alta manualmente por el agente'
    });

    setShowCreateModal(false);
    // Reset form
    setNewLeadData({
      clientType: 'vendedor',
      name: '',
      phone: '',
      email: '',
      city: 'Barcelona',
      address: '',
      propertyType: '',
      estimatedValue: '',
      estimatedRenoBudget: '',
      serviceInterest: 'Valoración técnica in situ (PRESTO)',
      priority: 'alta',
      message: '',
      initialNote: ''
    });
  };

  const handlePinChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (crmService.setAgentPin(newPinValue)) {
      setPinChangeSuccess(true);
      setTimeout(() => {
        setPinChangeSuccess(false);
        setShowPinModal(false);
        setNewPinValue('');
      }, 1500);
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'nuevo':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">Nuevo</span>;
      case 'contactado':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">Contactado</span>;
      case 'cita_agendada':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30">Cita Agendada</span>;
      case 'visita_tecnica':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">Visita Técnica</span>;
      case 'presupuesto_enviado':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">Presupuesto Presto</span>;
      case 'cerrado':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">Cerrado / Éxito</span>;
      case 'descartado':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-500/15 text-slate-500 border border-slate-500/30">Descartado</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Main CRM Window */}
      <div className="relative w-full max-w-7xl h-[92vh] max-h-[950px] bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden z-10 text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Top App Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-900/20 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900 dark:text-white">
                  CRM · AGENCIA INMOBILIARIA INVERSA
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/30 hidden sm:inline-flex">
                  Agente Conectado
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gestión confidencial de clientes dividida en 2 tipologías: Propietarios / Vendedores y Compradores / Inversores
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPinModal(true)}
              className="p-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              title="Cambiar PIN de Agente"
            >
              <KeyRound className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span className="hidden md:inline">Ajustes PIN</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 transition-colors flex items-center gap-1.5"
              title="Cerrar Sesión de Agente"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Cerrar Sesión</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
              aria-label="Cerrar panel CRM"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* KPI Summary Cards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 sm:px-6 bg-slate-100/70 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 text-xs shrink-0">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Total Leads Activos</span>
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{stats.totalLeads}</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-900/40 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-amber-800 dark:text-amber-400 font-semibold text-[11px]">Propietarios (Venta)</span>
              <Home className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-xl font-bold font-mono text-amber-700 dark:text-amber-300">{stats.sellersCount}</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-sky-200 dark:border-sky-900/40 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sky-800 dark:text-sky-400 font-semibold text-[11px]">Compradores (Transforma)</span>
              <Building2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            </div>
            <span className="text-xl font-bold font-mono text-sky-700 dark:text-sky-300">{stats.buyersCount}</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-900/40 shadow-sm">
            <span className="text-rose-800 dark:text-rose-400 font-semibold text-[11px]">Sin Contactar (Nuevos)</span>
            <span className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400">{stats.newLeadsCount}</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 shadow-sm col-span-2 sm:col-span-1">
            <span className="text-emerald-800 dark:text-emerald-400 font-semibold text-[11px]">Pipeline Estimado</span>
            <span className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400 truncate block">
              {(stats.totalEstimatedPipeline / 1000000).toFixed(2)} M€
            </span>
          </div>
        </div>

        {/* Tabs Bar: strictly separating the two client categories */}
        <div className="px-4 sm:px-6 pt-3 pb-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
            
            {/* Tab Vendedores */}
            <button
              type="button"
              onClick={() => { setActiveTab('vendedor'); setSelectedLead(null); }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'vendedor'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-900/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Propietarios / Vendedores</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'vendedor' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                {stats.sellersCount}
              </span>
            </button>

            {/* Tab Compradores */}
            <button
              type="button"
              onClick={() => { setActiveTab('comprador'); setSelectedLead(null); }}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'comprador'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-900/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Compradores / Inversores</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === 'comprador' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                {stats.buyersCount}
              </span>
            </button>

            {/* Tab Todos */}
            <button
              type="button"
              onClick={() => { setActiveTab('all'); setSelectedLead(null); }}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-800 text-white dark:bg-slate-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Todos los Leads</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {stats.totalLeads}
              </span>
            </button>

          </div>

          {/* Action buttons on header */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20 transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Nuevo Lead Manual</span>
            </button>

            <button
              type="button"
              onClick={() => crmService.exportLeadsToCSV(activeTab)}
              className="px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5"
              title="Descargar lista en CSV / Excel con codificación UTF-8"
            >
              <Download className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span className="hidden sm:inline">Exportar Excel</span>
            </button>

            {leads.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('¿Seguro que deseas vaciar todos los registros del CRM? Esta acción no se puede deshacer.')) {
                    crmService.clearAllLeads();
                    setSelectedLead(null);
                  }
                }}
                className="px-2.5 py-2 rounded-xl text-xs font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-transparent hover:border-rose-200 dark:hover:border-rose-900 transition-all flex items-center gap-1"
                title="Vaciar todos los leads"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Vaciar Todo</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por cliente, teléfono, email, zona..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Estado:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="all">Todos los estados</option>
              <option value="nuevo">Nuevos</option>
              <option value="contactado">Contactados</option>
              <option value="cita_agendada">Cita Agendada</option>
              <option value="visita_tecnica">Visita Técnica</option>
              <option value="presupuesto_enviado">Presupuesto Presto</option>
              <option value="cerrado">Cerrados</option>
              <option value="descartado">Descartados</option>
            </select>
          </div>
        </div>

        {/* Content Area: Leads Table / List + Detail Drawer */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Main Leads List / Table */}
          <div className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 ${selectedLead ? 'hidden lg:block lg:w-3/5' : 'w-full'}`}>
            {leads.length === 0 ? (
              <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Base de Datos Limpia y Lista
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    No hay información por defecto ni registros de prueba. Cada lead captado a través de los botones estratégicos («Valora tu Vivienda», «Pide una Cita», calculadora de potencial o formularios de contacto) se registrará y clasificará aquí en tiempo real.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20 inline-flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Dar de Alta Primer Lead Manual</span>
                  </button>
                </div>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  No se encontraron leads con los filtros actuales
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Prueba cambiando el término de búsqueda o seleccionando otra pestaña de cliente.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredLeads.map((lead) => {
                  const isSelected = selectedLead?.id === lead.id;
                  const isSeller = lead.clientType === 'vendedor';

                  return (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? isSeller
                            ? 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/50 ring-1 ring-amber-500/50'
                            : 'bg-sky-500/5 dark:bg-sky-950/20 border-sky-500/50 ring-1 ring-sky-500/50'
                          : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 border-slate-200 dark:border-slate-800 shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Distinct Client Type Pill */}
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isSeller 
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50' 
                                : 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-300 dark:border-sky-700/50'
                            }`}>
                              {isSeller ? <Home className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                              <span>{isSeller ? 'Vendedor' : 'Comprador'}</span>
                            </span>

                            {getStatusBadge(lead.status)}

                            {lead.priority === 'alta' && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400">
                                Prioridad Alta
                              </span>
                            )}

                            <span className="text-[11px] text-slate-400 font-mono ml-auto sm:ml-0">
                              {new Date(lead.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                              {lead.name}
                            </h4>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">· {lead.city}</span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                            <strong className="text-slate-700 dark:text-slate-200">{lead.serviceInterest}</strong>
                            {lead.propertyType ? ` — ${lead.propertyType}` : ''}
                          </p>
                        </div>

                        {/* Financial and PRESTO tag */}
                        <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                          {lead.estimatedValue && (
                            <div className="text-right">
                              <span className="text-[10px] text-slate-400 block">{isSeller ? 'Valor Venta Est.' : 'Presupuesto Compra'}</span>
                              <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                {lead.estimatedValue.toLocaleString('es-ES')} €
                              </span>
                            </div>
                          )}
                          {lead.estimatedRenoBudget ? (
                            <div className="text-right">
                              <span className="text-[10px] text-amber-600 dark:text-amber-400 block">+ Obra (21% IVA):</span>
                              <span className="font-mono text-xs font-semibold text-amber-700 dark:text-amber-300">
                                {lead.estimatedRenoBudget.toLocaleString('es-ES')} €
                              </span>
                            </div>
                          ) : null}
                        </div>

                      </div>

                      {/* Footer actions on card */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-sky-600" />
                            {lead.phone}
                          </span>
                          <span className="hidden sm:flex items-center gap-1 truncate max-w-[180px]">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {lead.email}
                          </span>
                          {lead.notes && lead.notes.length > 0 && (
                            <span className="flex items-center gap-1 text-slate-400">
                              <MessageSquare className="w-3 h-3" />
                              {lead.notes.length} notas
                            </span>
                          )}
                        </div>

                        <span className="text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-0.5 text-[11px] group-hover:translate-x-1 transition-transform">
                          Ver Ficha <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Lead Detail Drawer / Inspector */}
          {selectedLead ? (
            <div className="w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 overflow-y-auto space-y-5">
              
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedLead.clientType === 'vendedor' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300' 
                        : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-300'
                    }`}>
                      {selectedLead.clientType === 'vendedor' ? 'PROPIETARIO / VENDEDOR' : 'COMPRADOR / INVERSOR'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {selectedLead.id}</span>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                    {selectedLead.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Captado vía: <strong className="text-slate-700 dark:text-slate-300">{selectedLead.source}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Fast Communication Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`tel:${selectedLead.phone.replace(/\s+/g, '')}`}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-700 dark:text-sky-400 font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Llamar</span>
                </a>
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(selectedLead.name)},%20te%20contacto%20desde%20Agencia%20Inmobiliaria%20Inversa%20respecto%20a%20tu%20solicitud.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${selectedLead.email}?subject=Agencia%20Inmobiliaria%20Inversa%20-%20Gestión%20de%20tu%20propiedad`}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>

              {/* Status Update Dropdown */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Estado en el Embudo de Ventas:
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="nuevo">🔴 Nuevo (Sin Contactar)</option>
                  <option value="contactado">🟡 Contactado</option>
                  <option value="cita_agendada">🔵 Cita Agendada</option>
                  <option value="visita_tecnica">🟣 Visita Técnica In Situ</option>
                  <option value="presupuesto_enviado">🟠 Presupuesto Presto Enviado</option>
                  <option value="cerrado">🟢 Cerrado / Operación Ganada</option>
                  <option value="descartado">⚪ Descartado</option>
                </select>
              </div>

              {/* Property & Technical Details */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                  <Building2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>Ficha Técnica de la Operación</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-400 block">Ciudad / Delegación:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedLead.city}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Dirección / Zona:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                      {selectedLead.address || 'Pendiente de concretar'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{selectedLead.clientType === 'vendedor' ? 'Valor Venta Est.:' : 'Presupuesto Compra:'}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {selectedLead.estimatedValue ? `${selectedLead.estimatedValue.toLocaleString('es-ES')} €` : 'A valorar in situ'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Obra PRESTO (+21% IVA):</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      {selectedLead.estimatedRenoBudget ? `${selectedLead.estimatedRenoBudget.toLocaleString('es-ES')} €` : 'Por determinar'}
                    </span>
                  </div>
                </div>

                {selectedLead.propertyType && (
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <span className="text-slate-400 block">Tipo / Descripción del inmueble:</span>
                    <p className="font-medium text-slate-700 dark:text-slate-300 mt-0.5">{selectedLead.propertyType}</p>
                  </div>
                )}

                {selectedLead.message && (
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]">
                    <span className="text-slate-400 block font-semibold mb-0.5">Mensaje del cliente:</span>
                    <p className="text-slate-700 dark:text-slate-300 italic">"{selectedLead.message}"</p>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-xl">
                  <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Protocolo PRESTO e IVA 21% debidamente notificado.</span>
                </div>
              </div>

              {/* Agent Private Notes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Notas Internas del Agente</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedLead.notes?.length || 0} registradas
                  </span>
                </div>

                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Escribe una nota interna (ej. llamada realizada, presupuesto enviado, visita agendada)..."
                    className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newNoteText.trim()}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition-colors"
                    >
                      Añadir Nota
                    </button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedLead.notes && selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1"
                      >
                        <div className="flex justify-between items-center text-slate-400 text-[10px]">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{note.author}</span>
                          <span>{new Date(note.date).toLocaleString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300">{note.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">No hay notas registradas para este lead.</p>
                  )}
                </div>
              </div>

              {/* Delete / Archive Button */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Archivar / Eliminar Lead</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  Cerrar Ficha
                </button>
              </div>

            </div>
          ) : null}

        </div>

      </div>

      {/* --- MODAL CREAR NUEVO LEAD MANUAL --- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Alta de Nuevo Lead Manual</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLeadSubmit} className="space-y-4 text-xs">
              
              {/* Client Type Selector (strictly separating the two types) */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tipo de Cliente *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewLeadData({ ...newLeadData, clientType: 'vendedor', serviceInterest: 'Vender con reforma previa (PRESTO)' })}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      newLeadData.clientType === 'vendedor'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Propietario / Vendedor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewLeadData({ ...newLeadData, clientType: 'comprador', serviceInterest: 'Comprar y transformar' })}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      newLeadData.clientType === 'comprador'
                        ? 'bg-sky-500/10 border-sky-500 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Comprador / Inversor</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                    placeholder="Ej. Manuel Morales"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    placeholder="Ej. +34 600 000 000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    placeholder="cliente@ejemplo.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Ciudad / Delegación</label>
                  <select
                    value={newLeadData.city}
                    onChange={(e) => setNewLeadData({ ...newLeadData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Barcelona">Barcelona</option>
                    <option value="Madrid">Madrid</option>
                    <option value="Valencia">Valencia</option>
                    <option value="Otras Zonas">Otras Zonas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {newLeadData.clientType === 'vendedor' ? 'Valor Venta Estimado (€)' : 'Presupuesto de Compra (€)'}
                  </label>
                  <input
                    type="number"
                    value={newLeadData.estimatedValue}
                    onChange={(e) => setNewLeadData({ ...newLeadData, estimatedValue: e.target.value })}
                    placeholder="Ej. 380000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Presupuesto Reforma IVA 21% (€)
                  </label>
                  <input
                    type="number"
                    value={newLeadData.estimatedRenoBudget}
                    onChange={(e) => setNewLeadData({ ...newLeadData, estimatedRenoBudget: e.target.value })}
                    placeholder="Ej. 45000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Detalles del Inmueble o Búsqueda</label>
                <input
                  type="text"
                  value={newLeadData.propertyType}
                  onChange={(e) => setNewLeadData({ ...newLeadData, propertyType: e.target.value })}
                  placeholder="Ej. Piso 95m² con balcón en Ensanche para redistribuir cocina"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nota inicial del agente</label>
                <textarea
                  rows={2}
                  value={newLeadData.initialNote}
                  onChange={(e) => setNewLeadData({ ...newLeadData, initialNote: e.target.value })}
                  placeholder="Apuntes de la conversación telefónica o visita a la oficina..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md"
                >
                  Guardar Lead en CRM
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* --- MODAL CAMBIAR PIN DE AGENTE --- */}
      {showPinModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Cambiar Clave de Acceso</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPinModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {pinChangeSuccess ? (
              <div className="py-4 text-center space-y-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <p className="text-xs font-bold">¡Clave actualizada correctamente!</p>
              </div>
            ) : (
              <form onSubmit={handlePinChangeSubmit} className="space-y-4 text-xs">
                <p className="text-slate-500 dark:text-slate-400">
                  Introduce una nueva clave o PIN (mínimo 4 caracteres) para proteger el acceso exclusivo a este CRM.
                </p>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nueva Clave / PIN:
                  </label>
                  <input
                    type="password"
                    required
                    minLength={4}
                    value={newPinValue}
                    onChange={(e) => setNewPinValue(e.target.value)}
                    placeholder="Mínimo 4 caracteres..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-center text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="px-3 py-1.5 rounded-xl text-slate-500 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold"
                  >
                    Guardar Clave
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
