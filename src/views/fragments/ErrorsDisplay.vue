<script setup>
defineProps(['errors'])
</script>

<template>
  <p v-if="errors.length > 0" class="errors">
      <ul>
        <li v-for="error in errors">
          {{ error.field }} {{  error.defaultMessage }}
        </li>
      </ul>
    </p>
</template>