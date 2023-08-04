import React, { useState } from 'react';
import MyInput from "./UI/Input/MyInput";
import "../styles/form.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/auth";
import { clearMessage } from "../actions/message";
import Loader from "./UI/Loader/Loader";

const RegisterForm = ({setVisible, setLogin}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

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

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);
    setLoading(true);

    dispatch(register(username, email, password))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
        setLoading(false);
      });
  };

  const clearFields = () => {
    setEmail("");
    setEmailError("");
    setUsername("");
    setPassword("");
    setRepPassword("")
    setPasswordError("");
    setError("");
    setSuccessful(false);
    dispatch(clearMessage());
  }

  return (
    <form className="modal-form">
      {
        isLoading ? <Loader/>
          : <>
            <h3>Регистрация</h3>
            <MyInput placeholder="Почта" id="emailR"
                     value={email} onChange={handleChange}
            />
            { emailError && <h3 className="error-text">{emailError}</h3> }
            <MyInput placeholder="Логин" id="loginR"
                     value={username} onChange={(e) => setUsername(e.target.value)}
            />
            <MyInput type="password" placeholder="Пароль" id="passwordR"
                     value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <MyInput type="password" placeholder="Повторите пароль" id="repeat_password"
                     value={repeatPassword} onChange={(e) => setRepPassword(e.target.value)}
            />
            { passwordError && <h3 className="error-text">{passwordError}</h3> }
            { error && <h3 className="error-text">{error}</h3>}

            <div>
              <a className="shadow my-input" onClick={(e) => handleRegister(e)}>Регистрация</a>
            </div>

            {message && <h3 className="error-text">{message}</h3>}

            <p>Уже есть аккаунт?
              <a onClick={() => {
                clearFields();
                setVisible(false);
                setLogin(true);
              }}>
                Войти
              </a>
            </p>
          </>
      }
    </form>
  );
};

export default RegisterForm;