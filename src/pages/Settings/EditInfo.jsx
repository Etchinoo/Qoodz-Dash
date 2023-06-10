import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { Col, Header, Row } from "../../components/Shared";
import offerImage from "../../assets/offerImage.png";
import {
  Form,
  InputGrp,
  Label,
  Input,
  SSelect,
  NewBtn,
  PrimaryBtn,
} from "../Cashires/FormComponents.styles";
import styled from "styled-components";
import SuccessModal from "../../components/Shared/SuccessModal";
import ModalContainer from "../../components/Modal";
const headerOptions = {
  title: "Edit Basic Information",
  type: "detail",
  back: true,
};

const EditInfo = () => {
  const [modal, setModal] = React.useState(false);
  const nav = useNavigate();
  return (
    <Layout header={headerOptions}>
      {modal && (
        <ModalContainer setOpen={setModal}>
          <SuccessModal
            mainText={"Your Information has been updated sucsesfully"}
          />
        </ModalContainer>
      )}

      <Form style={{ padding: "1rem", maxWidth: "720px" }}>
        <Col gap="28px">
          <Label>Profile Image</Label>
          <OfferImg src={offerImage} alt="" />
        </Col>
        <Row gap={"1rem"}>
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
          <Label>Email</Label>
          <Input type="email" />
        </InputGrp>
        <InputGrp>
          <Label>Assigned Branch</Label>
          <SSelect className="select-filter" classNamePrefix="filter-opt" />
        </InputGrp>
        <NewBtn onClick={() => nav("/settings/changePassword")}>
          Change Password
        </NewBtn>
        <PrimaryBtn onClick={() => setModal(true)}>Save</PrimaryBtn>
      </Form>
    </Layout>
  );
};

export default EditInfo;

const OfferImg = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
`;
