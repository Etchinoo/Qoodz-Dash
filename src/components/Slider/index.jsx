import React, { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { PartnershipRequestCard } from "../../pages/Partnerships/PartnershipRequestCard";

const Slider = ({ sliderController, data }) => {
  const sliderRef = useRef(null);
  const slide = useRef(null);

  const onNext = () => {
    sliderRef.current.scrollLeft += slide.current.offsetWidth;
  };

  const onPrev = () => {
    sliderRef.current.scrollLeft -= slide.current.offsetWidth;
  };

  useEffect(() => {
    console.log(sliderController);
    if (sliderController === "next") {
      onNext();
    } else if (sliderController === "prev") {
      onPrev();
    } else {
      console.log("No controller");
    }
  }, [sliderController]);

  return (
    <SSlider>
      <section className="slider-wrapper">
        <ul ref={sliderRef} className="slides-container" id="slides-container">
          {data.map((cardData, index) => (
            <li ref={slide} className="slide" key={index}>
              <PartnershipRequestCard name={cardData.title} />
            </li>
          ))}
        </ul>
      </section>
    </SSlider>
  );
};

export default Slider;

const SSlider = styled.div`
  .slider-wrapper {
    /* margin: 1rem; */
    position: relative;
    overflow: hidden;
    /* max-width: 980px; */
  }
  .slides-container {
    /* width: 100%; */
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
    /* padding-right: 120px; */
    overflow: scroll;
    scroll-behavior: smooth;
  }
  .slide {
    /* width: 100%; */
    height: 100%;
    /* flex: 1 0 100%; */
  }

  .slides-container {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
  /* WebKit */
  .slides-container::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .slide-arrow {
    /* position: absolute; */
    display: flex;
    /* top: 0; */
    /* bottom: 0; */
    /* margin: auto; */
    /* height: 4rem; */
    /* background-color: white; */
    /* border: none; */
    /* width: 2rem; */
    font-size: 3rem;
    /* padding: 0; */
    cursor: pointer;
    /* opacity: 0.5; */
    transition: opacity 100ms;
  }
`;
