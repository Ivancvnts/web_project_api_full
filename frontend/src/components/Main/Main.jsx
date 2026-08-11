import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import NewCard from "./Popup/NewCard/NewCard";
import EditProfile from "./Popup/EditProfile/EditProfile";
import EditAvatar from "./Popup/EditAvatar/EditAvatar";
import ImagePopup from "./Popup/ImagePopup/ImagePopup";
import Card from "./Card/Card";

import defaultAvatar from "../../images/avatar.jpg";

function Main({
  cards,
  onAddPlaceSubmit,
  onCardLike,
  onCardDelete,
  onPopupOpen,
  onPopupClose,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile onClose={onPopupClose} />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar onClose={onPopupClose} />,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div
          className="profile__image-container"
          onClick={() => onPopupOpen(editAvatarPopup)}
        >
          <img
            className="profile__image"
            src={currentUser.avatar || defaultAvatar}
            alt="Avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onPopupOpen(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => onPopupOpen(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onPopupOpen={onPopupOpen}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              imageComponent={{
                title: "image",
                children: (
                  <ImagePopup
                    name={card.name}
                    link={card.link}
                    onClose={onPopupClose}
                  />
                ),
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
