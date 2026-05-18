<template>
  <div class="form-group">
    <label :for="id">
      {{ label }}
    </label>

    <input
      :id="id"
      :placeholder="placeholder"
      :type="type"
      :required="required"
      v-model="model"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: String,

  label: String,

  placeholder: String,

  required: Boolean,

  type: {
    type: String,
    default: "text",
  },
});

const model = defineModel();
</script>
