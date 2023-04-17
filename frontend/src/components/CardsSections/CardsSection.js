import React from 'react';
import Carousel from "../UI/Carousel/Carousel";
import "./CardsSection.css";

const CardsSection = ({title, elements, returner}) => {
  return (
    <section className="cards-section">
      <h3>{title}:</h3>
      {!elements.length && <h4>Ничего не найдено</h4>}
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