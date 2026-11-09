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

## Bloque 3. Componentes en Vue 3

### 3.1. ¿Qué son los componentes?

Los componentes son partes independientes y reutilizables de una aplicación. Permiten dividir la interfaz en secciones más pequeñas, facilitando su organización, mantenimiento y reutilización.

En Vue 3 se pueden crear componentes mediante archivos `.vue`, conocidos como Single-File Components (SFC). Estos archivos pueden contener tres secciones principales:

- `<script setup>`: contiene la lógica del componente.
- `<template>`: define los elementos que se muestran en pantalla.
- `<style>`: contiene los estilos visuales.

### 3.2. Plantillas (Templates)

Vue utiliza plantillas basadas en HTML para definir cómo se presenta la información. Dentro de ellas se pueden utilizar expresiones, directivas y enlaces de datos.

Ejemplo:

```vue
<template>
  <h2>{{ titulo }}</h2>
  <p>Bienvenido al gestor de tareas</p>
</template>

<script setup lang="ts">
const titulo = "Mis tareas";
</script>
```

La expresión `{{ titulo }}` permite mostrar el valor de una variable dentro de la plantilla.

### 3.3. Props y eventos

**Props:** permiten enviar información desde un componente padre hacia un componente hijo. Son útiles para reutilizar un mismo componente mostrando información diferente.

Ejemplo:

```vue
<script setup lang="ts">
defineProps<{
  titulo: string;
}>();
</script>

<template>
  <h3>{{ titulo }}</h3>
</template>
```

**Eventos:** permiten que un componente hijo comunique una acción al componente padre. En Vue se utiliza `defineEmits()` para declarar los eventos y `emit()` para enviarlos.

Ejemplo:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  eliminar: [];
}>();
</script>

<template>
  <button @click="emit('eliminar')">Eliminar</button>
</template>
```

El componente padre puede escuchar el evento mediante `@eliminar`.

### 3.4. Renderizado condicional y listas

Vue dispone de directivas para controlar qué elementos se muestran en pantalla.

- `v-if`: muestra un elemento cuando se cumple una condición.
- `v-else`: muestra una alternativa cuando la condición anterior no se cumple.
- `v-show`: controla la visibilidad de un elemento mediante CSS.
- `v-for`: permite recorrer una lista y generar elementos dinámicamente.

Ejemplo:

```vue
<template>
  <p v-if="tareas.length === 0">No hay tareas registradas.</p>

  <div v-else>
    <p v-for="tarea in tareas" :key="tarea.id">
      {{ tarea.title }}
    </p>
  </div>
</template>
```

En este ejemplo, `v-for` recorre el arreglo de tareas y muestra cada título. El atributo `:key` permite identificar cada elemento de la lista.

### 3.5. Ciclo de vida de los componentes

El ciclo de vida representa las diferentes etapas por las que pasa un componente desde que se crea hasta que se elimina.

Los principales momentos son:

| Etapa         | Descripción                                      |
| ------------- | ------------------------------------------------ |
| Creación      | Se inicializa el componente y su lógica.         |
| Montaje       | Se muestra el componente en el DOM.              |
| Actualización | Se actualiza cuando cambian sus datos reactivos. |
| Desmontaje    | Se elimina el componente de la interfaz.         |

Vue proporciona funciones llamadas _Lifecycle Hooks_ para ejecutar código en determinados momentos:

- `onMounted()`: se ejecuta después de que el componente se muestra en el DOM.
- `onUpdated()`: se ejecuta después de una actualización del DOM.
- `onUnmounted()`: se ejecuta después de eliminar el componente.

Ejemplo:

```vue
<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  console.log("El componente se ha cargado");
});
</script>
```

### 3.6. Aplicación práctica en el gestor de tareas

En nuestro proyecto se desarrolló el componente `TaskCard.vue`, encargado de mostrar la información de una tarea y permitir realizar acciones como completarla, editarla o eliminarla.

Este componente recibe una tarea mediante `props` y comunica las acciones mediante eventos.

En `HomeView.vue` se reutiliza tres veces mediante `v-for`, enviando información diferente en cada caso:

```vue
<TaskCard
  v-for="task in filteredTasks"
  :key="task.id"
  :task="task"
  @toggle="toggleTask"
  @edit="editTask"
  @delete="deleteTask"
