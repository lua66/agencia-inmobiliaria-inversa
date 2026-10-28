import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, Building2, Calendar, AlertTriangle, Home } from 'lucide-react';
import { StrategicActionType } from './StrategicCTAButton';
import { translations } from '../locales/translations';
import { Language } from '../types';
import { ClientType } from '../types/crm';
import { crmService } from '../data/crmService';
import { BetipoValuationWidget } from './BetipoValuationWidget';

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: StrategicActionType;
  lang: Language;
}

export const ConversionModal: React.FC<ConversionModalProps> = ({
  isOpen,
  onClose,
  actionType,
  lang
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [clientType, setClientType] = useState<ClientType>('comprador');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    inquiryType: 'Cita Asesoría Inmobiliaria y Reforma',
    message: ''
  });

  useEffect(() => {
    if (actionType === 'valuation') {
      setClientType('vendedor');
    } else {
      setClientType('comprador');
    }
  }, [actionType]);

  const t = translations[lang].modal;
  const isValuation = actionType === 'valuation';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Persist lead directly into CRM with segmentation
    crmService.saveLead({
      clientType,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.address.toLowerCase().includes('madrid') 
        ? 'Madrid' 
        : formData.address.toLowerCase().includes('valencia') 
        ? 'Valencia' 
        : formData.address.toLowerCase().includes('barcelona') 
        ? 'Barcelona' 
        : 'España',
      serviceInterest: clientType === 'vendedor' ? 'Asesoría Venta & Reforma Previa' : 'Asesoría Compra & Transformación',
      source: 'Modal Cita Asesoría Inmobiliaria',
      message: formData.message,
      prestoAcknowledged: true,
      initialNote: `Solicitud web de ${clientType === 'vendedor' ? 'PROPIETARIO / VENDEDOR' : 'COMPRADOR / INVERSOR'}. Dirección: ${formData.address}`
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      inquiryType: 'Cita Asesoría Inmobiliaria y Reforma',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card Container */}
      <div className={`relative w-full ${isValuation ? 'max-w-2xl' : 'max-w-xl'} bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 my-6 transition-all duration-200`}>
        
        {/* Header Ribbon */}
        <div className={`p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 ${isValuation ? 'bg-gradient-to-r from-sky-50 to-white dark:from-sky-950/50 dark:to-slate-900' : 'bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800'}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
                {isValuation ? <Home className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 dark:text-white tracking-tight transition-colors">
                  {isValuation ? 'Valora tu Vivienda Gratis' : t.appointmentTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">
                  {isValuation ? 'Herramienta oficial de tasación inmobiliaria' : t.appointmentSubtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto">
          {isValuation ? (
            /* WIDGET OFICIAL BETIPO DE VALORACIÓN */
            <div className="w-full">
              <BetipoValuationWidget />
            </div>
          ) : (
            /* FORMULARIO PARA CITA TÉCNICA */
            submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Cita Técnica Solicitada con Éxito
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  {t.successMessage}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-900/20"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Technical disclaimer notice */}
                <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-500/30 text-[11px] text-sky-900 dark:text-sky-200 space-y-1 transition-colors">
                  <div className="flex items-center gap-1.5 font-bold text-sky-800 dark:text-sky-300">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-sky-600 dark:text-sky-400" />
                    <span>Asesoría Inmobiliaria & Transformación</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Te asesoramos de forma personalizada para analizar si te conviene vender tal como está o mejorar antes, o si compras, cómo transformar tu nueva vivienda.
                  </p>
                </div>

                {/* Client Type Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    ¿Cuál es tu perfil? *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setClientType('vendedor')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        clientType === 'vendedor'
                          ? 'bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>Quiero Vender (Propietario)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setClientType('comprador')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        clientType === 'comprador'
                          ? 'bg-sky-500/15 border-sky-500 text-sky-700 dark:text-sky-300 ring-1 ring-sky-500'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Quiero Comprar (Comprador)</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t.nameLabel} *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Carmen Navarro"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t.phoneLabel} *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ej. +34 612 345 678"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t.emailLabel} *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t.addressLabel} *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Ej. Barcelona, Madrid o Valencia"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t.messageLabel}</label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="¿Qué necesitas? (Ej. comprar para reformar, vender mi piso...)"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
                  />
                </div>

                {/* Guarantees row */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Sin compromiso · Datos protegidos (RGPD)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                    <span>Contacto en &lt; 24h</span>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {t.close}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold tracking-wide rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-900/20 active:scale-95"
                  >
                    {t.send}
                  </button>
                </div>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
};
