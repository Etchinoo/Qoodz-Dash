import Layout from "../../components/Layout";
import DataTableV2 from "../../components/DataTableV2";
import { Col, Header, Row } from "../../components/Shared";
import data from "../../data/offer_data.json";
import { NewBtn } from "../Cashires/FormComponents.styles";
import { useNavigate } from "react-router-dom";

const headerOptions = {
  title: "Offers",
  type: "master",
  AddNew: true,
  addNewText: "+ Request New Offer",
};

const Offers = () => {
  const nav = useNavigate();
  const actionHandler = (action) => {
    if (action.key === "edit") console.log("Edit Offer");
  };
  return (
    <Layout header={headerOptions} addNew={() => {
      nav("/offers/new");
    }}>
     
        <DataTableV2
          data={data}
          columns={columns}
          filters={Filters}
          qkey={"offers"}
          download
          StatusRow={true}
          actionHandler={actionHandler}
        />
    </Layout>
  );
};

export default Offers;

const Filters = [
  {
    name: "date",
    label: "Date",
    type: "date",
  },
  // {
  //   name: "branch",
  //   label: "Type",
  //   type: "Select",
  //   opt: [
  //     { value: "dubai", label: "Dubai" },
  //     { value: "cairo", label: "Cairo" },
  //   ],
  // },
];

const columns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "Offer Name",
    key: "name",
    visability: true,
    type: "string",
    link: true,
  },
  {
    name: "Offer Type",
    key: "offerType",
    visability: true,
    type: "number",
  },
  {
    name: "Percentage",
    key: "percentage",
    visability: true,
    type: "string",
  },
  {
    name: "Orignal Price",
    key: "originalPrice",
    visability: true,
    type: "number",
  },
  {
    name: "Discount Value",
    key: "discountedValue",
    visability: true,
    type: "string",
  },
  {
    name: "Start Date",
    key: "date",
    visability: true,
  },
  {
    name: "End Date",
    key: "expiryDate",
    visability: true,
  },
  {
    name: "Edit",
    key: "edit",
    visability: true,
    type: "action",
  },
];