/>
```

De esta manera, no es necesario crear un componente diferente para cada tarea. El mismo componente presenta la información de todas ellas.

### 3.7. Problemas encontrados

Durante el desarrollo se debe registrar cualquier inconveniente real relacionado con los componentes, sus propiedades, eventos o integración.

**Error encontrado:** [Escribir aquí el error que realmente ocurrió durante el desarrollo].

**Solución aplicada:** [Explicar brevemente cómo se corrigió].

Si no se presentaron errores importantes, se puede indicar que no se registraron inconvenientes relevantes durante las pruebas.

### 3.8. Conclusión

Los componentes de Vue 3 permiten organizar una aplicación en elementos reutilizables y mantener separadas sus responsabilidades. Mediante props, eventos y directivas como `v-if` y `v-for`, fue posible desarrollar una interfaz organizada y funcional para el gestor de tareas.

### 3.9. Fuentes de consulta

- [Vue.js – Componentes básicos](https://vuejs.org/guide/essentials/component-basics.html)
- [Vue.js – Props](https://vuejs.org/guide/components/props.html)
- [Vue.js – Renderizado de listas](https://vuejs.org/guide/essentials/list.html)
- [Vue.js – Renderizado condicional](https://vuejs.org/guide/essentials/conditional.html)
- [Vue.js – Ciclo de vida](https://vuejs.org/guide/essentials/lifecycle.html)


## Bloque 6: Pruebas

### 6.1. Herramientas de pruebas
Usamos **Vitest** como ejecutor de pruebas y **Vue Test Utils** para montar los componentes. Vitest se integra con Vite: reutiliza su configuración y procesa los archivos `.vue` con el mismo plugin. Las pruebas corren en **jsdom**, un DOM simulado en Node, sin abrir navegador ni levantar la API.

### 6.2. Configuración
`vitest.config.ts` fusiona `vite.config.ts` con la sección `test`:

```ts
test: {
  environment: 'jsdom',
  exclude: [...configDefaults.exclude, 'e2e/**'],
  root: fileURLToPath(new URL('./', import.meta.url)),
}
```

Las pruebas están en `src/__tests__/`, carpeta incluida en `tsconfig.vitest.json` y excluida de `tsconfig.app.json`, para que no cuenten como código de la aplicación. Se ejecutan con `npm run test:unit` (modo vigilancia) o `npx vitest run` (una sola vez).

### 6.3. Pruebas implementadas
Resultado final: **5 archivos y 13 pruebas pasando**. Partimos de una línea base de 1 prueba (`App.spec.ts`).

![Pruebas pasando](docs/img/06-vitest-store.png)

1. **TaskCard.spec.ts (3 pruebas):** comprueba que la tarjeta muestre título, descripción y estado según la prop `task`, que aplique la clase `completed`, y que los botones emitan `toggle` y `delete` con el `id` y `edit` con la tarea completa. `RouterLink` se reemplaza por un *stub* porque no hay router en la prueba.
2. **TaskForm.spec.ts (3 pruebas):** con `setValue` y `trigger('submit')` verifica que `save` se emita con los datos limpios (`trim`) y `completed: false`, que no se emita si el título está vacío, y que en modo edición cargue los datos y emita `cancel`.
3. **tasks.store.spec.ts (4 pruebas):** usa `vi.mock` para reemplazar `taskService`, de modo que no depende de la API. Verifica `fetchTasks` (carga y manejo de error), `toggleTask` y `removeTask`.
4. **TaskFilters.spec.ts (2 pruebas):** comprueba el `v-model` de los filtros y el evento `update:modelValue`.
5. **App.spec.ts (1 prueba):** comprueba que la aplicación se monte.

### 6.4. Errores encontrados y solución
- **`[Vue warn]: Failed to resolve component: RouterLink`** en las 3 pruebas de `TaskCard`. Las pruebas pasaban igual, pero con advertencias. *Causa:* el componente usa `<RouterLink>` y en la prueba no hay router. *Solución:* `global: { stubs: { RouterLink: true } }` en `mount()`.

  ![Error RouterLink](docs/img/04-error-routerlink.png)
- **`npm error ENOENT ... C:\WINDOWS\system32\package.json`.** *Causa:* PowerShell abierto como administrador arranca fuera del proyecto. *Solución:* entrar con `cd` a la carpeta del repositorio o usar la terminal de VS Code.
- **Commits sin atribución.** *Causa:* el correo de `git config` no estaba registrado en la cuenta de GitHub. *Solución:* usar el correo `noreply` que GitHub muestra en la configuración de correos.
- **`5 moderate severity vulnerabilities`** tras `npm install`. No se aplicó `npm audit fix --force` para no alterar versiones del proyecto compartido.

## Bloque 7: Ecosistema y despliegue

### 7.1. Herramientas del ecosistema
| Herramienta | Uso en el proyecto |
|---|---|
| create-vue | Generó el proyecto con Router, Pinia y Vitest |
| Vite | Servidor de desarrollo y build de producción |
| Vue Router | Rutas `/` (listado) y `/task/:id` (detalle) |
| Pinia | Store `tasks` compartido por `HomeView` y `TaskDetailView` |
| Vitest + Vue Test Utils | Pruebas unitarias |
| Vue DevTools (`vite-plugin-vue-devtools`) | Inspección de componentes, props y estado de Pinia en desarrollo |
| Extensiones de VS Code (`Vue.volar`, `vitest.explorer`) | Soporte de `.vue` con TypeScript y ejecución de pruebas desde el editor |
| JSON Server | API REST a partir de `db.json` |
| Lighthouse (Chrome DevTools) | Medición de rendimiento de la app publicada |

No usamos librería de UI: el diseño es CSS propio con estilos `scoped` y `media queries`.

![Vue DevTools](docs/img/16-devtools.png)

### 7.2. Build de producción
`npm run build` ejecuta `vue-tsc --build` (verificación de tipos) y `vite build`. Resultado: 43 módulos transformados en 409 ms, sin errores de TypeScript. La vista de detalle se carga con `import()` en el router, por eso Vite la separa en su propio archivo (*code splitting*):

| Archivo | Tamaño | Gzip |
|---|---|---|
| `index-*.js` | 104.96 kB | 40.67 kB |
| `TaskDetailView-*.js` | 1.71 kB | 0.93 kB |
| `index-*.css` | 1.47 kB | 0.58 kB |
| `TaskDetailView-*.css` | 0.81 kB | 0.39 kB |
| `index.html` | 0.44 kB | 0.29 kB |

Tamaño total de `dist`: **111.03 KB**.

![Build](docs/img/09-build.png)
![Tamaño de dist](docs/img/10-tamano-dist.png)

### 7.3. Despliegue
- **API:** JSON Server en Render (plan gratuito): `https://gestor-tareas-vue.onrender.com/tasks`. Comando de inicio: `npx json-server db.json --host 0.0.0.0 --port $PORT`, con `NODE_VERSION=22.18.0`. Limitaciones: el servicio se suspende por inactividad (la primera petición puede tardar cerca de un minuto) y el disco es temporal, por lo que los cambios se pierden al reiniciar.
- **Frontend:** Vercel, desplegado con la CLI (`npx vercel --prod`) desde la carpeta local. Como el repositorio pertenece a otro integrante, no se conectó el despliegue automático y cada cambio requiere repetir el comando.
- La URL de la API se lee de `VITE_API_URL` (`.env.production`), con `localhost:3000` por defecto en desarrollo.
- `vercel.json` redirige todas las rutas a `index.html` para que Vue Router resuelva `/task/:id` al recargar.

