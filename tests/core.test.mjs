import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import ts from 'typescript';
import '@angular/compiler';

// Se ejecutan los servicios reales con un LocalStorage aislado del navegador.
await mkdir('tmp/tests', { recursive: true });
async function cargarServicio(nombre) {
  const fuente = await readFile(`src/app/core/${nombre}.ts`, 'utf8');
  const codigo = ts.transpileModule(fuente, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022, experimentalDecorators: true }
  }).outputText;
  const destino = resolve(`tmp/tests/${nombre}.mjs`);
  await writeFile(destino, codigo);
  return import(pathToFileURL(destino).href);
}
const { SessionService, SESION_KEY, CUENTA_DEMO } = await cargarServicio('session.service');
const { CarritoService } = await cargarServicio('carrito.service');
function almacenamiento(datos = new Map()) {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: key => datos.get(key) ?? null,
    setItem: (key, value) => datos.set(key, String(value)),
    removeItem: key => datos.delete(key)
  } });
  return datos;
}

test('login incorrecto no crea sesión; login correcto persiste sin contraseña y sobrevive a una nueva instancia', () => {
  const datos = almacenamiento();
  const sesion = new SessionService();
  assert.equal(sesion.iniciar(CUENTA_DEMO.correo, 'incorrecta'), false);
  assert.equal(datos.size, 0);
  assert.equal(sesion.iniciar(' ADMIN@JP.PE ', CUENTA_DEMO.clave), true);
  const persistido = JSON.parse(datos.get(SESION_KEY));
  assert.equal(persistido.correo, CUENTA_DEMO.correo);
  assert.equal(datos.get(SESION_KEY).includes(CUENTA_DEMO.clave), false);
  const recargada = new SessionService();
  assert.equal(recargada.autenticado(), true);
  recargada.cerrar();
  assert.equal(datos.has(SESION_KEY), false);
  assert.equal(new SessionService().autenticado(), false);
});
test('sesiones corruptas, vacías o incompletas no permiten acceso', () => {
  for (const valor of ['{', 'null', '{}', '[]', '"usuario"', '{"id":1,"correo":"admin@jp.pe"}']) {
    almacenamiento(new Map([[SESION_KEY, valor]]));
    assert.equal(new SessionService().autenticado(), false);
  }
});
test('bloqueo del almacenamiento no activa una sesión que no pueda persistirse', () => {
  almacenamiento();
  const sesion = new SessionService();
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: () => null, setItem: () => { throw new Error('Almacenamiento bloqueado'); }
  } });
  assert.throws(() => sesion.iniciar(CUENTA_DEMO.correo, CUENTA_DEMO.clave));
  assert.equal(sesion.usuario(), null);
});
test('el carrito respeta el stock, calcula cantidades y total y permite eliminar y vaciar', () => {
  const carrito = new CarritoService();
  const producto = { id: 1, nombre: 'Prueba', imagen: '/images/producto-1.svg', categoria: 'Vitaminas', precio: 12.5, stock: 2 };
  assert.equal(carrito.agregar({ ...producto, stock: 0 }), false);
  assert.equal(carrito.agregar(producto), true);
  assert.equal(carrito.agregar(producto), true);
  assert.equal(carrito.agregar(producto), false);
  assert.equal(carrito.cantidad(), 2);
  assert.equal(carrito.total(), 25);
  carrito.eliminar(1);
  assert.equal(carrito.total(), 0);
  carrito.agregar(producto);
  carrito.vaciar();
  assert.equal(carrito.cantidad(), 0);
});
test('db.json contiene todos los campos y las imágenes de cada producto existen', async () => {
  const { productos } = JSON.parse(await readFile('db.json', 'utf8'));
  assert.equal(new Set(productos.map(p => p.id)).size, productos.length);
  for (const p of productos) {
    assert.equal(typeof p.nombre, 'string');
    assert.equal(typeof p.categoria, 'string');
    assert.ok(p.imagen.startsWith('/images/'));
    assert.ok(Number.isFinite(p.precio) && p.precio >= 0);
    assert.ok(Number.isInteger(p.stock) && p.stock >= 0);
    assert.ok((await readFile(`public${p.imagen}`, 'utf8')).includes('<svg'));
  }
});
