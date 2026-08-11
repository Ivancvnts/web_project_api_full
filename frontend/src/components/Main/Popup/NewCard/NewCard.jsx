import { useState } from "react";

function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    setLinkError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      console.log(isLoading);
      await onAddPlaceSubmit({
        name,
        link,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className={`popup__input popup__input-type-name ${nameError ? "popup__input-error" : ""}`}
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Título"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span
          className={`popup__input-error-message ${nameError ? "popup__input-error-message_active" : ""}`}
        >
          {nameError}
        </span>
      </label>
      <label className="popup__field">
        <input
          className={`popup__input popup__input-type-url ${linkError ? "popup__input-error" : ""}`}
          id="card-link"
          name="link"
          placeholder="Enlace a la imagen"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />
        <span
          className={`popup__input-error-message ${linkError ? "popup__input-error-message_active" : ""}`}
          id="card-link-error"
        >
          {linkError}
        </span>
      </label>

      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

export default NewCard;
