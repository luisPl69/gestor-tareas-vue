import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTaskStore } from "../stores/tasks";
import { getTasks, updateTask, deleteTask } from "../services/taskService";
import type { Task } from "../types/task";

vi.mock("../services/taskService", () => ({
  getTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

function crearTareas(): Task[] {
  return [
    { id: "1", title: "Estudiar Vue", description: "Componentes", completed: false },
    { id: "2", title: "Realizar deber", description: "Programación", completed: true },
  ];
}

describe("useTaskStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("fetchTasks carga las tareas y apaga loading", async () => {
    vi.mocked(getTasks).mockResolvedValue(crearTareas());
    const store = useTaskStore();

    await store.fetchTasks();

    expect(store.tasks).toHaveLength(2);
    expect(store.loading).toBe(false);
    expect(store.error).toBe("");
  });

  it("fetchTasks guarda un mensaje de error si la API falla", async () => {
    vi.mocked(getTasks).mockRejectedValue(new Error("Network error"));
    const silencio = vi.spyOn(console, "error").mockImplementation(() => {});
    const store = useTaskStore();

    await store.fetchTasks();

    expect(store.error).toBe("No se pudieron cargar las tareas");
    expect(store.tasks).toEqual([]);
    silencio.mockRestore();
  });

  it("toggleTask invierte completed y actualiza la lista", async () => {
    vi.mocked(getTasks).mockResolvedValue(crearTareas());
    vi.mocked(updateTask).mockResolvedValue({
      id: "1", title: "Estudiar Vue", description: "Componentes", completed: true,
    });
    const store = useTaskStore();
    await store.fetchTasks();

    await store.toggleTask("1");

    expect(updateTask).toHaveBeenCalledWith("1", { completed: true });
    expect(store.tasks[0]?.completed).toBe(true);
  });

  it("removeTask elimina la tarea de la lista", async () => {
    vi.mocked(getTasks).mockResolvedValue(crearTareas());
    vi.mocked(deleteTask).mockResolvedValue(undefined);
    const store = useTaskStore();
    await store.fetchTasks();

    await store.removeTask("1");

    expect(deleteTask).toHaveBeenCalledWith("1");
    expect(store.tasks.map((t) => t.id)).toEqual(["2"]);
  });
});