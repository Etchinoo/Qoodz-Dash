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
import ModalContainer from "../../components/Modal";
import SuccessModal from "../../components/Shared/SuccessModal";
const headerOptions = {
  title: "Change Password",
  type: "detail",
  back: true,
};
const ChangPassword = () => {
  const [modal, setModal] = React.useState(false);
  const onExit = () => {
    setModal(false);
    nav(-1);
  };
  const nav = useNavigate();
  return (
    <Layout header={headerOptions}>
      {modal && (
        <ModalContainer setOpen={onExit}>
          <SuccessModal
            mainText={"Your Password has been updated sucsesfully"}
          />
        </ModalContainer>
      )}

      <Form style={{ padding: "1rem", maxWidth: "720px" }}>
        <InputGrp>
          <Label>Old Password</Label>
          <Input type="password" />
        </InputGrp>

        <Row gap={"1rem"}>
          <InputGrp>
            <Label>New Password</Label>
            <Input />
          </InputGrp>
          <InputGrp>
            <Label>Confirm Password</Label>
            <Input />
          </InputGrp>
        </Row>
        <PrimaryBtn onClick={() => setModal(true)}>Save</PrimaryBtn>
      </Form>
    </Layout>
  );
};

export default ChangPassword;

const OfferImg = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
`;
