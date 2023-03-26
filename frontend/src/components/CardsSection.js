import React from 'react';
import Carousel from "./UI/Carousel/Carousel";
import Card from "./Card/Card";

const CardsSection = ({title, elements, returner}) => {
  return (
    <section>
      <h3>{title}:</h3>
      <div>
        <Carousel
          elements={elements}
          elementReturner={returner}
          elementWidth={500}
        />
      </div>
    </section>
  );
};

export default CardsSection;