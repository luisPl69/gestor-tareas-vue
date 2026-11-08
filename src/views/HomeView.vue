<script setup lang="ts">
import { ref, computed } from "vue";
import type { Task, TaskFilter } from "../types/task";

import TaskCard from "../components/tasks/TaskCard.vue";
import TaskFilters from "../components/tasks/TaskFilters.vue";
import TaskForm from "../components/tasks/TaskForm.vue";

// Datos temporales para probar la interfaz
const tasks = ref<Task[]>([
  {
    id: 1,
    title: "Estudiar Redes",
    description: "Aprender ipv6.",
    completed: false,
  },
  {
    id: 2,
    title: "Entregar trabajo de probabilidad",
    description:
      "Hacer el trabajo de probabilidad y entregarlo antes del viernes.",
    completed: true,
  },
  {
    id: 3,
    title: "Revisar Programación web",
    description: "Revisar el proyecto de programación web.",
    completed: false,
  },
]);

const filter = ref<TaskFilter>("all");
const editingTask = ref<Task | null>(null);

// Aplicar el filtro seleccionado
const filteredTasks = computed(() => {
  if (filter.value === "pending") {
    return tasks.value.filter((task) => !task.completed);
  }

  if (filter.value === "completed") {
    return tasks.value.filter((task) => task.completed);
  }

  return tasks.value;
});

// Crear o editar una tarea
function saveTask(data: Omit<Task, "id">) {
  if (editingTask.value) {
    const task = tasks.value.find((task) => task.id === editingTask.value?.id);

    if (task) {
      Object.assign(task, data);
    }

    editingTask.value = null;
    return;
  }

  const newTask: Task = {
    id: Date.now(),
    ...data,
  };

  tasks.value.push(newTask);
}

// Seleccionar tarea para editar
function editTask(task: Task) {
  editingTask.value = { ...task };
}

// Eliminar tarea
function deleteTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
}

// Cambiar estado de una tarea
function toggleTask(id: number) {
  const task = tasks.value.find((task) => task.id === id);

  if (task) {
    task.completed = !task.completed;
  }
}
</script>

<template>
  <main class="home-view">
    <h1>Gestor de tareas</h1>

    <TaskForm
      :task="editingTask"
      @save="saveTask"
      @cancel="editingTask = null"
    />

    <TaskFilters v-model="filter" />

    <h2>Mis tareas ({{ filteredTasks.length }})</h2>

    <div v-if="filteredTasks.length">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @edit="editTask"
        @delete="deleteTask"
      />
    </div>

    <p v-else>No hay tareas para mostrar.</p>
  </main>
</template>

<style scoped>
.home-view {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
}
</style>
