# JP · Juntos por el Perú — PC2 (ítems 1 al 10)

Aplicación e-commerce de una botica, basada en el avance de PC1 y desarrollada con Angular 20, TypeScript, Bootstrap y JSON Server.

## Ejecutar el proyecto

Abre dos terminales en VS Code dentro de la carpeta PC2.

**Terminal 1 — Angular:**
```powershell
ng serve
```

**Terminal 2 — JSON Server:**
```powershell
npm.cmd run api
```

Abre http://localhost:4200 en el navegador.

Mantén ambas terminales abiertas mientras utilizas la aplicación.

Para detener cada servidor, presiona Ctrl+C en su terminal.

### Publicación en Netlify

Netlify compila Angular y publica también la API mediante `netlify/functions/api.js`. La configuración de `netlify.toml` utiliza `npm run build` y publica `dist/jp-botica/browser`. El sitio debe estar conectado al repositorio para que el despliegue incluya las funciones; subir solamente la carpeta `dist` no publica la API.

Angular consulta `/api/productos` en el mismo sitio. En Netlify, esa ruta ejecuta JSON Server con los datos de `db.json`; no se conecta a localhost ni necesita que tu computadora esté encendida. La API online es de solo lectura. Para cambiar los productos, actualiza `db.json` y vuelve a desplegar.

En desarrollo puedes seguir usando `ng serve` y `npm.cmd run api`: `proxy.conf.json` dirige `/api/productos` al JSON Server local. Reinicia `ng serve` después de actualizar la configuración del proxy.

## Cuenta de prueba

- Correo: `admin@jp.pe`
- Contraseña: `JP2026!`

El login valida campos obligatorios, formato de correo y contraseña de al menos seis caracteres; verifica las credenciales de prueba. Guarda id, nombre, correo, rol y fecha de inicio en LocalStorage bajo `jp.usuario`. **No almacena la contraseña**.

La sesión se mantiene al recargar y al volver a abrir la aplicación en el mismo navegador y origen. Cerrar sesión elimina la información y vuelve al Home. El guard comprueba LocalStorage antes de entrar al Dashboard y rechaza datos ausentes, corruptos o incompletos. Localhost y 127.0.0.1 tienen almacenes separados: usa siempre la misma dirección durante la prueba.

La autenticación es una simulación para el curso; las credenciales son públicas de demostración y no representan usuarios reales.

## Datos e imágenes

El catálogo tiene una sola fuente: `db.json`, servido por JSON Server. Productos, Dashboard y Contacto consultan el mismo servicio Angular; no hay un catálogo estático alternativo en TypeScript.

Las imágenes SVG son ilustraciones referenciales locales de cada producto. No dependen de enlaces externos. Puedes cambiar el campo `imagen` por otra ruta de `public/` o una URL; si falla la carga se muestra una imagen genérica.

Para demostrar que el catálogo es dinámico, modifica un precio o stock en `db.json`, guarda y recarga Productos o pulsa **Actualizar inventario** en el Dashboard.

Se conservan los filtros, el carrito, la consulta de productos, modo oscuro y tamaño de texto del avance PC1. El carrito respeta el stock de cada producto y se mantiene entre páginas, pero se vacía al recargar. Finalizar compra es una simulación sin cobros ni pedidos reales. El formulario de contacto consulta disponibilidad; no envía reservas. El enlace de WhatsApp permite contactar manualmente.

## Rutas

`/` redirige a `/home`. Páginas: `/home`, `/productos`, `/ofertas`, `/tienda`, `/contacto`, `/mi-cuenta`, `/login` y `/dashboard`. Cualquier otra ruta muestra la página 404.

## Comprobar el funcionamiento

1. Sin sesión, escribe `http://localhost:4200/dashboard`: debe redirigir a `/home`.
2. Abre **Mi Cuenta → Login**. Envía el formulario vacío o con un correo inválido para ver validaciones.
3. Prueba una contraseña incorrecta: se rechaza el acceso.
4. Ingresa con la cuenta de prueba: aparece el Dashboard con tus datos y estadísticas.
5. Recarga el Dashboard: la sesión sigue activa.
6. Cierra sesión y vuelve a escribir `/dashboard`: debe redirigir al Home.
7. En Productos busca Paracetamol, filtra Vitaminas y prueba una búsqueda sin resultados.
8. Agrega Paracetamol, visita Tienda y comprueba el total de S/ 12.50. Los productos sin stock tienen el botón deshabilitado.
9. Detén la API y recarga Productos: aparece el mensaje de conexión; vuelve a encenderla y pulsa Reintentar.
10. Abre `/ruta-inexistente` y comprueba la página 404.
11. Revisa el menú y las cards en móvil; la tabla del Dashboard se desplaza horizontalmente dentro de su contenedor.

## Compilación y pruebas

```powershell
npm.cmd run build
npm.cmd test
```

La compilación de producción se genera en `dist/jp-botica/browser/`. Las pruebas ejecutan los servicios reales con un LocalStorage aislado: credenciales y persistencia, logout, datos de sesión corruptos, almacenamiento bloqueado, límite de stock, total del carrito y campos/imágenes de db.json.

Las pruebas incluyen sesión, carrito y datos del catálogo, además de las rutas pública e interna de la función, consultas por id y categoría, errores 404 y rechazo de escrituras en la API publicada. La vista del Dashboard se conserva en `docs/dashboard-pc2.jpg`.

## Organización

```text
src/app/
  app.ts          Layout compartido
  app.routes.ts             Rutas de la aplicación
  core/
    session.service.ts      Login y LocalStorage
    auth.guard.ts           Protección del Dashboard
    producto.model.ts       Modelo de producto
    productos.service.ts    Consumo de la API REST
    carrito.service.ts      Carrito y totales
  shared/                   Navbar y Footer
  pages/                    Un componente por página
public/images/              Imágenes de productos
db.json                     Base de datos simulada
tests/core.test.mjs          Pruebas automatizadas
tests/api.test.mjs           Pruebas de la API publicada
netlify/functions/api.js    JSON Server para Netlify Functions
netlify.toml                Compilación y publicación
proxy.conf.json             Conexión con la API local
```


