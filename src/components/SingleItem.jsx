import React from "react";
import { Link } from "react-router-dom";

const singleItem = ({ id, name, sprites, types, stats, idPath }) => {
  // Pegar os stats dos Pokemons e retornar uma div dinamica
  // fiz dessa forma porque nao tinha uma tag propria, vinha como String
  let statsTotalArray = [];

  const statsDiv = stats.map((currStats, index) => {
    const statsBase = currStats["base_stat"];
    statsTotalArray.push(statsBase);
    return (
      <td className="cell-num" key={index}>
        <div>{statsBase}</div>
      </td>
    );
  });

  // tive que fazer um Array para acumular os valores do stats e totalizar todos
  const statsTotal = statsTotalArray.reduce((acc, curr) => acc + curr, 0);

  // Pegar os types do pokemon e retornar uma div dinamica
  // Porq as vezes o Pokemon tem mais de um Type
  const typesDiv = types.map((currTypes, index) => {
    let typeName = currTypes.type.name;
    let formattedName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
    const typeCss = ` type-icon type-${typeName} `;
    return (
      <div key={index}>
        <div className={typeCss} key={index}>
          {formattedName}
        </div>
        <br />
      </div>
    );
  });

  // deixar o id com quatro zeros a esquerda
  const idPoke = id.toString().padStart(4, "0");

  // deixa a primeira letra do nome em maiusculo
  const namePokemon = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <tbody>
      <tr>
        <td className="cell-num cell-fixed">
          <picture className="infocard-cell-img">
            <source srcSet={sprites.front_default} width="60" height="56" />

            <img
              className="img-fixed icon-pkmn"
              src={sprites.front_default}
              alt={`Imagem do Pokemon ${name} `}
              width="60"
              height="56"
            />
          </picture>
          <span className="cell-name">{idPoke}</span>
        </td>
        <td className="cell-name">
          <div>
            <Link to={`${idPath}/${id}`} className="ent-name">
              {namePokemon}
            </Link>
          </div>
        </td>
        <td className="cell-icon">{typesDiv}</td>
        <td className="cell-num cell-total">
          <div>{statsTotal}</div>
        </td>
        {statsDiv}
      </tr>
    </tbody>
  );
};

export default singleItem;
