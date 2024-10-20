import logoImage from "../images/logo.svg";
import "../blocks/header.css";
export default function Header() {
  return (
    <header className="header">
      <img src={logoImage} alt="Around the U.S." className="header__logo" />
      <div className="header__line"></div>
    </header>
  );
}
