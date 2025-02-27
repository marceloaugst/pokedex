import React from "react";
import { Link } from "react-router-dom";

const singleItem = ({ id, name, sprites, types, stats, idPath }) => {
  // Pegar todos os stats base do pokemon e colocar em um array statsBase
  // fiz dessa forma porque nao tinha uma tag propria, vinha como String
  let statsBase = [];

  stats.forEach((currStats) => {
    if (
      [
        "hp",
        "attack",
        "defense",
        "special-attack",
        "special-defense",
        "speed",
      ].includes(currStats.stat.name)
    ) {
      statsBase.push(currStats["base_stat"]);
    }
  });

  // Soma todos os status base e fazer o total
  let totalStats = statsBase.reduce((acc, curr) => acc + curr, 0);

  // Pegar todos os types do pokemon e colocar em um Array
  // Porq as vezes o Pokemon tem mais de um Type
  const typesArray = types.map((currTypes) => {
    let typeName = currTypes.type.name;
    let formattedName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
    const typeCss = `type-${typeName} type-icon`;
    return (
      <div className={typeCss} key={typeName}>
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
            <source
              srcSet={sprites.other["official-artwork"].front_default}
              width="50"
              height="46"
              type="image/avif"
            />

            <img
              src={sprites.front_default}
              alt={`Imagem do Pokemon ${name} `}
            />
          </picture>
          <span className="single-item-cell__id">{idPoke}</span>
        </td>
        <td className="single-item-cell__name">
          <Link to={`${idPath}/${id}`} className="single-item__name">
            {namePokemon}
          </Link>
        </td>
        <td>{typesArray}</td>
        <td className="single-item-cell__num">{totalStats}</td>
        <td className="single-item-cell__num">{statsBase[0]}</td>
        <td className="single-item-cell__num">{statsBase[1]}</td>
        <td className="single-item-cell__num">{statsBase[2]}</td>
        <td className="single-item-cell__num">{statsBase[3]}</td>
        <td className="single-item-cell__num">{statsBase[4]}</td>
        <td className="single-item-cell__num">{statsBase[5]}</td>
      </tr>
    </tbody>
  );
};

export default singleItem;
