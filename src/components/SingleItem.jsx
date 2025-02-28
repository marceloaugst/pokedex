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
      <td key={index}>
        <div className="single-item-cell__num">{statsBase}</div>
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
    const typeCss = `type-${typeName} type-icon`;
    return (
      <div className={typeCss} key={index}>
        {formattedName}
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
        <td className="single-item-cell_num single-item-cell__fixed">
          <picture className="single-item-cell__img">
            <source srcSet={sprites.front_default} width="60" height="52" />

            <img
              src={sprites.front_default}
              alt={`Imagem do Pokemon ${name} `}
            />
          </picture>
          <span className="single-item-cell__id">{idPoke}</span>
        </td>
        <td>
          <div className="single-item-cell__name">
            <Link to={`${idPath}/${id}`} className="single-item__name">
              {namePokemon}
            </Link>
          </div>
        </td>
        <td>{typesDiv}</td>
        <td>
          <div className="single-item-cell__num">{statsTotal}</div>
        </td>
        {statsDiv}
      </tr>
    </tbody>
  );
};

export default singleItem;
