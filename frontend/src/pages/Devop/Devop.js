import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import DevopsService from "../../API/DevopsService";
import "./Devop.css";
import { createName } from "../../utils/userNameCreater";

const Devop = () => {
  const params = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(DevopsService.getById(params.id));
  }, []);


  return (
    Object.keys(user).length !== 0
        ?
          <div className="devop">
            <img className="profile-image" src={require("../../assets/" + user?.image)} />
            <div className="user-info">
              <div>
                <h2>{createName(user)}</h2>
                <p>{user.description}</p>
              </div>
              <img src={require("../../assets/" + user?.logo)} />
            </div>
          </div>
      : <h1>LOADING...</h1>
  );
};

export default Devop;