import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Col, Row } from "../../components/Shared";

import {
  Form,
  Input,
  InputGrp,
  SSelect,
  Label,
  Title,
  PrimaryBtn,
} from "./FormComponents.styles";
import SuccessModal from "../../components/Shared/SuccessModal";
import axios from "axios";

import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import { APIsConstants } from "../../constants/API.constants";
import { isPhoneNumber } from "../../Validations";
import Loader from "../../components/loader";

export default function AddNewBranchForm({ locations }) {
  const [stage, setStage] = useState(1);
  const [location, setLocation] = useState(null);
  const [areas, setAreas] = useState([]);

  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);

  const CreateBranch = (name, phone, location, area, setError) => {
    setLoading(true);
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
        setLoading(false);
        setStage(2);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        } else {
          setError(error.response.data.message);
        }
      });
  };
  const GetAreas = async () => {
    setLoading(true);
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
        setLoading(false);
        setAreas(
          res.data.map((ele) => {
            return { value: ele.id, label: ele.name };
          })
        );
      })
      .catch((error) => {
        setLoading(false);
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

  const onSubmit = (name, phone, location, area, setError) => {
    CreateBranch(name, phone, location, area, setError);
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
  const [error, setError] = useState("");

  const handlePhoneNumberChange = (phoneNumber) => {
    setPhone(phoneNumber);
  };

  return (
    <Form>
      {loading ? <Loader /> : null}
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
          <Input
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            value={phone}
          />
        </InputGrp>
      </Row>

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

      {error && <Error>{error}</Error>}
      <PrimaryBtn
        disabled={!(name && phone && location && area && isPhoneNumber(phone))}
        onClick={() => onSubmit(name, phone, location, area, setError)}
      >
        Request Branch
      </PrimaryBtn>
    </Form>
  );
}

const Error = styled.div`
  width: 100%;
  text-align: center;
  color: red;
  font-size: 16px;
  font-family: "GilroyBold";
`;