**URL pública:** https://gestor-tareas-vue.vercel.app

Verificado en la URL pública: el listado carga las tareas desde Render, recargar en `/task/1` no da 404, y crear, editar, marcar y eliminar funcionan.

![App publicada](docs/img/12-vercel-publico.png)
![Vista móvil](docs/img/12b-vercel-movil.png)

En la vista móvil aparece una barra de desplazamiento horizontal en pantallas angostas, probablemente por la fila de botones de `TaskCard`. Queda anotado como limitación del diseño responsive.

### 7.4. Errores encontrados y solución
- **`'"perl"' is not recognized as an internal or external command`** al ejecutar `npx cloc src`. *Causa:* el paquete `cloc` de npm es un script en Perl y Windows no lo trae. *Solución:* descargar `cloc.exe` desde los releases de AlDanial/cloc y ejecutar `.\cloc.exe src`.
- **`Error: No existing credentials found`** al usar `npx vercel`. *Causa:* primera vez con la CLI, sin sesión. *Solución:* `npx vercel login` y autorizar en el navegador.
- **`Error: Failed to connect luisPl69/gestor-tareas-vue to project`.** *Causa:* respondimos "yes" a conectar el repositorio, pero pertenece a otro usuario. *Solución:* el despliegue se hizo igual desde la carpeta local; sin despliegue automático, cada cambio requiere `npx vercel --prod`.
- **Render autocompletó `npm install && npm run build` y `yarn start`.** *Causa:* asumió una app Node normal. *Solución:* `npm install` y `npx json-server db.json --host 0.0.0.0 --port $PORT`.

## Tabla de mediciones
| Métrica | Valor | Evidencia |
|---|---|---|
| Tiempo de configuración inicial (min) | [Integrante 1] | |
| Líneas de código (`cloc src`) | 779 (467 Vue y 312 TypeScript, 17 archivos) | `docs/img/11-cloc.png` |
| Tamaño del build (carpeta `dist`) | 111.03 KB | `docs/img/10-tamano-dist.png` |
| Lighthouse rendimiento (móvil) | 100 en el listado `/` y 100 en el detalle `/task/1` (FCP 1.2 s, LCP 1.2 a 1.3 s) | `docs/img/15-lighthouse-listado.png`, `docs/img/14-lighthouse-detalle.png` |
| Horas totales del grupo | [suma de los 4] | |
| Dificultad percibida (1 a 5) | [promedio de los 4] | |

Lighthouse se midió con la API despierta. Accessibility dio 88 y 89, Best Practices 100 y SEO 82.