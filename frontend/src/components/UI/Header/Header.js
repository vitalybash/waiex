import React from 'react';
import logo from '../../../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="left">
        <img id="logo" src={logo} alt="Logo" />
        <div className="pages">
          <a href="#">Проекты</a>
          <a href="#">Специалисты</a>
          <a href="#">Кабинет</a>
        </div>
      </div>
      <a href="#">Ахиллес Сын Пелея</a>
    </header>
  );
};

export default Header;