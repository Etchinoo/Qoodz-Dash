import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Tabs from "../../components/Tabs";
import DataTableV2 from "../../components/DataTableV2";
import userImage from "../../assets/userImage.png";
import { BsChevronLeft } from "react-icons/bs";
import { Col, Header, Row } from "../../components/Shared";
import data from "../../data/customer_data.json";
import { useNavigate, useParams } from "react-router-dom";
import BranchDetailsCard from "./BranchDetailsCard";
import { useEffect } from "react";
import { useAtom } from "jotai";
import axios from "axios";
import moment from "moment";
import { SidebarStateAtom, userAtom, userTokenAtom } from "../../store/Atoms";

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
    name: "Cashires",
    key: "cashires",
  },
  {
    name: "Offers",
    key: "offers",
  },
];

const headerOptions = {
  title: "Branch Details",
  type: "detail",
  back: true,
  to: "/branches",
};

// Branch Details
const BranchDetails = () => {
  const { id } = useParams();
  const [active, setActive] = useState(TabsData[0]);
  const [tabData, setTabData] = useState([]);
  const [SidebarState, setSidebarState] = useAtom(SidebarStateAtom);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    fromDate: moment().date(-90).format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
  });

  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);
  const nav = useNavigate();

  const GetTabsData = () => {
    axios
      .get(
        `https://qoodz-api.herokuapp.com/api/branches/${parseInt(id)}/${
          active.key
        }?
        ${
          "startDate=" +
          selectedDate.fromDate +
          "&endDate=" +
          selectedDate.toDate
        }
        ${
          selectedCategory && searchKeyword
            ? `&searchAttribute=${selectedCategory.value}&searchValue=` +
              searchKeyword
            : ""
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) => setTabData(res.data))
      .catch((error) => {
        console.log("error: ", error.response.status);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  useEffect(() => {
    GetTabsData();
  }, [active, selectedCategory, searchKeyword, selectedDate]);

  return (
    <Layout header={headerOptions}>
      <Row gap="rem" style={{ alignItems: "flex-start" }}>
        <TabsContainer>
          <Tabs active={active} setActive={setActive} Tabs={TabsData}>
            <DataTableV2
              data={tabData}
              columns={
                active.key == "scans"
                  ? scansColumns
                  : active.key == "redeems"
                  ? redeemsColumns
                  : active.key == "offers"
                  ? offersColumns
                  : cashiersColumns
              }
              filters={Filters}
              key={"branches"}
              details={true}
              setSearchKeyword={setSearchKeyword}
              searchCategories={
                active.key == "offers"
                  ? offerssearchCategories
                  : searchCategories
              }
              setSelectedCategory={setSelectedCategory}
              setSelectedDate={setSelectedDate}
            />
          </Tabs>
        </TabsContainer>
        <BranchDetailsCard SidebarState={SidebarState} data={tabData} />
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
  {
    name: "daterange",
    label: "DateRange",
    type: "Select",

    opt: [
      {
        value: {
          fromDate: moment().date(-7).format("YYYY-MM-DD"),
          toDate: moment().format("YYYY-MM-DD"),
        },
        label: "Last 7 Days",
      },
      {
        value: {
          fromDate: moment().date(-30).format("YYYY-MM-DD"),
          toDate: moment().format("YYYY-MM-DD"),
        },
        label: "Last 30 Days",
      },
      {
        value: {
          fromDate: moment().date(-365).format("YYYY-MM-DD"),
          toDate: moment().format("YYYY-MM-DD"),
        },
        label: "Last Year",
      },
    ],
  },
];

const searchCategories = [
  { label: "Name", value: "name" },
  { label: "Phone", value: "phoneNumber" },
];
const offerssearchCategories = [{ label: "Name", value: "name" }];

const scansColumns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "Name",
    key: "fullName",
    visability: true,
    type: "string",
  },
  {
    name: "Email",
    key: "email",
    visability: true,
    type: "string",
  },
  {
    name: "Phone",
    key: "phoneNumber",
    visability: true,
    type: "string",
  },

  {
    name: "Branch",
    key: "area",
    subKey: "name",
    visability: true,
    type: "object",
  },
  {
    name: "City",
    key: "location",
    subKey: "name",
    visability: true,
    type: "object",
  },
  {
    name: "Scans",
    key: "numOfScans",
    visability: true,
    type: "string",
  },
  {
    name: "Date",
    key: "date",
    visability: true,
    type: "date",
  },
];

const redeemsColumns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "Name",
    key: "fullName",
    visability: true,
    type: "string",
  },
  {
    name: "Email",
    key: "email",
    visability: true,
    type: "string",
  },
  {
    name: "Phone",
    key: "phoneNumber",
    visability: true,
    type: "string",
  },

  {
    name: "Branch",
    key: "area",
    subKey: "name",
    visability: true,
    type: "object",
  },
  {
    name: "City",
    key: "location",
    subKey: "name",
    visability: true,
    type: "object",
  },
  {
    name: "Redeems",
    key: "numOfRedeems",
    visability: true,
    type: "string",
  },
  {
    name: "Date",
    key: "date",
    visability: true,
    type: "date",
  },
];

const offersColumns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "offer name",
    key: "name",
    visability: true,
    type: "string",
  },
  {
    name: "Offer Details",
    key: "description",
    visability: true,
    type: "string",
  },

  {
    name: "Type",
    key: "offerType",
    visability: true,
    type: "string",
  },
];

const cashiersColumns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "Name",
    key: "fullName",
    visability: true,
    type: "string",
    // link: true,
  },
  {
    name: "Phone",
    key: "phoneNumber",
    visability: true,
    type: "string",
  },
  {
    name: "Branch",
    key: "branch",
    visability: true,
    type: "string",
  },
  {
    name: "Active Hours",
    key: "total_orders",
    visability: true,
    type: "number",
  },
  {
    name: "Scans",
    key: "scans",
    visability: true,
    type: "string",
  },
  {
    name: "Redeems",
    key: "redeems",
    visability: true,
    type: "number",
  },

  {
    name: "Edit",
    key: "edit",
    visability: true,
    type: "action",
  },
];
