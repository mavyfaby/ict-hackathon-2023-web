<template>
  <div class="flex justify-end">
    <div class="tonal-card">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.tonal-card {
  @apply flex flex-col bg-inverse-on-surface text-on-surface
    rounded-[32px] overflow-hidden relative p-3 text-right;

  width: fit-content;
}
</style>