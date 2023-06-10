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



