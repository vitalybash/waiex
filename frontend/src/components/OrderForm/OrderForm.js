import React from 'react';
import MyInput from "../UI/Input/MyInput";
import MyTextArea from "../UI/TextArea/MyTextArea";
import "./OrderForm.css";
import FileInput from "../UI/FileInput/FileInput";
import StackChooser from "../UI/StackChooser/StackChooser";

const OrderForm = () => {
  const onSubmit = e => {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className="centered">
      <h2>Создание заказа</h2>
      <MyTextArea placeholder="Что вы хотите получить?" />
      <FileInput type="file" id="file" name="file" multiple />
      <StackChooser />
      <div className="numerous-container">
        <MyInput placeholder="Бюджет" id="budget" name="budget" />
        <MyInput placeholder="Сроки" id="deadline" name="deadline" />
      </div>
    </form>
  );
};

export default OrderForm;