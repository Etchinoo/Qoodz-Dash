import Layout from "../../components/Layout";
import DataTableV2 from "../../components/DataTableV2";
import { Col, Header } from "../../components/Shared";
import moment from "moment";
import _data from "../../data/customer_data.json";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader";

const headerOptions = {
  title: "Customers",
  type: "master",
};

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [locations, setLocations] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    fromDate: moment().date(-90).format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [Filters, setFilters] = useState([
    {
      name: "date",
      label: "Date",
      type: "date",
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
    {
      name: "gender",
      label: "Gender",
      type: "Select",
      opt: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
  ]);
  const dispatch = useDispatch();
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);

  const GetCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://qoodz-api.herokuapp.com/api/partners/3/customers?${
          "startDate=" +
          selectedDate.fromDate +
          "&endDate=" +
          selectedDate.toDate
        }${
          selectedCategory && searchKeyword
            ? `&searchAttribute=${selectedCategory.value}&searchValue=` +
              searchKeyword
            : ""
        }${selectedGender ? "&gender=" + selectedGender.value : ""}${
          selectedCity ? "&location=" + selectedCity.value : ""
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false)
      console.log("error: ", error.response.status);
      if (error.response.status === 401) {
        setToken(null);
        setUser(null);
      }
    }
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
      .then((res) => {
        setLoading(false);
        setLocations(
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

  //
  useEffect(() => {
    GetLocations();
    GetCustomers().then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    GetCustomers().then((res) => {
      setData(res);
    });
  }, [
    searchKeyword,
    selectedDate,
    selectedCity,
    selectedGender,
    selectedCategory,
  ]);

  useEffect(() => {
    const Filter = Filters.map((p) =>
      p.name === "city" ? { ...p, opt: locations } : p
    );
    setFilters(Filter);
  }, [locations]);

  return (
    <Layout header={headerOptions} setselectedDate={setSelectedDate}>
      {loading ? <Loader /> : null}
      <DataTableV2
        data={data}
        columns={columns}
        filters={Filters}
        qkey={"customers"}
        download
        scroll={true}
        searchPlaceholder={"Search"}
        setSelectedDate={setSelectedDate}
        setSearchKeyword={setSearchKeyword}
        setSelectedCity={setSelectedCity}
        setSelectedGender={setSelectedGender}
        hasChild={true}
        searchCategories={searchCategories}
        setSelectedCategory={setSelectedCategory}
      />
    </Layout>
  );
};

export default Customers;

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
    link: true,
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
    name: "City",
    key: "location",
    visability: true,
    type: "object",
    subKey: "name",
  },
  {
    name: "Area",
    key: "area",
    visability: true,
    type: "object",
    subKey: "name",
  },
  {
    name: "Total Orders",
    key: "total_orders",
    visability: true,
    type: "number",
  },
  {
    name: "Scans",
    key: "numOfScans",
    visability: true,
    type: "string",
  },
  {
    name: "Redeems",
    key: "numOfRedeems",
    visability: true,
    type: "number",
  },
  {
    name: "Gender",
    key: "gender",
    visability: true,
    type: "string",
  },
  {
    name: "Nationality",
    key: "nationality",
    visability: true,
    type: "object",
    subKey: "name",
  },
  {
    name: "Date",
    key: "date",
    visability: true,
    type: "date",
  },
];

const searchCategories = [
  { label: "Name", value: "name" },
  { label: "Phone", value: "phoneNumber" },
  { label: "Nationality", value: "nationality" },
  { label: "Email", value: "email" },
];
