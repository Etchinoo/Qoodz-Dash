import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { BiLeftDownArrowCircle } from "react-icons/bi";
import styled, { css } from "styled-components";
import ModalContainer from "../../components/Modal";
import { Col, Row } from "../../components/Shared";
import ToggleSwitch from "../../components/ToggleSwitch";
import { pauseCampaignAtom } from "../../store/Atoms";
import { PauseCampaignModal } from "./PauseCampaignModal";
export function CampaignCardV2(data) {
  // const [openModal, setOpenModal] = useState(false);
  const [campaignState, setCampaignState] = useState(data.status);
  const [showMore, setShowMore] = useState(false);
  const [pauseCampaign, setPauseCampaign] = useAtom(pauseCampaignAtom);

  const onToggle = (state) => {
    console.log(state);
    if (campaignState === true && state === false) {
      setPauseCampaign(true);
    }
  };

  return (
    <RootWrapperCampaignCard>
      <Col gap={"20px"}>
        <Row spread>
          <Title>
            <CampaignName>{data.name}</CampaignName>
            <CampaignType>Type : {data.type}</CampaignType>
          </Title>
          <ToggleSwitch value={campaignState} onChange={onToggle} />
        </Row>
        <Row spread>
          <StatusCard status={data.status}>
            {/* <IndecatorBlock /> */}
            <Col>
              <StateActive status={data.status}>
                Status: {data.status ? "Acitve" : "Paused"}
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.2979 2.07278C6.36079 2.07278 1.54785 6.88572 1.54785 12.8228C1.54785 18.7598 6.36079 23.5728 12.2979 23.5728C18.2349 23.5728 23.0479 18.7598 23.0479 12.8228C23.0479 6.88572 18.2349 2.07278 12.2979 2.07278ZM3.04785 12.8228C3.04785 7.71415 7.18922 3.57278 12.2979 3.57278C17.4065 3.57278 21.5479 7.71415 21.5479 12.8228C21.5479 17.9314 17.4065 22.0728 12.2979 22.0728C7.18922 22.0728 3.04785 17.9314 3.04785 12.8228Z"
                    fill="#2D264B"
                  />
                </Vector>
                <Row gap={"6px"}>
                  <DateValue>{data.start} -</DateValue>
                  <DateValue>{data.end}</DateValue>
                </Row>
              </Row>
            </Col>
          </StatusCard>
        </Row>
        <Col>
          {/* <Row> */}
          <H1>Campaign Perfomance</H1>
          {/* </Row> */}
          <Row allignBottom>
            <Col>
              <DateText>
                <b>{data.redeems}</b> Redeems
              </DateText>
              <DateText>
                {" "}
                <b>{data.newCustomers}</b> New Customers
              </DateText>
            </Col>
            <ShowMoreBtn onClick={() => setShowMore(!showMore)}>
              <ShowMoreIcon active={showMore} />
              <span>Show More</span>
            </ShowMoreBtn>
          </Row>
        </Col>
      </Col>
      {showMore && (
        <Col>
          <H1>Campaign Details</H1>
          <BodyText>
            Buy 1 and Get 1 on on of the following products from any branch
            <br />
            <ul>
              <li>Margretta Pizza</li>
              <li>Cheesy Pizza</li>
              <li>Milkshake</li>
            </ul>
            <br />
          </BodyText>
        </Col>
      )}
    </RootWrapperCampaignCard>
  );
}

const ShowMoreBtn = styled.button`
  width: 164px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  background-color: rgb(247, 247, 252);
  color: rgb(147, 155, 175);
  cursor: pointer;
  gap: 1rem;
  span {
    font-family: GilroyMedium;
    font-size: 16px;
    /* margin-left: 8px; */
  }
`;

const ShowMoreIcon = styled(BiLeftDownArrowCircle)`
  transition: all 0.3s ease;
  ${({ active }) =>
    active &&
    css`
      transform: rotate(180deg);
    `}
`;

const RootWrapperCampaignCard = styled.div`
  display: flex;
  justify-content: flex-start;
  /* flex-direction: column; */
  align-items: flex-start;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.9);
  border-radius: 25px;
  background-color: white;
  box-sizing: border-box;
  padding: 16px 34px;
  margin-bottom: 8px;
  margin-left: 8px;
  gap: 2rem;
  /* max-width: 480px; */
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  /* gap: 5px; */
  box-sizing: border-box;
`;

const CampaignName = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  /* line-height: 40px; */
  text-align: left;
`;

const CampaignType = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const StatusCard = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 5px;
  border-left: solid 10px
    ${({ status }) => (status === true ? "rgb(0, 190, 167)" : "#b3b3b3")};
  box-sizing: border-box;
  padding: 0px 28px;
`;

const StateActive = styled.span`
  color: ${({ status }) => (status === true ? "rgb(0, 190, 167)" : "#b3b3b3")};
  text-overflow: ellipsis;
  font-size: 16px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const DateText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 16px;
  font-family: GilroyMedium, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const DateValue = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 16px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
  text-align: left;
`;

const Vector = styled.svg`
  width: 28px;
  height: 28px;
`;

const H1 = styled.div`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  /* line-height: 40px; */
  text-align: left;
  width: 100%;
`;

const BodyText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
  width: 450px;
`;
