import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

export default function Register({
  handleRegistration,
  closeAllPopups,
  isOpenAllow,
  isOpenError,
}) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration(data);
  }

  return (
    <>
      <InfoTooltip
        closeAllPopups={closeAllPopups}
        isOpenAllow={isOpenAllow}
        isOpenError={isOpenError}
      />
      <section className="window window__register">
        <div className="window__container">
          <form
            className="window__form form form_register"
            onSubmit={handleSubmit}
          >
            <h4 className="form__name">Regístrate</h4>
            <fieldset className="form__input">
              <input
                value={data.email}
                onChange={handleChange}
                type="email"
                className="form__item form__item_name form__item_window"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                required
              />
              <span className="form__error name-error"></span>
              <input
                value={data.password}
                onChange={handleChange}
                type="password"
                className="form__item form__item_password form__item_window"
                id="password"
                name="password"
                placeholder="Contraseña"
                required
              />
              <span className="form__error about-error"></span>
            </fieldset>
            <button
              className="form__button form__button_window"
              type="submit"
              id="update_profile"
            >
              Regístrate
            </button>
          </form>
          <Link to="/signin" className="window__text">
            ¿Ya eres miembro? Inicia sesión aquí
          </Link>
        </div>
      </section>
    </>
  );
}