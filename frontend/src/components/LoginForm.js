import React from 'react';
import MyInput from "./UI/Input/MyInput";
import "../styles/form.css";

const LoginForm = ({setVisible, setRegister}) => {
  return (
    <form className="modal-form">
      <h3>Вход</h3>
      <MyInput placeholder="Логин" id="login" />
      <MyInput type="password" placeholder="Пароль" id="password" />
      <div>
        <a className="shadow my-input">Забыли пароль</a>
        <a className="shadow my-input">Войти</a>
      </div>
      <p>Еще нет учетной записи?
        <a onClick={() => {
            setVisible(false);
            setRegister(true);
          }
        }>
          Регистрация
        </a>
      </p>
    </form>
  );
};

export default LoginForm;