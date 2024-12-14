import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopUp({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (currentUser.name && currentUser.description) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Editar perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form__item form__item_name"
          id="name"
          name="name"
          placeholder="Nombre"
          required
          //minlength="2"
          //maxlength="40"
        />
        <span className="form__error name-error"></span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="form__item form__item_about-me"
          id="about-me"
          name="about"
          placeholder="Acerca de mi"
          required
          //minlength="2"
          //maxlength="200"
        />
        <span className="form__error about-error"></span>
      </fieldset>
      <button
        className="form__button form__button_submit"
        type="submit"
        id="update_profile"
      >
        Guardar
      </button>
    </PopupWithForm>
  );
}
