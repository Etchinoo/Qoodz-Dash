import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { Col, Grid, H2, Header, Row } from "../../components/Shared";
import CampaignCard from "./CampaignCard";
import Carousel from "styled-components-carousel";
import { CampaignCardV2 } from "./CampaignCardV2";
import { useNavigate } from "react-router-dom";
import { NewBtn, Title } from "../Cashires/FormComponents.styles";
import SliderV2 from "../../components/SliderV2";
import DataTableV2 from "../../components/DataTableV2";
import ModalContainer from "../../components/Modal";
import { PauseCampaignModal } from "./PauseCampaignModal";
import { useState } from "react";
import { useAtom } from "jotai";
import { pauseCampaignAtom } from "../../store/Atoms";

const headerOptions = {
  title: "Ongoing Campaignes ",
  type: "master",
  AddNew: true,
  addNewText: "+ Request new campaign",
};

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
  {
    id: "2",
    name: "Campaign 2",
    type: "Gift",
    status: false,
    start: "12/12/2020",
    end: "12/12/2020",
    redeems: "163",
    newCustomers: "26",
    archived: true,
  },
  {
    id: "3",
    name: "Campaign 3",
    type: "Gift",
    status: false,
    start: "12/12/2020",
    end: "12/12/2020",
    redeems: "163",
    newCustomers: "26",
    archived: true,
  },
  {
    id: "4",
    name: "Campaign 4",
    type: "Gift",
    status: false,
    start: "12/12/2020",
    end: "12/12/2020",
    redeems: "163",
    newCustomers: "26",
    archived: false,
  },
  {
    id: "5",
    name: "Campaign 5",
    type: "Gift",
    status: false,
    start: "12/12/2020",
    end: "12/12/2020",
    redeems: "163",
    newCustomers: "26",
    archived: false,
  },
  {
    id: "6",
    name: "Campaign 6",
    type: "Offer",
    status: true,
    start: "12/12/2020",
    end: "12/12/2020",
    redeems: "163",
    newCustomers: "26",
    archived: false,
  },
  {
    id: "7",
    name: "Campaign 7",
    type: "Offer",
    status: true,
    start: "12/12/2020",
    end: "12/12/2020",
    redeems: "163",
    newCustomers: "26",
    archived: false,
  },
];

const columns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "Name",
    key: "name",
    visability: true,
    type: "string",
    // link: true,
  },
  {
    name: "Type",
    key: "type",
    visability: true,
    type: "string",
  },

  {
    name: "Start",
    key: "start",
    visability: true,
    type: "date",
  },
  {
    name: "End",
    key: "end",
    visability: true,
    type: "date",
  },
  {
    name: "Redeems",
    key: "redeems",
    visability: true,
    type: "number",
  },
  {
    name: "New Customers",
    key: "newCustomers",
    visability: true,
    type: "number",
  },
];

// onClick={() => nav("/campaignes/new")}
const Campaignes = () => {
  const nav = useNavigate();
  const [pauseCampaign, setPauseCampaign] = useAtom(pauseCampaignAtom);

  const sliderData = data.map((item) => {
    return CampaignCardV2(item);
  });

  return (
    <Layout header={headerOptions} addNew={() => nav("/campaignes/new")}>
      {pauseCampaign && (
        <ModalContainer setOpen={setPauseCampaign}>
          <PauseCampaignModal />
        </ModalContainer>
      )}

      <SliderV2 elements={sliderData} />
      <H2>Campaign History</H2>
      <DataTableV2
        data={data}
        columns={columns}
        filters={Filters}
        key={"campaignes"}
        searchPlaceholder={"Search name"}
        StatusRow={true}
        // download
        // actionHandler={actionHandler}
      />
    </Layout>
  );
};

export default Campaignes;

const Filters = [
  {
    name: "date",
    label: "Date",
    type: "date",
  },
  {
    name: "type",
    label: "Type",
    type: "Select",
    opt: [
      { value: "gift", label: "Gift" },
      { value: "offer", label: "Offer" },
    ],
  },
];

const RequestNewOfferButton = styled.div`
  font-size: 24px;
  line-height: 28px;
  color: #0d99ff;
  cursor: pointer;
`;