import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="auth page__section">
      <h1 className="auth__title">Inicia sesión</h1>
      <form className="auth__form" onSubmit={(event) => event.preventDefault()}>
        <input
          className="auth__input"
          type="text"
          name="email"
          id="email"
          placeholder="Correo electrónico"
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
        />
        <button className="auth__button" type="submit">
          Inicia sesión
        </button>
      </form>
      <Link className="auth__link" to="/signup">
        ¿Aún no eres miembro? Regístrate aquí
      </Link>
    </section>
  );
}

export default Login;
