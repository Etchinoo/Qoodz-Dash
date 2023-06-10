import styled from "styled-components";
import Layout from "../../components/Layout";
import { Col, Row } from "../../components/Shared";
import { useNavigate } from "react-router-dom";
import offerImage from "../../assets/offerImage.png";
import { PrimaryBtn } from "../Cashires/FormComponents.styles";
import ModalContainer from "../../components/Modal";
import { useState } from "react";
import { PauseOfferForm } from "./PauseOfferFrom";

const headerOptions = {
  title: "Offer Details",
  type: "detail",
  back: true,
};

const OfferDetails = () => {
  const [pauseOffer, setPauseOffer] = useState(false);
  const nav = useNavigate();
  return (
    <Layout header={headerOptions}>
      {pauseOffer && (
        <ModalContainer setOpen={setPauseOffer}>
          <PauseOfferForm />
        </ModalContainer>
      )}
      <Row style={{ alignItems: "flex-start" }} gap={"1rem"}>
        <Row>
          <Col
            style={{ width: "auto" }}
            gap="2rem"
            paddingHorz="2rem"
            paddingVert="2rem"
          >
            <Row gap="1rem">
              <img src={offerImage} alt="" />
              <Col>
                <Title>Buy 1 Get 1</Title>
                <TypeText>Type : Gift</TypeText>
              </Col>
            </Row>
            <StatusCard>
              {/* <IndecatorBlock /> */}
              <Col>
                <StateActive>State: Active</StateActive>
                <Row gap={"13px"}>
                  <DateText>Starting Date -</DateText>
                  <DateText>End Date</DateText>
                </Row>
                <Row gap={"16px"}>
                  <Vector xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.26637 2.65843C6.58982 2.39968 6.64226 1.92771 6.3835 1.60426C6.12475 1.28081 5.65278 1.22837 5.32933 1.48713L2.82933 3.48713C2.50588 3.74589 2.45344 4.21786 2.7122 4.5413C2.97096 4.86475 3.44293 4.91719 3.76637 4.65843L6.26637 2.65843Z"
                      fill="#2D264B"
                    />
                    <path
                      d="M19.2664 1.48713C18.9429 1.22837 18.471 1.28081 18.2122 1.60426C17.9534 1.92771 18.0059 2.39968 18.3293 2.65843L20.8293 4.65843C21.1528 4.91719 21.6247 4.86475 21.8835 4.5413C22.1423 4.21786 22.0898 3.74589 21.7664 3.48713L19.2664 1.48713Z"
                      fill="#2D264B"
                    />
                    <path
                      d="M13.0479 8.82278C13.0479 8.40857 12.7121 8.07278 12.2979 8.07278C11.8836 8.07278 11.5479 8.40857 11.5479 8.82278L11.5479 12.3228C11.5479 13.5654 12.5552 14.5728 13.7979 14.5728H15.2979C15.7121 14.5728 16.0479 14.237 16.0479 13.8228C16.0479 13.4086 15.7121 13.0728 15.2979 13.0728H13.7979C13.3836 13.0728 13.0479 12.737 13.0479 12.3228L13.0479 8.82278Z"
                      fill="#2D264B"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.2979 2.07278C6.36079 2.07278 1.54785 6.88572 1.54785 12.8228C1.54785 18.7598 6.36079 23.5728 12.2979 23.5728C18.2349 23.5728 23.0479 18.7598 23.0479 12.8228C23.0479 6.88572 18.2349 2.07278 12.2979 2.07278ZM3.04785 12.8228C3.04785 7.71415 7.18922 3.57278 12.2979 3.57278C17.4065 3.57278 21.5479 7.71415 21.5479 12.8228C21.5479 17.9314 17.4065 22.0728 12.2979 22.0728C7.18922 22.0728 3.04785 17.9314 3.04785 12.8228Z"
                      fill="#2D264B"
                    />
                  </Vector>
                  <Row gap={"6px"}>
                    <DateValue>10/2/2022 -</DateValue>
                    <DateValue>10/3/2022</DateValue>
                  </Row>
                </Row>
              </Col>
            </StatusCard>
            {/* __________________________________________ */}
            <Col>
              <Row gap={"1rem"}>
                <DateText>Original Price</DateText>
                <DateText>-</DateText>
                <DateText>Final Price</DateText>
              </Row>
              <Row gap={"16px"}>
                <Vector xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1476 10.0693C16.4405 9.77638 16.4405 9.30151 16.1476 9.00862C15.8547 8.71572 15.3799 8.71572 15.087 9.00862L9.43012 14.6655C9.13723 14.9584 9.13723 15.4332 9.43012 15.7261C9.72301 16.019 10.1979 16.019 10.4908 15.7261L16.1476 10.0693Z"
                    fill="#2D264B"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.9604 1.4458C7.02339 1.4458 2.21045 6.25874 2.21045 12.1958C2.21045 18.1329 7.02339 22.9458 12.9604 22.9458C18.8975 22.9458 23.7104 18.1329 23.7104 12.1958C23.7104 6.25874 18.8975 1.4458 12.9604 1.4458ZM3.71045 12.1958C3.71045 7.08717 7.85182 2.9458 12.9604 2.9458C18.0691 2.9458 22.2104 7.08717 22.2104 12.1958C22.2104 17.3044 18.0691 21.4458 12.9604 21.4458C7.85182 21.4458 3.71045 17.3044 3.71045 12.1958Z"
                    fill="#2D264B"
                  />
                  <path
                    d="M8.96045 9.1958C8.96045 9.74809 9.40816 10.1958 9.96045 10.1958C10.5127 10.1958 10.9604 9.74809 10.9604 9.1958C10.9604 8.64352 10.5127 8.1958 9.96045 8.1958C9.40816 8.1958 8.96045 8.64352 8.96045 9.1958Z"
                    fill="#2D264B"
                  />
                  <path
                    d="M14.9604 15.1958C14.9604 15.7481 15.4082 16.1958 15.9604 16.1958C16.5127 16.1958 16.9604 15.7481 16.9604 15.1958C16.9604 14.6435 16.5127 14.1958 15.9604 14.1958C15.4082 14.1958 14.9604 14.6435 14.9604 15.1958Z"
                    fill="#2D264B"
                  />
                </Vector>
                <Row gap="1rem">
                  <DateText>200 EGP</DateText>
                  <DateText>-</DateText>
                  <DateText>200 EGP</DateText>
                </Row>
              </Row>
            </Col>
          </Col>
          <Col style={{ width: "auto", height: "300px" }}>
            <Title>Offer Details</Title>
            <OfferBody>
              Buy 1 and Get 1 on on of the following products from any branch
              <br />
              <ul>
                <li>Margretta Pizza</li>
                <li>Cheesy Pizza</li>
                <li>Milkshake</li>
              </ul>
            </OfferBody>
          </Col>
        </Row>
        <Col gap={"1rem"} paddingVert={"24px"} style={{ maxWidth: "420px" }}>
          <PrimaryBtn onClick={()=>nav("/campaignes/new")}>Start Campaign</PrimaryBtn>
          <PrimaryBtn skelaton onClick={() => setPauseOffer(true)}>
            Pause Offer
          </PrimaryBtn>
        </Col>
      </Row>
    </Layout>
  );
};

