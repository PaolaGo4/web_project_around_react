import React from "react";
import Header from "./Header.js";
import Cards from "./Card.js";
import api from "../utils/Api.js";
import "../blocks/page.css";
import Main from "./Main.js";
import Footer from "./Footer.js";
//*import PopupWithForm from "./PopupWithForm.js";
function App() {
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getInitialCards().then((cards) => {
      setCards(cards);
    });
  }, []);
  //* handles para los popups*//
  //*variable de estado y handle popup para perfile
  /*
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const onEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    console.log(isEditProfilePopupOpen);
  };*/
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  //*variable de estado y popup para addplace*//
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const onAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    //*const isAddPlacePopupOpen*//
  };
  //*variable de estado y popup para avatar*//
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const onEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    //*const isEditAvatarPopupOpen*//
  };
  const onCardClick = () => {
    console.log("click");
  };
  //*variable de estado y handle para cerrar*//
  const handleClosePopup = () => {
    console.log(isEditProfilePopupOpen);
    //*isEditProfilePopupOpen();*//
  };
  return (
    <>
      <div className="page">
        <Header />
        <Main
          onclose={handleClosePopup}
          isOpenProfile={isEditProfilePopupOpen}
          onEditProfileClick={onEditProfileClick}
          isOpenAddPlace={isAddPlacePopupOpen}
          onAddPlaceClick={onAddPlaceClick}
          isOpenAvatar={isEditAvatarPopupOpen}
          onEditAvatarClick={onEditAvatarClick}
          handleClosePopup={handleClosePopup}
        />
        <section className="elements">
          {cards.map((item, _id) => {
            return (
              <Cards
                name={item.name}
                link={item.link}
                key={item._id}
                onCardClick={onCardClick}
              />
            );
          })}
        </section>
        <Footer />
      </div>
    </>
  );
}
export default App;
