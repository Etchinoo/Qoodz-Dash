import React, { useState } from "react";
import styled from "styled-components";
import { Col, Row } from "../../components/Shared";
import { BiTimer } from "react-icons/bi";
import ToggleSwitch from "../../components/ToggleSwitch";
import ModalContainer from "../../components/Modal";
// import { PauseCampaignRequest } from "./PauseCampaignModal";

export default function CampaignCard() {
  const [toggle, setToggle] = useState(false);
  const [pauseRequestModal, setPauseRequestModal] = useState()
  
  
  return (
    <Card>
       {pauseRequestModal && (
        <ModalContainer setOpen={setPauseRequestModal}>
          {/* <PauseCampaignRequest /> */}
        </ModalContainer>
      )}
      <InnerContainer>
        <Row>
          <Col gap={"0.2rem"}>
            <Title>Campaign Name</Title>
            <CampType>Type: Gift</CampType>
          </Col>
          <ToggleSwitch
          value={toggle}
          onChange={setToggle}
          />
        </Row>
        <Row gap="7px">
          <Rectangle3 />
          <Col>
            <StateText>State: Active</StateText>
            <Row style={{ alignItems: "flex-end" }}>
              <BiTimer size={36} />
              <Row>
                <Col>
                  <DateText>Starting Date -</DateText>
                  <DateText>10/2/2022 -</DateText>
                </Col>
                <Col>
                  <DateText>End Date</DateText>
                  <DateText>10/3/2022</DateText>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>
      </InnerContainer>
      <TextBody>
        <BodyTitle>Campaign Details</BodyTitle>
        <Paragraph>
          Buy 1 and Get 1 on on of the following products from any branch
          <br />
          <br />
          <br />
          Margretta Pizza
          <br />
          Cheesy Pizza <br />
          Milkshake
          <br />
        </Paragraph>
      </TextBody>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  max-width: 570px;
  justify-content: flex-start;
  flex-direction: column;
  /* align-items: flex-start; */
  gap: 96px;
  box-shadow: 1px 4px 77px rgba(185, 185, 185, 0.89);
  border-radius: 25px;
  /* background-color: #ccc; */
  box-sizing: border-box;
  padding: 27px 53px;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 65px;
  box-sizing: border-box;
`;

const Title = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 32px;
  font-family: Gilroy-Bold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;

const CampType = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: Gilroy-Regular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;

const Rectangle3 = styled.div`
  width: 10px;
  height: 102px;
  background-color: rgb(0, 190, 167);
`;

const Frame58 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 9px;
  box-sizing: border-box;
`;

const StateText = styled.span`
  color: rgb(46, 196, 182);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: Gilroy-Bold, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;

const DateText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: Gilroy-Medium, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;

const TextBody = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 32px;
  box-sizing: border-box;
`;

const BodyTitle = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 26px;
  font-family: Gilroy-Bold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;

const Paragraph = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: Gilroy-Regular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
  width: 450px;
`;
