import React, { useEffect, useState } from 'react';
import MyInput from "../components/UI/Input/MyInput";
import DevelopersGrid from "../components/ServicesGrid/ServicesGrid";
import ServicesService from "../API/ServicesService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const Services = () => {
  const [services, setServices] = useState([]);

  const [fetchServices, areServicesLoading, servicesError] = useFetching(async () => {
    const response = await ServicesService.getAll();
    setServices(response.data);
  });

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section className="services">
      <MyInput />
      {areServicesLoading
        ? <Loader />
        : <DevelopersGrid services={services} />
      }
    </section>
  );
};

export default Services;