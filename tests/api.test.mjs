import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import api from '../netlify/functions/api.js';

const { productos } = JSON.parse(await readFile('db.json', 'utf8'));
function invocar(path, httpMethod = 'GET', queryStringParameters = null) {
  return api.handler({
    path, httpMethod, headers: { host: 'botica-jp.netlify.app' },
    queryStringParameters, body: httpMethod === 'POST' ? JSON.stringify({ nombre: 'No guardar' }) : null,
    isBase64Encoded: false, requestContext: {}
  }, {});
}

test('la función entrega db.json por la URL pública y por la URL interna de Netlify', async () => {
  for (const path of ['/api/productos', '/.netlify/functions/api/productos']) {
    const respuesta = await invocar(path);
    assert.equal(respuesta.statusCode, 200);
    assert.match(respuesta.headers['content-type'], /application\/json/);
    assert.deepEqual(JSON.parse(respuesta.body), productos);
  }
});
test('JSON Server conserva consultas por id y filtros de categoría', async () => {
  const individual = await invocar(`/api/productos/${productos[0].id}`);
  assert.deepEqual(JSON.parse(individual.body), productos[0]);
  const filtrados = await invocar('/api/productos', 'GET', { categoria: 'Vitaminas' });
  assert.deepEqual(JSON.parse(filtrados.body), productos.filter(p => p.categoria === 'Vitaminas'));
});
test('una ruta de API desconocida devuelve 404 JSON, no la página Angular', async () => {
  const respuesta = await invocar('/api/no-existe');
  assert.equal(respuesta.statusCode, 404);
  assert.match(respuesta.headers['content-type'], /application\/json/);
});
test('la API publicada rechaza escrituras y conserva el catálogo', async () => {
  for (const metodo of ['POST', 'PUT', 'PATCH', 'DELETE']) {
    const respuesta = await invocar('/api/productos/1', metodo);
    assert.equal(respuesta.statusCode, 405);
    assert.equal(respuesta.headers.allow, 'GET, HEAD, OPTIONS');
  }
  const respuesta = await invocar('/api/productos');
  assert.deepEqual(JSON.parse(respuesta.body), productos);
});
test('el proxy local y la publicación mantienen la API antes del fallback de Angular', async () => {
  const reglas = (await readFile('public/_redirects', 'utf8')).trim().split(/\r?\n/);
  assert.equal(reglas[0], '/api/* /.netlify/functions/api/:splat 200');
  assert.equal(reglas[1], '/* /index.html 200');
  const proxy = JSON.parse(await readFile('proxy.conf.json', 'utf8'));
  assert.equal(proxy['/api/**'].pathRewrite['^/api'], '');
});
