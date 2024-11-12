import closeIcon from "../images/Close_icon.svg";
import React from "react";
import FormValidator from "./FormValidator";

export default function PopupWithForm({
  children,
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  //const closePopup = () => {
  //  onClose();
  //};

  /*const submit = () => {
    onSubmit();
  };*/

  React.useEffect(() => {
    if (name) {
      const formValidator = new FormValidator(
        {
          formSelector: ".form",
          inputSelector: ".form__item",
          submitButtonSelector: ".form__button",
          inactiveButtonClass: "form__button_inactive",
          inputErrorClass: "form__input_type_error",
          errorClass: "form__error-active",
        },
        `.form_${name}`
      );
      formValidator.enableValidation();
    }
  }, [name]);

  return (
    <>
      <section
        className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      >
        <div className="popup__container">
          <img
            src={closeIcon}
            onClick={onClose}
            alt="boton de cierre"
            className="popup__close-button popup__close-button_form"
          />
          <form className={`popup__form form form_${name}`} onSubmit={onSubmit}>
            <h4 className="form__name">{title}</h4>
            {children}
          </form>
        </div>
      </section>
    </>
  );
}
