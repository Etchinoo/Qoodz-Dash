import React, { useState } from "react";
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
import { userAtom, userTokenAtom } from "../../store/Atoms";
import { useAtom } from "jotai";
import axios from "axios";
import { APIsConstants } from "../../constants/API.constants";

const headerOptions = {
  title: "Change Password",
  type: "detail",
  back: true,
  to: "/settings",
};
const ChangPassword = () => {
  const [modal, setModal] = React.useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const onExit = () => {
    setModal(false);
    nav(-1);
  };
  const nav = useNavigate();

  const handleChangePassword = () => {
    axios
      .post(
        `${APIsConstants.BASE_URL}/auth/password/change`,
        { phoneNumber: user?.phoneNumber, newPassword: newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setModal(true);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

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
          <Input
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </InputGrp>

        <Row gap={"1rem"}>
          <InputGrp>
            <Label>New Password</Label>
            <Input onChange={(e) => setNewPassword(e.target.value)} />
          </InputGrp>
          <InputGrp>
            <Label>Confirm Password</Label>
            <Input onChange={(e) => setConfirmPassword(e.target.value)} />
          </InputGrp>
        </Row>
        <PrimaryBtn
          onClick={() => handleChangePassword()}
          disabled={
            !(confirmPassword == newPassword && newPassword && confirmPassword)
          }
        >
          Save
        </PrimaryBtn>
      </Form>
    </Layout>
  );
};

export default ChangPassword;
