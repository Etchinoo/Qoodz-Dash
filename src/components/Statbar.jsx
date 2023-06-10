import React from "react";
import styled from "styled-components";
import { Row } from "./Shared";

const colors = [
  "rgb(151, 71, 255)",
  "rgb(236, 232, 86)",
  "rgb(13, 153, 255)",
  "rgb(255, 162, 192)",
  "rgb(255, 117, 76)",
];

const Data = [
  {
    id: "1",
    value: "36K",
    color: colors[0],
    text: "Registered Cashiers",
  },
  {
    id: "2",
    value: "19k",
    color: colors[1],
    text: "Total Scans",
  },
  {
    id: "3",
    value: "13",
    color: colors[2],
    text: "AVG daily QR codes redeemed",
  },
  {
    id: "4",
    value: "36K",
    color: colors[3],
    text: "Total Redeems",
  },
  {
    id: "5",
    value: "36K",
    color: colors[4],
    text: "AVG daily QR codes Scans",
  },
];

export default function Statbar({ children, devider = false }) {
  return (
    <Container>
      <Row even>
        {Data.map((stat) => (
          <StatCard key={stat.id}>
            <StatValue>
              <Value>{stat.value}</Value>
              <StatBlock color={stat.color} />
            </StatValue>
            <Text>{stat.text}</Text>
          </StatCard>
        ))}
      </Row>
      {devider && <Devider />}
      {children && <Row>{children}</Row>}
    </Container>
  );
}

const Devider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(236, 232, 86);
  padding: 0 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 0 2rem; */
  /* justify-content: space-around; */
  /* justify-content: space-evenly; */
  /* flex-direction: column; */
  /* align-items: center; */
  border: solid 1px rgb(236, 232, 86);
  border-radius: 25px;
  background-color: rgba(249, 247, 201, 0.11);
  box-sizing: border-box;
  padding: 28px 2rem;
  gap: 1rem;
`;

const StatCard = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  /* height: 70px; */
  box-sizing: border-box;
  /* max-width: 190px; */
  /* gap: 1rem; */
`;

const StatValue = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-end;
  flex: none;
  gap: 16px;
  box-sizing: border-box;
`;

const Value = styled.span`
  color: rgb(17, 20, 45);
  text-overflow: ellipsis;
  font-size: 36px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  line-height: 24px;
  text-align: left;
`;

const StatBlock = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color || "transparent"};
  border-radius: 5px;
`;

const Text = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;
