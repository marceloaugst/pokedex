import React from "react";
import { Link } from "react-router-dom";

const singleItem = ({ id, name, sprites, idPath }) => {
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
              <p className="single-item__title">{name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default singleItem;
