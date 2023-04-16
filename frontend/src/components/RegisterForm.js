import React, { useState } from 'react';
import MyInput from "./UI/Input/MyInput";
import "../styles/form.css";
import Error from "./UI/Error/Error";
import UsersService from "../API/UsersService";

const RegisterForm = ({setVisible, setLogin}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [login, setLog] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError("");
    }

    setEmail(event.target.value);
  };

  const register = () => {
    if (password !== repeatPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }
    setPasswordError("");
    const user = {
      "username": login,
      "email": email,
      "password": password
    }

    UsersService.registration(user)
      .then(res => {
        setError("");
        console.log(res);
      })
      .catch(res => {

        setError(res.message);
        console.log(error)
      })
  }

  return (
    <form className="modal-form">
      <h3>Регистрация</h3>
      <MyInput placeholder="Почта" id="emailR"
               value={email} onChange={handleChange}
      />
      { emailError && <Error message={emailError} /> }
      <MyInput placeholder="Логин" id="loginR"
               value={login} onChange={(e) => setLog(e.target.value)}
      />
      <MyInput type="password" placeholder="Пароль" id="passwordR"
               value={password} onChange={(e) => setPassword(e.target.value)}
      />
      <MyInput type="password" placeholder="Повторите пароль" id="repeat_password"
               value={repeatPassword} onChange={(e) => setRepPassword(e.target.value)}
      />
      { passwordError && <Error message={passwordError} /> }
      { error && <Error message={error} /> }
      <div>
        <a className="shadow my-input" onClick={() => register()}>Регистрация</a>
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