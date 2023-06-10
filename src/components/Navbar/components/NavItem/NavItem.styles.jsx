import styled from "styled-components";

export const Container = styled.li`
  margin: 0 1rem;
  width: 180px;
  height: 50px;
  background: ${(p) => (p.active ? "#282A37" : "transparent")};
  border-radius: 15px;
  padding-left: 1rem;
  text-decoration: none;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 19px;
`;
export const NavIcon = styled.svg`
  width: 23px;
  height: 23px;
`;
export const NavLabel = styled.div`
  font-size: 16px;
  /* line-height: 32px; */
  ${({ open }) => (open ? `display: block;` : `display: flex;`)}
  font-family: "GilroyBold";
  color: ${(p) => (p.active ? "#ffffff" : "#808191")};
  padding: 0;
  text-align: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;
