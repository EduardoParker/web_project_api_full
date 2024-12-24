import React from "react";
import "../blocks/profile.css";
import buttonProfileUpdate from "../images/Edit_Button.svg";
import addButtonImage from "../images/Add_Button.svg";
import ImagePopup from "./ImagePopup";
import "../blocks/page.css";
import Cards from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  closeAllPopups,
  selectedCard,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const handleEditProfileClick = () => {
    onEditProfileClick();
  };

  const handleAddPlaceClick = () => {
    onAddPlaceClick();
  };

  const handleEditAvatarClick = () => {
    onEditAvatarClick();
  };

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
      {
        //empieza apartado de profile main
      }
      <section className="profile">
        <div className="profile__avatar" onClick={handleEditAvatarClick}>
          <img
            src={currentUser.avatar}
            alt="imagen de perfil"
            className="profile__image-avatar"
          />
          <div className="profile__avatar-container">
            <img
              src={buttonProfileUpdate}
              alt="boton para editar avatar"
              className="profile__update-button"
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__info-name">
            <h1 className="profile__name">{currentUser.name}</h1>
            <img
              src={buttonProfileUpdate}
              onClick={handleEditProfileClick}
              alt="boton para editar perfil"
              className="profile__edit-button button"
            />
          </div>
          <h2 className="profile__info-aboutme">{currentUser.about}</h2>
        </div>
        <img
          src={addButtonImage}
          onClick={handleAddPlaceClick}
          alt="boton para añadir contenido"
          className="profile__add-button button"
        />
      </section>
      <section className="elements">
        {cards.map((data) => {
          return (
            <Cards
              card={data}
              key={data._id}
              onCardClick={onCardClick}
              selectedCard={selectedCard}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </>
  );
}
