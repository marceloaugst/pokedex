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
  let typesArray = [];

  types.forEach((currTypes) => {
    let typeName = currTypes.type.name;
    let formattedName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
    typesArray.push(formattedName + " ");
  });

  const namePokemon = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div>
      <Link to={`${idPath}/${id}`} className="single-item">
        <div className="single-item__div-image-button">
          <div className="single-item__div-image">
            <img
              className="single-item__image"
              src={sprites.front_default}
              alt={`Imagem do Pokemon ${name} `}
            />
          </div>

          <div className="single-item__texts">
            <div className="single-item__2lines">
              <p className="single-item__title">{id}</p>
              <p className="single-item__title">{namePokemon}</p>
              <p className="single-item__title">{typesArray}</p>
              <p className="single-item__title">{totalStats}</p>
              <p className="single-item__title">{statsBase[0]}</p>
              <p className="single-item__title">{statsBase[1]}</p>
              <p className="single-item__title">{statsBase[2]}</p>
              <p className="single-item__title">{statsBase[3]}</p>
              <p className="single-item__title">{statsBase[4]}</p>
              <p className="single-item__title">{statsBase[5]}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default singleItem;
