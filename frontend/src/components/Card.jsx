import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Cards({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "element__trash_visible" : "element__trash_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : "element__like"
  }`;

  return (
    <div className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleCardClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__info">
        <h3 className="element__description">{card.name}</h3>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <p className="element__like-counter">{card.counter}</p>
      </div>
    </div>
  );
}
