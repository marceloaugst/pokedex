import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import fetchPokemon from "../../api/apiOnePokemon.js";
import fetchPokemonList from "../../api/apiAllPokemon.js";
import { Table, Container, Navbar } from "react-bootstrap";

const PokemonData = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    async function getPokemon() {
      const pokemons = await fetchPokemon(id);
      setPokemon(pokemons);
    }

    getPokemon();
  }, []); // Adicionando `id` como dependência

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

  useEffect(() => {
    async function getPokemonsNext() {
      const getPokemonsNext = await fetchPokemonList();

      const foundPokemonNext = getPokemonsNext.find(
        (currValue) => currValue.id === parseInt(id, 10) + 1
      );

      setNext(foundPokemonNext);
    }
    getPokemonsNext();
  }, []);

  // Pegar os types do pokemon e retornar uma div dinamica
  // Porq as vezes o Pokemon tem mais de um Type
  const typesTd = pokemon?.types.map((currTypes, index) => {
    let typeName = currTypes.type.name;
    let formattedName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
    const typeCss = `type-icon type-${typeName} `;
    return (
      <div className={typeCss} key={index}>
        {formattedName}
      </div>
    );
  });

  // Pegar os abilities do pokemon e retornar uma div dinamica
  // Porq as vezes o Pokemon tem mais de um abilities
  const abilitiesTd = pokemon?.abilities.map((currAbilities, index) => {
    let abilitiesName = currAbilities.ability.name;
    let formattedName =
      abilitiesName.charAt(0).toUpperCase() + abilitiesName.slice(1);
    let indexLoc = index + 1;
    const hiddenAbility = currAbilities.is_hidden;
    if (!hiddenAbility) {
      return (
        <>
          <span className="text-2muted" key={index + formattedName}>
            {indexLoc}. {formattedName}
          </span>
          <br />
        </>
      );
    } else {
      return (
        <>
          <small className="text-2muted" key={index + formattedName}>
            {formattedName} (hidden ability)
          </small>
          <br />
        </>
      );
    }
  });

  return (
    <div className="main">
      <h1>
        {pokemon?.id} - {pokemon?.name.toUpperCase()}
      </h1>
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
                width="360"
                height="400"
                alt={`Imagem do pokemon ${pokemon?.name}`}
              />
            </p>
          </div>
          <div className="data-text">
            <h2>Pokédex Data</h2>
            <Table>
              <tbody>
                <tr>
                  <th>National №</th>
                  <td>
                    <strong>{pokemon?.id}</strong>
                  </td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{typesTd}</td>
                </tr>
                <tr>
                  <th>Height</th>
                  <td>{pokemon?.height}</td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>{pokemon?.weight} kg</td>
                </tr>
                <tr>
                  <th>Abilities</th>
                  <td>{abilitiesTd}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="data-text">
            <div>
              <h2>Training</h2>
              <Table>
                <tbody>
                  <tr>
                    <th>EV yield</th>
                    <td>3 Sp. Atk</td>
                  </tr>
                  <tr>
                    <th>Catch rate</th>
                    <td>45 </td>
                  </tr>
                  <tr>
                    <th>Base Friendship</th>
                    <td>50</td>
                  </tr>
                  <tr>
                    <th>Base Exp.</th>
                    <td>267</td>
                  </tr>
                  <tr>
                    <th>Growth Ratev</th>
                    <td>Medium Slow</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <h2>Breeding</h2>
              <Table>
                <tbody>
                  <tr>
                    <th>Egg Groups</th>
                    <td>Dragon, Monster</td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>87.5% male, 12.5% female</td>
                  </tr>
                  <tr>
                    <th>Egg cycles</th>
                    <td>20 (4,884–5,140 steps)</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonData;
