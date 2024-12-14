import React from "react";
import closeIcon from "../images/Close_icon.svg";
import allowAccess from "../images/check_mark.png";
import denayAccess from "../images/denay_mark.png";
import { useNavigate } from "react-router-dom";

export default function InfoTooltip({
  closeAllPopups,
  isOpenAllow,
  isOpenError,
}) {
  //const closePopup = () => {
  //  onClose();
  //};

  /*const submit = () => {
      onSubmit();
    };*/
  const navigate = useNavigate();
  //const redirect = navigate("/signin");

  return (
    <>
      <section
        className={`popup popup_infotool ${
          isOpenAllow || isOpenError ? "popup_opened" : ""
        }`}
      >
        <div className="popup__container">
          <img
            src={closeIcon}
            onClick={() => {
              closeAllPopups();
              isOpenAllow && navigate("/signin");
            }}
            alt="boton de cierre"
            className="popup__close-button popup__close-button_form"
          />
          <img
            className="popup__image_access popup__image_access-allowed"
            src={isOpenAllow ? allowAccess : denayAccess}
          />
          <h4 className="popup__text">
            {isOpenAllow
              ? "Correcto! Ya estás registrado."
              : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
          </h4>
        </div>
      </section>
    </>
  );
}
