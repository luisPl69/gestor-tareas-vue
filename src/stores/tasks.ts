import { ref } from "vue";
import { defineStore } from "pinia";
import type { Task, TaskData } from "../types/task";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref("");

  async function fetchTasks() {
    loading.value = true;
    error.value = "";

    try {
      tasks.value = await getTasks();
    } catch (err) {
      error.value = "No se pudieron cargar las tareas";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function addTask(data: TaskData) {
    const newTask = await createTask(data);
    tasks.value.push(newTask);
  }

  async function editTask(id: string, data: Partial<TaskData>) {
    const updatedTask = await updateTask(id, data);

    const index = tasks.value.findIndex((task) => task.id === id);

    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
  }

  async function removeTask(id: string) {
    await deleteTask(id);
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  async function toggleTask(id: string) {
    const task = tasks.value.find((task) => task.id === id);

    if (task) {
      await editTask(id, { completed: !task.completed });
    }
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    toggleTask,
  };
});
