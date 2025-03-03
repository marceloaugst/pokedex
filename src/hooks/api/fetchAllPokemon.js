import { useEffect, useState } from "react";

export function useFetchAllPokemon(limit = 100, offset = 0) {
  const [pokemonList, setPokemonList] = useState([]);
  const [detailedPokemon, setDetailedPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setPokemonList(json.results)) // Pegamos apenas o results
      .catch((error) => {
        console.error("Erro ao buscar lista de Pokémon:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [limit, offset]);

  // Buscar os detalhes de cada Pokémon
  useEffect(() => {
    if (pokemonList.length === 0) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const details = await Promise.all(
          pokemonList.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json())
          )
        );
        setDetailedPokemon(details);
      } catch (error) {
        console.error("Erro ao buscar detalhes dos Pokémon:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemonList]);

  return { detailedPokemon, error, loading };
}
