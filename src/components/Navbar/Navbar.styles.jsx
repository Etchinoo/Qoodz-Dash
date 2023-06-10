import styled from "styled-components";

export const Container = styled.div`
  max-width: 225px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #e4e4e4;
  position: sticky;
  top: 0;
  gap: 42px;
`;
export const Header = styled.div`
  padding-top: 42px;
  padding-left: 24px;
`;
export const NavMenue = styled.ul`
  list-style: none;
  padding: 0;
`;

import { Link } from "react-router-dom";

import { btnReset, v } from "../../theme/v";

export const SSidebar = styled.div`
  /* z-index: 25; */
  background-color: #FFF;
  width: ${({ isOpen }) => (!isOpen ? `auto` : v.sidebarWidth)};
  background: ${({ theme }) => theme.bg};
  height: 100vh;
  padding: ${v.mdSpacing};
  border-right: 2px solid #e4e4e4;
  display: flex;
  z-index: 2;
  flex-direction: column;
  position: sticky;
  top: 0;
  gap: 16px;
`;

export const SSidebarButton = styled.button`
  ${btnReset};
  position: absolute;
  top: ${v.xxlSpacing};
  /* z-index: 10; */
  right: ${({ isOpen }) => (isOpen ? `-16px` : `-20px`)};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 0 4px ${({ theme }) => theme.bg3},
    0 0 7px ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};
`;

export const SLogo = styled.div`
  /* width: 52px; */
  img {
    height: 52px;
  }
  cursor: pointer;
  margin-bottom: ${v.lgSpacing};
`;

export const SLinkContainer = styled.div`
  background: ${({ theme, isActive }) =>
    !isActive ? `transparent` : theme.bg3};
  border-radius: ${v.borderRadius};


  /* background: red; */
  /* margin: 8px 0; */
  /* width: 180px; */
  /* height: 50px; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  :hover {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.bg3};
  }
`;

export const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;

  /* font-size: 16px; */
  /* padding: calc(${v.smSpacing} - 2px) 0; */
`;

export const SLinkIcon = styled.div`
  padding: ${v.smSpacing} ${v.mdSpacing};
  display: flex;
  svg {
    /* font-size: 20px; */
    width: 23px;
    height: 23px;
  }
`;

export const SLinkLabel = styled.span`

  font-family: "GilroyBold";
  display: ${({ isOpen }) => (!isOpen ? `none` : 'block')};
  flex: 1;
  margin-left: ${v.smSpacing};
  font-size: 16px;
  /* line-height: 32px; */
  font-family: "GilroyBold";
  color: ${(p) => (p.active ? "#ffffff" : "#808191")};
  /* padding: 0; */
  /* text-align: center; */
  /* align-items: center; */
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: center; */
`;
