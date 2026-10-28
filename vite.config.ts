import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const SITEMAP_ROUTES = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/vender', priority: '0.9', changefreq: 'weekly' },
  { path: '/comprar', priority: '0.9', changefreq: 'weekly' },
  { path: '/comprar-para-reformar', priority: '0.9', changefreq: 'weekly' },
  { path: '/valoracion-inmobiliaria', priority: '0.9', changefreq: 'weekly' },
  { path: '/vender-con-reforma', priority: '0.8', changefreq: 'weekly' },
  { path: '/vender-sin-reforma', priority: '0.8', changefreq: 'weekly' },
  { path: '/informe-tecnico-pre-compra', priority: '0.8', changefreq: 'weekly' },
  { path: '/calculadora-reforma-presto', priority: '0.8', changefreq: 'monthly' },
  { path: '/proyectos', priority: '0.8', changefreq: 'weekly' },
  { path: '/nosotros', priority: '0.7', changefreq: 'monthly' },
  { path: '/contacto', priority: '0.7', changefreq: 'monthly' },
];

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'seo-and-verification-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url || '';

            // 1. Google Search Console HTML Verification File
            if (url === '/google4c5b959f315b3482.html') {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end('google-site-verification: google4c5b959f315b3482.html');
              return;
            }

            // Determine origin dynamically to match the exact property domain requested by Googlebot
            const hostHeader = (req.headers['x-forwarded-host'] as string) || (req.headers['host'] as string) || 'ais-pre-jrxje44vozm2mzkpvzzmeh-14911313193.europe-west3.run.app';
            // Clean host of port if behind standard reverse proxy
            const cleanHost = hostHeader.split(',')[0].trim();
            const protoHeader = (req.headers['x-forwarded-proto'] as string) || 'https';
            const origin = `${protoHeader}://${cleanHost}`;

            // 2. Dynamic XML Sitemap (matches whatever domain requests it, eliminating "URL no permitida")
            if (url === '/sitemap.xml' || url.startsWith('/sitemap.xml')) {
              const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_ROUTES.map(
  (r) => `  <url>
    <loc>${r.path ? `${origin}${r.path}` : `${origin}/`}</loc>
    <lastmod>2026-10-28</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>`;
              res.setHeader('Content-Type', 'application/xml; charset=utf-8');
              res.end(xml);
              return;
            }

            // 3. Dynamic robots.txt
            if (url === '/robots.txt') {
              const robots = `User-agent: *
Allow: /
Allow: /google*.html
Allow: /sitemap.xml
Allow: /sitemap.xsl

Sitemap: ${origin}/sitemap.xml
`;
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.end(robots);
              return;
            }

            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      allowedHosts: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
