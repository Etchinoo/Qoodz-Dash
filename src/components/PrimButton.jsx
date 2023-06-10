import styled from "styled-components";

export default styled.button`
  width: 100%;
  min-width: 200px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 1.8rem;
  outline: none;
  border: none;
  cursor: pointer;
  font-family: 'GilroyBold';
  font-size: 20px;
  color: #282a37;
  :hover {
    /* opacity: 0.7; */
    /* outline: 2px solid #ECE856; */
  }
  background-color: ${(props) => props.color || "#ECE856"};
`;
