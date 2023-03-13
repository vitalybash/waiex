import React, { useEffect, useState } from 'react';
import MyInput from "../components/UI/Input/MyInput";
import DevelopersGrid from "../components/ServicesGrid/ServicesGrid";
import ServicesService from "../API/ServicesService";
import { useFetching } from "../hooks/useFetching";

const Services = () => {
  const [services, setServices] = useState([]);

  const [fetchServices, isServicesLoading, servicesError] = useFetching(async () => {
    const response = await ServicesService.getAll();
    setServices(response.data);
  });

  useEffect(() => {
    fetchServices();
  }, []);

  console.log(services);

  return (
    <section className="services">
      <MyInput />
      <DevelopersGrid services={services} />
    </section>
  );
};

export default Services;