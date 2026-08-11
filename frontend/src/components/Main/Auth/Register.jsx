import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegistration }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegistration(email, password);
    setEmail("");
    setPassword("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
    setIsValid(e.target.closest("form").checkValidity());
  };

  return (
    <section className="auth page__section">
      <h1 className="auth__title">Regístrate</h1>
      <form
        className="auth__form"
        name="register-form"
        id="register-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="auth__input"
          type="email"
          name="email"
          id="email"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <span
          className={`auth__input-error-message ${emailError ? "auth__input-error-message_active" : ""}`}
          id="email-error"
        >
          {emailError}
        </span>
        <input
          className="auth__input"
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <span
          className={`auth__input-error-message ${passwordError ? "auth__input-error-message_active" : ""}`}
          id="password-error"
        >
          {passwordError}
        </span>
        <button
          className="auth__button"
          type="submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Registrandote..." : "Regístrate"}
        </button>
      </form>
      <Link className="auth__link" to="/signin">
        ¿Ya eres miembro? Inicia sesión aquí
      </Link>
    </section>
  );
}

export default Register;
