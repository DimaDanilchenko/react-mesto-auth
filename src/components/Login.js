import React from "react";
import headerLogo from "../images/Vector.svg";


function Login() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
    </header>

  );
}

export default Login;