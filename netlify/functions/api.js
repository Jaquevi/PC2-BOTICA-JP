const jsonServer = require('json-server');
const serverless = require('serverless-http');
const datos = require('../../db.json');

const app = jsonServer.create();
app.disable('x-powered-by');

// El catálogo publicado es de consulta. No intenta escribir en db.json.
app.use((req, res, next) => {
  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return res.status(405).set('Allow', 'GET, HEAD, OPTIONS').json({ error: 'El catálogo es de solo lectura.' });
  }
  if (req.method === 'OPTIONS') return res.status(204).set('Allow', 'GET, HEAD, OPTIONS').end();
  return next();
});

// Se acepta tanto la URL pública como la ruta interna de Netlify Functions.
app.use(['/api', '/.netlify/functions/api'], jsonServer.router(structuredClone(datos)));
app.use((_req, res) => res.status(404).json({ error: 'Recurso no encontrado.' }));

exports.handler = serverless(app);
