<template>
  <div class="">
    <h4 class="text-center text-on-surface text-lg font-medium mb-5">Pick a Challenge</h4>
    <div v-if="isLoading" class="flex justify-center mt-10">
      <md-circular-progress indeterminate />
    </div>
    <div v-else class="challenges">
      <VChallenge
        class="m-3"
        v-for="challenge in challenges"
        :key="challenge.id"
        :id="challenge.id"
        :title="challenge.title"
        @select="onSelect(challenge)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import makeRequest, { Endpoints } from '../../network/request';
import VChallenge from '../../components/VChallenge.vue';
import { setStore } from '../../utils/storage';

const router = useRouter();
const challenges: any = ref([]);
const isLoading = ref(true);

onMounted(() => {
  makeRequest("GET", Endpoints.Problems, null, (data) => {
    const available = [];

    for (let i = 0; i < 9; i++) {
      available.push(data[i]);
    }

    challenges.value = available;
    isLoading.value = false;
  });
});

function onSelect(challenge: any) {
  setStore("challenge", challenge.title);
  router.push(`/challenge/${challenge.id}`);
}
</script>

<style lang="scss" scoped>
.challenges {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3;
}
</style>
