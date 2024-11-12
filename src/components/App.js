import React from "react";
import "../blocks/page.css";
import Main from "./Main.js";
import Footer from "./Footer.js";
import "../pages/index.css";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopUp from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  //*handles para los popups*//
  //*variable de estado y handle popup para perfile*//

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const onEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  //*variable de estado y popup para addplace*//
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const onAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  //*variable de estado y popup para avatar*//
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const onEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  //*para el cierre*//
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  };

  //*apartado para el zoom popup*//

  const [selectedCard, setSelectedCard] = React.useState(false);

  const onCardClick = (card) => {
    setSelectedCard(card);
    //console.log(card);
  };

  //*variable estado para current user*//
  const [currentUser, setCurrentUser] = React.useState([]);

  React.useEffect(() => {
    api.getInfo().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  const handleUpdateUser = ({ name, about }) => {
    if (name.trim() != "" && about.trim() != "") {
      return api
        .updateProfile({ name, about })
        .then(() => {
          setCurrentUser({ ...currentUser, name, about });
        })
        .then(() => {
          closeAllPopups();
        });
    }
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
    if (name.trim() != "" && link.trim() != "") {
      api
        .addNewCard({ name, link })
        .then((newCard) => {
          setCards([newCard, ...cards]);
        })
        .then(() => {
          closeAllPopups();
        });
    }
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
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
          />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
