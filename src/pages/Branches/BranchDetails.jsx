import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Tabs from "../../components/Tabs";
import DataTableV2 from "../../components/DataTableV2";
import userImage from "../../assets/userImage.png";
import { BsChevronLeft } from "react-icons/bs";
import { Col, Header, Row } from "../../components/Shared";
import data from "../../data/customer_data.json";
import { useNavigate } from "react-router-dom";
import BranchDetailsCard from "./BranchDetailsCard";

const TabsData = [
  {
    name: "Scans",
    key: "scans",
  },
  {
    name: "Redeems",
    key: "redeems",
  },
  {
    name: "Cashiers",
    key: "redeems",
  },
  {
    name: "Offers",
    key: "redeems",
  },
];

const headerOptions = {
  title: "Branch Details",
  type: "detail",
  back: true,
};

// Branch Details
const BranchDetails = () => {
  const [active, setActive] = useState(TabsData[0]);
  const nav = useNavigate();
  return (
    <Layout header={headerOptions}>
      <Row gap="rem" style={{ alignItems: "flex-start" }}>
        <TabsContainer>
          <Tabs active={active} setActive={setActive} Tabs={TabsData}>
            {active.key === "scans" ? (
              <>
                <DataTableV2
                  data={data}
                  columns={columns}
                  filters={Filters}
                  key={"customers"}
                  // download
                />
              </>
            ) : (
              <>
                <DataTableV2
                  data={data}
                  columns={columns}
                  filters={Filters}
                  key={"customers"}
                  // download
                />
              </>
            )}
          </Tabs>
        </TabsContainer>
        <BranchDetailsCard />
      </Row>
    </Layout>
  );
};

export default BranchDetails;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.89);
  border-radius: 25px;
  flex: 2;
`;

const Filters = [
  {
    name: "date",
    label: "Date",
    type: "date",
  },
];

const columns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "Area",
    key: "area",
    visability: true,
    type: "string",
  },
  {
    name: "City",
    key: "city",
    visability: true,
    type: "string",
  },
  {
    name: "Scans",
    key: "scans",
    visability: true,
    type: "string",
  },
  {
    name: "Date",
    key: "date",
    visability: true,
    type: "string",
  },
];
