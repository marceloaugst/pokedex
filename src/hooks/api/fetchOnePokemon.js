import { useEffect, useState } from "react";

export function fetchOnePokemon(pokemon) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
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
