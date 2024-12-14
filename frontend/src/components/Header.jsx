import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { removeToken } from "../utils/token";
import logoImage from "../images/logo.svg";
import "../blocks/header.css";

export default function Header({ setIsLoggedIn, email }) {
  const navigate = useNavigate();

  function signOut() {
    removeToken();
    navigate("/signin");
    setIsLoggedIn(false);
  }

  const location = useLocation();
  React.useEffect(() => {}, [location]);

  return (
    <header className="header">
      <img src={logoImage} alt="Around the U.S." className="header__logo" />
      <div className="header__text-container">
        {location.pathname === "/" && (
          <>
            <h3 className="header__text">{email}</h3>
            <button className="header__button" onClick={signOut}>
              Cerrar sesión
            </button>
          </>
        )}
        {location.pathname === "/signup" && (
          <Link to="/signin" className="header__text">
            Iniciar Sesion
          </Link>
        )}
        {location.pathname === "/signin" && (
          <Link to="/signup" className="header__text">
            Registrate
          </Link>
        )}
      </div>
    </header>
  );
}
