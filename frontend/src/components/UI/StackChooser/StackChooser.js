import React, { useRef, useState } from 'react';
import "./StackChooser.css";
import StackItem from "../StackItem/StackItem";

const StackChooser = () => {
  const [stack, setStack] = useState([]);
  const [isInput, setIsInput] = useState(false);

  const addEl = e => {
    const value = e.target.value;
    if (!stack.includes(value) && value.length > 0) {
      setStack(prevState => [value, ...prevState]);
    }
    e.target.value = "";
    setIsInput(false);
  }

  const removeEl = id => {
    console.log(id);
    setStack(prevState => prevState.filter((el, el_id) => el_id !== id));
  }

  const resize = (e) => {
    const input = e.target;
    input.size = 4 > input.value.length - 5 ? 4 : input.value.length - 5;
  }

  const newItem = <input className="my-input shadow"
                         onBlur={(e) => addEl(e)}
                         onChange={(e) => resize(e)}
                         onKeyDown={(e) => {
                           if (e.key === "Enter") {
                             addEl(e);
                           }
                         }}
                         autoFocus
                         id="new-item" name="new-item" size="4"/>;

  return (
    <div>
      <h4>Стек технологий:</h4>
      <div className="stack scroll my-input shadow">
        <a onClick={() => setIsInput(true)} className="btn btn-primary shadow">+</a>
        {
          isInput &&
          newItem
        }
        {
          stack.map((item, id) => <StackItem key={item} item={item} onDelete={() => removeEl(id)} />)
        }
      </div>
    </div>
  );
};

export default StackChooser;