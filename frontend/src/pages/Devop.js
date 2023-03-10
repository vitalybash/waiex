import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import DevopsService from "../API/DevopsService";

const Devop = () => {
  const params = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(DevopsService.getById(params.id));
  }, []);

  return (
    <div>
      {user.description}
    </div>
  );
};

export default Devop;