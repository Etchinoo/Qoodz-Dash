import Layout from "../../components/Layout";
import DataTableV2 from "../../components/DataTableV2";
import { Col, Header, Row } from "../../components/Shared";
import data from "../../data/customer_data.json";
import Statbar from "../../components/Statbar";
import ModalContainer from "../../components/Modal";
import AddNewCashierForm from "./AddNewCashierForm";
import { useState } from "react";
import EditCashierForm from "./EditCashierForm";
import { NewBtn } from "./FormComponents.styles";

const headerOptions = {
  title: "Cashires",
  type: "master",
  AddNew: true,
  addNewText: "Add New Cashier",
};

const Cashires = () => {
  const [newOpen, setNewOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [cahiers, setCashirs] = useState([]);

  const GetCashires = () => {
    axios
      .get(`https://qoodz-api.herokuapp.com/api/partners/cashiers/all`, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then((res) => setCashirs(res.data))
      .catch((error) => {
        console.log("error: ", error.response.status);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  const actionHandler = (action) => {
    if (action.key === "edit") setEditOpen(true);
  };

  return (
    <Layout header={headerOptions} addNew={() => setNewOpen(true)}>
      {EditOpen && (
        <ModalContainer setOpen={setEditOpen}>
          <EditCashierForm id={"1"} onCancel={setEditOpen} />
        </ModalContainer>
      )}
      {newOpen && (
        <ModalContainer setOpen={setNewOpen}>
          <AddNewCashierForm />
        </ModalContainer>
      )}
      <Statbar />
      <DataTableV2
        data={data}
        columns={columns}
        filters={Filters}
        key={"cashires"}
        searchPlaceholder={"Search by phone number"}
        // download
        actionHandler={actionHandler}
      />
    </Layout>
  );
};

export default Cashires;

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
];

const columns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "Name",
    key: "firstName",
    visability: true,
    type: "string",
    // link: true,
  },
  {
    name: "Phone",
    key: "phone",
    visability: true,
    type: "string",
  },
  {
    name: "Branch",
    key: "city",
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
