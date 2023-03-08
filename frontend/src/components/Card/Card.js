import React from 'react';
import "./Card.css";

const Card = ({user}) => {
  console.log("../../assets/" + user.image);
  return (
    <div className="card">
      <img src={require("../../assets/" + user.image)} />
      <div className="user-info">
        <div>
          <p>{user.description}</p>
          <div className="stack">
            {user.stack?.map(item => <div className="stack-item">{item}</div>)}
          </div>
        </div>
        <img src={require("../../assets/" + user.logo)} />
      </div>
    </div>
  );
};

export default Card;