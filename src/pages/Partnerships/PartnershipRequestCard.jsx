import styled, { css } from "styled-components";
import { Col, Row } from "../../components/Shared";
import brandLogo from "../../assets/BrandLogo.png";
import brandBadgeLogo from "../../assets/BrandBadgeLogo.png";

import { useState } from "react";
import { PrimaryBtn } from "../Cashires/FormComponents.styles";
import moment from "moment/moment";

export function PartnershipRequestCard(data, setIsRequestModal) {
  return (
    <>
      <SPartnershipRequestCard key={data.id}>
        <LeftColumn>
          <Col gap={"58px"}>
            <TitleHeader>
              <BrandLogo src={data.deal.offerImage} alt="image of BrandLogo" />
              <Col>
                <OfferName>{data.deal.name}</OfferName>
                <TypeGift>
                  Type :
                  {data.deal.offerType.charAt(0).toUpperCase() +
                    data.deal.offerType.slice(1)}
                </TypeGift>
              </Col>
            </TitleHeader>
            <StatusCard>
              <StateActive>
                State:{" "}
                {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
              </StateActive>
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
                  <DateText>
                    {" "}
                    {moment(data.deal.startDate).format("DD/MM/YYYY")} -
                  </DateText>
                  <DateText>
                    {" "}
                    {moment(data.deal.endDate).format("DD/MM/YYYY")}
                  </DateText>
                </Row>
              </Row>
            </StatusCard>
          </Col>
          <Col gap={"29px"}>
            <Col gap={"9px"}>
              <Row gap={"15px"}>
                <Text>Original Price -</Text>
                <Text>Final Price</Text>
              </Row>
              <Row gap={"10px"}>
                <Vector xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.485 10.6962C15.7779 10.4033 15.7779 9.92846 15.485 9.63557C15.1921 9.34268 14.7173 9.34268 14.4244 9.63557L8.76752 15.2924C8.47463 15.5853 8.47463 16.0602 8.76752 16.3531C9.06041 16.646 9.53529 16.646 9.82818 16.3531L15.485 10.6962Z"
                    fill="#2D264B"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.2979 2.07275C6.36079 2.07275 1.54785 6.88569 1.54785 12.8228C1.54785 18.7598 6.36079 23.5728 12.2979 23.5728C18.2349 23.5728 23.0479 18.7598 23.0479 12.8228C23.0479 6.88569 18.2349 2.07275 12.2979 2.07275ZM3.04785 12.8228C3.04785 7.71412 7.18922 3.57275 12.2979 3.57275C17.4065 3.57275 21.5479 7.71412 21.5479 12.8228C21.5479 17.9314 17.4065 22.0728 12.2979 22.0728C7.18922 22.0728 3.04785 17.9314 3.04785 12.8228Z"
                    fill="#2D264B"
                  />
                  <path
                    d="M8.29785 9.82275C8.29785 10.375 8.74557 10.8228 9.29785 10.8228C9.85014 10.8228 10.2979 10.375 10.2979 9.82275C10.2979 9.27047 9.85014 8.82275 9.29785 8.82275C8.74557 8.82275 8.29785 9.27047 8.29785 9.82275Z"
                    fill="#2D264B"
                  />
                  <path
                    d="M14.2979 15.8228C14.2979 16.375 14.7456 16.8228 15.2979 16.8228C15.8501 16.8228 16.2979 16.375 16.2979 15.8228C16.2979 15.2705 15.8501 14.8228 15.2979 14.8228C14.7456 14.8228 14.2979 15.2705 14.2979 15.8228Z"
                    fill="#2D264B"
                  />
                </Vector>
                <Row gap="20px">
                  <DateText>{data.deal.originalPrice || 0} EGP</DateText>
                  <DateText>-</DateText>
                  <DateText>
                    {data.deal.originalPrice
                      ? data.deal.discountType == "percent"
                        ? data.deal.originalPrice -
                          (data.deal.originalPrice * data.deal.discountValue) /
                            100
                        : data.deal.originalPrice - data.deal.discountValue
                      : 0}{" "}
                    EGP
                  </DateText>
                </Row>
              </Row>
            </Col>
            <BranchName>{data.branch.name}</BranchName>
          </Col>
        </LeftColumn>
        <MidColumn>
          <OfferDetails>Offer Details</OfferDetails>
          <OfferBody>
            {data.deal.description}
            <br />
            <ul>
              <li> Margretta Pizza</li>
              <li> Cheesy Pizza</li>
              <li> Milkshake</li>
            </ul>
          </OfferBody>
        </MidColumn>
        <RightColumn>
          <BtnGrp>
            <PrimaryBtn
              padding={"0px 50px;"}
              onClick={() => setIsRequestModal(true)}
            >
              <Accept>Accept</Accept>
            </PrimaryBtn>
            <PrimaryBtn padding={"0px 50px;"} skelaton>
              <Refuse>Refuse</Refuse>
            </PrimaryBtn>
          </BtnGrp>
          <PartnerBadge>
            <BrandBadgeLogo
              src={brandBadgeLogo}
              alt="image of BrandBadgeLogo"
            />
            <PartnerNamePizzaEgypt>
              Partner name: <br />
              {data.partner.name}
            </PartnerNamePizzaEgypt>
          </PartnerBadge>
        </RightColumn>
      </SPartnershipRequestCard>
    </>
  );
}

const SPartnershipRequestCard = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.9);
  border-radius: 25px;
  background-color: white;
  box-sizing: border-box;
  padding: 38px;
`;

const LeftColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  flex: none;
  gap: 62px;
  box-sizing: border-box;
`;

const TitleHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  flex: none;
  gap: 18px;
  box-sizing: border-box;
`;

const BrandLogo = styled.img`
  width: 62px;
  height: 62px;
  object-fit: cover;
`;

const OfferName = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 22px;
  font-family: GilroyBold, sans-serif;
  /* font-weight: initial; */
  /* line-height: 40px; */
  /* text-align: left; */
`;

const TypeGift = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyRegular, sans-serif;
  /* font-weight: initial; */
  /* line-height: 28px; */
  /* text-align: left; */
`;

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
  font-size: 16px;
  font-family: GilroyRegular;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const Vector = styled.svg`
  width: 28px;
  height: 28px;
`;

const Text = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyMedium, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const OfferValue = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const BranchName = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyMedium, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const MidColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 32px;
  box-sizing: border-box;
`;

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

const RightColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-end;
  flex: none;
  gap: 200px;
  box-sizing: border-box;
`;

const BtnGrp = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 18px;
  box-sizing: border-box;
`;

const PrimBtn = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  border-radius: 15px;
  background-color: rgb(236, 232, 86);
  box-sizing: border-box;
  padding: 12px 128px;
`;

const Accept = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;

const ScondaryBtn = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  border: solid 2px rgb(147, 155, 175);
  border-radius: 15px;
  box-sizing: border-box;
  padding: 12px 126px;
`;

const Refuse = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;

const PartnerBadge = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 22px;
  box-sizing: border-box;
`;

const BrandBadgeLogo = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
`;

const PartnerNamePizzaEgypt = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  line-height: 23px;
  text-align: left;
`;
