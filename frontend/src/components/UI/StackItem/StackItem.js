import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
import "./StackIcon.css";

const StackItem = ({ item, onDelete }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="stack-item"
         onMouseEnter={() => setIsHover(true)}
         onMouseLeave={() => setIsHover(false)}
    >
      <span>{item}</span>
      {isHover &&
        <FontAwesomeIcon className="remove-icon" icon={faCircleMinus}
                         onClick={onDelete}
        />
      }

    </div>
  );
};

export default StackItem;