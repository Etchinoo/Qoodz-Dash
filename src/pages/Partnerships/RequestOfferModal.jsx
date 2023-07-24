import { useState } from "react";
import styled from "styled-components";
import offerImage from "../../assets/OfferImage 2.png";
import { Col } from "../../components/Shared";
import { PrimaryBtn } from "../Cashires/FormComponents.styles";
import axios from "axios";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import { useAtom } from "jotai";
import { APIsConstants } from "../../constants/API.constants";


export function RequestOfferModal({ onClose, id, branchId, setModal }) {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);


  const handleRequest = () => {
    onClose(false);
    axios
      .post(
        `${APIsConstants.BASE_URL}/partnerships/${Number(
          branchId
        )}/request/${Number(id)}`,
        { dealId: id, branchId: branchId },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setModal(true);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  return (
    <RootWrapperRequestOfferModal>
      <OfferImage src={offerImage} alt="image of OfferImage" />
      <br />
      <Col>
        <Body>
          <AreYouSureYouWantToRequestOffer>
            Are you sure you want to Request offer?
          </AreYouSureYouWantToRequestOffer>
        </Body>
        <br />
        <Col gap={"1rem"}>
          <PrimaryBtn onClick={handleRequest}>Request</PrimaryBtn>
          <PrimaryBtn onClick={() => onClose(false)} skelaton>
            Cancel
          </PrimaryBtn>
        </Col>
      </Col>
    </RootWrapperRequestOfferModal>
  );
}

const RootWrapperRequestOfferModal = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 50px;
  background-color: white;
  box-sizing: border-box;
  padding: 22px 28px;
`;

const OfferImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  flex: none;
  gap: 13px;
  box-sizing: border-box;
`;

const AreYouSureYouWantToRequestOffer = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 28px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;
