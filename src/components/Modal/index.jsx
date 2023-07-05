import { BiXCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";
const Modal = styled.div`
  background-color: white;
  z-index: 5;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(
    ${(props) => props.sWidth / 3.5}px,
    ${(props) => props.sHeight / 12}px
  );

  ${({ sWidth, sHeight }) => {
    if (sWidth > 1368) {
      return css`
        transform: translate(
          ${(props) => props.sWidth / 3}px,
          ${(props) => props.sHeight / 6}px
        );
      `;
    } else {
      return css`
        transform: translate(
          ${(props) => props.sWidth / 4}px,
          ${(props) => props.sHeight / 12}px
        );
      `;
    }
  }}
`;

const ModalShadow = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(40, 42, 55, 0.32);
  opacity: 0.7;
  z-index: 4;
`;

export default function ModalContainer({ setOpen, children, show = true }) {
  const size = useWindowSize();
  const { width, height } = size;
  console.log("Modal Open");
  window.scrollTo(0, 0);

  return (
    <>
      <ModalShadow as={motion.div} onClick={() => setOpen(false)} />
      <Modal sWidth={width} sHeight={height}>
        {show && (
          <Exit>
            <BiXCircle className="icon" onClick={() => setOpen(false)} />
          </Exit>
        )}
        {children}
      </Modal>
    </>
  );
}

const Exit = styled.div`
  /* width: 32px; */
  /* height: 32px; */
  font-size: 28px;
  justify-content: center;
  align-items: center;
  /* border-radius: 50%; */
  /* background-color: red; */
  position: absolute;
  color: rgb(147, 155, 175);
  cursor: pointer;
  top: 50px;
  right: 40px;
  .icon {
    font-size: 28px;
    hover {
    color: red;
  }
  
`;
