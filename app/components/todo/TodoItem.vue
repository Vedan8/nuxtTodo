<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <label class="checkbox-container">
      <input
        type="checkbox"
        class="visually-hidden"
        :checked="todo.completed"
        @change="toggle"
        :aria-label="`Mark ${todo.title}`"
      />
      <div class="custom-checkbox">
      </div>
    </label>

    <span class="todo-title">
      {{ todo.title }}
    </span>

    <button @click="remove" class="btn-delete" aria-label="Delete todo">
      Delete
    </button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  background: var(--card);
  border: var(--border-main);
  box-shadow: var(--shadow-sm);
  gap: 1rem;
}
.todo-item.completed {
  opacity: 0.7;
  background: #f1f5f9;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: var(--text-muted);
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.custom-checkbox {
  width: 24px;
  height: 24px;
  border: var(--border-main);
  display: flex;
  justify-content: center;
  background: #ffffff;
  color: #000;
  box-shadow: 2px 2px 0px 0px #111111;
}

input:checked + .custom-checkbox {
  background: var(--success);
}

.todo-title {
  flex: 1;
  font-size: 1.05rem;
  font-weight: 600;
  word-break: break-word;
}

.btn-delete {
  padding: 6px 12px;
  background: var(--danger);
  color: #000;
  border: var(--border-main);
  box-shadow: 2px 2px 0px 0px #111111;
  font-weight: 700;
  font-size: 0.875rem;
  opacity: 1;
}
</style>

<script setup lang="ts">
import type { Todo } from "../../types/todo";

const props = defineProps<{
  todo: Todo;
}>();

const { updateTodo, deleteTodo } = useTodo();

const toggle = async () => {
  await updateTodo(
    props.todo._id,

    !props.todo.completed,
  );
};

const remove = async () => {
  await deleteTodo(props.todo._id);
};
</script>
