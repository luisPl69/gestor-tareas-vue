<script setup lang="ts">
import { ref, watch } from "vue";
import type { Task } from "../../types/task";

const props = defineProps<{
  task?: Task | null;
  saving?: boolean;
}>();

const emit = defineEmits<{
  save: [task: Omit<Task, "id">];
  cancel: [];
}>();

const title = ref("");
const description = ref("");

watch(
  () => props.task,
  (task) => {
    title.value = task?.title ?? "";
    description.value = task?.description ?? "";
  },
  { immediate: true },
);

function saveTask() {
  if (!title.value.trim()) {
    return;
  }

  emit("save", {
    title: title.value.trim(),
    description: description.value.trim(),
    completed: props.task?.completed ?? false,
  });

  title.value = "";
  description.value = "";
}
</script>

<template>
  <form class="task-form" @submit.prevent="saveTask">
    <h2>{{ task ? "Editar tarea" : "Nueva tarea" }}</h2>

    <label for="title">Título</label>
    <input
      id="title"
      v-model="title"
      type="text"
      placeholder="Ej. Estudiar Vue"
      required
    />

    <label for="description">Descripción</label>
    <textarea
      id="description"
      v-model="description"
      placeholder="Describe la tarea..."
      rows="3"
    ></textarea>

    <div class="form-actions">
      <button type="submit" :disabled="saving">
        {{ saving ? 'Guardando...' : task ? "Guardar cambios" : "Agregar tarea" }}
      </button>

      <button v-if="task" type="button" @click="emit('cancel')">
        Cancelar
      </button>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  padding: 18px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 25px;
}

.task-form label {
  display: block;
  margin-top: 12px;
}

.task-form input,
.task-form textarea {
  width: 100%;
  padding: 9px;
  margin-top: 5px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>
