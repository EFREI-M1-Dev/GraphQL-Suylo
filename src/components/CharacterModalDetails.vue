<script setup lang="ts">
import {graphql} from "../gql";
import {ref, watchEffect} from "vue";
import {useQuery} from "@urql/vue";

const props = defineProps({
  id: String
})
const emit = defineEmits(['close-modal']);

const {data, executeQuery} = useQuery({
  query: graphql(`
    query character($id: ID!) {
      character(id: $id) {
        id
        name
        image
        status
        species
        gender
        location {
          name
        }
      }
    }
  `),
  variables: {id: props.id},
  pause: true,
});

const character = ref();

watchEffect(() => {
  if (props.id) {
    executeQuery({id: props.id});
  }
  if (data.value?.character) {
    character.value = data.value.character;
  }
});

function closeModal() {
  emit('close-modal');
}
</script>

<template>
  <div class="modal" @click="closeModal">
    <div class="modal__content" @click.stop>
      <h2 class="modal__content__title">
        Détails du personnage
      </h2>
        <Transition name="fade">
          <div class="modal__content__details" v-if="character">
            <img :src="character?.image" :alt="character?.name + '\'s image'" />
            <h3>
              {{ character.name }}
            </h3>
            <ul>
              <li>
                Type: {{ character.species }}
              </li>
              <li>
                Genre: {{ character.gender }}
              </li>
              <li>
                Status: {{ character.status }}
              </li>
              <li>
                Emplacement: {{ character.location.name }}
              </li>
            </ul>
          </div>
        </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    background-color: white;
    color: #282828;
    padding: 2rem;
    min-height: 490px;
    min-width: 400px;
    box-sizing: border-box;
    border-radius: 5px;

    &__title{
      text-align: center;
      margin-top: 0;
      color: #2f31be
    }

    &__details{
      display: flex;
      flex-direction: column;
      img{
        align-self: center;
        width: 150px;
        height: auto;
        border-radius: 5px;
      }
      ul{
        margin-top: 0;
        padding-left: .8rem;
        li{
          margin: 0.5rem 0;
        }
      }
    }
  }
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>