import { useEffect } from "react";
import styled from "styled-components";

const SliderV2 = ({ elements, action }) => {
  const onNext = () => {
    const slider = document.querySelector(".slider");
    slider.scrollLeft += 100;
  };
  const onPrev = () => {
    const slider = document.querySelector(".slider");
    slider.scrollLeft -= 100;
  };

  //bring item to focuse by id or index
  const bringItemToFocus = (id) => {
    const slider = document.querySelector(".slider");
    const item = document.querySelector(`#${id}`);
    slider.scrollLeft = item.offsetLeft;
  };

  useEffect(() => {
    console.log(action);
    if (action === "next") {
      onNext();
    } else if (action === "prev") {
      onPrev();
    } else {
      console.log("No controller");
    }
  }, [action]);

  return (
    <Container>
      <SliderWarpper>
        <SlidesContainer className=".slider">
          {elements &&
            elements.map((item, i) => {
              if (item !== null)
                return (
                  <Slide id={item.id} key={i}>
                    {item}
                  </Slide>
                );
            })}
        </SlidesContainer>
      </SliderWarpper>
    </Container>
  );
};

export default SliderV2;

const Container = styled.div`
  width: 100vw;
  overflow: hidden;
  padding-right: 20rem;
  /* background: none; */
`;

const SliderWarpper = styled.div`
  position: relative;
  overflow: hidden;
`;

const SlidesContainer = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 10px;
  overflow: scroll;
  scroll-behavior: smooth;
  scrollbar-width: 10px; /* Firefox */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
`;
const Slide = styled.li`
  width: 100%;
`;
