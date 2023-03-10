import React from 'react';
import { useParams } from "react-router-dom";

const Devop = () => {
  const params = useParams();

  return (
    <div>
      {params.id}
    </div>
  );
};

export default Devop;