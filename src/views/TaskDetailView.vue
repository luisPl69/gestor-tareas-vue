<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/tasks";

const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();
const { tasks, loading, error } = storeToRefs(taskStore);
const actionError = ref("");

const taskId = computed(() => String(route.params.id));
const task = computed(() => tasks.value.find((t) => t.id === taskId.value));

onMounted(() => {
  if (!tasks.value.length) {
    taskStore.fetchTasks();
  }
});

async function toggle() {
  if (!task.value) return;
  actionError.value = "";
  try {
    await taskStore.toggleTask(task.value.id);
  } catch {
    actionError.value = "No se pudo cambiar el estado";
  }
}

async function remove() {
  if (!task.value) return;
  actionError.value = "";
  try {
    await taskStore.removeTask(task.value.id);
    router.push({ name: "home" });
  } catch {
    actionError.value = "No se pudo eliminar la tarea";
  }
}
</script>

<template>
  <section class="detail-view">
    <RouterLink to="/" class="back">&larr; Volver al listado</RouterLink>

    <h1>Detalle de la tarea</h1>

    <p v-if="loading">Cargando tarea...</p>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <p v-else-if="!task">No existe una tarea con el id "{{ taskId }}".</p>

    <article v-else class="detail-card">
      <h2 :class="{ completed: task.completed }">{{ task.title }}</h2>
      <p class="description">{{ task.description || "Sin descripción" }}</p>
      <p>
        Estado:
        <span :class="task.completed ? 'done' : 'pending'">
          {{ task.completed ? "Completada" : "Pendiente" }}
        </span>
      </p>
      <p class="id">ID: {{ task.id }}</p>

      <p v-if="actionError" role="alert">{{ actionError }}</p>

      <div class="actions">
        <button @click="toggle">
          {{ task.completed ? "Marcar como pendiente" : "Marcar como hecha" }}
        </button>
        <button class="danger" @click="remove">Eliminar</button>
      </div>
    </article>
  </section>
</template>

<style scoped>
.detail-view {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
}
.back {
  display: inline-block;
  margin-bottom: 16px;
  color: #42b883;
  text-decoration: none;
  font-weight: bold;
}
.detail-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
.description {
  color: #555;
}
.id {
  font-size: 0.85rem;
  color: #888;
}
.done {
  color: green;
}
.pending {
  color: #b7791f;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}
button {
  padding: 8px 12px;
  cursor: pointer;
}
.danger {
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
}
@media (max-width: 480px) {
  .actions {
    flex-direction: column;
  }
}
</style>