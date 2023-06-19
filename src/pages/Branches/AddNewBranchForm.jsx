import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Col, Row } from "../../components/Shared";

import SuccessModal from "../../components/Shared/SuccessModal";
import axios from "axios";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import { useAtom } from "jotai";
import { APIsConstants } from "../../constants/API.constants";

export default function AddNewBranchForm({ locations }) {
  const [stage, setStage] = useState(1);
  const [location, setLocation] = useState(null);
  const [areas, setAreas] = useState([]);

  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);

  const CreateBranch = (name, phone, location, area) => {
    console.log(">>>> phone ",phone)
    let data = {
      phoneNumber: phone,
      name: name,
      location: location?.value,
      area: area?.value,
    };
    axios
      .post(`${APIsConstants.BASE_URL}/branches`, data, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setStage(2);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        } else {
          setError(error.response.data.message);
        }
      });
  };
  const GetAreas = async () => {
    axios
      .get(
        `${APIsConstants.BASE_URL}/locations/areas?location=${location.value}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setAreas(
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
  useEffect(() => {
    if (location) {
      GetAreas();
    }
  }, [location]);

  const onSubmit = (name, phone, location, area) => {
    CreateBranch(name, phone, location, area);
  };

  if (stage === 2)
    return <SuccessModal mainText={"Branch Successfully Added!"} />;
  if (stage === 1)
    return (
      <AddNewBranch
        areas={areas}
        locations={locations}
        onSubmit={onSubmit}
        location={location}
        setLocation={setLocation}
      />
    );
}

export function AddNewBranch({
  areas,
  locations,
  onSubmit,
  location,
  setLocation,
}) {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [area, setArea] = useState(null);
  return (
    <Form>
      <Title>Request a new Branch</Title>
      <Row gap={"2rem"}>
        <InputGrp>
          <Label>Branch Name</Label>
          <Input
            type={"text"}
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
        </InputGrp>
        <InputGrp>
          <Label>Branch Phone Number</Label>
          <PhoneInput
            containerClass=""
            inputProps={{
              name: null,
              required: true,
            }}
            specialLabel={null}
            inputClass="phoneInputWrapper"
            country="eg"
            onChange={(data) => setPhone(data)}
            value={phone}
          />
        </InputGrp>
      </Row>
      <Row gap="19px">
        <InputGrp>
          <Label>Branch Location</Label>
          <SSelect
            className="select-filter"
            classNamePrefix="filter-opt"
            isClearable={true}
            isSearchable={true}
            placeholder="Select Location"
            options={locations}
            onChange={(e) => setLocation(e)}
          />
        </InputGrp>
        {location && (
          <InputGrp>
            <Label>Branch Area</Label>
            <SSelect
              className="select-filter"
              classNamePrefix="filter-opt"
              isClearable={true}
              isSearchable={true}
              placeholder="Select Area"
              options={areas}
              onChange={(e) => setArea(e)}
            />
          </InputGrp>
        )}
      </Row>
      <PrimaryBtn
        disabled={!(name && phone && location && area)}
        onClick={() => onSubmit(name, phone, location, area)}
      >
        Request Branch
      </PrimaryBtn>
    </Form>
  );
}

 const Title = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: GilroyBold, sans-serif;
`;

 const Form = styled.div`
  padding: 64px 78px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 30px;
  box-sizing: border-box;
`;

 const InputGrp = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  box-sizing: border-box;
`;

 const Label = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 16px;
  font-family: GilroyRegular, sans-serif;
`;

 const Input = styled.input`
  padding: 12px 12px;
  width: 100%;
  font-family: GilroyRegular, sans-serif;
  font-size: 16px;
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
`;

 const BranchSelect = styled.div`
  width: 802px;
  height: 69px;
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
`;

 const PrimaryBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: rgb(236, 232, 86);
  box-sizing: border-box;
  padding: 16px 60px;
  color: rgb(40, 42, 55);
  border: none;
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: GilroyBold, sans-serif;
  cursor: pointer;
  ${(props) =>
    props.skelaton &&
    css`
      background: #ffffff;
      border: 1px solid #939baf;
      border-radius: 15px;
      font-family: GilroyMedium;
    `}
  ${(props) =>
    props.disabled &&
    css`
      background-color: rgb(228, 228, 228);
      color: rgba(115, 112, 113, 0.37);
      cursor: not-allowed;
    `}
`;

 const DeleteBtn = styled.span`
  font-size: 20px;
  border: none;
  background-color: transparent;
  font-family: GilroyBold, sans-serif;
  color: #ff3a33;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* padding: 1rem; */
  cursor: pointer;
`;
 const SSelect = styled(Select)`
  /* width: 100%; */
  font-family: GilroyRegular, sans-serif;
  &.select-filter {
    width: 100%;
    .filter-opt__control {
      border-radius: 15px;
      padding: 10px 1rem;
      font-size: 18px;
      width: 100%;
      color: #939baf;
      border: none;
      min-width: 298px;
      border: solid 1px rgba(115, 112, 113, 0.37);
      border-radius: 15px;
    }
  }
`;

 const SPhoneInput = styled(PhoneInput)`
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
  width: 100%;
  /* padding: 1rem 1rem; */
`;

 const NewBtn = styled.button`
  font-family: GilroySemiBold;
  font-size: 18px;
  /* line-height: 28px; */
  color: #0d99ff;
  cursor: pointer;
  background: none;
  border: none;
  height: 18px;
  min-width: 240px;
`;

 const TextArea = styled.textarea`
  /* width: 802px; */
  width: 100%;
  min-height: 176px;
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
  padding: 16px;
  font-family: GilroyRegular, sans-serif;
`;
