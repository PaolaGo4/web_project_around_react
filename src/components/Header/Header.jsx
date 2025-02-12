import logo from "@assets/images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo-page" className="header__image" />
    </header>
  );
}

export default Header;
