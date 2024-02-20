<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { graphql } from './gql'
import {computed, Ref, ref, UnwrapRef} from 'vue';
import CharacterListItem from "./components/CharacterListItem.vue";
import CharacterModalDetails from "./components/CharacterModalDetails.vue";

let currentPage: Ref<UnwrapRef<number>> = ref(1);
let showModal: Ref<Boolean> = ref(false);
let showModalId: Ref<string> = ref('');

const { data } = useQuery({
  query: graphql( `
    query characters($page: Int!) {
      characters(page: $page) {
        info {
          count
        }
        results {
          ...CharacterFragment
        }
      }
    }
  `),
  variables: { page: currentPage.value },
});

const characters = computed(() => data.value?.characters?.results);

function showModalDetails(id: string) {
  showModal.value = true;
  showModalId.value = id;
}

function closeModalDetails() {
  showModal.value = false;
}
</script>

<template>
  <div class="home">
    <h1>
      Liste des personnages de Rick et Morty
    </h1>
    <ul class="home__list" >
      <TransitionGroup name="fade">
        <CharacterListItem v-for="(value, index) of characters" :character="value" :key="index" @open-modal-details="showModalDetails"/>
      </TransitionGroup>
    </ul>
  </div>

  <CharacterModalDetails v-if="showModal" :id="showModalId" @close-modal="closeModalDetails"/>
</template>
<style lang="scss">

.home{
  max-width: 1400px;
  margin: auto;
  text-align: center;
  &__list{
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    padding: 1rem;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>