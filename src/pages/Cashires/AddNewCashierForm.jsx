import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Col, Row } from "../../components/Shared";
import {
  Form,
  Input,
  InputGrp,
  Label,
  PrimaryBtn,
  SSelect,
  Title,
} from "./FormComponents.styles";
import SuccessModal from "../../components/Shared/SuccessModal";
import axios from "axios";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import { useAtom } from "jotai";
import { APIsConstants } from "../../constants/API.constants";

export default function AddNewCashierForm({ branches, GetCashires }) {
  const [stage, setStage] = useState(1);
  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);

  const CreateCashier = (phone, password, name, branchId, setError) => {
    let data = {
      phoneNumber: phone,
      password: password,
      name: name,
      branch: branchId,
    };
    axios
      .post(`${APIsConstants.BASE_URL}/partners/cashiers`, data, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {
        setStage(2);
        setError("");
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

  const onSubmit = (name, phone, password, branch, setError) => {
    CreateCashier(phone, password, name, branch.value, setError);
  };

  if (stage === 2)
    return <SuccessModal mainText={"Cashier Successfully Added!"} />;
  if (stage === 1)
    return <AddNewCashier onSubmit={onSubmit} branches={branches} />;
}

export function AddNewCashier({ onSubmit, branches }) {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [branch, setBranch] = useState(null);
  const [error, setError] = useState("");

  return (
    <Form style={{ width: "100%" }}>
      <Title>Add a new Cashier</Title>
      <Row gap="19px">
        <InputGrp>
          <Label>Cashier Name</Label>
          <Input
            type={"text"}
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
        </InputGrp>
        <InputGrp>
          <Label>Cashier Phone Number</Label>

          <Input onChange={(e) => setPhone(e.target.value)} value={phone} />
        </InputGrp>
      </Row>
      <Row gap="19px">
        <InputGrp>
          <Label>Password</Label>
          <Input
            type={"password"}
            placeholder="*************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGrp>
        <InputGrp>
          <Label>Confirm Password</Label>
          <Input
            type={"password"}
            placeholder="*************"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGrp>
      </Row>
      <InputGrp>
        <Label>Assigned To Branch</Label>
        <SSelect
          className="select-filter"
          classNamePrefix="filter-opt"
          isClearable={true}
          isSearchable={true}
          placeholder="Select Branch"
          options={branches}
          onChange={(e) => setBranch(e)}
        />
      </InputGrp>
      {error && <Error>{error}</Error>}

      <PrimaryBtn
        disabled={
          !(
            name &&
            phone &&
            password &&
            confirmPassword &&
            password == confirmPassword &&
            branch
          )
        }
        onClick={() => onSubmit(name, phone, password, branch, setError)}
      >
        Add Cashier
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
