import React from "react";
import SingleItem from "./SingleItem.jsx";

const ItemList = ({ itemArray, items, idPath }) => {
  // itemArray?.filter((currentValue, index) => index < items).map((currObj, index) => (
  //     <SingleItem {...currObj} key={index} idPath={idPath} />
  //   ));

  return (
    <div className="main-content grid-container">
      <h1>Complete Pokémon Pokédex</h1>

      <div className="grid-row">
        <div className="grid-col span-md-12">
          <div className="resp-scroll">
            <table className="data-table sticky-header block-wide">
              <thead>
                <tr>
                  <th className="sorting sorting-asc">
                    <div className="sortwrap">#</div>
                  </th>
                  <th className="sorting">
                    <div className="sortwrap">Name</div>
                  </th>
                  <th>
                    <div className="sortwrap">Type</div>
                  </th>
                  <th className="sorting">
                    <div className="sortwrap">Total</div>
                  </th>
                  <th className="sorting">
                    <div className="sortwrap">Hp</div>
                  </th>
                  <th className="sorting">
                    <div className="sortwrap">Attack</div>
                  </th>
                  <th className="sorting">
                    <div className="sortwrap">Defense</div>
                  </th>
                  <th className="sorting">
                    <div className="sortwrap">Sp.Atk</div>
                  </th>
                  <th className="sorting">
                    <div className="sortwrap">Sp.Def</div>
                  </th>
                  <th className="sorting">
                    <div className="sortwrap">Speed</div>
                  </th>
                </tr>
              </thead>

              {itemArray
                ?.filter((currentValue, index) => index < items)
                ?.map((currObj, index) => (
                  <SingleItem {...currObj} key={index} idPath={idPath} />
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
