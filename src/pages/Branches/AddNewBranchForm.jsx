// import React, { useEffect, useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { Col, Row } from "../../components/Shared";

// import {
//   Form,
//   Input,
//   InputGrp,
//   SSelect,
//   Label,
//   Title,
//   PrimaryBtn,
// } from "./FormComponents.styles";
// import SuccessModal from "../../components/Shared/SuccessModal";
// import axios from "axios";

// import { useAtom } from "jotai";
// import { userAtom, userTokenAtom } from "../../store/Atoms";
// import { APIsConstants } from "../../constants/API.constants";

// export default function AddNewBranchForm({ locations }) {
//   const [stage, setStage] = useState(1);
//   const [location, setLocation] = useState(null);
//   const [areas, setAreas] = useState([]);

//   const [token, setToken] = useAtom(userTokenAtom);
//   const [user, setUser] = useAtom(userAtom);

//   const CreateBranch = (name, phone, location, area) => {
//     console.log(">>>> phone ", phone);
//     let data = {
//       phoneNumber: phone,
//       name: name,
//       location: location?.value,
//       area: area?.value,
//     };
//     axios
//       .post(`${APIsConstants.BASE_URL}/branches`, data, {
//         headers: {
//           "Content-Type": "application/json",
//           apiKey: "63cad87c3207fce093f8c08388e5a805",
//           Authorization: `Bearer ${token?.accessToken}`,
//         },
//       })
//       .then((res) => {
//         setStage(2);
//       })
//       .catch((error) => {
//         if (error.response.status === 401) {
//           setToken(null);
//           setUser(null);
//         } else {
//           setError(error.response.data.message);
//         }
//       });
//   };
//   const GetAreas = async () => {
//     axios
//       .get(
//         `${APIsConstants.BASE_URL}/locations/areas?location=${location.value}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             apiKey: "63cad87c3207fce093f8c08388e5a805",
//             Authorization: `Bearer ${token?.accessToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         setAreas(
//           res.data.map((ele) => {
//             return { value: ele.id, label: ele.name };
//           })
//         );
//       })
//       .catch((error) => {
//         console.log("error: ", error.response.status);
//         if (error.response.status === 401) {
//           setToken(null);
//           setUser(null);
//         }
//       });
//   };
//   useEffect(() => {
//     if (location) {
//       GetAreas();
//     }
//   }, [location]);

//   const onSubmit = (name, phone, location, area) => {
//     CreateBranch(name, phone, location, area);
//   };

//   if (stage === 2)
//     return <SuccessModal mainText={"Branch Successfully Added!"} />;
//   if (stage === 1)
//     return (
//       <AddNewBranch
//         areas={areas}
//         locations={locations}
//         onSubmit={onSubmit}
//         location={location}
//         setLocation={setLocation}
//       />
//     );
// }

// export function AddNewBranch({
//   areas,
//   locations,
//   onSubmit,
//   location,
//   setLocation,
// }) {
//   const [name, setName] = useState(null);
//   const [phone, setPhone] = useState(null);
//   const [area, setArea] = useState(null);
//   return (
//     <Form>
//       <Title>Request a new Branch</Title>
//       <Row gap={"2rem"}>
//         <InputGrp>
//           <Label>Branch Name</Label>
//           <Input
//             type={"text"}
//             placeholder="John Doe"
//             onChange={(e) => setName(e.target.value)}
//           />
//         </InputGrp>
//         <InputGrp>
//           <Label>Branch Phone Number</Label>
//           <PhoneInput
//             containerClass=""
//             inputProps={{
//               name: null,
//               required: true,
//             }}
//             specialLabel={null}
//             inputClass="phoneInputWrapper"
//             country="eg"
//             onChange={(data) => setPhone(data)}
//             value={phone}
//           />
//         </InputGrp>
//       </Row>
//       <Row gap="19px">
//         <InputGrp>
//           <Label>Branch Location</Label>
//           <SSelect
//             className="select-filter"
//             classNamePrefix="filter-opt"
//             isClearable={true}
//             isSearchable={true}
//             placeholder="Select Location"
//             options={locations}
//             onChange={(e) => setLocation(e)}
//           />
//         </InputGrp>
//         {location && (
//           <InputGrp>
//             <Label>Branch Area</Label>
//             <SSelect
//               className="select-filter"
//               classNamePrefix="filter-opt"
//               isClearable={true}
//               isSearchable={true}
//               placeholder="Select Area"
//               options={areas}
//               onChange={(e) => setArea(e)}
//             />
//           </InputGrp>
//         )}
//       </Row>
//       <PrimaryBtn
//         disabled={!(name && phone && location && area)}
//         onClick={() => onSubmit(name, phone, location, area)}
//       >
//         Request Branch
//       </PrimaryBtn>
//     </Form>
//   );
// }
import React, { useState } from "react";
import styled from "styled-components";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Col, Row } from "../../components/Shared";
import Select from "react-select";
import PrimButton from "../../components/PrimButton";
// import PhoneInput from "react-phone-number-input";
import checkmark from "../../assets/checkmark.png";
import { Form, Input, InputGrp, Label, Title } from "../Cashires/FormComponents.styles";
import SuccessModal from "../../components/Shared/SuccessModal";

export  default function AddNewBranchForm() {
  const [stage, setStage] = useState(1);
  const onSubmit = () => {
    console.log("Done");
    setStage(2);
  };

  if (stage === 2)
  return <SuccessModal mainText={"Branch Successfully Added!"} />
  if (stage === 1)
    return (
      <Form>
        <Title>Request a new Branch</Title>
        <Row gap={"2rem"}>
          <InputGrp>
            <Label>Branch Name</Label>
            <Input type="text" placeholder="John Doe" name="name" />
          </InputGrp>
          <InputGrp>
            <Label>Branch Phone Number</Label>
            <Input type="text" placeholder="+2092089204" name="phone" />
          </InputGrp>
        </Row>{" "}
        <Row>
          <InputGrp>
            <Label>Branch Address</Label>
            <Input type="text" placeholder="" name="address" />
          </InputGrp>
        </Row>
        <PrimButton onClick={() => onSubmit()}>Request Branch</PrimButton>
      </Form>
    );
}
