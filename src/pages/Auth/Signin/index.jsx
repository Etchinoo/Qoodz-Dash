import logo from "../../../assets/logo.png";
import Auth_IMG from "../../../assets/auth_img.png";
import icon from "../../../assets/icon1.png";
import { Col, Container, Header, Row } from "../../../components/Shared";
import {
  Form,
  HelperText,
  Input,
  InputGrp,
  Label,
  PrimaryBtn,
  SPhoneInput,
} from "../../../components/FormComponents";
import styled from "styled-components";
import useWindowSize from "../../../hooks/useWindowSize";

import "react-phone-number-input/style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "../../../store/Atoms";
import { useNavigate } from "react-router-dom";

const Login = async (data) => {
  try {
    const response = await axios.post(
      "https://qoodz-api.herokuapp.com/api/auth/signin",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
        },
      }
    );
    // console.log("response: ", response);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

const Signin = () => {
  const size = useWindowSize();
  const [phone, setPhone] = useState("+201100000002");
  const [password, setPassword] = useState("test123123");
  const [user, setUser] = useAtom(userAtom);
  const [userToken, setUserToken] = useAtom(userTokenAtom);

  const nav = useNavigate();

  const login = async () => {
    console.log("login");
    const data = {
      phoneNumber: phone,
      password,
    };
    const res = await Login(JSON.stringify(data));
    if (res) {
      setUser(res.user);
      setUserToken(res.tokens);
      nav("/");
    }
  };

  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, [user]);

  return (
    <Row style={{ maxHeight: screen.height, overflow: "hidden" }}>
      <Col>
        {/* <Form onSubmit={()=>login()}> */}
        <Form>
          <Col gap="42px">
            <LogoContainer>
              <img src={logo} alt="logo" />
            </LogoContainer>
            <Col gap={"10px"}>
              <Row gap={"60px"}>
                <Title>Hello There</Title>
                <IconContainer>
                  <img src={icon} alt="icon" />
                </IconContainer>
              </Row>
              <SubTitle>welcome back! Start your journy</SubTitle>
            </Col>
          </Col>
          <InputGrp>
            <Label>Phone Nubmer</Label>
            <SPhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
            />
            {/* <Input type="text" placeholder="Email" required /> */}
          </InputGrp>
          <InputGrp>
            <Label>Password</Label>
            <Input
              style={{ padding: "24px 12px" }}
              type="password"
              placeholder="*******"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGrp>
          <Row style={{ justifyContent: "flex-end" }}>
            <HelperText href="/">Forgot your password</HelperText>
          </Row>
          <PrimaryBtn onClick={() => login()}>Login</PrimaryBtn>
        </Form>
      </Col>
      <Col>
        <AuthImg size={size}>
          <img src={Auth_IMG} alt="auth-img" />
        </AuthImg>
      </Col>
    </Row>
  );
};

export default Signin;

const LogoContainer = styled.div`
  width: 95px;
  height: 60px;
`;

const IconContainer = styled.div`
  width: 51px;
  height: 51px;
`;

const Title = styled.div`
  font-family: "GilroyExtraBold";
  font-size: 32px;
  line-height: 40px;
  /* identical to box height, or 125% */

  color: #282a37;
`;

const SubTitle = styled.div`
  font-family: "GilroyRegular";
  font-size: 24px;
  line-height: 28px;
  color: #282a37;
`;

const AuthImg = styled.div`
  width: 100%;
  /* height: 100%; */
  max-height: ${({ size }) => `${size.height}px`};
  img {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
  }
  /* background-image: url(${Auth_IMG});
  background-repeat: no-repeat;
  background-size: cover; */
`;
