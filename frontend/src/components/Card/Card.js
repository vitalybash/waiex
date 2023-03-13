import React from 'react';
import "./Card.css";
import { splitStack } from "../../utils/splitStack";

const Card = ({ service }) => {
  return (
    <div className="card">
      <img src={service.image}/>
      <div className="user-info">
        <div>
          <p>{service.description}</p>
          <div className="stack">
            {splitStack(service.stack).map(item => <div className="stack-item">{item}</div>)}
          </div>
        </div>
        <img src={require("../../assets/logo1.png")}/>
      </div>
    </div>
  );
};

export default Card;