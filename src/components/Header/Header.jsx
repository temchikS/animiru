import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../images/logo.png";
function Header() {
  return (
    <div className="header">
      <Link className="unstyled-link" to="/">
        <img className="header-logo" src={logo} alt="logo" />
      </Link>
      <div className="login-reg">
        <Link className="unstyled-link" to="/register">
          Регистрация
        </Link>
        <Link className="unstyled-link" to="/login">
          Войти
        </Link>
      </div>
    </div>
  );
}
export default Header;
