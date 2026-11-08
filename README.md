## Bloque 1: Panorama del Framework
- **Origen y mantenedor:** Vue.js fue creado por Evan You en 2014 y es mantenido por él y la comunidad open-source.
- **Versión actual:** Vue 3 (usando Composition API).
- **Licencia:** MIT.
- **Filosofía:** Es un "Framework Progresivo". A diferencia de Angular (que es monolítico) o React (que es solo una librería), Vue permite adoptarlo gradualmente, desde mejorar una parte de un HTML hasta construir una SPA completa.

## Bloque 2: Instalación y Estructura
- **Herramienta usada:** `create-vue` (basado en Vite), que es el estándar oficial actual.
- **Estructura de carpetas:** 
  - `src/views`: Para las páginas completas (rutas).
  - `src/components`: Para piezas reutilizables de la UI.
  - `src/stores`: Para el estado global con Pinia.
  - `src/router`: Para la configuración de rutas.
- **Error común y solución:** Al inicializar Git, tuvimos un error de permisos en Windows (`dubious ownership`). Lo solucionamos marcando la carpeta como segura con el comando: `git config --global --add safe.directory [ruta_del_proyecto]`.