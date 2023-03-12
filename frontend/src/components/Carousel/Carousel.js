import React, { useState } from 'react';
import "./Carousel.css";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

const Carousel = ({ elements, elementReturner, elementWidth }) => {
  const [elementsState, setElementState] = useState(elements);
  if (!elements) return;

  const moveToLeft = () => {
    setElementState(prevEls => {
      let shiftedEls = [...prevEls];
      shiftedEls.push(shiftedEls.shift());


      return [...shiftedEls];
    })
  }

  const moveToRight = () => {
    setElementState(prevEls => {
      let popEls = [...prevEls];
      popEls.unshift(popEls.pop());

      return [...popEls];
    })
  }

  return (
    <div className="carouselContainer">
      <button className="buttonLeft" onClick={moveToLeft}>
        <MdOutlineArrowBackIos/>
      </button>
      <button className="buttonRight" onClick={moveToRight}>
        <MdOutlineArrowForwardIos/>
      </button>
      <div className="carousel">
        {elementsState.map(el => elementReturner({ element: el }))}
      </div>
    </div>
  );
};

export default Carousel;