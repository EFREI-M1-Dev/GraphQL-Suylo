<script setup lang="ts">
import {computed, ref, Ref, UnwrapRef, watchEffect} from "vue";
import {useQuery} from "@urql/vue";
import {graphql} from "../gql";
import CharacterListItem from "./CharacterListItem.vue";

let currentPage: Ref<UnwrapRef<number>> = ref(1);
const emit = defineEmits(['open-modal-details']);

let characters = computed(() => data.value?.characters?.results);

const { data, executeQuery } = useQuery({
  query: graphql( `
    query characters($page: Int!) {
      characters(page: $page) {
        info {
          count
          pages
        }
        results {
          ...CharacterFragment
        }
      }
    }
  `),
  variables: { page: currentPage.value },
  pause: true
});


watchEffect(() => {
  executeQuery({ page: currentPage.value });
});

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
  console.log(currentPage.value);
}

function nextPage() {
  currentPage.value++;
  console.log(currentPage.value);
}

function showModalDetails(id: string) {
  emit('open-modal-details', id);
}
</script>

<template>
  <ul class="home__list" >
    <TransitionGroup name="fade">
      <CharacterListItem v-for="(value, index) of characters" :character="value" :key="index" @open-modal-details="showModalDetails"/>
    </TransitionGroup>
  </ul>
  <div class="home__pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
    <button @click="nextPage">Suivant</button>
  </div>
</template>

<style scoped lang="scss">

</style>