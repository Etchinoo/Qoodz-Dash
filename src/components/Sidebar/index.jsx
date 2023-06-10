import React from "react";
import styled, { css } from "styled-components";
import NavItem from "../Navbar/components/NavItem";
import NAV_DAT from "../../data/nav_data.json";
import logo from "../../assets/logo.png";
import { AiOutlineLeft } from "react-icons/ai";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { SidebarStateAtom } from "../../store/Atoms";
import useWindowSize from "../../hooks/useWindowSize";

const Sidebar = () => {
  const [SidebarState, setSidebarState] = useAtom(SidebarStateAtom);
  const size = useWindowSize();
  return (
    <Container height={size.height} open={SidebarState}>
      <SidebarHeader open={SidebarState}>
        <img src={logo} alt="logo" />
        <SSidebarButton
          isOpen={SidebarState}
          onClick={() => setSidebarState(!SidebarState)}
        >
          <AiOutlineLeft />
        </SSidebarButton>
      </SidebarHeader>
      <SidebarNav>
        {NAV_DAT.map((nav) => (
          <NavItem
            to={nav.path}
            key={nav.id}
            name={nav.name}
            icon={nav.icon}
            open={SidebarState}
          />
        ))}
      </SidebarNav>
    </Container>
  );
};
const Container = styled.div`
  /* background-color: #fff; */
  /* height: ${({ height }) => `${height}px`}; */
  border-right: 2px solid #e4e4e4;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  background: #f8f8fa;
  height: 100vh;
  /* min-height: 1700px; */
  /* max-width: 250px; */
  width: ${({ open }) => (open ? "250px" : "92px")};
`;
const SidebarHeader = styled.div`
  display: flex;
  padding: 24px 16px;
  /* gap: 1.5rem; */
  justify-content: space-between;
  /* background-color: red; */
  img {
    width: 95.63px;
    height: 60.67px;
    object-fit: contain;
  }
  transition: all 0.3s ease-in-out;
  ${({ open }) =>
    open
      ? css`
          justify-content: space-between;
          align-items: center;
        `
      : css`
          align-items: center;
          img {
            width: 33px;
            height: 33px;
            object-fit: contain;
          }
          gap: 0.2rem;
        `}
`;

const SidebarNav = styled.ul`
  padding: 16px 0;
`;

const SSidebarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

export default Sidebar;
