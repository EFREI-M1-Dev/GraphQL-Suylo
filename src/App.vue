<script setup lang="ts">
import {Ref, ref} from 'vue';
import CharacterModalDetails from "./components/CharacterModalDetails.vue";
import CharacterList from "./components/CharacterList.vue";

let showModal: Ref<Boolean> = ref(false);
let showModalId: Ref<string> = ref('');

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
    <CharacterList @open-modal-details="showModalDetails"/>
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