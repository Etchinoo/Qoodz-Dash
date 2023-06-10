import React from "react";
import styled from "styled-components";
import BtnGroup from "../../components/BtnGroup";
import { Col } from "../../components/Shared";
import {
  Form,
  InputGrp,
  Label,
  PrimaryBtn,
  TextArea,
  Title,
} from "../Cashires/FormComponents.styles";

export function PauseOfferForm({ id }) {
  return (
    <Form>
      <Title>Are you sure you want to pause offer?</Title>
      <InputGrp>
        <Label>Tell us the Reason</Label>
        <TextArea />
      </InputGrp>
      <PrimaryBtn disabled={true} onClick={() => {}}> Pause Offer </PrimaryBtn>
    </Form>
  );
}
