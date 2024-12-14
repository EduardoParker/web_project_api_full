import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = React.useState("");
  const avatarInputRef = React.useRef();

  React.useEffect(() => {
    if (currentUser.avatar) {
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar });
  }

  /*function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }*/

  return (
    <PopupWithForm
      name="avatar"
      title="Cambiar foto de perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input">
        <input
          value={avatar}
          ref={avatarInputRef}
          onChange={(e) => setAvatar(e.target.value)}
          type="url"
          className="form__item form__item_avatar-link"
          id="avatar"
          name="avatar"
          placeholder="Enlace a la imagen del avatar"
          required
        />
        <span className="form__error avatar-error"></span>
      </fieldset>
      <button
        className="form__button form__button_submit"
        type="submit"
        id="update_avatar"
      >
        Guardar
      </button>
    </PopupWithForm>
  );
}
