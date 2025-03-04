import React from "react";
import logo from "../assets/header-md.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div to="/" className="main-header">
      <Link to="/">
        <img src={logo} alt="Entei Logo" />
      </Link>
    </div>
  );
};

export default Header;
