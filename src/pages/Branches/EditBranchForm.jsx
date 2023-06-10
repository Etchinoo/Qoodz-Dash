import React, { useState } from "react";
import "react-phone-number-input/style.css";
import { Row } from "../../components/Shared";
import {
  DeleteBtn,
  Form,
  Input,
  InputGrp,
  Label,
  PrimaryBtn,
  Title,
} from "../Cashires/FormComponents.styles";
import DeleteConfirmationMessage from "../../components/Shared/DeleteConfirmationMessage";
import SuccessModal from "../../components/Shared/SuccessModal";

export default function EditBranchForm({ onCancel }) {
  const [stage, setStage] = useState(1);
  const onSubmit = () => {
    console.log("Done");
    setStage(2);
  };
  if (stage === 4)
    return <SuccessModal mainText={"Branch Successfully Deleted!"} />;
  if (stage === 3)
    return (
      <DeleteConfirmationMessage
        mainText={"Are you sure you want to Delete Branch?"}
        onConfirm={() => setStage(4)}
        onCancel={onCancel}
      />
    );
  if (stage === 2)
    return <SuccessModal mainText={"Branch Successfully Updated!"} />;
  if (stage === 1)
    return (
      <Form>
        <Title>Edit Branch</Title>
        <Row gap={"2rem"}>
          <InputGrp>
            <Label>Branch Name</Label>
            <Input type="text" placeholder="John Doe" name="name" />
          </InputGrp>
          <InputGrp>
            <Label>Phone Number</Label>
            <Input type="text" placeholder="+2092089204" name="phone" />
          </InputGrp>
        </Row>
        <Row>
          <InputGrp>
            <Label>Branch Address</Label>
            <Input type="text" placeholder="" name="address" />
          </InputGrp>
        </Row>
        <PrimaryBtn onClick={() => onSubmit()}>Save</PrimaryBtn>
        <DeleteBtn onClick={() => setStage(3)}>Delete Branch</DeleteBtn>
      </Form>
    );
}
