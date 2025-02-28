import axios from "axios";

// fornece uma lista de pokemon da API
async function fetchPokemon(pokemon) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    const data = await response.data;
    //console.log(pokemonDetails); // Aqui você tem todos os detalhes dos Pokémon
    return data;
  } catch (error) {
    console.error("Erro ao buscar a lista de Pokémon:", error);
  }
}

export default fetchPokemon;
