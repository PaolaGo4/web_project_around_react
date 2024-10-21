import React from "react";
import "../blocks/page.css";
import Main from "./Main.js";
import Footer from "./Footer.js";
import "../pages/index.css";

function App() {
  //* handles para los popups*//
  //*variable de estado y handle popup para perfile

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const onEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    //console.log(isEditProfilePopupOpen);
  };

  //variable de estado y popup para addplace
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const onAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    //const isAddPlacePopupOpen
  };

  //variable de estado y popup para avatar
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const onEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  //*para cerrar*//
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  };

  //apartado para el zoom popup

  const [selectedCard, setSelectedCard] = React.useState(false);

  const onCardClick = (card) => {
    setSelectedCard(card);
    console.log(card);
  };

  return (
    <>
      <div className="page">
        <Main
          isOpenProfile={isEditProfilePopupOpen}
          onEditProfileClick={onEditProfileClick}
          isOpenAddPlace={isAddPlacePopupOpen}
          onAddPlaceClick={onAddPlaceClick}
          isOpenAvatar={isEditAvatarPopupOpen}
          onEditAvatarClick={onEditAvatarClick}
          closeAllPopups={closeAllPopups}
          selectedCard={selectedCard}
          onCardClick={onCardClick}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
