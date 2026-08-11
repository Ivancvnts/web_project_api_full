import { useState, useRef, useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext.js";

function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const [linkError, setLinkError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const avatarRef = useRef();

  function handleLinkChange(e) {
    setLinkError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar(avatarRef.current.value);
  }

  return (
    <form className="popup__form" id="edit-avatar-form" onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          className={`popup__input popup__input-type-avatar ${linkError ? "popup__input-error" : ""}`}
          name="avatar"
          ref={avatarRef}
          id="avatar"
          required
          type="url"
          onChange={handleLinkChange}
        />
        <span
          className={`popup__input-error-message ${linkError ? "popup__input-error-message_active" : ""}`}
          id="avatar-error"
        >
          {linkError}
        </span>
      </label>

      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid}
      >
        Guardar
      </button>
    </form>
  );
}

export default EditAvatar;
