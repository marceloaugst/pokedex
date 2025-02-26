import React from "react";
import SingleItem from "./SingleItem.jsx";

const ItemList = ({ itemArray, items, idPath }) => {
  return (
    <div className="item-list">
      <div className="item-list__header">
        <h1>Complete Pokémon Pokédex</h1>
      </div>

      <div className="item-list__container">
        {itemArray
          .filter((currentValue, index) => index < items)
          .map((currObj, index) => (
            <SingleItem {...currObj} key={index} idPath={idPath} />
          ))}
      </div>
    </div>
  );
};

export default ItemList;
