import React, { useState } from "react";
import "react-phone-number-input/style.css";
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

export default function AddNewCashierForm() {
  const [stage, setStage] = useState(1);
  const onSubmit = () => {
    console.log("Done");
    setStage(2);
  };

  if (stage === 2)
    return <SuccessModal mainText={"Cashier Successfully Added!"} />;
  if (stage === 1) return <AddNewCashier onSubmit={onSubmit} />;
}

export function AddNewCashier({ onSubmit }) {
  return (
    <Form style={{ width: "100%" }}>
      <Title>Add a new Cashier</Title>
      <Row gap="19px">
        <InputGrp>
          <Label>Cashier Name</Label>
          <Input type={"text"} placeholder="John Doe" />
        </InputGrp>
        <InputGrp>
          <Label>Cashier Phone Number</Label>
          <Input type={"text"} placeholder="+2029147201947" />
          {/* <SPhoneInput /> */}
        </InputGrp>
      </Row>
      <Row gap="19px">
        <InputGrp>
          <Label>Password</Label>
          <Input type={"password"} placeholder="*************" />
        </InputGrp>
        <InputGrp>
          <Label>Confirm Password</Label>
          <Input type={"password"} placeholder="*************" />
        </InputGrp>
      </Row>
      <InputGrp>
        <Label>Assigned To Branch</Label>
        <SSelect
          className="select-filter"
          classNamePrefix="filter-opt"
          isClearable={true}
          isSearchable={true}
        />
      </InputGrp>
      <PrimaryBtn onClick={() => onSubmit()}>Add Cashier</PrimaryBtn>
    </Form>
  );
}
