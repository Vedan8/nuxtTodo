<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h2 class="welcome-text">
        Welcome back, <span class="username">{{ user?.username }}</span>
      </h2>
      <p class="subtitle">Here's what you need to do today.</p>
    </div>

    <div class="todo-section card">
      <TodoForm />
      <div class="divider"></div>
      <TodoList />
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  width: 100%;
  max-width: 600px;
}

.dashboard-header {
  margin-bottom: 2rem;
  text-align: center;
}

.welcome-text {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 700;
}

.username {
  background-color: var(--primary);
  color: #000;
  padding: 0 8px;
  border: var(--border-main);
  box-shadow: var(--shadow-sm);
  display: inline-block;
  transform: rotate(-2deg);
}

.subtitle {
  color: var(--text-muted);
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
}

.todo-section {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.divider {
  height: 1px;
  background: var(--card-border);
  margin: 1.5rem 0;
  width: 100%;
}
</style>

<script setup lang="ts">
useHead({
  title: 'Dashboard - Todo App'
});

definePageMeta({
  middleware: ["auth"],
});

const { user } = useAuth();

const { getTodos } = useTodo();

await getTodos();
</script>
