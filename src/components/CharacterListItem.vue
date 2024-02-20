<script setup lang="ts">
import { graphql, type FragmentType, useFragment } from '../gql';

const emit = defineEmits(['openModalDetails']);
const props = defineProps<{
  character: FragmentType<typeof CharacterFragment> | null;
}>();

const CharacterFragment = graphql(`
  fragment CharacterFragment on Character {
    id
    name
    image
  }
`);
const chaObj = useFragment(CharacterFragment, props.character);

function openModalDetails(id: string) {
  emit('openModalDetails', id);
}
</script>

<template>
  <section class="chara__item" v-if="chaObj" :data-id="chaObj.id" @click="openModalDetails(<string>chaObj.id)">
    <img :src="chaObj.image" :alt="chaObj.name + '\'s image'" v-if="chaObj.image"/>
    <h3>
      {{ chaObj.name }}
    </h3>
  </section>
</template>

<style lang="scss">
.chara{
  &__item{
    text-align: center;
    &:hover{
      cursor: pointer;
      img{
        transform: scale(1.05);
      }
    }
    img{
      transition: transform 0.2s;
      border-radius: 5px;
      width: 100%;
      height: auto;
    }
  }
}
</style>