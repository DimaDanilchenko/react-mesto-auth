import headerLogo from "../images/Vector.svg";
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Link to="/sign-up" className="header__link">
        Войти
      </Link>
    </header>
  );
}

export default Header;