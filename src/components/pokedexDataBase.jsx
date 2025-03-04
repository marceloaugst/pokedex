import React from "react";
import { usePokemonSpecies } from "../hooks/api/fetchPokemonSpecies.js";

const convertHeightFeet = (height) => {
  const heighForFeet = height * 3.28084;
  const roundFeet = Math.floor(heighForFeet);
  return roundFeet;
};

const convertFeetInches = (height) => {
  const heighForFeet = height * 3.28084;
  const roundFeet = heighForFeet / 10;
  const inches = roundFeet * 12;
  const roundInches = Math.ceil(inches).toString().padStart(2, "0");
  return roundInches;
};

const PokedexDataBase = ({ id, types, height, weight, abilities }) => {
  const { data } = usePokemonSpecies(id);

  const regionMap = {
    kanto: "Red/Blue/Green/Yellow, FireRed/LeafGreen",
    "letsgo-kanto": "Let's Go Pikachu/Eevee",
    "original-johto": "Pokémon Gold/Silver",
    "updated-johto": "Pokémon Crystal, HeartGold/SoulSilver",
    "conquest-gallery": "Pokémon Conquest",
    "kalos-central": "Pokémon X/Y",
    galar: "Pokémon Sword/Shield",
    blueberry: "Pokémon Scarlet/Violet",
  };

  const pokedexNumbers = data?.pokedex_numbers
    .filter((currNumbers) => currNumbers.pokedex.name !== "national")
    .map((currNumbers, index) => {
      const numberFormated = currNumbers.entry_number
        .toString()
        .padStart(4, "0");
      const regionName = regionMap[currNumbers.pokedex.name];

      return (
        regionName && (
          <div key={index}>
            {numberFormated}
            <small className="text-2muted">({regionName})</small>
          </div>
        )
      );
    });

  // Pegar os types do pokemon e retornar uma div dinamica
  // // Porq as vezes o Pokemon tem mais de um Type
  const typesTd = types.map((currTypes, index) => {
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
  // // Porq as vezes o Pokemon tem mais de um abilities
  const abilitiesTd = abilities.map((currAbilities, index) => {
    let abilitiesName = currAbilities.ability.name;
    let formattedName =
      abilitiesName.charAt(0).toUpperCase() + abilitiesName.slice(1);
    let indexLoc = index + 1;
    const hiddenAbility = currAbilities.is_hidden;
    if (!hiddenAbility) {
      return (
        <div key={index + formattedName}>
          <span className="text-2muted">
            {indexLoc}. {formattedName}
          </span>
        </div>
      );
    } else {
      return (
        <div key={index + formattedName}>
          <span className="text-2muted" key={index}>
            {formattedName} (hidden ability)
          </span>
        </div>
      );
    }
  });

  const heightM = height / 10;
  const convertHF = convertHeightFeet(heightM);
  const convertFI = convertFeetInches(heightM);

  const weightG = weight / 10;
  const convertWL = weightG * 2.20462;
  const roundLbs = convertWL.toFixed(1);

  // deixar o id com quatro zeros a esquerda
  const idPoke = id.toString().padStart(4, "0");

  return (
    <div className="grid-col span-md-6 span-lg-4">
      <h2>Pokédex Data</h2>
      <table className="vitals-table">
        <tbody>
          <tr>
            <th>National №</th>
            <td>
              <strong>{idPoke}</strong>
            </td>
          </tr>
          <tr>
            <th>Type</th>
            <td>{typesTd}</td>
          </tr>
          <tr>
            <th>Height</th>
            <td>
              {heightM} m ({convertHF}'{convertFI}'')
            </td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>
              {weightG} kg ({roundLbs} lbs)
            </td>
          </tr>
          <tr>
            <th>Abilities</th>
            <td>{abilitiesTd}</td>
          </tr>
          <tr>
            <th>Local N</th>
            <td>{pokedexNumbers}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokedexDataBase;
