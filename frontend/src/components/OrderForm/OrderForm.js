import React, { useState } from 'react';
import MyInput from "../UI/Input/MyInput";
import MyTextArea from "../UI/TextArea/MyTextArea";
import "./OrderForm.css";
import FileInput from "../UI/FileInput/FileInput";
import StackChooser from "../UI/StackChooser/StackChooser";
import axios from "axios";

const OrderForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [stack, setStack] = useState([]);
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    console.log(title, description, files, stack)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("stack", stack.join(";"));
    formData.append("deadline", 123);

    formData.append("kind", "test");
    formData.append("price", 1);
    formData.append("status", "test");
    formData.append("customer", 1)
    formData.append("executor", 1);


    files.forEach(file => {
      formData.append('files', file);
    })


    // formData.append("files", [
    // ]);

    axios.post("http://localhost:8000/orders/", formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res.data);
    })
  }

  const handleUploadFiles = files => {
    const uploaded = [...files];
    files.some(file => {
      if (uploaded.findIndex(f => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    })

    setFiles(uploaded);
  }

  const handleFilesChange = e => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  }

  return (
    <form onSubmit={onSubmit} className="centered">
      <h2>Создание заказа</h2>
      <MyInput placeholder="Название" id="title"
                onChange={(e) => setTitle(e.target.value)}
      />
      <MyTextArea placeholder="Что вы хотите получить?"
                  onChange={(e) => setDescription(e.target.value)}
      />
      <FileInput type="file" id="file" name="file" multiple onChange={handleFilesChange} />
      <StackChooser stack={stack} setStack={setStack} />
      <div className="numerous-container">
        <MyInput placeholder="Бюджет" id="budget" name="budget"
                 onChange={(e) => setBudget(e.target.value)}
        />
        <MyInput placeholder="Сроки" id="deadline" name="deadline"
                 onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <button>Создать заказ</button>
    </form>
  );
};

export default OrderForm;