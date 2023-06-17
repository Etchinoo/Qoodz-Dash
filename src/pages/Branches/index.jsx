import Layout from "../../components/Layout";
import DataTableV2 from "../../components/DataTableV2";
import { Col, Header } from "../../components/Shared";
import _data from "../../data/customer_data.json";
import ModalContainer from "../../components/Modal";
import { useEffect, useState } from "react";
import EditBranchForm from "./EditBranchForm";
import AddNewBranchForm from "./AddNewBranchForm";
import Statbar from "../../components/Statbar";
import { NewBtn } from "../Cashires/FormComponents.styles";
import LineChart from "../../components/LineChart";
import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import axios from "axios";

const headerOptions = {
  title: "Branches",
  type: "master",
  AddNew: true,
  addNewText: "+ Add New Branch",
};

// https://qoodz-api.herokuapp.com/api/branches

const Branches = () => {
  const [newOpen, setNewOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);

  const actionHandler = (action) => {
    if (action.key === "edit") setEditOpen(true);
  };

  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [data, setData] = useState();

  const getBranches = async () => {
    try {
      const res = await axios.get(
        "https://qoodz-api.herokuapp.com/api/branches",
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      );
      // console.log("res: ", res.data);
      return res.data;
    } catch (error) {
      console.log("error: ", error);
      if (error.response.status === 401) {
        setToken(null);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    getBranches().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <Layout header={headerOptions} addNew={() => setNewOpen(true)}>
      {EditOpen && (
        <ModalContainer setOpen={setEditOpen}>
          <EditBranchForm id={"1"} onCancel={setEditOpen} />
        </ModalContainer>
      )}
      {newOpen && (
        <ModalContainer setOpen={setNewOpen}>
          <AddNewBranchForm />
        </ModalContainer>
      )}
      <Statbar devider>
        <LineChart filters={chartFilter} />
      </Statbar>
      <DataTableV2
        data={data}
        columns={columns}
        filters={Filters}
        qkey={"branches"}
        download
        actionHandler={actionHandler}
      />
    </Layout>
  );
};

export default Branches;

const Filters = [
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
  {
    name: "city",
    label: "City",
    type: "Select",
    opt: [
      { value: "dubai", label: "Dubai" },
      { value: "cairo", label: "Cairo" },
    ],
  },
];

const chartFilter = [
  {
    name: "date",
    label: "Date",
    type: "date",
  },
  {
    name: "branch",
    label: "All",
    type: "Select",
    opt: [
      { value: "dubai", label: "Dubai" },
      { value: "cairo", label: "Cairo" },
    ],
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
