import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlaceSubmit,
  cards,
}) {
  const [name, setName] = React.useState([]);
  const [link, setLink] = React.useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name,
      link,
    });
  }
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [cards]);

  return (
    <PopupWithForm
      name="form_image"
      title="Nuevo Lugar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form__item form__item_title"
          id="title"
          name="name"
          placeholder="Titulo"
          required
          //minlength="2"
          //maxlength="30"
        />
        <span className="form__error name-error"></span>
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type="url"
          className="form__item form__item_link"
          id="link"
          name="link"
          placeholder="Enlace a la imagen"
          required
        />
        <span className="form__error link-error"></span>
      </fieldset>
      <button
        className="form__button form__button_submit form__button_submit_image"
        type="submit"
        id="create_image"
      >
        Crear
      </button>
    </PopupWithForm>
  );
}
