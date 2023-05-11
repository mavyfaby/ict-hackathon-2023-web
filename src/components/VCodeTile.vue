<template>
  <div class="tile">
    <div class="flex flex-col justify-between w-full ">
      <h4 class="title">{{ title }}</h4>
      <h4 class="name" v-if="name && name.length > 0">By {{ name }}</h4>
      <div class="flex justify-between mt-3">
        <div class="flex gap-3">
          <img width="20" class="rounded-lg" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="">
          <span class="text-sm">
            {{ lang }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <md-icon-button>
        <md-icon>arrow_right</md-icon>
      </md-icon-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  lang: {
    type: String,
    required: true
  },
})
</script>

<style lang="scss" scoped>
.tile {
  @apply flex bg-surface-variant hover:bg-surface-variant p-4 rounded-xl cursor-pointer transition-all duration-75 hover:scale-[0.98];
}

.title {
  @apply text-lg font-medium text-on-surface;
}

.desc {
  @apply text-sm text-on-surface opacity-70;
}
</style>
