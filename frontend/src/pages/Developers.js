import React from 'react';
import MyInput from "../components/UI/Input/MyInput";
import DevelopersGrid from "../components/DevelopersGrid/DevelopersGrid";
import data from '../data/data.json';

const Developers = () => {
  return (
    <section className="developers">
      <MyInput />
      <DevelopersGrid data={data} />
    </section>
  );
};

export default Developers;