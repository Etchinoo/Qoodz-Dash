import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import styled from "styled-components";
import { Row } from "../Shared";
import axios from "axios";
import {
  homeBranchSelctorAtom,
  userAtom,
  userTokenAtom,
} from "../../store/Atoms";

const colors = [
  "rgb(151, 71, 255)",
  "rgb(236, 232, 86)",
  "rgb(13, 153, 255)",
  "rgb(255, 162, 192)",
  "rgb(255, 117, 76)",
];

export default function StatbarV2({
  children,
  devider = false,
  analyticsData,
}) {
  const [Data, setData] = useState([
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
  ]);

  useEffect(() => {
    Data[0].value = analyticsData?.analytics?.registered_cashiers;
    Data[1].value = analyticsData?.analytics?.total_scans;
    Data[2].value = analyticsData?.analytics?.daily_average_redeems;
    Data[3].value = analyticsData?.analytics?.total_redeems;
    Data[4].value = analyticsData?.analytics?.daily_average_scans;
    setData(Data);
  }, [analyticsData]);
  
  return (
    <Container>
      <Row spread>
        {Data.map((stat, index) => (
          <>
            <StatCard key={stat.id}>
              <StatValue>
                <Value>{stat.value}</Value>
                <StatBlock color={stat.color} />
              </StatValue>
              <Text>{stat.text}</Text>
            </StatCard>
            {index < Data.length - 1 ? <VertDevider /> : null}
          </>
        ))}
      </Row>
      {/* {devider && <Devider />} */}
      {children && <Row>{children}</Row>}
    </Container>
  );
}

const Devider = styled.div`
  width: 100%;
  height: 1px;
  /* background-color: rgb(236, 232, 86); */
  background-color: #e5e5e5;

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
  height: 108px;
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
  gap: 8px;
  box-sizing: border-box;
`;

const Value = styled.span`
  color: rgb(17, 20, 45);
  text-overflow: ellipsis;
  font-size: 32px;
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
  font-size: 16px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
  width: 66%;
`;

const VertDevider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #e4e4e4;
  margin: 0 0.5rem;
`;
