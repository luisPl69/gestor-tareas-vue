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
