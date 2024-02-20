<script setup lang="ts">
import { useQuery } from '@urql/vue'

import { graphql } from './gql'
import {computed} from "vue";

const { data } = useQuery({
  query: graphql(/* GraphQL */ `
    query {
        characters(page: 1) {
        info {
          count
        }
        results {
          name
        }
      }
    }
  `),
  variables: { first: 10 }
})

const films = data;
</script>

<template>
  <div>
    <h1>Rick and morty</h1>
  </div>
  <div class="list">
    {{ films }}
  </div>
</template>

<style scoped lang="scss">
</style>
