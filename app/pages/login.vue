<template>
  <div class="auth-container">
    <div class="card">
      <h2 class="auth-title">Welcome Back</h2>

      <form @submit.prevent="handleLogin" class="auth-form">
        <p v-if="errorMessage" class="error">
          <span style="margin-right: 8px; font-weight: 700;">!</span>
          {{ errorMessage }}
        </p>

        <BaseInput id="email" label="Email" type="email" v-model="email" />

        <BaseInput
          id="password"
          label="Password"
          type="password"
          v-model="password"
        />

        <div class="auth-actions">
          <button type="submit" class="btn-primary">Login</button>
          <div class="auth-link">
            Don't have an account? <NuxtLink to="/register">Register</NuxtLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
}

.auth-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.auth-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn-primary {
  width: 100%;
}

.auth-link {
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.auth-link a {
  font-weight: 500;
}
</style>

<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
});

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const { login } = useAuth();

const handleLogin = async () => {
  errorMessage.value = "";
  try {
    await login(email.value, password.value);

    await navigateTo("/dashboard");
  } catch (error: any) {
    errorMessage.value =
      error.data?.statusMessage || error.data?.message || "An error occurred";
  }
};
</script>
