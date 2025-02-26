import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonData from "./pages/PokemonData";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemonData/:id" element={<PokemonData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
