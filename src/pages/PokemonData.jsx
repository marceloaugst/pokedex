import React from "react";
import { useParams } from "react-router-dom";
import { fetchOnePokemon } from "../hooks/api/fetchOnePokemon.js";
import { prevPokemon, nextPokemon } from "../hooks/api/pokemonNavigation.js";
import PokedexDataBase from "../components/pokedexDataBase.jsx";
import { usePokemonSpecies } from "../hooks/api/fetchPokemonSpecies.js";

function verificarAmizade(baseFriendship) {
  if (baseFriendship >= 70 && baseFriendship <= 100) {
    return "normal";
  } else if (baseFriendship <= 50) {
    return "baixa";
  } else if (baseFriendship >= 200) {
    return "alta";
  } else {
    return "especial";
  }
}

const PokemonData = () => {
  const { id } = useParams();

  const pokemonSpecies = usePokemonSpecies(id);
  const species = pokemonSpecies.data;
  let speciesArray = [];
  if (species) {
    speciesArray.push(species);
  }

  const prev = prevPokemon(id);
  const next = nextPokemon(id);

  const { data } = fetchOnePokemon(id);
  const pokemon = data;

  let pokemonArray = [];
  if (pokemon) {
    pokemonArray.push(pokemon);
  }

  const statLabels = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  const baseStat = pokemon?.stats.map((currPokemon, index) => {
    const label = statLabels[currPokemon.stat.name];
    return label ? (
      <tr key={index}>
        <th>{label}</th>
        <td className="cell-num">{currPokemon.base_stat}</td>
        <td className="cell-barchart">
          <div className="barchart-bar barchart-rank-3 "></div>
        </td>
      </tr>
    ) : null;
  });

  const evyield = pokemon?.stats.map((currPokemon, index) => {
    if (currPokemon.effort !== 0) {
      return (
        <tr key={index}>
          <th>Ev yield</th>
          <td className="text">
            {currPokemon.effort} {currPokemon.stat.name}
          </td>
        </tr>
      );
    }
  });

  const catchRate = speciesArray?.map((currPokemon, index) => {
    const captureRate = currPokemon.capture_rate;
    return (
      <tr key={index}>
        <th>Catch rate</th>
        <td className="cell-num">{captureRate}</td>
      </tr>
    );
  });

  const baseFriendship = speciesArray?.map((currPokemon, index) => {
    const baseHappiness = currPokemon.base_happiness;
    const friendship = verificarAmizade(baseHappiness);
    return (
      <tr key={index}>
        <th>Base Friendship</th>
        <td>
          {baseHappiness}

          <small className="text-muted">({friendship})</small>
        </td>
      </tr>
    );
  });

  const baseExp = pokemonArray?.map((currPokemon, index) => {
    const experience = currPokemon.base_experience;
    return (
      <tr key={index}>
        <th>Base Exp.</th>
        <td className="cell-num">{experience}</td>
      </tr>
    );
  });

  const growthRate = speciesArray?.map((currPokemon, index) => {
    const growthRate = currPokemon.growth_rate.name;
    let formattedStr = growthRate
      .replace("-", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return (
      <tr key={index}>
        <th>Growth Rate</th>
        <td className="cell-num">{formattedStr}</td>
      </tr>
    );
  });

  return (
    <div className="main-content grid-container">
      <h1>{pokemon?.name.toUpperCase()}</h1>

      <nav className="entity-nav component">
        <a href={prev?.id} className="entity-nav-prev">
          {prev?.id} - {prev?.name}
        </a>
        <a href={next?.id} className="entity-nav-next">
          {next?.id} - {next?.name}
        </a>
      </nav>

      <div className="sv-tabs-panel active">
        <div className="grid-row">
          <div className="grid-col span-md-6 span-lg-4 text-center">
            <p>
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                width="355"
                height="283"
                alt={`Imagem do pokemon ${pokemon?.name}`}
              />
            </p>
          </div>

          {pokemonArray.map((currObj, index) => (
            <PokedexDataBase {...currObj} key={index} />
          ))}
          <div className="grid-col span-md-12 span-lg-4">
            <div className="grid-row">
              <div className="grid-col span-md-6 span-lg-12">
                <h2>Training</h2>
                <table className="vitals-table">
                  <tbody>
                    {evyield}
                    {catchRate}
                    {baseFriendship}
                    {baseExp}
                    {growthRate}
                  </tbody>
                </table>
              </div>
              <div className="grid-col span-md-6 span-lg-12">
                <h2>Breeding</h2>
                <table className="vitals-table">
                  <tbody>
                    <tr>
                      <th>Egg Groups </th>
                      <td className="cell-num">Dragon, Monster</td>
                    </tr>
                    <tr>
                      <th>Gender</th>
                      <td className="cell-num">87.5% male, 12.5% female</td>
                    </tr>
                    <tr>
                      <th>Egg cycles</th>
                      <td className="cell-num">20 (4,884–5,140 steps)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col span-md-12 span-lg-8">
            <h2>Base Stats</h2>
            <div className="resp-scroll">
              <table className="vitals-table">
                <tbody>{baseStat}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonData;
