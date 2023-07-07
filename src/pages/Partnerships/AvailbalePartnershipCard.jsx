import { useState } from "react";
import styled from "styled-components";
import offerImage from "../../assets/OfferImage 2.png";
import partnerImage from "../../assets/PartnerImage2.png";
import ModalContainer from "../../components/Modal";
import { Col } from "../../components/Shared";
import { PrimaryBtn } from "../Cashires/FormComponents.styles";

export function AvailbalePartnershipCard(data,setIsAvalibaleModal) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <SAvailbalePartnershipCard>
    
      <Header>
        <OfferImage src={offerImage} alt="image of OfferImage" />
        <Col gap={"5px"}>
          <OfferNameText>Buy 1 Get 1</OfferNameText>
          <OfferTypeText>Type : Discount</OfferTypeText>
        </Col>
      </Header>
      <Col>
        <OfferDetails>Offer Details</OfferDetails>
        <OfferBody>
          Buy 1 and Get 1 on on of the following products from any branch
          <br />
          <ul>
            <li> Margretta Pizza</li>
            <li> Cheesy Pizza</li>
            <li> Milkshake</li>
          </ul>
        </OfferBody>
      </Col>
      <Footer>
        <PartnerImageContainer
          src={partnerImage}
          alt="image of PartnerImageContainer"
        />
        <PartnerName>
          Partner name: <br />
          <b>Oli Egypt</b>
        </PartnerName>
      </Footer>
      <PrimaryBtn
        onClick={() => {
          setIsAvalibaleModal(true);
        }}
      >
        Request
      </PrimaryBtn>
    </SAvailbalePartnershipCard>
  );
}

const OfferDetails = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 22px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  /* line-height: 40px; */
  text-align: left;
`;

const OfferBody = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
  width: 320px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  flex: none;
  gap: 26px;
  box-sizing: border-box;
`;

const OfferImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const OfferNameText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 28px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;

const OfferTypeText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;
const SAvailbalePartnershipCard = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 41px;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.9);
  border-radius: 25px;
  background-color: white;
  box-sizing: border-box;
  padding: 32px 46px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 25px;
  box-sizing: border-box;
`;

const PartnerImageContainer = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
`;

const PartnerName = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  line-height: 23px;
  text-align: left;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 25px;
  box-sizing: border-box;
`;

const PartnerImage = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
`;

const PartnerNameKfcEgypt = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: Gilroy-Regular, sans-serif;
  font-weight: initial;
  line-height: 23px;
  text-align: left;
`;

const PrimBtn = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  flex: none;
  gap: 10px;
  border-radius: 15px;
  background-color: rgb(236, 232, 86);
  box-sizing: border-box;
  padding: 13px 132px;
`;

const Request = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: Gilroy-Bold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;
