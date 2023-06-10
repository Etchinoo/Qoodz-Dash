import React, { useState } from "react";
import styled, { css } from "styled-components";
const Tab = styled.button`
  font-family: "GilroyBold";
  font-size: 28px;
  line-height: 40px;
  color: #282a37;
  /* font-size: 16px; */
  padding: 10px 34px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;

  ${({ active }) =>
    active &&
    css`
      border-bottom: 4px solid #ece856;
      opacity: 1;
    `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;

export default function Tabs({ active, setActive, Tabs, children }) {
  return (
    <>
      <ButtonGroup>
        {Tabs?.map((tab, index) => (
          <Tab
            key={index}
            active={active.name === tab.name}
            onClick={() => setActive(tab)}
          >
            {tab.name}
          </Tab>
        ))}
      </ButtonGroup>
      {children}
    </>
  );
}
