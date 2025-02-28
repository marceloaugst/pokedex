import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import fetchPokemonList from "../../api/apiAllPokemon.js";

const Main = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getPokemons() {
      const pokemons = await fetchPokemonList();
      setList(pokemons);
    }

    getPokemons();
  }, []);

  return (
    <div className="main">
      <ItemList itemArray={list} items="100" idPath="/pokemonData" />
    </div>
  );
};

export default Main;
