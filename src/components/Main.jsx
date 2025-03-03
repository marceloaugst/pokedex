import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useFetchAllPokemon } from "../hooks/api/fetchAllPokemon.js";

const Main = () => {
  const { detailedPokemon, error, loading } = useFetchAllPokemon();

  return (
    <div className="main">
      <ItemList itemArray={detailedPokemon} items="100" idPath="/pokemonData" />
    </div>
  );
};

export default Main;
