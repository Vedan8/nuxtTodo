<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: async () => {
    const { user, getCurrentUser } = useAuth();

    if (!user.value) {
      await getCurrentUser();
    }

    if (user.value) {
      return navigateTo("/dashboard");
    } else {
      return navigateTo("/login");
    }
  },
});
</script>
