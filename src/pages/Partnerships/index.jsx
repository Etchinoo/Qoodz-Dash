import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DataGrid from "../../components/DataGrid";
import Layout from "../../components/Layout";
import { Col, Header, Row } from "../../components/Shared";
import Slider from "../../components/Slider";
import SliderV2 from "../../components/SliderV2";
import { AvailbalePartnershipCard } from "./AvailbalePartnershipCard";
import { CurrentPartnerShipsCard } from "./CurrentPartnerShipsCard";
import { PartnershipRequestCard } from "./PartnershipRequestCard";

const data = [
  {
    name: "Buy 1 Get 1 Free",
  },
  {
    name: "40% Off",
  },
  {
    name: "2 for 1",
  },
  {
    name: "Free Delivery",
  },
  {
    name: "Freinds & Family",
  },
  {
    name: "Super Pack",
  },
];

const _data = [
  {
    id: "1",
    name: "Buy 1 Get 1 Free",
  },
  {
    id: "2",
    name: "40% Off",
  },
  {
    id: "3",
    name: "2 for 1",
  },
  {
    id: "4",
    name: "Free Delivery",
  },
  {
    id: "5",
    name: "Freinds & Family",
  },
  {
    id: "6",
    name: "Super Pack",
  },
];

const Arrows = styled.button`
  width: 58.25px;
  height: 58.25px;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  box-shadow: 1px 4px 17px #ededff;
  font-size: 2rem;
  cursor: pointer;
`;
const headerOptions = {
  title: "Requested Partnerships",
  type: "master",
};

const Partneships = () => {
  const [sliderController, setSliderController] = useState();
  const sliderDataRequests = data.map((item) => {
    return PartnershipRequestCard(item);
  });
  const sliderDataCurrent = _data.map((item) => {
    return CurrentPartnerShipsCard(item);
  });

  useEffect(() => {
    setSliderController("");
  }, [sliderController]);

  return (
    <Layout header={headerOptions}>
      <SliderV2 elements={sliderDataRequests} />
      {/* <Slider data={data} sliderController={sliderController} /> */}
      <Header style={{ fontSize: "22px" }} marginVert={"18px"}>
        Current Partnerships
      </Header>
      <SliderV2 elements={sliderDataCurrent} />

      <DataGrid
        data={data}
        component={AvailbalePartnershipCard}
        filters={chartFilter}
        header={"Available Partnerships"}
      />
    </Layout>
  );
};

export default Partneships;

const chartFilter = [
  {
    name: "date",
    label: "Date",
    type: "date",
  },
  {
    name: "branch",
    label: "All",
    type: "Select",
    opt: [
      { value: "dubai", label: "Dubai" },
      { value: "cairo", label: "Cairo" },
    ],
  },
];