export default OfferDetails;

const Title = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 28px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  /* line-height: 40px; */
  text-align: left;
`;

const TypeText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

// const StatusCard = styled.div`
//   padding-left: 1rem;
//   display: flex;
//   justify-content: flex-start;
//   flex-direction: row;
//   align-items: flex-start;
//   flex: none;
//   gap: 31px;
//   box-sizing: border-box;
//   border-left: 10px solid rgb(0, 190, 167);
// `;

const Status = styled.span`
  color: rgb(46, 196, 182);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: Gilroy-Bold, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;

// const DateText = styled.span`
//   color: rgb(40, 42, 55);
//   text-overflow: ellipsis;
//   font-size: 20px;
//   font-family: Gilroy-Medium, sans-serif;
//   font-weight: initial;
//   line-height: 28px;
//   text-align: left;
// `;

//________________________

const StatusCard = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 5px;
  border-left: solid 10px rgb(0, 190, 167);
  box-sizing: border-box;
  padding: 0px 28px;
`;

const StateActive = styled.span`
  color: rgb(46, 196, 182);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const DateText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyMedium, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const DateValue = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const Vector = styled.svg`
  width: 28px;
  height: 28px;
`;

const HiconOutlineTimeCircle6 = styled.div`
  width: 24px;
  height: 24px;
  overflow: hidden;
  position: relative;
`;

// const Vector = styled.svg`
//   width: 22px;
//   height: 22px;
//   position: absolute;
//   left: 0px;
//   top: 0px;
//   right: 0px;
//   bottom: -0px;
// `;

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

const PriceText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: Gilroy-Medium, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;

const HiconOutlineDiscountCircle = styled.div`
  width: 24px;
  height: 24px;
  overflow: hidden;
  position: relative;
`;

const Vector_0001 = styled.svg`
  width: 22px;
  height: 22px;
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;

const ShadowButton = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 10px;
  border: solid 1px rgb(147, 155, 175);
  border-radius: 15px;
  background-color: white;
  box-sizing: border-box;
  padding: 12px 138px;
`;
