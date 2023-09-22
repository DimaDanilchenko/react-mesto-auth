import React from "react";
import { Link } from "react-router-dom";


function Register() {
  return (
    <div className="page">
      <form className="login">
        <p className="login__header">Регистрация</p>
        <input type="email" name="email" className="login__email" placeholder="Email:" />
        <input type="password" name="name" className="login__password" placeholder="Пароль:" />
        <input type="submit" value="Зарегистрироваться" className="login__submit" />
        <p className="login__text">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>
      </form>
    </div>

  );
}

export default Register;