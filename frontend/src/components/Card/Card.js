import React, { useEffect, useState } from 'react';
import "./Card.css";
import { splitStack } from "../../utils/splitStack";
import DevopsService from "../../API/DevopsService";
import { useFetching } from "../../hooks/useFetching";

const Card = ({ service }) => {
  const [user, setUser] = useState({});

  const [fetchUser, isUserLoading, userErrors] = useFetching(async (id) => {
    const response = await DevopsService.getById(id);
    setUser(response.data);
  })

  useEffect(() => {
    fetchUser(service.autor);
  }, []);

  return (
    <div className="card shadow">
      <img src={service.image}/>
      <div className="user-info">
        <div>
          <p>{service.description}</p>
          <p>Цена: {service.price}</p>
          <div className="stack scroll">
            {splitStack(service.stack).map(item => <div key={item} className="stack-item">{item}</div>)}
          </div>
        </div>
        {
          !isUserLoading && <img src={user.avatar}/>
        }
      </div>
    </div>
  );
};

export default Card;