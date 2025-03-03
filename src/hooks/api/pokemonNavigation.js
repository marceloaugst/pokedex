import axios from "axios";
import { useEffect, useState } from "react";

// pega a url da API e devolve o json
async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do Pokémon:", error);
  }
}

// fornece uma lista de pokemon da API
async function fetchPokemonList(limit = 100, offset = 0) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map((pokemon) => fetchPokemonDetails(pokemon.url))
    );

    //console.log(pokemonDetails); // Aqui você tem todos os detalhes dos Pokémon
    return pokemonDetails;
  } catch (error) {
    console.error("Erro ao buscar a lista de Pokémon:", error);
  }
}

export function prevPokemon(id) {
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    async function getPokemonsPrev() {
      const getPokemonsPrev = await fetchPokemonList();

      const foundPokemonPrev = getPokemonsPrev.find(
        (currValue) => currValue.id === parseInt(id, 10) - 1
      );

      setPrev(foundPokemonPrev);
    }
    getPokemonsPrev();
  }, []);

  return prev;
}

export function nextPokemon(id) {
  const [next, setPrev] = useState(null);

  useEffect(() => {
    async function getPokemonsPrev() {
      const getPokemonsPrev = await fetchPokemonList();

      const foundPokemonPrev = getPokemonsPrev.find(
        (currValue) => currValue.id === parseInt(id, 10) + 1
      );

      setPrev(foundPokemonPrev);
    }
    getPokemonsPrev();
  }, []);

  return next;
}
