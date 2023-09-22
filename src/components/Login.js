import React from "react";

function Login() {
  return (
    <div className="page">
      <form className="register">
        <p className="register__header">Вход</p>
        <input type="email" name="email" className="register__email" placeholder="Email:" />
        <input type="password" name="name" className="register__password" placeholder="Пароль:" />
        <input type="submit" value="Войти" className="register__submit" />
      </form>
    </div>
  );
}

export default Login;