<template>
  <ul class="todo-list">
    <TodoItem v-for="todo in todos" :key="todo._id" :todo="todo" />
  </ul>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}
</style>

<script setup lang="ts">
const { todos } = useTodo();
</script>
