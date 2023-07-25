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
import {
  homeBranchSelctorAtom,
  userAtom,
  userTokenAtom,
} from "../../store/Atoms";
import { useAtom } from "jotai";
import axios from "axios";
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
const prevData = [
  {
    name: "40% Off",
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
  const [modal, setModal] = useState(false);

  const [avalibalePartnershipId, setAvalibalePartnershipId] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(11);

  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);
  const [avalibalePartnerships, setAvaliablePartnerShips] = useState([]);
  const [requestedPartnerShips, setRequestedPartnerShips] = useState([]);
  const [currentPartnerShips, setCurrentPartnerShips] = useState([]);

  const onExit = () => {
    setModal(false);
  };

  const handleRequestAvalibaleParternership = (id) => {
    setIsAvalibaleModal(true);
    setAvalibalePartnershipId(id);
  };

  const sliderDataRequests = requestedPartnerShips.map((item) => {
    return PartnershipRequestCard(item, setIsRequestModal);
  });
  const sliderDataCurrent = currentPartnerShips.map((item) => {
    return CurrentPartnerShipsCard(item);
  });

  const sliderDataAvailbalePartnership = avalibalePartnerships.map((item) => {
    return AvailbalePartnershipCard(item, handleRequestAvalibaleParternership);
  });
  const sliderDataPrev = prevData.map((item) => {
    return PrevPartnershipCard(item);
  });

  const getAvalibalePartenerships = () => {
    axios
      .get(`${APIsConstants.BASE_URL}/partnerships/11/available`, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setAvaliablePartnerShips(res.data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  const getRequestedPartenerships = () => {
    axios
      .get(`${APIsConstants.BASE_URL}/partnerships/15/requested`, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setRequestedPartnerShips(res.data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  const getCurrentPartenerships = () => {
    axios
      .get(`${APIsConstants.BASE_URL}/partnerships/15/current`, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setCurrentPartnerShips(res.data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  useEffect(() => {
    getAvalibalePartenerships();
    getCurrentPartenerships();
    getRequestedPartenerships();
  }, []);

  useEffect(() => {
    setSliderController("");
  }, [sliderController]);

  return (
    <Layout>
      {modal && (
        <ModalContainer setOpen={onExit}>
          <SuccessModal mainText={"Your request has been sent Successfully!"} />
        </ModalContainer>
      )}

      <MainTitle>Previous Partnerships</MainTitle>
      <SliderV2 elements={sliderDataPrev} />
      {isRequestModal && (
        <ModalContainer setOpen={setIsRequestModal} show={false}>
          <AcceptForm
            onConfirm={() => setIsRequestModal(false)}
            onCancel={() => setIsRequestModal(false)}
          />
        </ModalContainer>
      )}

      <MainTitle> Requested Partnerships</MainTitle>
      <SliderV2 elements={sliderDataRequests} />
      {/* <Slider data={data} sliderController={sliderController} /> */}
      <Header style={{ fontSize: "22px" }} marginVert={"18px"}>
        Current Partnerships
      </Header>
      <SliderV2 elements={sliderDataCurrent} />
      {isAvalibaleModal && (
        <ModalContainer setOpen={setIsAvalibaleModal} show={false}>
          <RequestOfferModal
            onClose={setIsAvalibaleModal}
            id={avalibalePartnershipId}
            branchId={selectedBranch}
            setModal={setModal}
          />
        </ModalContainer>
      )}
      <MainTitle> Avaliable Partnerships</MainTitle>
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
import { PrevPartnershipCard } from "./PrevPartnershipCard";
import { APIsConstants } from "../../constants/API.constants";
import SuccessModal from "../../components/Shared/SuccessModal";
const AcceptForm = ({ mainText, subText, onConfirm, onCancel }) => {
  return (
    <RootWrapperDeleteConfirmation>
      <ImageContainer>
        <Emoji src={handshake} alt="" />
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

const MainTitle = styled.div`
  font-size: 32px;
  line-height: 40px;
  color: #282a37;
  font-family: GilroyBold;
`;
