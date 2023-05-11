<template>
  <div class="container mx-auto">
    <h4 class="text-center text-2xl font-bold text-on-surface mb-10">Your practice problems</h4>

    <div v-show="isLoading" class="flex justify-center">
      <md-circular-progress indeterminate />
    </div>
    <div v-show="!isLoading" class="flex items-center justify-center flex-col">
      <div class="codes p-4 rounded-xl w-full sm:w-3/4 md:w-1/2">
        <VCodeTile
          class="my-5"
          v-for="ex in data"
          :title="ex.problem.title"
          @click="toProblem(ex.problem.problem_id, ex.problem.solution)"
          lang="Javascript"
        />
      </div>

      <md-fab @click="onNewChallenge" class="fixed right-10 bottom-10 cursor-pointer" label="New Challenge">
        <md-icon slot="icon">add</md-icon>
      </md-fab>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import VCodeTile from '../../components/VCodeTile.vue';
import { ref, onMounted } from 'vue';
import makeRequest, { Endpoints } from '../../network/request';
import { setStore } from '../../utils/storage';

const router = useRouter();
const data: any = ref([]);
const isLoading = ref(true);

onMounted(() => {
  makeRequest("GET", Endpoints.InternProblems, null, d => {
    data.value = d;
    isLoading.value = false;
  });
});

function onNewChallenge() {
  router.push({ name: "Challenges" })
}

function toProblem(id: string, code: string) {
  router.push(`/challenge/${id}`);
  setStore("code" + id, code);
}
</script>

<style lang="scss" scoped>
.codes {

}

md-fab {
  @apply cursor-pointer;
}
</style>
