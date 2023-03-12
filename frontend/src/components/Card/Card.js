import React from 'react';
import "./Card.css";

const Card = ({ service }) => {
  return (
    <div className="card">
      <img src={require("../../assets/" + service.image)}/>
      <div className="user-info">
        <div>
          <p>{service.description}</p>
          <div className="stack">
            {service.stack?.map(item => <div className="stack-item">{item}</div>)}
          </div>
        </div>
        <img src={require("../../assets/" + service.logo)}/>
      </div>
    </div>
  );
};

export default Card;