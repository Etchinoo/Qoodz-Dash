import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import styled from "styled-components";
import CustomerSegmention from "./CustomerSegmention";
import StatbarV2 from "../../components/StatbarV2";
import CustomerVists from "./CustomerVists";
import { useAtom } from "jotai";
import {
  homeBranchSelctorAtom,
  userAtom,
  userTokenAtom,
} from "../../store/Atoms";
import axios from "axios";
import Charts from "./Charts";
import "./index.css";
import moment from "moment";
const BarChartData = [
  {
    id: "1",
    title: "Scans",
    subTitle: "Dominating areas",
    borderColor: "rgba(178, 178, 255, 0.32)",
    barColor: "#9747FF",
    data: [
      { name: "Dubai", value: 40 },
      { name: "Agman", value: 45 },
      { name: "Abo Dhabi", value: 23 },
      { name: "Dubai2", value: 55 },
    ],
  },
  {
    id: "2",
    title: "Redeems",
    subTitle: "Dominating areas",
    borderColor: "#F9F7C9",
    barColor: "#F6F4AB",
    data: [
      { name: "Dubai", value: 40 },
      { name: "Agman", value: 45 },
      { name: "Abo Dhabi", value: 23 },
      { name: "Dubai2", value: 55 },
    ],
  },
  {
    id: "3",
    title: "Scans",
    subTitle: "Scans categories",
    borderColor: "rgba(93, 148, 255, 0.32)",
    barColor: "#0D99FF",
    data: [
      { name: "Food", value: 40 },
      { name: "Drinks", value: 45 },
      { name: "Games", value: 23 },
      { name: "Music", value: 55 },
    ],
  },
  {
    id: "4",
    title: "Redeemed",
    subTitle: "Redeemed categories",
    borderColor: "rgba(20, 174, 92, 0.3)",
    barColor: "#14AE5C",
    data: [
      { name: "Food", value: 40 },
      { name: "Drinks", value: 45 },
      { name: "Games", value: 23 },
      { name: "Music", value: 55 },
    ],
  },
  {
    id: "5",
    title: "Age Split",
    subTitle: "Age Range Split",
    borderColor: "rgba(255, 117, 76, 0.32)",
    barColor: "#FF754C",
    data: [
      { name: "10-20", value: 40 },
      { name: "20-30", value: 45 },
      { name: "30-40", value: 23 },
      { name: "40-50", value: 55 },
    ],
  },
];

const headerOptions = {
  title: "Overview",
  type: "master",
  filter: "dropdown",
};

const Home = () => {
  const [branches, setBranches] = useState([]);
  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [selectedBranch, setSelectedBranch] = useAtom(homeBranchSelctorAtom);
  const [selectedDate, setselectedDate] = useState({
    fromDate: moment().date(-30).format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
  });
  const [analyticsData, setAnalyticsData] = useState({});

  console;
  const getBranches = async () => {
    try {
      const res = await axios.get(
        "https://qoodz-api.herokuapp.com/api/branches",
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      console.log("res: ", res.data);
      return res.data;
    } catch (error) {
      console.log("error: ", error.response.status);
      if (error.response.status === 401) {
        setToken(null);
        setUser(null);
      }
    }
  };

  const getPartanerAnalytics = () => {
    axios
      .get(
        `https://qoodz-api.herokuapp.com/api/partners?startDate=${selectedDate.fromDate}&endDate=${selectedDate.toDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      )
      .then((res) => setAnalyticsData(res.data))
      .catch((error) => {
        console.log("error: ", error.response.status);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  //A function that creates dropdown options from the branches label is the name and id is the value
  const createOptions = (branches) => {
    const options = branches.map((branch) => {
      return { label: branch.name, value: branch.id };
    });
    return options;
  };

  const onBranchChange = (e) => {
    setSelectedBranch(e);
  };

  useEffect(() => {
    getPartanerAnalytics();
    getBranches().then((res) => {
      setBranches(createOptions(res));
    });
  }, [selectedDate]);

  return (
    <Layout
      header={headerOptions}
      filterOptions={branches}
      filterValue={selectedBranch}
      filterChange={onBranchChange}
      setselectedDate={setselectedDate}
    >
      {analyticsData && (
        <>
          <StatbarV2 devider={true} analyticsData={analyticsData} />
          <Charts analyticsData={analyticsData} />
          <CustomerSegmention analyticsData={analyticsData} />
          <CustomerVists analyticsData={analyticsData} />
        </>
      )}
    </Layout>
  );
};

export default Home;
