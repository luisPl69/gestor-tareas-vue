<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {storeToRefs} from 'pinia';
import {useTaskStore} from '../stores/tasks';
import type { Task, TaskData, TaskFilter } from "../types/task";

import TaskCard from "../components/tasks/TaskCard.vue";
import TaskFilters from "../components/tasks/TaskFilters.vue";
import TaskForm from "../components/tasks/TaskForm.vue";

const taskStore = useTaskStore();
const { tasks, loading, error } = storeToRefs(taskStore);
const saving = ref(false);

const filter = ref<TaskFilter>('all');
const editingTask = ref<Task | null>(null);
const actionError = ref('');

// Cargar las tareas al abrir la página
onMounted(() => {
  taskStore.fetchTasks();
});

// Filtrar tareas
const filteredTasks = computed(() => {
  if (filter.value === 'pending') {
    return tasks.value.filter(task => !task.completed);
  }

  if (filter.value === 'completed') {
    return tasks.value.filter(task => task.completed);
  }

  return tasks.value;
});

// Crear o editar

async function saveTask(data: TaskData) {
  if (saving.value) return;

  saving.value = true;
  actionError.value = '';

  try {
    if (editingTask.value) {
      await taskStore.editTask(editingTask.value.id, data);
      editingTask.value = null;
    } else {
      await taskStore.addTask(data);
    }
  } catch {
    actionError.value = 'No se pudo guardar la tarea';
  } finally {
    saving.value = false;
  }
}


// Seleccionar tarea para editar
function selectTask(task: Task) {
  editingTask.value = { ...task };
}

// Eliminar tarea
async function removeTask(id: string) {
  actionError.value = '';

  try {
    await taskStore.removeTask(id);
  } catch {
    actionError.value = 'No se pudo eliminar la tarea';
  }
}

// Cambiar estado
async function toggleTask(id: string) {
  actionError.value = '';

  try {
    await taskStore.toggleTask(id);
  } catch {
    actionError.value = 'No se pudo cambiar el estado';
  }
}
</script>

<template>
  <main class="home-view">
    <h1>Gestor de tareas</h1>

    <TaskForm
      :task="editingTask"
      :saving="saving"
      @save="saveTask"
      @cancel="editingTask = null"
    />

    <p v-if="actionError" role="alert">{{ actionError }}</p>

    <TaskFilters v-model="filter" />

    <h2>Mis tareas ({{ filteredTasks.length }})</h2>

    <p v-if="loading">Cargando tareas...</p>

    <p v-else-if="error" role="alert">{{ error }}</p>

    <template v-else>
      <div v-if="filteredTasks.length">
        <TaskCard
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggle="toggleTask"
          @edit="selectTask"
          @delete="removeTask"
        />
      </div>

      <p v-else>No hay tareas para mostrar.</p>
    </template>
  </main>
</template>

<style scoped>
.home-view {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
}
</style>