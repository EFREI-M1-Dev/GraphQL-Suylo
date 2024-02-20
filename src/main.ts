import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createClient, defaultExchanges, dedupExchange, fetchExchange, provideClient } from '@urql/vue';

const client = createClient({
    url: 'https://rickandmortyapi.com/graphql',
    exchanges: [dedupExchange, fetchExchange],
});

const app = createApp(App);

app.use(provideClient(client));
app.mount('#app')
