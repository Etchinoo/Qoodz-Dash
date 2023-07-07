import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { Col, Header } from "../../components/Shared";

const headerOptions = {
  title: "Language",
  type: "detail",
  back: true,
  to:"/settings",
};

const LanguageSelect = () => {
  const nav = useNavigate();
  return (
    <Layout header={headerOptions}>
      <Col>
        <Container>Ar Arabic </Container>
        <Container>En English </Container>
      </Col>
    </Layout>
  );
};

export default LanguageSelect;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 32px;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.89);
  border-radius: 25px;
  background-color: white;
  box-sizing: border-box;
  padding: 23px 50px;
  cursor: pointer;
  font-family: "GilroyBold";
  font-size: 28px;
  line-height: 40px;
  :hover {
    transform: scale(1.02);
  }
`;
