import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext.js";

/*TODO: Aqui hay un problema que el boton esta desactivado la primera vez
      que abres el popup, esto se podria arreglar con useEffect? no lo intento
      por esta ocasion ya que el proyecto pide que sea un componente controlado*/

function EditProfile({ onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className={`popup__input popup__input-type-name ${nameError ? "popup__input-error" : ""}`}
          id="name"
          maxLength="40"
          minLength="2"
          name="name"
          placeholder="Nombre"
          value={name}
          onChange={handleNameChange}
          required
          type="text"
        />
        <span
          className={`popup__input-error-message ${nameError ? "popup__input-error-message_active" : ""}`}
          id="name-error"
        >
          {nameError}
        </span>
      </label>
      <label className="popup__field">
        <input
          className={`popup__input popup__input-type-description ${descriptionError ? "popup__input-error" : ""}`}
          id="description"
          maxLength="200"
          minLength="2"
          name="description"
          placeholder="Acerca de mí"
          value={description}
          onChange={handleDescriptionChange}
          required
          type="text"
        />
        <span
          className={`popup__input-error-message ${descriptionError ? "popup__input-error-message_active" : ""}`}
          id="description-error"
        >
          {descriptionError}
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

export default EditProfile;
