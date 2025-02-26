import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchPokemonList from "../../api/api.js";

const PokemonData = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function getPokemons() {
      const pokemons = await fetchPokemonList();

      // Filtrando o Pokémon corretamente
      const foundPokemon = pokemons.find(
        (currentValue) => currentValue.id === parseInt(id, 10)
      );

      setPokemon(foundPokemon);
    }

    getPokemons();
  }, [id]); // Adicionando `id` como dependência

  return (
    <div className="poke-data">
      <div className="poke-data__container">
        <div className="poke-data__img">
          <img
            src={pokemon?.sprites.front_default}
            alt={`Imagem do pokemon ${pokemon?.name}`}
          />
        </div>
        <div className="data-text">
          <h2>Pokédex Data</h2>{" "}
          <div className="data-text__number">
            <h3>National №</h3>
            <p>{pokemon?.id}</p>
          </div>
          <div className="data-text__name">
            <h3>Nome</h3>
            <p>{pokemon?.name}</p>
          </div>
          <div className="data-text__type">
            <h3>Tipo</h3>
            <p>{pokemon?.types[0].type.name}</p>
          </div>
          <div className="data-text__height">
            <h3>Altura</h3>
            <p>{pokemon?.height}</p>
          </div>
          <div className="data-text__weight">
            <h3>Peso</h3>
            <p>{pokemon?.weight}</p>
          </div>
          <div className="data-text__abilities">
            <h3>Habilidades</h3>
            <p>{pokemon?.abilities[0].ability.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonData;
