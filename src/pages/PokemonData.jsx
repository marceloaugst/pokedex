import React from "react";
import { useParams } from "react-router-dom";
import { Table, Container, Navbar } from "react-bootstrap";
import { fetchOnePokemon } from "../hooks/api/fetchOnePokemon.js";
import { prevPokemon, nextPokemon } from "../hooks/api/pokemonNavigation.js";
import PokedexDataBase from "../components/pokedexDataBase.jsx";

const PokemonData = () => {
  const { id } = useParams();

  // const { data } = fetchOnePokemon(id);

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
        <td>{currPokemon.base_stat}</td>
        <td className="cell-barchart">
          <div
            style={{ width: "100" }}
            className="barchart-bar barchart-rank-3 "
          ></div>
        </td>
      </tr>
    ) : null;
  });

  return (
    <div className="main">
      <h1>{pokemon?.name.toUpperCase()}</h1>

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Text>
            <a href={prev?.id}>
              {prev?.id} - {prev?.name}
            </a>
          </Navbar.Text>
          <Navbar.Text>
            <a href={next?.id}>
              {next?.id} - {next?.name}
            </a>
          </Navbar.Text>
        </Container>
      </Navbar>

      <div className="poke-data">
        <div className="poke-data__container">
          <div className="data-img">
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
        </div>
      </div>
      <div className="grid-row">
        <div>
          <h2>Base Stats</h2>
          <table>
            <tbody>{baseStat}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PokemonData;
