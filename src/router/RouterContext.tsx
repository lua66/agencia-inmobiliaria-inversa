import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type PageRoute = 
  | '/' 
  | '/vender' 
  | '/comprar' 
  | '/proyectos' 
  | '/nosotros' 
  | '/contacto'
  | '/valoracion-inmobiliaria'
  | '/vender-con-reforma'
  | '/vender-sin-reforma'
  | '/comprar-para-reformar'
  | '/informe-tecnico-pre-compra'
  | '/calculadora-reforma-presto'
  | '/aviso-legal'
  | '/politica-privacidad'
  | '/politica-cookies';

interface RouterContextType {
  currentPath: PageRoute;
  navigate: (path: PageRoute, hashSection?: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

// Helper to normalize path from window.location
function normalizePath(pathname: string): PageRoute {
  const clean = pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (clean === '/valoracion-inmobiliaria' || clean.startsWith('/valoracion')) return '/valoracion-inmobiliaria';
  if (clean === '/vender-con-reforma') return '/vender-con-reforma';
  if (clean === '/vender-sin-reforma') return '/vender-sin-reforma';
  if (clean === '/comprar-para-reformar') return '/comprar-para-reformar';
  if (clean === '/informe-tecnico-pre-compra' || clean.startsWith('/informe-tecnico')) return '/informe-tecnico-pre-compra';
  if (clean === '/calculadora-reforma-presto' || clean.startsWith('/calculadora')) return '/calculadora-reforma-presto';
  if (clean === '/aviso-legal') return '/aviso-legal';
  if (clean === '/politica-privacidad') return '/politica-privacidad';
  if (clean === '/politica-cookies') return '/politica-cookies';
  if (clean === '/vender') return '/vender';
  if (clean === '/comprar') return '/comprar';
  if (clean === '/proyectos' || clean.startsWith('/casos')) return '/proyectos';
  if (clean === '/nosotros' || clean.startsWith('/sobre-nosotros')) return '/nosotros';
  if (clean === '/contacto') return '/contacto';
  return '/';
}

interface SEOConfig {
  title: string;
  description: string;
  canonicalPath: string;
  jsonLd?: object;
}

const SEO_METADATA: Record<PageRoute, SEOConfig> = {
  '/': {
    title: 'Agencia Inmobiliaria Inversa | No solo vendemos viviendas. Transformamos su valor.',
    description: 'Plataforma inmobiliaria que combina compraventa, reforma, rehabilitación, diseño y valoración técnica para transformar el valor de cada vivienda.',
    canonicalPath: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      'name': 'Agencia Inmobiliaria Inversa',
      'description': 'Plataforma inmobiliaria y de transformación de viviendas en España. Compraventa, valoración técnica, reforma y diseño integral.',
      'url': 'https://inmobiliariainversa.com/',
      'telephone': '+34934810920',
      'email': 'hola@inmobiliariainversa.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Passeig de Gràcia 48',
        'addressLocality': 'Barcelona',
        'postalCode': '08007',
        'addressCountry': 'ES'
      },
      'areaServed': ['Barcelona', 'Madrid', 'Valencia'],
      'priceRange': '€€€'
    }
  },
  '/vender': {
    title: 'Quiero Vender mi Vivienda | Agencia Inmobiliaria Inversa',
    description: 'Vende tu vivienda tal como está o descubre si te conviene reformarla antes para maximizar su precio. Calculadora de potencial y baremos PRESTO.',
    canonicalPath: '/vender',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '¿Conviene reformar una vivienda antes de venderla?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Depende del estado inicial y la zona. Con un estudio técnico in situ podemos determinar si una puesta a punto o reforma clave puede generar una plusvalía neta superior al coste de la intervención.'
          }
        },
        {
          '@type': 'Question',
          'name': '¿Cómo se calculan los presupuestos de reforma?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Nos basamos en los cuadros de precios estándar de edificación en España (Bases PRESTO) con desglose del 21% de IVA legal. Todo presupuesto se valida tras inspección in situ.'
          }
        }
      ]
    }
  },
  '/comprar': {
    title: 'Comprar y Transformar Vivienda | Agencia Inmobiliaria Inversa',
    description: 'Encuentra viviendas listas para entrar o inmuebles con alto potencial para transformarlos a tu medida. Acompañamiento arquitectónico in situ.',
    canonicalPath: '/comprar',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Servicio Encuentra, Compra y Transforma',
      'provider': {
        '@type': 'RealEstateAgent',
        'name': 'Agencia Inmobiliaria Inversa'
      },
      'serviceType': 'Personal Shopper Inmobiliario y Dirección de Reforma',
      'areaServed': 'España'
    }
  },
  '/proyectos': {
    title: 'Casos Reales de Transformación Inmobiliaria | Inversa',
    description: 'Descubre proyectos reales antes y después: reformas integrales, revalorizaciones documentadas, presupuestos cerrados y plazos garantizados.',
    canonicalPath: '/proyectos'
  },
  '/nosotros': {
    title: 'Sobre Nosotros | 10+ Años Transformando Inmuebles | Inversa',
    description: 'Conoce la filosofía, los 3 pilares y el equipo técnico colegiado de Agencia Inmobiliaria Inversa. Más de una década aportando solvencia y transparencia.',
    canonicalPath: '/nosotros'
  },
  '/contacto': {
    title: 'Contacto y Sedes | Agencia Inmobiliaria Inversa',
    description: 'Contacta con nuestro equipo técnico en Barcelona, Madrid o Valencia. Solicita valoración in situ o asesoramiento personalizado sin compromiso.',
    canonicalPath: '/contacto'
  },
  '/valoracion-inmobiliaria': {
    title: 'Valoración Inmobiliaria Técnica In Situ · Precios PRESTO | Inversa',
    description: 'Auditoría presencial con medición láser, ITE de la finca y cuadro de partidas PRESTO con desglose de 21% IVA. Conoce el potencial real de tu vivienda.',
    canonicalPath: '/valoracion-inmobiliaria',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Valoración Inmobiliaria Técnica In Situ',
      'serviceType': 'Tasación Técnica y Estudio de Revalorización',
      'provider': {
        '@type': 'RealEstateAgent',
        'name': 'Agencia Inmobiliaria Inversa'
      },
      'areaServed': ['Barcelona', 'Madrid', 'Valencia']
    }
  },
  '/vender-con-reforma': {
    title: 'Vender con Reforma Estratégica Previa | Máxima Plusvalía | Inversa',
    description: 'Analizamos tu vivienda, ejecutamos mejoras clave antes de ponerla en el mercado y defendemos su valor frente a ofertas a la baja. Coordinación llave en mano.',
    canonicalPath: '/vender-con-reforma',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Vender con Reforma Estratégica',
      'provider': {
        '@type': 'RealEstateAgent',
        'name': 'Agencia Inmobiliaria Inversa'
      }
    }
  },
  '/vender-sin-reforma': {
    title: 'Vender Vivienda Tal Como Está · Plan Comercial Directo | Inversa',
    description: 'Vende tu inmueble en su estado actual, con reportaje fotográfico profesional, tasación realista y sin obras previas ni complicaciones.',
    canonicalPath: '/vender-sin-reforma'
  },
  '/comprar-para-reformar': {
    title: 'Comprar para Reformar · Encuentra, Compra y Transforma | Inversa',
    description: 'Localización de inmuebles con alto potencial arquitectónico y dirección de obra completa con presupuesto PRESTO cerrado antes de arras.',
    canonicalPath: '/comprar-para-reformar'
  },
  '/informe-tecnico-pre-compra': {
    title: 'Informe Técnico Pre-Compra de Viviendas con Arquitecto | Inversa',
    description: 'Acompañamiento pericial de arquitecto colegiado antes de firmar arras. Detección de aluminosis, humedades, bajantes y viabilidad de tabiquería.',
    canonicalPath: '/informe-tecnico-pre-compra'
  },
  '/calculadora-reforma-presto': {
    title: 'Calculadora de Reforma y Revalorización PRESTO | Inversa',
    description: 'Calcula el coste orientativo de reformar tu inmueble según cuadros oficiales PRESTO con desglose de 21% IVA legal y estimación de plusvalía.',
    canonicalPath: '/calculadora-reforma-presto'
  },
  '/aviso-legal': {
    title: 'Aviso Legal y Condiciones de Uso | Agencia Inmobiliaria Inversa',
    description: 'Información legal, registro mercantil y términos de uso de la plataforma Agencia Inmobiliaria Inversa S.L.',
    canonicalPath: '/aviso-legal'
  },
  '/politica-privacidad': {
    title: 'Política de Privacidad y RGPD | Agencia Inmobiliaria Inversa',
    description: 'Protección de datos de carácter personal y ejercicio de derechos ARCO-POL conforme a la normativa europea RGPD.',
    canonicalPath: '/politica-privacidad'
  },
  '/politica-cookies': {
    title: 'Política de Cookies | Agencia Inmobiliaria Inversa',
    description: 'Información sobre el uso y configuración de cookies en el sitio web de Agencia Inmobiliaria Inversa.',
    canonicalPath: '/politica-cookies'
  }
};

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<PageRoute>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  // Update SEO metadata dynamically
  useEffect(() => {
    const meta = SEO_METADATA[currentPath] || SEO_METADATA['/'];
    document.title = meta.title;

    // Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    // Update OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    // Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + meta.canonicalPath);

    // Update JSON-LD structured data
    const existingScript = document.getElementById('schema-jsonld-page');
    if (existingScript) {
      existingScript.remove();
    }
    if (meta.jsonLd) {
      const script = document.createElement('script');
      script.id = 'schema-jsonld-page';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(meta.jsonLd);
      document.head.appendChild(script);
    }
  }, [currentPath]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: PageRoute, hashSection?: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      const targetUrl = hashSection ? `${path}#${hashSection}` : path;
      window.history.pushState({}, '', targetUrl);
      
      if (hashSection) {
        setTimeout(() => {
          const el = document.getElementById(hashSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
