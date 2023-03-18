import React from 'react';
import "./MyTextArea.css";

const MyTextArea = (props) => {
  return (
    <textarea className="shadow my-input my-textarea scroll" {...props} />
  );
};

export default MyTextArea;