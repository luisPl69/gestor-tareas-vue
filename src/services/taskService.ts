import type { Task, TaskData } from "../types/task";


//CAMBIO DEL API URL POR EL RENDER.COM
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/tasks";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener las tareas");
  }

  return response.json();
}

export async function createTask(data: TaskData): Promise<Task> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear la tarea");
  }

  return response.json();
}

export async function updateTask(
  id: string,
  data: Partial<TaskData>,
): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la tarea");
  }

  return response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la tarea");
  }
}
