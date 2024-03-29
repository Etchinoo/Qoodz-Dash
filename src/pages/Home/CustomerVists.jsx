import { Col, Row } from "../../components/Shared";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { BiLeftDownArrowCircle } from "react-icons/bi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const CustomerVists = ({ analyticsData }) => {
  const [open, setOpen] = useState(true);

  let total = analyticsData?.analytics?.customer_categories
    ?.map((obj) => +obj.count)
    .reduce((accumulator, current) => accumulator + current, 0);
  return (
    <Container>
      <Row spread>
        <Title>Customer Visits</Title>
        <OpenBtn active={open} onClick={() => setOpen(!open)}>
          {/* <OpenIcon size={28} active={open} /> */}
          <span>{!open ? "See More" : "See Less"}</span>
          {open ? <FaAngleUp /> : <FaAngleDown />}
        </OpenBtn>
      </Row>
      {open && <HorzDevider />}
      {open && (
        <Col marginVert={"1rem"}>
          <Row
            gap={"2rem"}
            style={{ justifyContent: "flex-start" }}
            width={"45%"}
          >
            <Row>
              {analyticsData?.analytics?.customer_categories?.map(
                (ele, index) => (
                  <>
                    <Col>
                      <Row gap={"16px"}>
                        <StatBlock
                          color={
                            ele.category === "new_customers"
                              ? "#00BEA7"
                              : "#E1E1FB"
                          }
                        />
                        <StatTitle>
                          {ele.category === "new_customers"
                            ? "Returning Customers"
                            : "New Customers"}
                        </StatTitle>
                      </Row>
                      <StatValue>{ele.count}</StatValue>
                    </Col>
                    {!(
                      index ===
                      analyticsData?.analytics?.customer_categories?.length - 1
                    ) && <VertDevider />}
                  </>
                )
              )}
            </Row>
          </Row>
          {total > 0 && (
            <Row>
              <ProgressBar
                percent={
                  (analyticsData?.analytics?.customer_categories[0].count /
                    total) *
                  100
                }
              />
            </Row>
          )}
        </Col>
      )}
    </Container>
  );
};

export default CustomerVists;

const ProgressBar = styled.div`
  width: 100%;
  height: 32px;
  background-color: #e1e1fb;
  border-radius: 10px 10px 0px 0px;
  position: relative;
  margin-top: 1rem;
  ${({ percent }) => css`
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: ${percent}%;
      height: 100%;
      background-color: #00bea7;
      border-radius: 4px;
    }
  `}
`;

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
  span {
    font-family: GilroyMedium;
    font-size: 20px;
    /* margin-left: 8px; */
  }
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

const HorzDevider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin: 1rem 0;
`;
const VertDevider = styled.div`
  width: 2px;
  height: 105px;
  background-color: #dedede;
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

const StatBlock = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;
