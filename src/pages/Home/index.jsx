import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
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
import { homeActions } from "../../redux/actions/Home.actions";
import { authActions } from "../../redux/actions/Auth.actions";

const headerOptions = {
  title: "Overview",
  type: "master",
  filter: "dropdown",
};

const Home = () => {
  const [branches, setBranches] = useState([]);

  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);
  const [selectedBranch, setSelectedBranch] = useAtom(homeBranchSelctorAtom);
  const [selectedDate, setselectedDate] = useState({
    fromDate: moment().date(-90).format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
  });
  const [analyticsData, setAnalyticsData] = useState({});
 
 
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

  console.log
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
