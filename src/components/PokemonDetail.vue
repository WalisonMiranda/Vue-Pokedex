<template>
<div>
  <Loader v-if="isLoading"/>
  <div v-if="isLoading === false">
    <button class="btn-voltar" @click="back">Voltar</button>
    <div v-if="info" class="div-detail">
      <div class="header">
        <h1>{{ info.name }}</h1>
        <img :src="image" />
      </div>
      <div class="div-info">
        <div class="div-row">
          <h4>Experiência: </h4> {{ info.base_experience }}
        </div>
        <div class="div-row">
          <h4>Peso: </h4> {{ info.weight }}
        </div>
        <div class="div-row">
          <h4>Altura: </h4> {{ info.height }}
        </div>
        <div class="appearances">
          <div 
            v-for="(value, key, index) in info.sprites" 
            :key="index"
          >
            <img v-if="value && typeof value === 'string'" :src="value"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { getPokemon, getPokemonImageUrl } from '../service/pokemonService.js';
import Loader from './Loader';

export default {
  components: {
    Loader
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const info = ref(null);
    const isLoading = ref(false);

    onMounted(() => {
      isLoading.value = true;
      getPokemon(route.params.id).then(res => {
        info.value = res;
        console.log(info.value);
      }).finally(() => {
        setInterval(() => {
          isLoading.value = false;
        }, 2000);
      })
    });

    const back = () => router.replace("/");

    const image = computed(() => getPokemonImageUrl(info.value.id))

    return { isLoading, info, image, back };
  },
};
</script>

<style scoped>
  .div-detail {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    border: 1px solid black;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .btn-voltar {
    padding: 10px 15px;
    margin: 1rem 0 0 1rem;
    background-color: #4CAF50;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

  .btn-voltar:hover {
    background-color: #6de471;
  }

  .div-info {
    width: 80%;
    margin-top: 1rem;
    border: 1px solid lightgray;
  }

  .div-row {
    display: flex;
    padding: 5px 1rem;
  }

  .div-row > h4 {
    margin-right: 1rem;
  }

  .appearances {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

</style>
