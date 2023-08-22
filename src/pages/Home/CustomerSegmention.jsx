import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Col, Row } from "../../components/Shared";
import HorzBarChart from "../../components/HorzBarChart";
import DounughtChart from "../../components/DounughtChart";
import { BiLeftDownArrowCircle } from "react-icons/bi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useEffect } from "react";

const CustomerSegmention = ({ analyticsData }) => {
  const [open, setOpen] = useState(true);
  const [chartDate, setChartData] = useState(null); 
  useEffect(() => {
    if (analyticsData?.analytics?.age_ranges.length > 0)
      setChartData([...analyticsData?.analytics?.age_ranges]);
  }, [analyticsData]);
  return (
    chartDate && (
      <Container>
        <Row>
          <Col>
            <Title>Customer Segment</Title>
            <SubTitle>
              Your most active segment are Males ages from 18 to 24
            </SubTitle>
          </Col>
          <OpenBtn active={open} onClick={() => setOpen(!open)}>
            <span>{!open ? "See More" : "See Less"}</span>
            {open ? <FaAngleUp /> : <FaAngleDown />}
          </OpenBtn>
        </Row>
        {open && (
          <Col>
            <BarContainer>
              <HorzBarChart age_ranges={chartDate} />
            </BarContainer>

            <HorzDevider />
            <DoughnutContainer>
              <StatTitle>Gender Split</StatTitle>
              <DounughtChartContainer>
                <Row
                  gap={"3rem"}
                  style={{
                    justifyContent: "flex-start",
                    background: "#fff",
                    padding: 8,
                  }}
                >
                  <DounughtChart />
                  <StatArea>
                    <StatContainer>
                      <Row gap={"16px"}>
                        <StatBlock color={"#9747FF"} />
                        <StatTitle>
                          {analyticsData?.analytics?.male_to_female[0].gender}
                        </StatTitle>
                      </Row>
                      <StatValue>
                        {analyticsData?.analytics?.male_to_female[0].count} (
                        {Math.round(
                          (analyticsData?.analytics?.male_to_female[0].count *
                            100) /
                            (+analyticsData?.analytics?.male_to_female[0]
                              .count +
                              +analyticsData?.analytics?.male_to_female[1]
                                .count)
                        )}
                        %)
                      </StatValue>
                      <Col>
                        <AvgTicketSize>AVG Transaction Size</AvgTicketSize>
                        <TransactionValue>{analyticsData?.analytics?.male_to_female[0].avg_transaction_size}</TransactionValue>
                      </Col>
                    </StatContainer>
                    <VertDevider />
                    <StatContainer>
                      <Row gap={"16px"}>
                        <StatBlock color={"#AEDDEB"} />
                        <StatTitle>
                          {analyticsData?.analytics?.male_to_female[1].gender}
                        </StatTitle>
                      </Row>
                      <StatValue>
                        {" "}
                        {analyticsData?.analytics?.male_to_female[1].count} (
                        {Math.round(
                          (analyticsData?.analytics?.male_to_female[1].count *
                            100) /
                            (+analyticsData?.analytics?.male_to_female[0]
                              .count +
                              +analyticsData?.analytics?.male_to_female[1]
                                .count)
                        )}
                        %)
                      </StatValue>
                      <Col>
                        <AvgTicketSize>AVG Transaction Size</AvgTicketSize>
                        <TransactionValue>{analyticsData?.analytics?.male_to_female[1].avg_transaction_size}</TransactionValue>
                      </Col>
                    </StatContainer>
                  </StatArea>
                </Row>
              </DounughtChartContainer>
            </DoughnutContainer>
          </Col>
        )}
        <HorzDevider />
      </Container>
    )
  );
};

export default CustomerSegmention;

const OpenBtn = styled.button`
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 200px;
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
  font-family: GilroyMedium;
  font-size: 20px;
  /* margin-left: 8px; */
`;

const OpenIcon = styled(BiLeftDownArrowCircle)`
  transition: all 0.3s ease;
  ${({ active }) =>
    active &&
    css`
      transform: rotate(180deg);
    `}
`;

const Container = styled.div`
  width: 100%;
`;
const Title = styled.div`
  font-family: GilroyBold;
  font-size: 24px;
`;
const SubTitle = styled.span`
  font-family: GilroyMedium;
  font-size: 16px;
`;

const HorzDevider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin: 1rem 0;
`;

const VertDevider = styled.div`
  width: 2px;
  height: 200px;
  background-color: #e5e5e5;
  margin: 0 1rem;
`;

const StatTitle = styled.div`
  font-family: GilroyMedium;
  font-size: 20px;
  color: #282a37;
`;
const StatValue = styled.div`
  font-family: GilroyBold;
  font-size: 24px;
  color: #282a37;
`;

const DoughnutContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  /* background-color: #ffebf6; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  gap: 1rem;
  /* background-color: #ffebf6; */
  /* align-items: center; */
`;

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
  gap: 1rem;
  /* align-items: center; */
  /* width: 100%; */
  height: 100%;
  /* background-color: red; */
`;

const StatBlock = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

const AvgTicketSize = styled.div`
  font-family: GilroyMedium;
  font-size: 14px;
  color: #282a37;
`;

const TransactionValue = styled.div`
  font-family: GilroyBold;
  font-size: 20px;
  color: #282a37;
`;

const ResponsiveContainer = styled.div`
  display: flex;
  /* background: ${(props) => props.background || "red"}; */
  justify-content: ${(props) => (props.spread ? "space-between" : null)};
  align-items: center;
  width: 100%;
  gap: ${(props) => props.gap || "0"};
  transition: all 0.3s ease;
  ${({ active }) =>
    !active &&
    css`
      display: none;
    `}
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const StatArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  gap: ${(props) => props.gap || "0"};
  gap: 2rem;
`;

const BarContainer = styled.div`
  background: rgba(93, 148, 255, 0.32);
  border-radius: 25px;
  padding: 26px 25px;
`;

const DounughtChartContainer = styled.div`
  background: #ffebf6;
  border-radius: 25px;
  padding: 26px 25px;
`;
