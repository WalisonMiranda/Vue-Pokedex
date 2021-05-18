import axios from 'axios';

const getPokemonList = async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=100");
    return res.data;
};

const getPokemon = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data;
};

const getPokemonImageUrl = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export { 
    getPokemonList,
    getPokemon,
    getPokemonImageUrl
}