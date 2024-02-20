import { createApp } from 'vue'
import './style.css'
import urql, { cacheExchange, fetchExchange } from '@urql/vue';
import App from './App.vue'


const app = createApp(App);

app.use(urql, {
    url: 'https://rickandmortyapi.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
});

app.mount('#app')
