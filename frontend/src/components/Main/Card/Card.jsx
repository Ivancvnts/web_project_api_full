import PopupWithConfirmation from "../Popup/PopupWithConfirmation/PopupWithConfirmation";

function Card(props) {
  const { card, onPopupOpen, imageComponent, onCardLike, onCardDelete } = props;
  const { name, link, isLiked } = card;

  const newCardPopup = {
    title: "¿Estás seguro?",
    children: <PopupWithConfirmation card={card} onCardDelete={onCardDelete} />,
  };

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    card.isLiked = !card.isLiked;
    onCardLike(card);
  }

  function handleDeleteClick() {
    onPopupOpen(newCardPopup);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt=""
        onClick={() => onPopupOpen(imageComponent)}
      />
      <button
        aria-label="Eliminar tarjeta"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botón Me gusta"
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}

export default Card;
