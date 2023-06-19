import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Col, Row } from "../../components/Shared";
import {
  DeleteBtn,
  Form,
  Input,
  InputGrp,
  Label,
  PrimaryBtn,
  SSelect,
  Title,
} from "./FormComponents.styles";
import SuccessModal from "../../components/Shared/SuccessModal";
import DeleteConfirmationMessage from "../../components/Shared/DeleteConfirmationMessage";
import axios from "axios";
import { userAtom, userTokenAtom } from "../../store/Atoms";
import { useAtom } from "jotai";
import { APIsConstants } from "../../constants/API.constants";

export default function EditCashierForm({ onCancel, selectedRow, branches }) {
  const [stage, setStage] = useState(1);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [branch, setBranch] = useState(null);
  const [error, setError] = useState("");
  const [token, setToken] = useAtom(userTokenAtom);
  const [user, setUser] = useAtom(userAtom);

  const UpdateCashier = (phone, password, name, branchId, GetCashires) => {
    let data = {
      phoneNumber: phone,
      password: password,
      name: name,
      branch: branchId,
    };
    axios
      .put(
        `${APIsConstants.BASE_URL}/partners/cashiers/${selectedRow.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setStage(2);
        setError("");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // setToken(null);
          // setUser(null);
        } else {
          setError(error.response.data.message);
        }
      });
  };

  const deleteCashier = () => {
    axios
      .delete(
        `${APIsConstants.BASE_URL}/partners/cashiers/${selectedRow.id}`,

        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "63cad87c3207fce093f8c08388e5a805",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      )
      .then((res) => {
        setStage(4);
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
    UpdateCashier(phone, password, name, branch.value, setError);
  };
  useEffect(() => {
    setPhone(selectedRow.phoneNumber);
    setName(selectedRow.fullName);
    setBranch(
      branches.filter((branch) => branch.label == selectedRow.branch)[0]
    );
  }, []);

  if (stage === 4)
    return <SuccessModal mainText={"Cashier Successfully Deleted!"} />;

  if (stage === 3)
    return (
      <DeleteConfirmationMessage
        mainText={"Are you sure you want to Delete Cashier?"}
        onConfirm={() => deleteCashier()}
        onCancel={onCancel}
      />
    );

  if (stage === 2)
    return <SuccessModal mainText={"Cashier Successfully Updated!"} />;
  if (stage === 1)
    return (
      <Form style={{ width: "100%" }}>
        <Title>Edit Cashier Information</Title>
        <Row gap="19px">
          <InputGrp>
            <Label>Cashier Name</Label>
            <Input
              type={"text"}
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGrp>
          <InputGrp>
            <Label>Cashier Phone Number</Label>
            <PhoneInput
               
        
              inputClass="phoneInputWrapper"
              country="eg"
              onChange={(data) => setPhone(data)}
              value={phone}
            />
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
            value={branch}
          />
        </InputGrp>
        {error && <Error>{error}</Error>}
        <Col style={{ width: "100%" }} gap={"0.8rem"}>
          <PrimaryBtn onClick={() => onSubmit(name, phone, password, branch)}>
            Save
          </PrimaryBtn>
          <DeleteBtn onClick={() => setStage(3)}>Delete Cachier</DeleteBtn>
        </Col>
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
