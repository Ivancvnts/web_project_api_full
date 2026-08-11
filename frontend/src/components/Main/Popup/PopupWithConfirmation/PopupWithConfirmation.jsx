function PopupWithConfirmation({ card, onCardDelete }) {
  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <>
      <button className="popup__button" onClick={handleCardDelete}>
        Sí
      </button>
    </>
  );
}

export default PopupWithConfirmation;
