import React, { useEffect, useState } from 'react';
import "./Card.css";
import { splitStack } from "../../utils/splitStack";
import DevopsService from "../../services/DevopsService";
import { useFetching } from "../../hooks/useFetching";

const Card = ({ skill }) => {
  const [user, setUser] = useState({});

  const [fetchUser, isUserLoading, userErrors] = useFetching(async (id) => {
    const response = await DevopsService.getById(id);
    setUser(response.data);
  })

  useEffect(() => {
    fetchUser(skill.author);
  }, []);

  return (
    <div className="card shadow">
      <img src={skill.image}/>
      <div className="user-info">
        <div>
          <p>{skill.description}</p>
          <p>Цена: {skill.price}</p>
          <div className="stack scroll">
            {splitStack(skill.stack).map(item => <div key={item} className="stack-item">{item}</div>)}
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