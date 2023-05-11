<template>
  <div>
    <h5 class="text-center text-lg font-bold text-on-surface mb-10">Available Mentors</h5>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      <v-mentor
        v-for="mentor in mentors"
        :key="mentor.mentor_id"
        :img="mentor.img"
        :id="mentor.mentor_id"
        :title="mentor.name"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import makeRequest, { Endpoints } from '../../network/request';

import VMentor from "../../components/VMentor.vue";

const mentors: any = ref([]);

makeRequest("GET", Endpoints.Mentors, null, data => {
  console.log(data);
  mentors.value = data;
})
</script>

<style>

</style>