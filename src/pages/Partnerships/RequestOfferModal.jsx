import styled from "styled-components";
import offerImage from "../../assets/OfferImage 2.png";
import { Col } from "../../components/Shared";
import { PrimaryBtn } from "../Cashires/FormComponents.styles";

export function RequestOfferModal({ onClose }) {
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
          <PrimaryBtn onClick={() => onClose(false)}>Request</PrimaryBtn>
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
  gap: 66px;
  border-radius: 50px;
  background-color: white;
  box-sizing: border-box;
  padding: 32px 28px;
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
