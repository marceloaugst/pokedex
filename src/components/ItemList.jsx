import React from "react";
import SingleItem from "./SingleItem.jsx";
import { Table } from "react-bootstrap";

const ItemList = ({ itemArray, items, idPath }) => {
  return (
    <div className="item-list">
      <div className="item-list__header">
        <h1>Complete Pokémon Pokédex</h1>
      </div>

      <div className="item-list__container sticky-header grid-row">
        <Table bordered striped hover className="single-item__table">
          <thead>
            <tr>
              <th className="single-item__th">
                <div className="single-item__th__div">#</div>
              </th>
              <th className="single-item__th">
                <div className="single-item__th__div">Name</div>
              </th>
              <th className="single-item__th">
                <div className="single-item__th__div">Type</div>
              </th>
              <th className="single-item__th">
                <div className="single-item__th__div">Total</div>
              </th>
              <th className="single-item__th">
                <div className="single-item__th__div">Hp</div>
              </th>
              <th className="single-item__th">
                <div className="single-item__th__div">Attack</div>
              </th>
              <th className="single-item__th">
                <div className="single-item__th__div">Defense</div>
              </th>
              <th className="single-item__th">
                <div className="single-item__th__div">Sp.Atk</div>
              </th>
              <th className="single-item__th">
                <div className="single-item__th__div">Sp.Def</div>
              </th>
              <th className="single-item__th">
                <div className="single-item__th__div">Speed</div>
              </th>
            </tr>
          </thead>

          {itemArray
            .filter((currentValue, index) => index < items)
            .map((currObj, index) => (
              <SingleItem {...currObj} key={index} idPath={idPath} />
            ))}
        </Table>
      </div>
    </div>
  );
};

export default ItemList;
