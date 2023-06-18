import { useEffect, useState } from "react";
import moment from "moment";
import Layout from "../../components/Layout";
import DataTableV2 from "../../components/DataTableV2";
import _data from "../../data/customer_data.json";
import ModalContainer from "../../components/Modal";
import EditBranchForm from "./EditBranchForm";
import AddNewBranchForm from "./AddNewBranchForm";
import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import axios from "axios";
import StatbarV2 from "../../components/StatbarV2";
import "./index.css";

const headerOptions = {
  title: "Branches",
  type: "master",
  AddNew: true,
  addNewText: "+ Request a new Branch",
};

// https://qoodz-api.herokuapp.com/api/branches

const Branches = () => {
  const [newOpen, setNewOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const actionHandler = (action) => {
    if (action.key === "edit") {
      setEditOpen(true);
      setSelectedRow(action.row);
    }
  };

  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [data, setData] = useState();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDate, setSelectedDate] = useState({
    fromDate: moment().date(-90).format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
  });
  const [locations, setLocations] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const [Filters, setFilters] = useState([
    {
      name: "branch",
      label: "Branch",
      type: "Select",
      opt: [
        { value: "dubai", label: "Dubai" },
        { value: "cairo", label: "Cairo" },
      ],
    },
    {
      name: "date",
      label: "Date",
      type: "date",
    },
  ]);

  const GetBranches = async () => {
    axios
      .get(
        `https://qoodz-api.herokuapp.com/api/branches?${
          "startDate=" +
          selectedDate.fromDate +
          "&endDate=" +
          selectedDate.toDate
        }${
          selectedCategory && searchKeyword
            ? `&searchAttribute=${selectedCategory.value}&searchValue=` +
              searchKeyword
            : ""
        }${selectedBranch ? "&branch=" + selectedBranch.label : ""}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
        setBranches(
          res.data.map((ele) => {
            return { value: ele.id, label: ele.name };
          })
        );
      })
      .catch((error) => {
        console.log("error: ", error.response.status);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
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

  useEffect(() => {
    getPartanerAnalytics();
    GetBranches();
    GetLocations();
  }, [selectedBranch, selectedCategory, selectedDate, searchKeyword]);

  const GetLocations = async () => {
    axios
      .get("https://qoodz-api.herokuapp.com/api/locations", {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) =>
        setLocations(
          res.data.map((ele) => {
            return { value: ele.id, label: ele.name };
          })
        )
      )
      .catch((error) => {
        console.log("error: ", error.response.status);
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
  }, [branches]);

  return (
    <Layout header={headerOptions} addNew={() => setNewOpen(true)}>
      {EditOpen && (
        <ModalContainer setOpen={setEditOpen}>
          <EditBranchForm
            id={"1"}
            onCancel={setEditOpen}
            locations={locations}
            selectedRow={selectedRow}
          />
        </ModalContainer>
      )}
      {newOpen && (
        <ModalContainer setOpen={setNewOpen}>
          <AddNewBranchForm locations={locations} />
        </ModalContainer>
      )}
      <StatbarV2 devider={true} analyticsData={analyticsData} />

      <DataTableV2
        data={data}
        columns={columns}
        filters={Filters}
        qkey={"branches"}
        download
        actionHandler={actionHandler}
        searchCategories={searchCategories}
        setSelectedCategory={setSelectedCategory}
        setSearchKeyword={setSearchKeyword}
        setSelectedBranch={setSelectedBranch}
        setSelectedDate={setSelectedDate}
      />
    </Layout>
  );
};

export default Branches;

const columns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "Branch Name",
    key: "name",
    visability: true,
    type: "string",
    link: true,
  },
  {
    name: "Total Cachiers",
    key: "totalCashiers",
    visability: true,
    type: "number",
  },
  {
    name: "Total Redeems",
    key: "totalRedeems",
    visability: true,
    type: "string",
  },
  {
    name: "Total Scans",
    key: "totalScans",
    visability: true,
    type: "number",
  },
  {
    name: "City",
    key: "area",
    visability: true,
    type: "object",
    subKey: "name",
  },
  {
    name: "Edit",
    key: "edit",
    visability: true,
    type: "action",
  },
];

const searchCategories = [
  { label: "name", value: "name" },
  { label: "City", value: "location" },
];
