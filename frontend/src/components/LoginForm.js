import React, { useState } from 'react';
import MyInput from "./UI/Input/MyInput";
import "../styles/form.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import { clearMessage } from "../actions/message";

const LoginForm = ({setVisible, setRegister}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setLoading(false);
    dispatch(clearMessage());
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    dispatch(login(email, password))
      .then(() => {
        clearFields();
        setVisible(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <form className="modal-form">
      <h3>Вход</h3>
      <MyInput placeholder="Логин" id="login"
               value={email} onChange={onChangeEmail} />
      <MyInput type="password" placeholder="Пароль" id="password"
               value={password} onChange={onChangePassword} />
      <div>
        <a className="shadow my-input">Забыли пароль</a>
        <a className="shadow my-input" onClick={(e) => handleLogin(e)}>Войти</a>
      </div>
      <p>Еще нет учетной записи?
        <a onClick={() => {
            clearFields();
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