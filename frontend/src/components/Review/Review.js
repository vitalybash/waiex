import React, { useState, useEffect } from 'react';
import "../Card/Card.css";
import { useFetching } from "../../hooks/useFetching";
import DevopsService from "../../services/DevopsService";
import Loader from "../UI/Loader/Loader";

const Review = ({ review }) => {
  const [user, setUser] = useState({});

  const [fetchUser, isUserLoading, userErrors] = useFetching(async (id) => {
    const response = await DevopsService.getById(id);
    setUser(response.data);
  })

  useEffect(() => {
    fetchUser(review.user_from);
  }, []);

  return (
    <div className="card shadow">
      <div className="user-info">
        <div>
          <p>Оценка: {review.estimation}</p>
          <p>{review.text}</p>
        </div>
        {
          Object.keys(user).length === 0
          ? <Loader />
          : <img src={user.avatar}/>
        }
      </div>
    </div>
  );
};

export default Review;