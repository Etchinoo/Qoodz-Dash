import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Layout from "../../components/Layout";
import ModalContainer from "../../components/Modal";
import { Col, Header, Row } from "../../components/Shared";
import { SearchBar } from "../../components/DataTableV2/DataTable.styles";
import {
  Form,
  Input,
  InputGrp,
  Label,
  PrimaryBtn,
  TextArea,
} from "../../components/FormComponents";
import { OfferCard } from "./OfferCard";
import { useState } from "react";
import SuccessModal from "../../components/Shared/SuccessModal";

const RequestNewCampaigneForm = () => {
  // const [selectedOffer, setSelectedOffer] = useState(false);
  const [stage, setStage] = useState(1);
  const [modal, setModal] = useState(false);
  const nav = useNavigate();

  const onExit = () => {
    setModal(false);
    nav(-1);
  };

  return (
    <Layout>
      {modal && (
        <ModalContainer setOpen={onExit}>
          <SuccessModal mainText={"Your request has been sent Successfully!"} />
        </ModalContainer>
      )}
      <Col master paddingHorz={"42px"} paddingVert={"1rem"} gap={"32px"}>
        {stage === 1 && (
          <>
            <Header pointer onClick={() => nav(-1)} marginVert={"18px"}>
              <BsChevronLeft /> <span>Choose Offer</span>{" "}
              <StepCounter>Step {stage}/2</StepCounter>
            </Header>
            <SearchBar style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AiOutlineSearch size={24} />
              </div>
              <input
                type="text"
                placeholder="Search"
                //   value={searchValue}
                //   onChange={(e) => onSearch(e.target.value)}
              />
            </SearchBar>
            <Row>
              <OfferCard />
              <OfferCard />
              <OfferCard />
            </Row>
            <PrimaryBtn onClick={() => setStage(2)} width={"50%"}>
              Next
            </PrimaryBtn>
          </>
        )}
        {stage === 2 && (
          <>
            <Header pointer onClick={() => setStage(1)} marginVert={"18px"}>
              <BsChevronLeft /> <span>Choose Channel</span>{" "}
              <StepCounter>Step {stage}/2</StepCounter>
            </Header>
            <Form style={{ maxWidth: "720px", padding: "0" }}>
              <InputGrp>
                <Label>Select Campaign Type</Label>
                <Row gap={"12px"}>
                  <CampTypeButton selected>Banners App Campaign</CampTypeButton>
                  <CampTypeButton>Social Media Campaign</CampTypeButton>
                  <CampTypeButton>SMS Campaign</CampTypeButton>
                  <CampTypeButton>Push notification Campaign</CampTypeButton>
                </Row>
              </InputGrp>
              <InputGrp>
                <Label>Campaign Name</Label>
                <Input type="text" placeholder="Enter Campaign Name" />
              </InputGrp>
              <InputGrp>
                <Label>Campaign Details</Label>
                <TextArea type="text" placeholder="Enter Campaign Details" />
              </InputGrp>
              <InputGrp>
                <Label>Campaign Duration</Label>
                <Input type="text" placeholder="Enter Campaign Duration" />
              </InputGrp>
              <InputGrp>
                <Label>Estimated Campaign Reach</Label>
                <Input
                  type="text"
                  placeholder="Enter Estimated Campaign Reach"
                />
              </InputGrp>
              <Row gap={"12px"}>
                <Value>36k</Value>
                <Text>Estimated Campaign Reach</Text>
              </Row>
              {/* <div
                style={{
                  height: "1px",
                  border: "1px solid #E4E4E4",
                  width: "100%",
                }}
              ></div> */}
              <PrimaryBtn onClick={() => setModal(true)} width={"50%"}>
                Request Campaigne
              </PrimaryBtn>
            </Form>
          </>
        )}
      </Col>
    </Layout>
  );
};

export default RequestNewCampaigneForm;

const Value = styled.span`
  font-family: "GilroyBold";
  font-size: 56px;
  line-height: 28px;
  /* identical to box height, or 50% */

  color: #11142d;
`;

const Text = styled.span`
  font-family: "GilroyRegular";
  font-size: 20px;
  line-height: 28px;
  /* identical to box height, or 140% */

  color: #282a37;
`;

const StepCounter = styled.span`
  color: rgb(13, 153, 255);
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const CampTypeButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 18px 25px;
  padding-right: 45px;
  max-width: 200px;
  height: 100%;
  gap: 10px;
  border-radius: 15px;
  font-family: "GilroySemiBold";
  font-size: 18px;
  color: #282a37;
  border: 1px solid rgba(115, 112, 113, 0.37);
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    css`
      background: #ece856;
    `}
`;
