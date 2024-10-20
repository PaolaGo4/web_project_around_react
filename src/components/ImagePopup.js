import closeIcon from "../images/Close_icon.svg";
export default function ImagePopup() {
  return (
    <>
      <section className="popup popup_zoom">
        <div className="popup__container-image">
          <img
            src={closeIcon}
            alt="boton de cierre"
            className="popup__close-button"
            id="close-button-image"
          />
          <img
            src="https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
            alt="fotografia de paisaje"
            className="popup__image"
          />
          <p className="popup__container-text"></p>
        </div>
      </section>
      <section className="popup popup_delete-image"></section>
    </>
  );
}
