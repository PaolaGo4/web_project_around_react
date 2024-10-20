import closeIcon from "../images/Close_icon.svg";
import React from "react";
export default function PopupWithForm({
  children,
  name,
  title,
  isOpen,
  handleClosePopup,
}) {
  const closePopup = () => {
    handleClosePopup();
  };
  return (
    <>
      <section
        className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      >
        <div className="popup__container">
          <img
            src={closeIcon}
            onClick={closePopup}
            alt="boton de cierre"
            className="popup__close-button popup__close-button_form"
          />
          <form className={`popup__form form form_${name}`}>
            <h4 className="form__name">{title}</h4>
            {children}
          </form>
        </div>
      </section>
    </>
  );
}
