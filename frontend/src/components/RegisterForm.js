import React from 'react';
import MyInput from "./UI/Input/MyInput";
import "../styles/form.css";

const RegisterForm = ({setVisible, setLogin}) => {
  return (
    <form className="modal-form">
      <h3>Регистрация</h3>
      <MyInput placeholder="Логин" id="login" />
      <MyInput type="password" placeholder="Пароль" id="password" />
      <MyInput type="password" placeholder="Повторите пароль" id="repeat_password" />
      <div>
        <a className="shadow my-input">Регистрация</a>
      </div>
      <p>Уже есть аккаунт?
        <a onClick={() => {
          setVisible(false);
          setLogin(true);
        }}>
          Войти
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;