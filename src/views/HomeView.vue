<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/tasks";
import type { Task, TaskData, TaskFilter } from "../types/task";

import TaskCard from "../components/tasks/TaskCard.vue";
import TaskFilters from "../components/tasks/TaskFilters.vue";
import TaskForm from "../components/tasks/TaskForm.vue";

const taskStore = useTaskStore();
const { tasks, loading, error } = storeToRefs(taskStore);
const saving = ref(false);

const filter = ref<TaskFilter>("all");
const editingTask = ref<Task | null>(null);
const actionError = ref("");

const searchQuery = ref("");

// Cargar las tareas al abrir la página
onMounted(() => {
  taskStore.fetchTasks();
});

// Filtrar tareas
const filteredTasks = computed(() => {
  let result = tasks.value;

  if (filter.value === "pending") {
    result = result.filter((task) => !task.completed);
  } else if (filter.value === "completed") {
    result = result.filter((task) => task.completed);
  }

  const search = searchQuery.value.trim().toLowerCase();

  if (search) {
    result = result.filter((task) => task.title.toLowerCase().includes(search));
  }

  return result;
});

// Crear o editar

async function saveTask(data: TaskData) {
  if (saving.value) return;

  saving.value = true;
  actionError.value = "";

  try {
    if (editingTask.value) {
      await taskStore.editTask(editingTask.value.id, data);
      editingTask.value = null;
    } else {
      await taskStore.addTask(data);
    }
  } catch {
    actionError.value = "No se pudo guardar la tarea";
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
  actionError.value = "";

  try {
    await taskStore.removeTask(id);
  } catch {
    actionError.value = "No se pudo eliminar la tarea";
  }
}

// Cambiar estado
async function toggleTask(id: string) {
  actionError.value = "";

  try {
    await taskStore.toggleTask(id);
  } catch {
    actionError.value = "No se pudo cambiar el estado";
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
    <div class="task-search">
      <label for="task-search">Buscar tarea</label>

      <input
        id="task-search"
        v-model="searchQuery"
        type="search"
        placeholder="Buscar por título..."
      />
    </div>

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
.task-search {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.task-search label {
  font-weight: 500;
}

.task-search input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
}
</style>
