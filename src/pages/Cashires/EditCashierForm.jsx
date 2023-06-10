import React, { useState } from "react";
import "react-phone-number-input/style.css";
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

export default function EditCashierForm({ onCancel }) {
  const [stage, setStage] = useState(1);
  const onSubmit = () => {
    console.log("Done");
    setStage(2);
  };

  if (stage === 4)
    return <SuccessModal mainText={"Cashier Successfully Deleted!"} />;

  if (stage === 3)
    return (
      <DeleteConfirmationMessage
        mainText={"Are you sure you want to Delete Cashier?"}
        onConfirm={() => setStage(4)}
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
            <Input type={"text"} placeholder="John Doe" />
          </InputGrp>
          <InputGrp>
            <Label>Cashier Phone Number</Label>
            <Input type={"text"} placeholder="+2029147201947" />
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
        <Col style={{width:"100%"}} gap={"0.8rem"}>
        <PrimaryBtn onClick={() => onSubmit()}>Save</PrimaryBtn>
        <DeleteBtn onClick={() => setStage(3)}>Delete Cachier</DeleteBtn>
        </Col>
      </Form>
    );
}
