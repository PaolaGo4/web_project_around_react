import React from "react";
import "../blocks/profile.css";
import buttonProfileUpdate from "../images/Edit_Button.svg";
import addButtonImage from "../images/Add_Button.svg";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import "../blocks/page.css";
import Cards from "./Card";
import Header from "./Header";

export default function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  isOpenProfile,
  isOpenAddPlace,
  isOpenAvatar,
  closeAllPopups,
  selectedCard,
  onCardClick,
}) {
  const [userName, setUserName] = React.useState([]);
  const [userDescription, setUserDescription] = React.useState([]);
  const [userAvatar, setUserAvatar] = React.useState([]);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInfo().then((user) => {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
      api.getInitialCards().then((cards) => {
        setCards(cards);
      });
    });
  }, []);

  const handleEditProfileClick = () => {
    onEditProfileClick();
  };

  const handleEditAddPlaceClick = () => {
    onAddPlaceClick();
  };

  const handleEditAvatarClick = () => {
    onEditAvatarClick();
  };

  return (
    <>
      <PopupWithForm
        name="profile"
        title="Editar perfil"
        isOpen={isOpenProfile}
        onClose={closeAllPopups}
      >
        <fieldset className="form__input">
          <input
            type="text"
            className="form__item form__item_name"
            id="name"
            name="name"
            placeholder="Nombre"
            required
            //minlength="2"
            //maxlength="40"
          />
          <span className="form__error name-error"></span>
          <input
            type="text"
            className="form__item form__item_about-me"
            id="about-me"
            name="about"
            placeholder="Acerca de mi"
            required
            //minlength="2"
            //maxlength="200"
          />
          <span className="form__error about-error"></span>
        </fieldset>
        <button
          className="form__button form__button_submit"
          type="submit"
          id="update_profile"
        >
          Guardar
        </button>
      </PopupWithForm>
      <PopupWithForm
        name="form_image"
        title="Nuevo Lugar"
        isOpen={isOpenAddPlace}
        onClose={closeAllPopups}
      >
        <fieldset className="form__input">
          <input
            type="text"
            className="form__item form__item_title"
            id="title"
            name="name"
            placeholder="Titulo"
            required
            //minlength="2"
            //maxlength="30"
          />
          <span className="form__error name-error"></span>
          <input
            type="url"
            className="form__item form__item_link"
            id="link"
            name="link"
            placeholder="Enlace a la imagen"
            required
          />
          <span className="form__error link-error"></span>
        </fieldset>
        <button
          className="form__button form__button_submit form__button_submit_image"
          type="submit"
          id="create_image"
        >
          Crear
        </button>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Cambiar foto de perfil"
        isOpen={isOpenAvatar}
        onClose={closeAllPopups}
      >
        <fieldset className="form__input">
          <input
            type="url"
            className="form__item form__item_avatar-link"
            id="avatar"
            name="avatar"
            placeholder="Enlace a la imagen del avatar"
            required
          />
          <span className="form__error avatar-error"></span>
        </fieldset>
        <button
          className="form__button form__button_submit"
          type="submit"
          id="update_avatar"
        >
          Guardar
        </button>
      </PopupWithForm>
      <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
      {
        //empieza apartado de profile main
      }
      <Header />
      <section className="profile">
        <div className="profile__avatar" onClick={handleEditAvatarClick}>
          <img
            src={userAvatar}
            alt="imagen de perfil"
            className="profile__image-avatar"
          />
          <div className="profile__avatar-container">
            <img
              src={buttonProfileUpdate}
              alt="boton para editar avatar"
              className="profile__update-button"
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__info-name">
            <h1 className="profile__name">{userName}</h1>
            <img
              src={buttonProfileUpdate}
              onClick={handleEditProfileClick}
              alt="boton para editar perfil"
              className="profile__edit-button button"
            />
          </div>
          <h2 className="profile__info-aboutme">{userDescription}</h2>
        </div>
        <img
          src={addButtonImage}
          onClick={handleEditAddPlaceClick}
          alt="boton para añadir contenido"
          className="profile__add-button button"
        />
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Cards
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              selectedCard={selectedCard}
            />
          );
        })}
      </section>
    </>
  );
}
