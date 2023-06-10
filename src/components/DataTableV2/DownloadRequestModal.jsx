import { useState } from "react";
import styled from "styled-components";
import BreifCase from "../../assets/breifcase.png";
import { Col, Row } from "../Shared";
import SuccessModal from "../Shared/SuccessModal";

export function DownloadRequestModal({ onDone }) {
  const [stage, setStage] = useState(1);

  function close() {
    onDone(false);
  }

  function sendRequest() {
    setStage(2);
  }
  if (stage === 2)
    return (
      <SuccessModal
        mainText={"Your Request was successfully submited"}
        subText={
          "An Email with the requested data will be sent to the account admins email"
        }
      />
    );
  else {
    return (
      <RootWrapperDownloadReuestForm>
        <ImageContainer>
          <Image src={BreifCase} alt="image of Image" />
        </ImageContainer>
        <Col gap="13px">
          <Title>Are you sure you want to Request Download?</Title>
          <SubText>
            Some meaningful help text pertaining to this modal goes here!
          </SubText>
        </Col>
        <Col
          gap="20px"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <PrimaryBtn onClick={() => sendRequest()}>Request</PrimaryBtn>
          <SecondaryBtn onClick={() => close()}>Cancel</SecondaryBtn>
        </Col>
      </RootWrapperDownloadReuestForm>
    );
  }
}

const RootWrapperDownloadReuestForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 62px;
  border-radius: 50px;
  background-color: white;
  box-sizing: border-box;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  background-color: rgb(236, 232, 86);
  border-radius: 175px / 175px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const Title = styled.span`
  color:  #282A37;
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  text-align: center;
`;

const SubText = styled.span`
  color:  #282A37;
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: Gilroy-Regular, sans-serif;
  font-weight: initial;
  text-align: center;
`;

const PrimaryBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 10px;
  border-radius: 15px;
  background-color: rgb(236, 232, 86);
  box-sizing: border-box;
  padding: 16px 120px;
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: GilroyBold, sans-serif;
  cursor: pointer;
`;

const SecondaryBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 10px;
  border: solid 1px rgb(128, 129, 145);
  border-radius: 15px;
  background-color: white;
  box-sizing: border-box;
  padding: 16px 120px;
  color: rgb(40, 42, 55);
  font-size: 24px;
  font-family: GilroyMedium, sans-serif;
  cursor: pointer;
`;
