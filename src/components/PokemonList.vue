<template>
<div>
  <Loader v-if="isLoading"/>
  <div v-if="isLoading === false" class="container">
    <h1>Pokemón App</h1>
    <div class="div-list">
      <div 
        class="div-pokemon" 
        v-for="(pokemon, index) in pList" 
        :key="index"
        @click="selectPokemon(getPokemonId(pokemon.url))"
      >
        <h4>{{ pokemon.name }}</h4>
        <img :src="getPokemonImage(getPokemonId(pokemon.url))" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getPokemonList, getPokemonImageUrl } from '../service/pokemonService.js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Loader from './Loader';

export default {
  components: {
    Loader
  },
  setup() {
    const pList = ref([]);
    const router = useRouter();
    const isLoading = ref(false);

    onMounted(() => {
      isLoading.value = true;
      getPokemonList().then(res => {
        pList.value = res.results;
      }).finally(() => {
        setInterval(() => {
          isLoading.value = false;
        }, 2000);
      });
    }); 

    const getPokemonId = (url) => 
      url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");

    const getPokemonImage = (id) => getPokemonImageUrl(id);

    const selectPokemon = (id) => router.push({
      name: "pokemon",
      params: { id }
    });

    return { pList, getPokemonImage, getPokemonId, selectPokemon, isLoading };
  }
}
</script>

<style scoped>
  .container {
    /* margin: 0 20%; */
    /* margin: auto; */
    /* width: 80%; */
    padding: 2rem 0;
    background-color: rgb(238, 238, 238);
  }

  h1 {
    text-align: center;
  }

  .div-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .div-pokemon {
    max-width: 300px;
    text-align: center;
    padding-top: 1rem;
    margin: 1rem 2rem;
    border: 1px solid gray;
    border-radius: 5px;

    cursor: pointer;
  }

  .div-pokemon:hover {
    transform: scale(1.1);
  }

  .div-pokemon > h4 {
    margin-bottom: 1rem;
  }
</style>