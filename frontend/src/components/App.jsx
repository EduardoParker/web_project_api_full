import React, { useEffect } from "react";
import "../blocks/page.css";
import Main from "./Main";
import Footer from "./Footer";
import "../pages/index.css";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopUp from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Outlet, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import ProtectedRoute from "./protectedRoute";
import * as auth from "../utils/Auth";
import { getToken, setToken } from "../utils/token";

function App() {
  //handles para los popups
  //variable de estado y handle popup para perfile

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const onEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  //variable de estado y popup para addplace
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const onAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  //variable de estado y popup para avatar
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const onEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  //para cerrar
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipOpen(false);
    setIsInfoTooltipErrorOpen(false);
  };

  //apartado para el zoom popup

  const [selectedCard, setSelectedCard] = React.useState(false);

  const onCardClick = (card) => {
    setSelectedCard(card);
    //console.log(card);
  };

  //variable estado para current user
  const [currentUser, setCurrentUser] = React.useState([]);

  //variable de estado para Login
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    api.getInfo().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  const handleUpdateUser = ({ name, about }) => {
    return api
      .updateProfile({ name, about })
      .then(() => {
        setCurrentUser({ ...currentUser, name, about });
      })
      .then(() => {
        closeAllPopups();
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    return api
      .updateAvatarProfile({ avatar })
      .then(() => {
        setCurrentUser({ ...currentUser, avatar });
      })
      .then(() => {
        closeAllPopups();
      });
  };

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards().then((cards) => {
      setCards(cards);
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api.deleteCardLike(card._id, isLiked).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } else {
      api.addCardLike(card._id, isLiked).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(() => {
      const filterCards = cards.filter((item) => item._id !== cardId);
      setCards(filterCards);
    });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      });
  }
  //variable de estado y popup para Infotooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipErrorOpen, setIsInfoTooltipErrorOpen] =
    React.useState(false);

  // espacio para el handle registration
  const navigate = useNavigate();

  function handleRegistration({ email, password }) {
    auth
      .register(email, password)
      .then(() => {
        //navigate("/signin");
        setIsInfoTooltipOpen(true);
      })
      .catch(() => {
        console.error;
        setIsInfoTooltipErrorOpen(true);
      });
  }
  // espacio para el handle Login
  const [email, setEmail] = React.useState([]);

  function handleLogin({ email, password }) {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserData(data.user);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch(() => {
        console.error;
        setIsInfoTooltipErrorOpen(true);
      });
  }

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    auth
      .getUserInfo(token)
      .then(({ data }) => {
        setIsLoggedIn(true);
        setUserData({ data });
        navigate("/");
        setEmail(data.email);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header setIsLoggedIn={setIsLoggedIn} email={email} />
                  <Outlet /> <Footer />
                </>
              }
            >
              <Route
                path="/"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <>
                      <EditProfilePopUp
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                      />
                      <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                      />
                      <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlaceSubmit={handleAddPlaceSubmit}
                        cards={cards}
                      />

                      <Main
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        onEditProfileClick={onEditProfileClick}
                        onAddPlaceClick={onAddPlaceClick}
                        onEditAvatarClick={onEditAvatarClick}
                        closeAllPopups={closeAllPopups}
                        selectedCard={selectedCard}
                        onCardClick={onCardClick}
                        setIsLoggedIn={setIsLoggedIn}
                      />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signin"
                element={
                  <Login
                    isOpenError={isInfoTooltipErrorOpen}
                    closeAllPopups={closeAllPopups}
                    handleLogin={handleLogin}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Register
                    closeAllPopups={closeAllPopups}
                    isOpenAllow={isInfoTooltipOpen}
                    isOpenError={isInfoTooltipErrorOpen}
                    handleRegistration={handleRegistration}
                  />
                }
              />
            </Route>

            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signup" replace />
                )
              }
            />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
