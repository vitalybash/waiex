import React, { useEffect, useState } from 'react';
import MyInput from "../components/UI/Input/MyInput";
import ServicesGrid from "../components/ServicesGrid/ServicesGrid";
import SkillsService from "../services/SkillsService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  const [fetchServices, areServicesLoading, servicesError] = useFetching(async () => {
    const response = await SkillsService.getAll();
    setSkills(response.data);
  });

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section className="services">
      {areServicesLoading
        ? <Loader/>
        :
        <>
          {!servicesError && <MyInput id="searchbar" placeholder="Название..."/>}
          <ServicesGrid skills={skills}/>
        </>
      }
      {
        servicesError && <h2 className="error-text">Error: {servicesError}</h2>
      }
    </section>
  );
};

export default Skills;