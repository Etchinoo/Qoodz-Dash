import Layout from "../../components/Layout";
import DataTableV2 from "../../components/DataTableV2";
import { Col, Header, Row } from "../../components/Shared";
import data from "../../data/customer_data.json";
import Statbar from "../../components/Statbar";
import StatbarV2 from "../../components/StatbarV2";
import ModalContainer from "../../components/Modal";
import AddNewCashierForm from "./AddNewCashierForm";
import { useEffect, useState } from "react";
import EditCashierForm from "./EditCashierForm";
import { NewBtn } from "./FormComponents.styles";
import axios from "axios";
import { useAtom } from "jotai";
import {
  homeBranchSelctorAtom,
  userAtom,
  userTokenAtom,
} from "../../store/Atoms";
import Loader from "../../components/loader";
import moment from "moment";
import "./index.css";

const headerOptions = {
  title: "Cashires",
  type: "master",
  AddNew: true,
  addNewText: "Add New Cashier",
};

const Cashires = () => {
  const [selectedDate, setSelectedDate] = useState({
    fromDate: moment().date(-90).format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
  });
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);
  const [newOpen, setNewOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [cahiers, setCashirs] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const [locations, setLocations] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [Filters, setFilters] = useState([
    {
      name: "date",
      label: "Date",
      type: "date",
    },

    {
      name: "branch",
      label: "Branch",
      type: "Select",
      opt: [
        { value: "dubai", label: "Dubai" },
        { value: "cairo", label: "Cairo" },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetLocations();
    GetCashires();
    GetBranches();
    getPartanerAnalytics();
  }, [selectedDate, selectedBranch, searchKeyword, selectedCategory]);

  const GetCashires = () => {
    setLoading(true);
    axios
      .get(
        `https://qoodz-api.herokuapp.com/api/partners/cashiers/all?${
          "startDate=" +
          selectedDate.fromDate +
          "&endDate=" +
          selectedDate.toDate
        } ${
          selectedCategory && searchKeyword
            ? `&searchAttribute=${selectedCategory.value}&searchValue=` +
              searchKeyword
            : ""
        }${selectedBranch ? "&branch=" + selectedBranch.value : ""}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) => {  setLoading(false); setCashirs(res.data)})
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };
  const GetLocations = async () => {
    setLoading(true);
    axios
      .get("https://qoodz-api.herokuapp.com/api/locations", {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) =>
      {setLoading(false);  setLocations(
          res.data.map((ele) => {
            return { value: ele.id, label: ele.name };
          })
        )}
      )
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };
  const GetBranches = async () => {
    setLoading(true);
    axios
      .get(
        `https://qoodz-api.herokuapp.com/api/branches?${
          "startDate=" +
          selectedDate.fromDate +
          "&endDate=" +
          selectedDate.toDate
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) =>
      {setLoading(false);  setBranches(
          res.data.map((ele) => {
            return { value: ele.id, label: ele.name };
          })
        )}
      )
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };
  const getPartanerAnalytics = () => {
    setLoading(true);
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
      .then((res) => {setLoading(false); setAnalyticsData(res.data)})
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };
  useEffect(() => {
    const Filter = Filters.map((p) =>
      p.name === "branch" ? { ...p, opt: branches } : p
    );
    setFilters(Filter);
  }, [locations]);

  const actionHandler = (action) => {
    if (action.key === "edit") {
      setSelectedRow(action.row);
      setEditOpen(true);
    }
  };

  return (
    <Layout header={headerOptions} addNew={() => setNewOpen(true)}>
       {loading ? <Loader /> : null}
      {EditOpen && (
        <ModalContainer setOpen={setEditOpen}>
          <EditCashierForm
            id={"1"}
            onCancel={setEditOpen}
            selectedRow={selectedRow}
            branches={branches}
            GetCashires={GetCashires}
          />
        </ModalContainer>
      )}
      {newOpen && (
        <ModalContainer setOpen={setNewOpen}>
          <AddNewCashierForm branches={branches} GetCashires={GetCashires} />
        </ModalContainer>
      )}
      <StatbarV2 devider={true} analyticsData={analyticsData?.data}/>
      {cahiers && (
        <DataTableV2
          data={cahiers}
          columns={columns}
          filters={Filters}
          key={"cashires"}
          searchPlaceholder={"Search"}
          download
          actionHandler={actionHandler}
          setSelectedDate={setSelectedDate}
          searchCategories={searchCategories}
          setSelectedCategory={setSelectedCategory}
          setSearchKeyword={setSearchKeyword}
          setSelectedBranch={setSelectedBranch}
        />
      )}
    </Layout>
  );
};

export default Cashires;

const columns = [
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
    key: "activeHours",
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

const searchCategories = [
  { label: "Name", value: "fullName" },
  { label: "Phone", value: "phoneNumber" },
];
