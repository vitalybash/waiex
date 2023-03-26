import React from 'react';
import Card from "../Card/Card";
import "./ServicesGrid.css";

const ServicesGrid = ({ skills }) => {
  return (
    <div className="grid-container centered">
      {skills.map(skill => <Card key={skill.id} skill={skill}/>)}
    </div>
  );
};

export default ServicesGrid;