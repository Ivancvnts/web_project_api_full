import { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { getToken, setToken, removeToken } from "../utils/token.js";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Popup from "./Main/Popup/Popup";
import InfoToolTip from "./Main/Popup/InfoToolTip/InfoToolTip";
import Login from "./Main/Auth/Login";
import Register from "./Main/Auth/Register.jsx";
import ProtectedRoute from "./Main/Auth/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    about: "",
    avatar: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    auth
      .getUser(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        handleUpdateEmail(data.data.email);
        navigate("/");
      })
      .catch((err) => console.error(err));

    api
      .getUserInfo()
      .then((result) => {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...result,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getCardsList()
        .then((result) => {
          setCards(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((err) => console.error(err));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .setUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((err) => console.error(err));
    })();
  };

  const handleUpdateAvatar = (data) => {
    return api.setAvatar(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  };

  const handleUpdateEmail = (email) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      email: email,
    }));
  };

  const handleAddPlaceSubmit = (data) => {
    return api.addCard(data).then((newCard) => {
      setCards((prevCards) => [newCard, ...prevCards]);

      handleClosePopup();
    });
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function getInfoToolTip(success) {
    return {
      title: "",
      children: <InfoToolTip success={success} onClose={handleClosePopup} />,
    };
  }

  const handleRegistration = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        handleOpenPopup(getInfoToolTip(true));
      })
      .catch((err) => {
        console.error(err);
        handleOpenPopup(getInfoToolTip(false));
      });
  };

  const handleLogin = (email, password) => {
    return auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          handleUpdateEmail(email);
          setIsLoggedIn(true);
          api
            .getUserInfo()
            .then((result) => {
              setCurrentUser((prevUser) => ({
                ...prevUser,
                ...result,
              }));
            })
            .catch((err) => {
              console.log(err);
            });

          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    removeToken();
  };

  return (
    <>
      <div className="page__content">
        <CurrentUserContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            currentUser,
            handleUpdateUser,
            handleUpdateAvatar,
            handleUpdateEmail,
          }}
        >
          <Header location={location} handleLogOut={handleLogOut} />
          <Routes>
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            ></Route>
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    cards={cards}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    popup={popup}
                    onPopupOpen={handleOpenPopup}
                    onPopupClose={handleClosePopup}
                  />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login handleLogin={handleLogin} />
                )
              }
            ></Route>
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register handleRegistration={handleRegistration} />
                )
              }
            ></Route>
          </Routes>
          {popup && (
            <Popup onClose={handleClosePopup} title={popup.title}>
              {popup.children}
            </Popup>
          )}
        </CurrentUserContext.Provider>
        {location.pathname === "/" && <Footer />}
      </div>
    </>
  );
}

export default App;
