import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: PokemonList },
        { path: "/pokemon/:id", name: "pokemon", component: PokemonDetail }
    ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');
