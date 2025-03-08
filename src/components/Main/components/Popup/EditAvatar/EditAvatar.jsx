import { useContext, useRef, useEffect } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import useFormValidation from "../../../../../utils/useFormValidation.js";

export default function EditAvatar(props) {
  const { validationConfig } = props;
  const userContext = useContext(CurrentUserContext); // logra el objeto currentUser
  const { handleUpdateAvatar, isLoading } = userContext;
  const refAvatar = useRef(); // Hace una nueva referencia
  const formRef = useRef(null);
  const { resetValidation, errors, isReady } = useFormValidation(
    validationConfig,
    formRef
  );

  useEffect(() => {
    resetValidation();
  }, [isReady]);

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: refAvatar.current.value, // El valor de entrada que logramos adquirir empleando la ref  ,
    });
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form
      className="popup__form"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
      onKeyDown={handleKeyDown}
    >
      <fieldset className="popup__content">
        <label className="popup__field popup__field_top">
          <input
            type="url"
            className="popup__input"
            placeholder="URL a la imagen"
            id="i-url-input"
            ref={refAvatar} // Enlaza la referencia al campo de entrada
            name="userAvatar"
            required
          />
          <span className="popup__input-error i-url-input-error">
            {errors.id}
          </span>
        </label>
        <button type="submit" className="popup__button">
          {isLoading ? "Guardando.." : "Guardar"}
        </button>
      </fieldset>
    </form>
  );
}
