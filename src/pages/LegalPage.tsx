import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { useRouter, PageRoute } from '../router/RouterContext';

interface LegalPageProps {
  type: 'aviso-legal' | 'politica-privacidad' | 'politica-cookies';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { navigate } = useRouter();

  const title = {
    'aviso-legal': 'Aviso Legal y Términos de Uso',
    'politica-privacidad': 'Política de Privacidad y Protección de Datos (RGPD)',
    'politica-cookies': 'Política de Cookies'
  }[type];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
      
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:text-sky-600 dark:hover:text-sky-400">Inicio</button>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{title}</span>
      </nav>

      {/* Header */}
      <header className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Cumplimiento Normativo LSSI-CE & Reglamento General (UE) 2016/679</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
          {title}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Última actualización: Mayo 2025 · Agencia Inmobiliaria Inversa S.L.
        </p>
      </header>

      {/* Content based on type */}
      <article className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-6 leading-relaxed">
        
        {type === 'aviso-legal' && (
          <>
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Datos Identificativos de la Empresa</h2>
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Denominación Social:</strong> AGENCIA INMOBILIARIA INVERSA S.L.</li>
                <li><strong>NIF:</strong> B-68940182</li>
                <li><strong>Domicilio Social:</strong> Passeig de Gràcia 48, Principal, 08007 Barcelona (España)</li>
                <li><strong>Registro Mercantil:</strong> Inscrita en el Registro Mercantil de Barcelona, Tomo 44.200, Folio 112, Hoja B-450123.</li>
                <li><strong>Correo de Contacto:</strong> <a href="mailto:legal@inmobiliariainversa.com" className="text-sky-600 underline">legal@inmobiliariainversa.com</a></li>
                <li><strong>Teléfono de Atención:</strong> +34 934 810 920</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Objeto y Ámbito de Aplicación</h2>
              <p>
                El presente sitio web tiene como finalidad facilitar información técnica y comercial relativa a servicios inmobiliarios, valoración in situ, dirección facultativa de reformas, estudio de potencial de transformación de viviendas y coordinación de industriales colegiados.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Régimen de Presupuestos y Normativa PRESTO</h2>
              <p>
                Los cálculos y estimaciones ofrecidos a través de la calculadora de potencial tienen carácter exclusivamente orientativo con base en los cuadros estándar de precios de edificación PRESTO. Ningún presupuesto u oferta adquiere valor contractual vinculante hasta la realización de la visita e inspección in situ por parte de nuestros técnicos titulados y la formalización de la correspondiente propuesta de servicios con desglose de 21% de IVA legal.
              </p>
            </section>
          </>
        )}

        {type === 'politica-privacidad' && (
          <>
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Responsable del Tratamiento</h2>
              <p>
                AGENCIA INMOBILIARIA INVERSA S.L. garantiza la máxima protección y confidencialidad en el tratamiento de los datos de carácter personal facilitados por los usuarios, de conformidad con el Reglamento General de Protección de Datos (RGPD UE 2016/679) y la Ley Orgánica 3/2018 (LOPDGDD).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Finalidad del Tratamiento</h2>
              <p>
                Los datos solicitados a través de los formularios («Valora tu Vivienda», «Pide una Cita» y contacto) se recogen con las siguientes finalidades:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Gestionar y responder a solicitudes de valoración inmobiliaria in situ.</li>
                <li>Coordinar citas técnicas con arquitectos e industriales de nuestra red.</li>
                <li>Remitir estimaciones de revalorización y proyectos de reforma solicitados por el usuario.</li>
                <li>Mantenimiento de la relación contractual en operaciones de intermediación y dirección de obra.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Derechos del Usuario (ARCO-POL)</h2>
              <p>
                El usuario puede ejercer en todo momento sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad remitiendo una comunicación por escrito, adjuntando copia de su documento de identidad, a <a href="mailto:privacidad@inmobiliariainversa.com" className="text-sky-600 underline">privacidad@inmobiliariainversa.com</a>.
              </p>
            </section>
          </>
        )}

        {type === 'politica-cookies' && (
          <>
            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">1. ¿Qué son las Cookies?</h2>
              <p>
                Una cookie es un fichero que se descarga en su dispositivo al acceder a determinadas páginas web. Las cookies permiten a una página web almacenar y recuperar información sobre los hábitos de navegación del usuario o de su equipo para mejorar la experiencia de usuario.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Tipología de Cookies Utilizadas</h2>
              <ul className="list-disc pl-5 space-y-2 text-xs">
                <li><strong>Cookies Técnicas y Estrictamente Necesarias:</strong> Permiten la navegación por el sitio web, gestión de sesiones seguras del CRM interno y preferencias de idioma y tema (claro/oscuro).</li>
                <li><strong>Cookies de Análisis y Métricas:</strong> Utilizadas de forma anónima para medir el tráfico y la interacción de los usuarios con las distintas herramientas técnicas (como la calculadora PRESTO).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Cómo Configurar o Deshabilitar las Cookies</h2>
              <p>
                Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones de su navegador de Internet (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).
              </p>
            </section>
          </>
        )}

      </article>

    </div>
  );
};
