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
import ModalContainer from "../../components/Modal";
import { PrimaryBtn } from "../Cashires/FormComponents.styles";
import { RequestOfferModal } from "./RequestOfferModal";

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
  const [isRequestModal, setIsRequestModal] = useState(false);
  const [isAvalibaleModal, setIsAvalibaleModal] = useState(false);

  const sliderDataRequests = data.map((item) => {
    return PartnershipRequestCard(item, setIsRequestModal);
  });
  const sliderDataCurrent = _data.map((item) => {
    return CurrentPartnerShipsCard(item);
  });

  const sliderDataAvailbalePartnership = data.map((item) => {
    return AvailbalePartnershipCard(item, setIsAvalibaleModal);
  });

  useEffect(() => {
    setSliderController("");
  }, [sliderController]);

  return (
    <Layout header={headerOptions}>
      {isRequestModal && (
        <ModalContainer setOpen={setIsRequestModal} show={false}>
          <AcceptForm
            onConfirm={() => setIsRequestModal(false)}
            onCancel={() => setIsRequestModal(false)}
          />
        </ModalContainer>
      )}
     

      <SliderV2 elements={sliderDataRequests} />
      {/* <Slider data={data} sliderController={sliderController} /> */}
      <Header style={{ fontSize: "22px" }} marginVert={"18px"}>
        Current Partnerships
      </Header>
      <SliderV2 elements={sliderDataCurrent} />
      {isAvalibaleModal && (
        <ModalContainer setOpen={setIsAvalibaleModal} show={false}>
          <RequestOfferModal onClose={setIsAvalibaleModal} />
        </ModalContainer>
      )}
      <SliderV2 elements={sliderDataAvailbalePartnership} />
      {/* <DataGrid
        data={data}
        component={AvailbalePartnershipCard}
        filters={chartFilter}
        header={"Available Partnerships"}
      /> */}
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

import handshake from "../../assets/handshake.png";
const AcceptForm = ({ mainText, subText, onConfirm, onCancel }) => {
  return (
    <RootWrapperDeleteConfirmation>
      <ImageContainer>
        <Emoji src={handshake} alt="image of Emoji" />
      </ImageContainer>
      <Col gap="13px">
        <MainText>Are you sure you want to Accept oli’s offer?</MainText>
        <SubText>{subText}</SubText>
      </Col>
      <Col gap="20px">
        <PrimaryBtn danger="true" onClick={onConfirm}>
          Accept
        </PrimaryBtn>
        <PrimaryBtn skelaton onClick={() => onCancel(false)}>
          Cancel
        </PrimaryBtn>
      </Col>
    </RootWrapperDeleteConfirmation>
  );
};

const RootWrapperDeleteConfirmation = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-sizing: border-box;
  padding: 35px;
  /* paddingVert={"120px"} paddingHorz={"20px"} */
`;

const ImageContainer = styled.div`
  background-color: #ece856;
  width: 120px;
  height: 120px;
  border-radius: 120px / 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Emoji = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const MainText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 28px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  text-align: center;
`;

const SubText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  text-align: center;
`;
