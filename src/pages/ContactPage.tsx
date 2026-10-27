import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { StrategicCTAButton, StrategicActionType } from '../components/StrategicCTAButton';
import { Language } from '../types';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, MessageSquare, Send } from 'lucide-react';

interface ContactPageProps {
  lang: Language;
  onOpenActionModal: (type: StrategicActionType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  lang,
  onOpenActionModal
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Barcelona',
    interest: 'vender',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const offices = [
    {
      city: 'Barcelona',
      address: 'Passeig de Gràcia 48, Planta 3ª',
      cp: '08007 Barcelona',
      phone: '+34 934 810 920',
      email: 'barcelona@inmobiliariainversa.com',
      hours: 'Lunes a Viernes: 09:00 - 19:30'
    },
    {
      city: 'Madrid',
      address: 'Calle Velázquez 32, 1º Izquierda',
      cp: '28001 Madrid (Barrio de Salamanca)',
      phone: '+34 911 230 450',
      email: 'madrid@inmobiliariainversa.com',
      hours: 'Lunes a Viernes: 09:00 - 19:30'
    },
    {
      city: 'Valencia',
      address: 'Calle Colón 18, 4º B',
      cp: '46004 Valencia (Ciutat Vella)',
      phone: '+34 960 780 120',
      email: 'valencia@inmobiliariainversa.com',
      hours: 'Lunes a Viernes: 09:00 - 19:00'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Breadcrumbs for SEO */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40">
        <Breadcrumbs items={[{ label: 'Contacto y Delegaciones' }]} />
      </div>

      {/* Hero */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Atención Directa y Personalizada</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Contacta con nuestro equipo técnico y de gestión
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Estamos a tu disposición en nuestras oficinas de Barcelona, Madrid y Valencia, o mediante cita técnica directa en tu propia vivienda.
          </p>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offices.map((office) => (
            <div
              key={office.city}
              className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-serif font-bold text-lg">
                {office.city.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
                  Sede {office.city}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Delegación técnica y de operaciones</p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>{office.address}, {office.cp}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                  <span className="font-mono">{office.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{office.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{office.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-24">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xl transition-colors">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
              Envíanos una Consulta Directa
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Te responderemos en menos de 24 horas laborables.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Mensaje Recibido Correctamente
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Un asesor técnico de tu ciudad se pondrá en contacto contigo a la mayor brevedad.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nombre y Apellidos *</label>
                  <input
                    required
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Ej. Laura Sánchez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Teléfono de Contacto *</label>
                  <input
                    required
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="Ej. +34 600 000 000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Correo Electrónico *</label>
                  <input
                    required
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Ciudad o Área</label>
                  <select
                    value={contactForm.city}
                    onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Barcelona">Barcelona & Área Metropolitana</option>
                    <option value="Madrid">Madrid & Comunidad</option>
                    <option value="Valencia">Valencia & Alrededores</option>
                    <option value="Otra">Otra ubicación en España</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Motivo Principal</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'vender', label: 'Quiero Vender' },
                    { id: 'comprar', label: 'Quiero Comprar' },
                    { id: 'reforma', label: 'Solo Reforma' },
                    { id: 'otro', label: 'Consulta General' }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setContactForm({ ...contactForm, interest: item.id })}
                      className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        contactForm.interest === item.id
                          ? 'bg-sky-50 dark:bg-sky-500/10 border-sky-500 text-sky-700 dark:text-sky-300 font-bold'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Mensaje o Detalles del Inmueble</label>
                <textarea
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Cuéntanos brevemente qué necesitas..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Tus datos están protegidos por el RGPD. No cedemos datos a terceros.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-900/20 flex items-center gap-2"
                >
                  <span>Enviar Mensaje</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
