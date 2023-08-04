import React, { useState } from 'react';
import MyInput from "../UI/Input/MyInput";
import MyTextArea from "../UI/TextArea/MyTextArea";
import "./OrderForm.css";
import FileInput from "../UI/FileInput/FileInput";
import StackChooser from "../UI/StackChooser/StackChooser";
import axios from "axios";
import { nanoid } from "nanoid";
import FileService from "../../services/FileService";
import { useSelector } from "react-redux";

const OrderForm = () => {
  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [stack, setStack] = useState([]);
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filesIndexes, setFilesIndexes] = useState([]);

  function onSubmit(e) {
    e.preventDefault();

    const filename = nanoid(32);
    let promises = [];
    let ids = [];
    files.forEach(file => {
      promises.push(FileService.uploadFile(filename, file).then(r => {
        ids.push(r.data.id);
      }));
    });

    let formData = new FormData()
    formData.append("customer", 1);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("stack", stack.join(";"));
    formData.append("deadline", deadline);
    formData.append("price", 0);

    Promise.all(promises).then(r => {
      if (ids.length < 2) {
        formData.append("file", JSON.stringify(ids));
      } else {
        ids.forEach(i => {
          formData.append("file", i);
        })
      }

      axios.post(`http://127.0.0.1:8000/orders/`, formData,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }).then(r => console.log(r));
    })
  }

  const handleFilesChange = e => {
    setFiles(e.target.files);
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    setFiles(chosenFiles);
  }

  return (
    <form onSubmit={onSubmit} className="centered order">
      <h2>Создание заказа</h2>
      <MyInput placeholder="Название" id="title"
               onChange={(e) => setTitle(e.target.value)}
      />
      <MyTextArea placeholder="Что вы хотите получить?"
                  onChange={(e) => setDescription(e.target.value)}
      />
      <FileInput type="file" id="file" name="file" multiple onChange={handleFilesChange}/>
      <StackChooser stack={stack} setStack={setStack}/>
      <div className="numerous-container">
        <MyInput placeholder="Бюджет" id="budget" name="budget"
                 onChange={(e) => setBudget(e.target.value)}
        />
        <MyInput placeholder="Сроки" id="deadline" name="deadline"
                 onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <button className="centered shadow my-input">Создать заказ</button>
    </form>
  );
};

export default OrderForm;