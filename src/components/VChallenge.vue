<template>
  <div class="tonal-card">
    <div class="flex items-center">
      <h3 class="font-bold text-2xl mr-5">{{ id }}</h3>
      <h3>{{ title }}</h3>
    </div>
    <div class="flex justify-end mt-5">
      <md-filled-button @click="emit('select')">
        Select
      </md-filled-button>
    </div>
  </div>  
</template>

<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
})

const emit = defineEmits(["select"]);
</script>

<style lang="scss" scoped>
.tonal-card {
  @apply flex flex-col bg-inverse-on-surface text-on-surface rounded-[32px] overflow-hidden relative p-5;
}

md-linear-progress {
  @apply absolute top-0 left-0 right-0;
}
</style>