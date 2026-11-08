<script setup lang="ts">
import type { Task } from "../../types/task";

defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  toggle: [id: string];
  edit: [task: Task];
  delete: [id: string];
}>();
</script>

<template>
  <article class="task-card">
    <div class="task-info">
      <h3 :class="{ completed: task.completed }">
        {{ task.title }}
      </h3>

      <p>{{ task.description }}</p>

      <span :class="task.completed ? 'done' : 'pending'">
        {{ task.completed ? "Completada" : "Pendiente" }}
      </span>
    </div>

    <div class="task-actions">
      <button @click="emit('toggle', task.id)">
        {{ task.completed ? "Desmarcar" : "Completar" }}
      </button>

      <button @click="emit('edit', task)">Editar</button>

      <button @click="emit('delete', task.id)">Eliminar</button>

      <RouterLink :to="{ name: 'task-detail', params: { id: task.id } }">
        Ver detalle
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.task-card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 12px;
}

.task-info h3 {
  margin-top: 0;
}

.task-info p {
  color: #666;
}

.completed {
  text-decoration: line-through;
  color: gray;
}

.done {
  color: green;
}

.pending {
  color: #b7791f;
}

.task-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
}

button {
  padding: 6px 10px;
  cursor: pointer;
}
</style>
