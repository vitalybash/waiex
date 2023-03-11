import React from 'react';
import Card from "../Card/Card";
import "./ServicesGrid.css";

const DevelopersGrid = ({services}) => {
  return (
    <div className="grid-container centered">
      {services.map(service => <Card key={service.id} service={service} />)}
    </div>
  );
};

export default DevelopersGrid;