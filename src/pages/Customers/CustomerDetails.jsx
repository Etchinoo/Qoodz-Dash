import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Tabs from "../../components/Tabs";
import DataTableV2 from "../../components/DataTableV2";
import userImage from "../../assets/userImage.png";
import { BsChevronLeft } from "react-icons/bs";
import { Col, Header, Row } from "../../components/Shared";
import _data from "../../data/customer_data.json";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import { SidebarStateAtom } from "../../store/Atoms";
import Loader from "../../components/loader";

const TabsData = [
  {
    name: "Scan History",
    key: "scan",
  },
  {
    name: "Redeem History",
    key: "redeem",
  },
];

const headerOptions = {
  title: "Customer Details",
  type: "detail",
  back: true,
  to: "/customers",
};

const CustomerDetails = () => {
  const { id } = useParams();
  const [active, setActive] = useState(TabsData[0]);

  const [tabData, setTabData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);
  const [loading, setLoading] = useState(false);

  const setActiveTab = (tab) => {
    const index = TabsData.findIndex((t) => t.key === tab);
    setActive(TabsData[index]);
  };

  const GetCustomerData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://qoodz-api.herokuapp.com/api/partners/3/customers",
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      );
      //get the customer data from the response data using the id from the params
      setLoading(false);
      let customerData = {};

      res.data.forEach((customer) => {
        if (customer.id === parseInt(id)) {
          customerData = customer;
        }
      });
      return customerData;
    } catch (error) {
      setLoading(false);
      console.log("error: ", error.response.status);
      if (error.response.status === 401) {
        setToken(null);
        setUser(null);
      }
    }
  };

  const GetTabsData = () => {
    setLoading(true);
    axios
      .get(
        `https://qoodz-api.herokuapp.com/api/partners/3/customers/${parseInt(
          id
        )}/${active.key}?${
          selectedCategory && searchKeyword
            ? `&searchAttribute=${selectedCategory.value}&searchValue=` +
              searchKeyword
            : ""
        }${
          selectedDate
            ? "startDate=" +
              selectedDate.fromDate +
              "&endDate=" +
              selectedDate.toDate
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
      .then((res) => {  setLoading(false);setTabData(res.data)})
      .catch((error) => {
        setLoading(false)
        console.log("error: ", error.response.status);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  //
  useEffect(() => {
    GetCustomerData().then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    GetTabsData();
    setSearchKeyword("");
    setSelectedDate(null);
  }, [active]);

  useEffect(() => {
    GetTabsData();
  }, [selectedDate, searchKeyword]);

  return (
    <Layout header={headerOptions}>
      {loading ? <Loader /> : null}
      <Row gap={"12px"} style={{ alignItems: "flex-start" }}>
        <TabsContainer>
          <Tabs active={active} setActive={setActive} Tabs={TabsData}>
            {active.key === "scan" ? (
              <>
                <DataTableV2
                  data={tabData}
                  columns={scansColumns}
                  filters={Filters}
                  key={"customers"}
                  details={true}
                  hasChild={false}
                  setSelectedDate={setSelectedDate}
                  setSearchKeyword={setSearchKeyword}
                  searchCategories={searchCategories}
                  setSelectedCategory={setSelectedCategory}
                  // download
                />
              </>
            ) : (
              <>
                <DataTableV2
                  data={tabData}
                  columns={redeemssColumns}
                  filters={Filters}
                  key={"customers"}
                  details={true}
                  hasChild={false}
                  setSelectedDate={setSelectedDate}
                  setSearchKeyword={setSearchKeyword}
                  // download
                />
              </>
            )}
          </Tabs>
        </TabsContainer>
        {tabData && (
          <CustomerDetailsCard data={tabData} switchTabs={setActiveTab} />
        )}
      </Row>
    </Layout>
  );
};

export default CustomerDetails;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 1rem;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.9);
  background-color: #fff;
  border-radius: 25px;
  flex: 2;
  /* max-width: 320px; */
`;

const Filters = [
  {
    name: "date",
    label: "Date",
    type: "date",
  },
];
const searchCategories = [
  { label: "Name", value: "name" },
  { label: "Phone", value: "phoneNumber" },
];
const scansColumns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "Customer name",
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
    name: "Scan Type",
    key: "type",
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

const redeemssColumns = [
  {
    name: "ID",
    key: "id",
    visability: true,
    type: "string",
  },
  {
    name: "Customer name",
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
    name: "Redeems Type",
    key: "type",
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
export function CustomerDetailsCard({ data, switchTabs }) {
  const [SidebarState, setSidebarState] = useAtom(SidebarStateAtom);

  const getAge = (dateString) => {
    if (dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  };

  return (
    <RootWrapperCustomerDetailsCard open={SidebarState}>
      <Col gap="32px">
        <Row gap="260px">
          <CustomerImage src={userImage} alt="image of CustomerImage" />
          {/* <Vector width="17" height="18" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.25618 1.34788C5.55038 1.05629 5.5525 0.581424 5.26091 0.287227C4.96933 -0.00697012 4.49446 -0.00908889 4.20026 0.282495L2.75912 1.71083C2.22294 2.24222 1.77576 2.68541 1.45691 3.08243C1.12249 3.49885 0.868114 3.9365 0.800152 4.46969C0.717224 5.1203 1.25678 5.56519 1.77965 5.56519H15.5283C15.9425 5.56519 16.2783 5.2294 16.2783 4.81519C16.2783 4.40097 15.9425 4.06519 15.5283 4.06519H2.59201C2.60309 4.05097 2.61457 4.03647 2.62645 4.02167C2.88555 3.69905 3.2709 3.31552 3.8458 2.74572L5.25618 1.34788Z"
              fill="#2D264B"
            />
            <path
              d="M1.52832 12.0652C1.11411 12.0652 0.77832 12.401 0.77832 12.8152C0.77832 13.2294 1.11411 13.5652 1.52832 13.5652H14.6649C14.6538 13.5794 14.6423 13.5939 14.6304 13.6087C14.3713 13.9313 13.986 14.3149 13.4111 14.8846L12.0007 16.2825C11.7065 16.5741 11.7044 17.0489 11.996 17.3431C12.2876 17.6373 12.7624 17.6395 13.0566 17.3479L14.4978 15.9195C15.0339 15.3882 15.4811 14.945 15.8 14.5479C16.1344 14.1315 16.3888 13.6939 16.4567 13.1607C16.4597 13.1374 16.4624 13.1142 16.4647 13.0909C16.5259 12.488 16.0303 12.0652 15.5283 12.0652H1.52832Z"
              fill="#2D264B"
            />
          </Vector> */}
        </Row>

        <Col gap="7px">
          <Name>{data[0]?.fullName}</Name>

          <Col gap="7px">
            <Email>
              {data[0]?.branch.name} - {data[0]?.branch.area.name}
            </Email>
          </Col>

          <Col gap="15px">
            <Devider />
          </Col>

          <Col gap="19px">
            <Row gap="17px">
              <svg
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.9918 0.328928C16.8497 0.205186 15.4101 0.205192 13.5736 0.2052H11.4831C9.64653 0.205192 8.20693 0.205186 7.0648 0.328928C5.89926 0.455206 4.95488 0.717524 4.14856 1.30335C3.66041 1.65801 3.23113 2.08729 2.87647 2.57544C2.72186 2.78824 2.58844 3.01254 2.4737 3.25066C2.10347 4.01899 1.93846 4.91026 1.85808 5.97424C1.77832 7.03007 1.77832 8.32596 1.77832 9.92616V9.9552C1.77832 10.3694 2.11411 10.7052 2.52832 10.7052C2.94253 10.7052 3.27832 10.3694 3.27832 9.9552C3.27832 8.32002 3.27881 7.08013 3.35382 6.08724C3.38578 5.66411 3.43062 5.29881 3.49103 4.97857L4.96751 6.45505C6.59977 8.08733 7.87894 9.36652 9.0112 10.2304C10.1701 11.1146 11.2629 11.6341 12.5283 11.6341C13.7938 11.6341 14.8865 11.1146 16.0454 10.2304C17.1777 9.36652 18.4568 8.08736 20.0891 6.4551L21.5656 4.97857C21.626 5.29881 21.6709 5.66411 21.7028 6.08724C21.7778 7.08013 21.7783 8.32002 21.7783 9.9552C21.7783 11.8468 21.7773 13.2052 21.6633 14.2572C21.5509 15.2951 21.3357 15.9453 20.9666 16.4533C20.7045 16.8141 20.3872 17.1314 20.0264 17.3935C19.5184 17.7626 18.8682 17.9777 17.8303 18.0902C16.7783 18.2042 15.4199 18.2052 13.5283 18.2052H11.5283C11.1141 18.2052 10.7783 18.541 10.7783 18.9552C10.7783 19.3694 11.1141 19.7052 11.5283 19.7052H13.5736C15.4101 19.7052 16.8497 19.7052 17.9918 19.5815C19.1574 19.4552 20.1018 19.1929 20.9081 18.607C21.3962 18.2524 21.8255 17.8231 22.1802 17.335C22.766 16.5286 23.0283 15.5843 23.1546 14.4187C23.2783 13.2766 23.2783 11.837 23.2783 10.0005V9.92621C23.2783 8.32599 23.2783 7.03008 23.1986 5.97424C23.1182 4.91026 22.9532 4.01899 22.5829 3.25066C22.4682 3.01254 22.3348 2.78824 22.1802 2.57544C21.8255 2.08729 21.3962 1.65801 20.9081 1.30335C20.1018 0.717524 19.1574 0.455206 17.9918 0.328928ZM5.98758 5.3538L4.09037 3.45659C4.35244 3.09601 4.6696 2.77889 5.03023 2.51688C5.53824 2.14779 6.18845 1.93265 7.22637 1.8202C8.27831 1.70623 9.63675 1.7052 11.5283 1.7052H13.5283C15.4199 1.7052 16.7783 1.70623 17.8303 1.8202C18.8682 1.93265 19.5184 2.14779 20.0264 2.51688C20.387 2.77889 20.7042 3.09601 20.9663 3.45659L19.0691 5.3538C17.3874 7.03546 16.1784 8.24223 15.1356 9.03787C14.1101 9.8203 13.3339 10.1341 12.5283 10.1341C11.7227 10.1341 10.9466 9.8203 9.92107 9.03787C8.87826 8.24223 7.66924 7.03546 5.98758 5.3538Z"
                  fill="#2D264B"
                />
                <path
                  d="M1.52832 13.2052C1.11411 13.2052 0.77832 13.541 0.77832 13.9552C0.77832 14.3694 1.11411 14.7052 1.52832 14.7052H4.52832C4.94253 14.7052 5.27832 14.3694 5.27832 13.9552C5.27832 13.541 4.94253 13.2052 4.52832 13.2052H1.52832Z"
                  fill="#2D264B"
                />
                <path
                  d="M1.52832 16.2052C1.11411 16.2052 0.77832 16.541 0.77832 16.9552C0.77832 17.3694 1.11411 17.7052 1.52832 17.7052H7.52832C7.94253 17.7052 8.27832 17.3694 8.27832 16.9552C8.27832 16.541 7.94253 16.2052 7.52832 16.2052H1.52832Z"
                  fill="#2D264B"
                />
              </svg>

              <Email>{data[0]?.email}</Email>
            </Row>
            <Row gap="17px">
              <Vector xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="rgb(45, 38, 75)"
                  d="M5.86183 0.72505C4.80974 -0.241683 3.19259 -0.241683 2.1405 0.72505C2.09741 0.764641 2.05142 0.810649 1.99169 0.870391L1.09419 1.76788C0.191081 2.671 -0.188038 3.97292 0.0890243 5.2197C1.66099 12.2936 7.18553 17.8181 14.2594 19.3901C15.5062 19.6671 16.8081 19.288 17.7112 18.3849L18.6086 17.4875C18.6684 17.4277 18.7144 17.3817 18.754 17.3386C19.7208 16.2865 19.7208 14.6693 18.754 13.6173C18.7144 13.5741 18.6684 13.5281 18.6086 13.4684L17.1394 11.9991C16.1193 10.979 14.5787 10.6872 13.2563 11.2637C12.4992 11.5937 11.6172 11.4267 11.0332 10.8427L8.63639 8.44589C8.05239 7.86188 7.88536 6.97994 8.21538 6.22283C8.79184 4.90037 8.50009 3.35984 7.47999 2.33974L6.01066 0.870406C5.95093 0.810657 5.90492 0.764645 5.86183 0.72505ZM3.15541 1.82957C3.63363 1.39014 4.3687 1.39014 4.84692 1.82957C4.86343 1.84474 4.88507 1.86613 4.96114 1.9422L6.41933 3.4004C7.00333 3.9844 7.17036 4.86635 6.84034 5.62345C6.26388 6.94592 6.55563 8.48644 7.57573 9.50655L9.97254 11.9034C10.9926 12.9235 12.5332 13.2152 13.8556 12.6387C14.6127 12.3087 15.4947 12.4758 16.0787 13.0598L17.5369 14.518C17.6129 14.594 17.6343 14.6157 17.6495 14.6322C18.0889 15.1104 18.0889 15.8455 17.6495 16.3237C17.6343 16.3402 17.6129 16.3618 17.5369 16.4379L16.6505 17.3242C16.1101 17.8647 15.3309 18.0916 14.5848 17.9258C8.07946 16.4802 2.99893 11.3996 1.5533 4.8943C1.3875 4.14816 1.61438 3.36902 2.15485 2.82855L3.0412 1.9422C3.11726 1.86614 3.1389 1.84474 3.15541 1.82957Z"
                />
              </Vector>
              <PhoneNumber>{data[0]?.phoneNumber}</PhoneNumber>
            </Row>

            <Row gap="17px">
              <Vector xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.7312 0.490979C15.5355 -0.0042845 14.3748 0.30483 13.5492 1.03439C12.7428 1.74701 12.25 2.85543 12.25 4.03307V4.99881C12.25 7.8983 14.6005 10.2488 17.5 10.2488H18.4657C19.6434 10.2488 20.7518 9.75605 21.4644 8.94961C22.194 8.12402 22.5031 6.96331 22.0078 5.76764C21.5178 4.58472 20.7997 3.50988 19.8943 2.60451C18.9889 1.69914 17.9141 0.980962 16.7312 0.490979ZM13.75 4.03307C13.75 3.2588 14.0777 2.56914 14.5425 2.15841C14.9881 1.76461 15.5495 1.62509 16.1571 1.8768C17.1581 2.2914 18.0676 2.89909 18.8336 3.66517C19.5997 4.43126 20.2074 5.34073 20.622 6.34167C20.8737 6.94934 20.7342 7.51071 20.3404 7.95635C19.9297 8.42116 19.24 8.74881 18.4657 8.74881H17.5C15.4289 8.74881 13.75 7.06987 13.75 4.99881V4.03307Z"
                  fill="#2D264B"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.75 5.49881C10.75 4.03945 9.5133 2.61296 7.85109 2.98856C6.69088 3.25073 5.58234 3.72437 4.58319 4.39198C2.97982 5.46332 1.73013 6.98606 0.992179 8.76764C0.254225 10.5492 0.061142 12.5096 0.437348 14.4009C0.813554 16.2922 1.74215 18.0295 3.10571 19.3931C4.46928 20.7567 6.20656 21.6853 8.09787 22.0615C9.98919 22.4377 11.9496 22.2446 13.7312 21.5066C15.5127 20.7687 17.0355 19.519 18.1068 17.9156C18.7744 16.9165 19.2481 15.8079 19.5102 14.6477C19.8858 12.9855 18.4594 11.7488 17 11.7488H15C12.6528 11.7488 10.75 9.84602 10.75 7.49881V5.49881ZM8.1817 4.45167C8.67431 4.34036 9.25 4.74902 9.25 5.49881V7.49881C9.25 10.6744 11.8244 13.2488 15 13.2488H17C17.7498 13.2488 18.1584 13.8245 18.0471 14.3171C17.8253 15.2989 17.4245 16.2368 16.8596 17.0823C15.9531 18.439 14.6646 19.4964 13.1571 20.1208C11.6497 20.7452 9.99085 20.9086 8.39051 20.5903C6.79017 20.272 5.32016 19.4862 4.16637 18.3324C3.01259 17.1787 2.22685 15.7086 1.90853 14.1083C1.5902 12.508 1.75358 10.8492 2.378 9.34167C3.00242 7.83418 4.05984 6.5457 5.41655 5.63918C6.26198 5.07428 7.19996 4.67351 8.1817 4.45167Z"
                  fill="#2D264B"
                />
              </Vector>
              <PhoneNumber>
                {getAge(data[0]?.dob)} - {data[0]?.gender}
              </PhoneNumber>
            </Row>
          </Col>
        </Col>
      </Col>
    </RootWrapperCustomerDetailsCard>
  );
}

const RootWrapperCustomerDetailsCard = styled.div`
  width: ${(props) => (props.open ? `24%;` : "100%")};
  display: flex;
  flex-direction: column;
  gap: 25px;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.9);
  border-radius: 25px;
  background-color: white;
  box-sizing: border-box;
  padding: 50px ${(props) => (props.open ? `10px` : "32px")};
  height: 100%;
`;

const CustomerImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
`;

const Vector = styled.svg`
  /* padding: 1rem; */
  width: ${(props) => (props.width ? `${props.width}px` : "24px;")};
  height: 22px;
`;

const Name = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  /* line-height: 40px; */
  text-align: left;
`;

const Email = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;

const PhoneNumber = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;
const Devider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
  padding: 0 2rem;
  margin-top: 10px;
  margin-bottom: 10px;
`;
