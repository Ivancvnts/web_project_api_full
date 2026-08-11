import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import logo from "../../images/logo.svg";

function Header({ location, handleLogOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isSignin = location.pathname === "/signin";
  const isSignup = location.pathname === "/signup";
  const isPlaces = location.pathname === "/";
  const { currentUser } = useContext(CurrentUserContext);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header page__section">
      {isPlaces && (
        <>
          <div
            className={`header__user-info ${menuOpen ? "header__user-info_open" : ""}`}
          >
            <p className="header__user-email">{currentUser.email}</p>
            <Link
              className="header__link header__link_logout"
              to="/signin"
              onClick={() => {
                handleLogOut();
                closeMenu();
              }}
            >
              Cerrar sesión
            </Link>
          </div>
        </>
      )}

      <div className="header__top">
        <img
          src={logo}
          alt="Logotipo Around The U.S."
          className="header__logo"
        />

        {isSignin && (
          <Link className="header__link" to="/signup">
            Regístrate
          </Link>
        )}
        {isSignup && (
          <Link className="header__link" to="/signin">
            Iniciar sesión
          </Link>
        )}

        {isPlaces && (
          <button
            className={`header__menu-button ${menuOpen ? "header__menu-button_close" : ""}`}
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          ></button>
        )}
      </div>
    </header>
  );
}

export default Header;
