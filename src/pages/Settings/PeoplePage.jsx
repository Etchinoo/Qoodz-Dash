import React, { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import ModalContainer from "../../components/Modal";
import { Col, Header, Row } from "../../components/Shared";
import {
  Form,
  Input,
  InputGrp,
  Label,
  NewBtn,
  PrimaryBtn,
  SSelect,
  Title,
} from "../Cashires/FormComponents.styles";
import Staff from "../../assets/Staff.png";
import SuccessModal from "../../components/Shared/SuccessModal";

const headerOptions = {
  title: "People",
  type: "detail",
  back: true,
  AddNew: true,
  addNewText: "Add a new staff member",
  to:"/settings",
};
const options = [
  { value: 1, label: "Branch manager" },
  { value: 2, label: "Operation Manager" },
  { value: 3, label: "Brand Owner" },
  { value: 4, label: "Cashier" },
];

const PeoplePage = () => {
  const [newOpen, setNewOpen] = useState(false);

  const nav = useNavigate();
  return (
    <Layout header={headerOptions} addNew={() => setNewOpen(true)}>
      {newOpen && (
        <ModalContainer setOpen={setNewOpen}>
          <NewStaffFrom onClose={() => setNewOpen(false)} />
        </ModalContainer>
      )}
      <Col>
        <Container>
          <SHeader>
            <OfferImage src={Staff} alt="image of OfferImage" />
            <Col gap={"5px"}>
              <OfferNameText>Esraa</OfferNameText>
              <OfferTypeText>Brnach Manger</OfferTypeText>
            </Col>
          </SHeader>
          <ControlContainer>
            <SSelect options={options} />
          </ControlContainer>
        </Container>
      </Col>
    </Layout>
  );
};

export default PeoplePage;

const SHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  flex: none;
  gap: 26px;
  box-sizing: border-box;
`;

const OfferImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const OfferNameText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 28px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;

const OfferTypeText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;
const ControlContainer = styled.div`
  width: 15%;
`;
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 120px;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.89);
  border-radius: 25px;
  background-color: white;
  box-sizing: border-box;
  padding: 23px 50px;
  width: 100%;
`;

const NewStaffFrom = ({ onClose }) => {
  const [stage, setStage] = useState(1);

  if (stage === 2)
    return <SuccessModal mainText={"Staff Successfully Added"} />;
  else {
    return (
      <Form style={{ width: "100%" }}>
        <Title>Add a new staff member</Title>
        <Row gap="1rem">
          <InputGrp>
            <Label>Name</Label>
            <Input />
          </InputGrp>
          <InputGrp>
            <Label>Phone Number</Label>
            <Input />
          </InputGrp>
        </Row>
        <InputGrp>
          <Label>Staff Role</Label>
          <SSelect        className="select-filter"  options={options} />
        </InputGrp>
        <PrimaryBtn onClick={() => setStage(2)}>Add Staff</PrimaryBtn>
      </Form>
    );
  }
};
