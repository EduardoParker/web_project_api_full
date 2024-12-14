import closeIcon from "../images/Close_icon.svg";

export default function ImagePopup({ selectedCard, onClose }) {
  return (
    <>
      <section
        className={`popup popup_zoom ${selectedCard ? "popup_opened" : ""}`}
      >
        <div className="popup__container-image">
          <img
            src={closeIcon}
            onClick={onClose}
            alt="boton de cierre"
            className="popup__close-button"
            id="close-button-image"
          />
          <img src={selectedCard.link} alt="" className="popup__image" />
          <p className="popup__container-text">{selectedCard.name}</p>
        </div>
      </section>
      <section className="popup popup_delete-image"></section>
    </>
  );
}
