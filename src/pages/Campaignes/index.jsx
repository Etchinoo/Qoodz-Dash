import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { Col, Grid, H2, Header, Row } from "../../components/Shared";

import Carousel from "styled-components-carousel";
import { CampaignCardV2 } from "./CampaignCardV2";
import { PrevCampaignCard } from "./PrevCampaignCard";
import { useNavigate } from "react-router-dom";
import { NewBtn, Title } from "../Cashires/FormComponents.styles";
import SliderV2 from "../../components/SliderV2";
import DataTableV2 from "../../components/DataTableV2";
import ModalContainer from "../../components/Modal";
import { PauseCampaignModal } from "./PauseCampaignModal";
import { useState } from "react";
import { useAtom } from "jotai";
import { pauseCampaignAtom } from "../../store/Atoms";

const prevCampaingsData = [
  {
    id: "1",
    name: "Campaign 1",
    type: "Offer",
    status: true,
    start: "12/12/2020",
    end: "12/12/2020",
    redeems: "263",
    newCustomers: "126",
    totalScans: 225,
    returningCustomers: 425,
    archived: true,
  },
];

const data = [
  {
    id: "1",
    name: "Campaign 1",
    type: "Offer",
    status: true,
    start: "12/12/2020",
    end: "12/12/2020",
    redeems: "263",
    newCustomers: "126",
    archived: true,
  },
  // {
  //   id: "2",
  //   name: "Campaign 2",
  //   type: "Gift",
  //   status: false,
  //   start: "12/12/2020",
  //   end: "12/12/2020",
  //   redeems: "163",
  //   newCustomers: "26",
  //   archived: true,
  // },
  // {
  //   id: "3",
  //   name: "Campaign 3",
  //   type: "Gift",
  //   status: false,
  //   start: "12/12/2020",
  //   end: "12/12/2020",
  //   redeems: "163",
  //   newCustomers: "26",
  //   archived: true,
  // },
  // {
  //   id: "4",
  //   name: "Campaign 4",
  //   type: "Gift",
  //   status: false,
  //   start: "12/12/2020",
  //   end: "12/12/2020",
  //   redeems: "163",
  //   newCustomers: "26",
  //   archived: false,
  // },
  // {
  //   id: "5",
  //   name: "Campaign 5",
  //   type: "Gift",
  //   status: false,
  //   start: "12/12/2020",
  //   end: "12/12/2020",
  //   redeems: "163",
  //   newCustomers: "26",
  //   archived: false,
  // },
  // {
  //   id: "6",
  //   name: "Campaign 6",
  //   type: "Offer",
  //   status: true,
  //   start: "12/12/2020",
  //   end: "12/12/2020",
  //   redeems: "163",
  //   newCustomers: "26",
  //   archived: false,
  // },
  // {
  //   id: "7",
  //   name: "Campaign 7",
  //   type: "Offer",
  //   status: true,
  //   start: "12/12/2020",
  //   end: "12/12/2020",
  //   redeems: "163",
  //   newCustomers: "26",
  //   archived: false,
  // },
];

// onClick={() => nav("/campaignes/new")}
const Campaignes = () => {
  const nav = useNavigate();
  const [pauseCampaign, setPauseCampaign] = useAtom(pauseCampaignAtom);

  const sliderData = data.map((item) => {
    return CampaignCardV2(item);
  });

  const preCampaingsSliderData = prevCampaingsData.map((item) => {
    return PrevCampaignCard(item);
  });

  return (
    <Layout>
      <MainTitle>Previous Campaigns</MainTitle>
      <SliderV2 elements={preCampaingsSliderData} />
      {pauseCampaign && (
        <ModalContainer setOpen={setPauseCampaign} show={false}>
          <PauseCampaignModal />
        </ModalContainer>
      )}

      <MainTitle>Ongoing Campaigns</MainTitle>
      <Row gap={50} spread={"space-between"} allignStart="flex-start">
        <Col width={"350"}>
          <SliderV2 elements={sliderData} />
        </Col>
        <Col end>
          <RequestNewOfferButton onClick={() => nav("/campaignes/new")}>
            + Request new campaign
          </RequestNewOfferButton>
        </Col>
      </Row>
    </Layout>
  );
};

export default Campaignes;

const RequestNewOfferButton = styled.div`
  font-size: 24px;
  line-height: 28px;
  color: #0d99ff;
  cursor: pointer;
  z-index: 1111;
`;

const MainTitle = styled.div`
  font-size: 32px;
  line-height: 40px;
  color: #282a37;
  font-family: GilroyBold;
`;
