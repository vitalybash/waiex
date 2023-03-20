import React, { useState } from 'react';
import "./FileInput.css";

const FileInput = (props) => {
  const [countOfFiles, setCountOfFiles] = useState(0);

  const changeText = (e) => {
    const input = e.target;
    setCountOfFiles(input?.files?.length);
  }

  return (
    <>
      <button type="button" onClick={() => {
        document.getElementById(props.id).click()
      }}
              className="centered shadow my-input input-button">
        {
          countOfFiles
          ? "Выбрано файлов: " + countOfFiles
          : "Приложить файлы"
        }
      </button>
      <input className="unvisible" onChange={(e) => changeText(e)} {...props} />
    </>
  );
};

export default FileInput;