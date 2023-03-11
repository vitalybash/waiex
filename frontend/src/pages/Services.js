import React, { useEffect, useState } from 'react';
import MyInput from "../components/UI/Input/MyInput";
import DevelopersGrid from "../components/ServicesGrid/ServicesGrid";
import ServicesService from "../API/ServicesService";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(ServicesService.getAll());
  }, []);

  return (
    <section className="developers">
      <MyInput />
      <DevelopersGrid services={services} />
    </section>
  );
};

export default Services;