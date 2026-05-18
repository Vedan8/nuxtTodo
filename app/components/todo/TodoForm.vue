<template>
  <form @submit.prevent="submit" class="todo-form">
    <label for="todo" class="visually-hidden"> Todo title </label>
    <div class="input-wrapper">
      <input id="todo" v-model="title" required placeholder="What needs to be done?" class="todo-input" />
      <button type="submit" class="btn-add">
        Add
      </button>
    </div>
  </form>
</template>

<style scoped>
.todo-form {
  width: 100%;
}

.input-wrapper {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.todo-input {
  flex: 1;
  font-size: 1.125rem;
  padding: 14px 20px;
}

.btn-add {
  gap: 0.5rem;
  padding: 14px 24px;
}
</style>

<script setup lang="ts">
const title = ref("");

const { createTodo } = useTodo();

const submit = async () => {
  await createTodo(title.value);

  title.value = "";
};
</script>
