import React from 'react';
import Card from "../Card/Card";
import "./DevelopersGrid.css";

const DevelopersGrid = ({data}) => {
  return (
    <div className="grid-container">
      {data.users?.map(user => <Card key={user.id} user={user} />)}
    </div>
  );
};

export default DevelopersGrid;