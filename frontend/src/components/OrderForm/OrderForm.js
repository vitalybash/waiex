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
  const [file, setFile] = useState({
    title: "",
    description: "",
    image_url: "",
  });
  const [stack, setStack] = useState([]);
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const onSubmit = e => {
    e.preventDefault();
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



    //
    // for (let i = 0; i < files.length; i++) {
    //   formData.append('files', files[0]);
    // }
    // files.forEach(file => {
    //   formData.append('files', file);
    // })

    formData.append("file", file.image_url);

    console.log(formData.get('file'))


    // formData.append("files", [
    // ]);

    axios.post("http://localhost:8000/orders/", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      console.log(res.data);
    })
  }

  const handleFilesChange = e => {
    let newFile = { ...file };
    newFile["image_url"] = e.target.files[0];
    setFile(newFile);
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