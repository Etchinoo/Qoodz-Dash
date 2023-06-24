import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import DataTableV2 from "../../components/DataTableV2";
import data from "../../data/offer_data.json";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "../../store/Atoms";

const headerOptions = {
  title: "Offers",
  type: "master",
  AddNew: true,
  addNewText: "+ Request New Offer",
};

const Offers = () => {
  const [selectedDate, setSelectedDate] = useState({
    fromDate: moment().date(-90).format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
  });
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [offers, setOffers] = useState([]);

  const nav = useNavigate();
  const actionHandler = (action) => {
    if (action.key === "edit") console.log("Edit Offer");
  };
  useEffect(() => {
    GetOffers();
  }, [selectedDate, , searchKeyword, selectedCategory,selectedType]);

  const GetOffers = () => {
    console.log(">>>> selectedType ",selectedType)
    axios
      .get(
        `https://qoodz-api.herokuapp.com/api/deals/my-deals?${
          "startDate=" +
          selectedDate.fromDate +
          "&endDate=" +
          selectedDate.toDate
        } ${
          selectedCategory && searchKeyword
            ? `&searchAttribute=${selectedCategory.value}&searchValue=` +
              searchKeyword
            : ""
        }${selectedType ? "&type=" + selectedType : ""}
        `,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) => setOffers(res.data))
      .catch((error) => {
        console.log("error: ", error.response.status);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  return (
    <Layout
      header={headerOptions}
      addNew={() => {
        nav("/offers/new");
      }}
    >
      <DataTableV2
        data={offers}
        columns={columns}
        filters={Filters}
        qkey={"offers"}
        download
        StatusRow={true}
        actionHandler={actionHandler}
        setSelectedDate={setSelectedDate}
        searchCategories={searchCategories}
        setSelectedCategory={setSelectedCategory}
        setSearchKeyword={setSearchKeyword}
        setSelectedType={setSelectedType}
      
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
  {
    name: "type",
    label: "Type",
    type: "Select",
    opt: [
      { value: "discount", label: "Discount" },
      { value: "gift", label: "Gift" },
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
    key: "discountValue",
    visability: true,
    type: "string",
  },
  {
    name: "Start Date",
    key: "startDate",
    visability: true,
    type:"date",
  },
  {
    name: "End Date",
    key: "endDate",
    visability: true,
    type:"date",
  },
  {
    name: "Edit",
    key: "edit",
    visability: true,
    type: "action",
  },
];

const searchCategories = [
  { label: "Name", value: "name" },
];