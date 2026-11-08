<script setup lang="ts">
import type { TaskFilter } from "../../types/task";

defineProps<{
  modelValue: TaskFilter;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: TaskFilter];
}>();
</script>

<template>
  <div class="filters">
    <button
      @click="emit('update:modelValue', 'all')"
      :class="{ active: modelValue === 'all' }"
    >
      Todas
    </button>

    <button
      @click="emit('update:modelValue', 'pending')"
      :class="{ active: modelValue === 'pending' }"
    >
      Pendientes
    </button>

    <button
      @click="emit('update:modelValue', 'completed')"
      :class="{ active: modelValue === 'completed' }"
    >
      Completadas
    </button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

button {
  padding: 8px 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.active {
  background: #333;
  color: white;
}
</style>
