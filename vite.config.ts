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

            // 4. Betipo API Reverse Proxy (solves Betipo's 500 origin restriction on custom/preview domains)
            if (url.startsWith('/api/betipo')) {
              const targetPath = url.replace('/api/betipo', '');
              const targetUrl = `https://api.betipo.es${targetPath}`;

              if (req.method === 'OPTIONS') {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', '*');
                res.statusCode = 204;
                res.end();
                return;
              }

              const chunks: Buffer[] = [];
              req.on('data', (chunk: Buffer) => chunks.push(chunk));
              req.on('end', async () => {
                try {
                  const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined;
                  const fetchHeaders: Record<string, string> = {
                    'Origin': 'https://betipo.es',
                    'Referer': 'https://betipo.es/',
                    'User-Agent': (req.headers['user-agent'] as string) || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                  };
                  if (req.headers['content-type']) {
                    fetchHeaders['Content-Type'] = req.headers['content-type'] as string;
                  }
                  if (req.headers['accept']) {
                    fetchHeaders['Accept'] = req.headers['accept'] as string;
                  }

                  const upstreamRes = await fetch(targetUrl, {
                    method: req.method,
                    headers: fetchHeaders,
                    body: req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,
                  });

                  res.statusCode = upstreamRes.status;
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                  res.setHeader('Access-Control-Allow-Headers', '*');

                  const contentType = upstreamRes.headers.get('content-type');
                  if (contentType) {
                    res.setHeader('Content-Type', contentType);
                  }

                  const arrayBuffer = await upstreamRes.arrayBuffer();
                  res.end(Buffer.from(arrayBuffer));
                } catch (err: unknown) {
                  const errMsg = err instanceof Error ? err.message : String(err);
                  console.error('Betipo proxy error:', errMsg);
                  res.statusCode = 502;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Proxy error', details: errMsg }));
                }
              });
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
