import React from 'react';
import './MyInput.css';

const MyInput = (props) => {
  return (
    <input className="centered shadow my-input" type="text" {...props} />
  );
};

export default MyInput;