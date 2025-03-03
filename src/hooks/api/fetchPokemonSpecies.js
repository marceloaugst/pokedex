import { useEffect, useState } from "react";

export function usePokemonSpecies(pokemon) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemon) return; // Evita requisições se o nome ou ID for inválido

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setError(error);
      });
  }, [pokemon]); // Adicionando pokemon como dependência

  return { data, error };
}
