<template>
  <div class="layout">
    <header class="header">
      <div class="header-container">
        <h1>Todo App</h1>
        <nav aria-label="Main navigation">
          <button v-if="user" @click="logout" class="btn-logout">Logout</button>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth();
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--background);
  border-bottom: var(--border-main);
}

.header-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text);
  font-weight: 700;
}

.btn-logout {
  padding: 8px 16px;
  font-size: 0.875rem;
  background: var(--card);
  color: var(--text);
  border: var(--border-main);
  box-shadow: var(--shadow-sm);
  font-weight: 600;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>
