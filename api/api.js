import axios from "axios";

// pega a url da API e devolve o json
async function fetchPokemonDetails(url) {
  try {
    const response = await axios.get(url);
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do Pokémon:", error);
  }
}

// fornece uma lista de pokemon da API
async function fetchPokemonList(limit = 100, offset = 0) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    const data = await response.data;

    const pokemonDetails = await Promise.all(
      data.results.map((pokemon) => fetchPokemonDetails(pokemon.url))
    );

    //console.log(pokemonDetails); // Aqui você tem todos os detalhes dos Pokémon
    return pokemonDetails;
  } catch (error) {
    console.error("Erro ao buscar a lista de Pokémon:", error);
  }
}

export default fetchPokemonList;
