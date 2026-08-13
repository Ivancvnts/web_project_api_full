import { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import PopupWithConfirmation from "../Popup/PopupWithConfirmation/PopupWithConfirmation";

function Card(props) {
  const { card, onPopupOpen, imageComponent, onCardLike, onCardDelete } = props;
  const { name, link, likes, owner } = card;
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = likes.some((id) => id === currentUser._id);
  const isOwn = owner._id === currentUser._id;

  const newCardPopup = {
    title: "¿Estás seguro?",
    children: <PopupWithConfirmation card={card} onCardDelete={onCardDelete} />,
  };

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
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
      {isOwn && (
        <button
          aria-label="Eliminar tarjeta"
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
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
