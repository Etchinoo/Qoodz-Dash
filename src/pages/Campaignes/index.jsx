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
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { pauseCampaignAtom } from "../../store/Atoms";
import axios from "axios";
import { APIsConstants } from "../../constants/API.constants";
import {
  homeBranchSelctorAtom,
  userAtom,
  userTokenAtom,
} from "../../store/Atoms";
import Loader from "../../components/loader";

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
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);

  const [activeCampaignsData, setActiveCampaignsData] = useState(null);
  const [pauseCampaign, setPauseCampaign] = useAtom(pauseCampaignAtom);
  const [campaignState, setCampaignState] = useState();
  const [showMore, setShowMore] = useState(false);
  const [pausedId, setPausedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const preCampaingsSliderData = prevCampaingsData.map((item) => {
    return PrevCampaignCard(item);
  });

  const getActiveCampaigns = () => {
    setLoading(true);
    axios
      .get(`${APIsConstants.BASE_URL}/campaigns/status/active`, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setActiveCampaignsData(res.data);
      })
      .catch((error) => {
        setLoading(false);
        if (error?.response?.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };
  useEffect(() => {
    getActiveCampaigns();
  }, []);

  const updateActiveCampaignsState = (status, id) => {
    setPausedId(id)
    setPauseCampaign(true);
    setActiveCampaignsData(
      activeCampaignsData.filter((ele) =>
        ele.id == id
          ? {
              ...ele,
              status: campaignState,
            }
          : { ...ele }
      )
    );

    setCampaignState(status);
  };

  return (
    <Layout>
       {loading ? <Loader /> : null}
      <MainTitle>Previous Campaigns</MainTitle>
      <SliderV2 elements={preCampaingsSliderData} />
      {pauseCampaign && (
        <ModalContainer setOpen={setPauseCampaign} show={false}>
          <PauseCampaignModal id={pausedId} getActiveCampaigns={getActiveCampaigns}/>
        </ModalContainer>
      )}

      <MainTitle>Ongoing Campaigns</MainTitle>

      <RequestNewOfferButton onClick={() => nav("/campaignes/new")}>
        + Request new campaign
      </RequestNewOfferButton>

      <SliderV2
        elements={activeCampaignsData?.map((item) =>
          CampaignCardV2(item, updateActiveCampaignsState)
        )}
      />
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
  justify-content: end;
  display: flex;
`;

const MainTitle = styled.div`
  font-size: 32px;
  line-height: 40px;
  color: #282a37;
  font-family: GilroyBold;
`;
