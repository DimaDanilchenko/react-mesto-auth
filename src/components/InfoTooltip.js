import React from "react";
import successImage from '../images/Union.svg';
import failImage from '../images/Union2.svg';

function InfoTooltip(props) {
  return(
    <div className={`popup ${props.name}-popup ${props.isOpen ? "popup_open" : ""}`}>
      <div className="registration-popup__container">
      <img
          className="registration-popup__image"
          src={props.status ? successImage : failImage}
          alt={props.status ? "Успешно" : "Ошибка"}
        />
        <p className="registration-popup__text">
          {props.status
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  )
}

export default InfoTooltip;