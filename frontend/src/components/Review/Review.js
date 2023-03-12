import React from 'react';
import "../Card/Card.css";

const Review = ({review}) => {
  return (
    <div className="card">
      <div className="user-info">
        <div>
          <p>Оценка: {review.rate}</p>
          <p>{review.comm}</p>
        </div>
        <img src={require("../../assets/" + review.logo)}/>
      </div>
    </div>
  );
};

export default Review;