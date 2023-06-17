import React, { useState } from "react";
import styled from "styled-components";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Col, Row } from "../../components/Shared";
import Select from "react-select";
import PrimButton from "../../components/PrimButton";
// import PhoneInput from "react-phone-number-input";
import checkmark from "../../assets/checkmark.png";
import deleteemoji from "../../assets/deleteemoji.png";

export default function EditBranchForm() {
  const [stage, setStage] = useState(1);
  const onSubmit = () => {
    console.log("Done");
    setStage(2);
  };

  if (stage === 4)
  return (
    <Col center gap={"72px"}>
      <Circ>
        <img src={checkmark} alt="" />
      </Circ>
      <TextArea>
        <MainText>Branch Successfully Deleted!</MainText>
        <SubText>
          Some meaningful help text pertaining to modal goes here
        </SubText>
      </TextArea>
    </Col>
  );

  if (stage === 3)
    return (
      <Col center gap={"72px"} paddingVert="1rem" paddingHorz={"1rem"}>
        <Circ color="#FF754C">
          <img src={deleteemoji} alt="" />
        </Circ>
        <TextArea>
          <MainText>Are you sure you want to Delete Branch?</MainText>
          <SubText>
            Some meaningful help text pertaining to this modal goes here!
          </SubText>
        </TextArea>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "42px",
            // box-sizing: border-box;
            padding: "2rem",
            width: "100%",
          }}
        >
          <PrimButton color="#FF754C" onClick={()=>setStage(4)}>Confirm</PrimButton>
          <PrimButton color="trasparent">Cancel</PrimButton>
        </div>
      </Col>
    );

  if (stage === 2)
    return (
      <Col center gap={"72px"}>
        <Circ>
          <img src={checkmark} alt="" />
        </Circ>
        <TextArea>
          <MainText>Branch Successfully Updated!</MainText>
          <SubText>
            Some meaningful help text pertaining to modal goes here
          </SubText>
        </TextArea>
      </Col>
    );
  if (stage === 1)
    return (
      <SForm>
        <Header>Edit Chasier</Header>
        <Row gap={"2rem"}>
          <SInputGrp>
            <Label>Chaier Name</Label>
            <Input type="text" placeholder="John Doe" name="name" />
          </SInputGrp>
          <SInputGrp>
            <Label>Phone Number</Label>
            <Input type="text" placeholder="+2092089204" name="phone" />
          </SInputGrp>
        </Row>
        <Row gap={"2rem"}>
          <SInputGrp>
            <Label>Password</Label>
            <Input type="password" placeholder="*******" name="password" />
          </SInputGrp>
          <SInputGrp>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="*******"
              name="confirmPassword"
            />
          </SInputGrp>
        </Row>
        <Row>
          <SInputGrp>
            <Label>Assign to Branch</Label>
            <SSelect
              className="select-filter"
              classNamePrefix="filter-opt"
              // defaultValue={colourOptions[0]}
              // isDisabled={isDisabled}
              // isLoading={isLoading}
              isClearable={true}
              // isRtl={isRtl}
              isSearchable={true}
              //   name={filter.key}
              //   options={filter.opt}
            />
          </SInputGrp>
        </Row>
        <PrimButton onClick={() => onSubmit()}>Save</PrimButton>
        <DleteBranch onClick={() => setStage(3)}>Delete Cachier</DleteBranch>
      </SForm>
    );
}

const DleteBranch = styled.button`
  font-size: 24px;
  line-height: 28px;
  border: none;
  background-color: transparent;
  color: #ff3a33;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  cursor: pointer;
`;

export const SForm = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 42px;
  box-sizing: border-box;
  padding: 2rem;
  width: 100%;
`;

export const Header = styled.h1`
  color: rgb(40, 42, 55);
  font-size: 32px;
  font-weight: initial;
`;

export const SInputGrp = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 1rem;
  box-sizing: border-box;
  flex: 1;
`;

export const Label = styled.label`
  color: rgb(40, 42, 55);
  font-size: 24px;
  text-align: left;
`;

export const Input = styled.input`
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
  width: 100%;
  padding: 1rem 1rem;
`;

export const SPhoneInput = styled(PhoneInput)`
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
  width: 100%;
  /* padding: 1rem 1rem; */
`;

export const SSelect = styled(Select)`
  width: 90%;
  &.select-filter {
    width: 90%;
    .filter-opt__control {
      border-radius: 15px;
      padding: .5rem ;
      font-size: 24px;
      width: 90%;
      border: solid 1px rgba(115, 112, 113, 0.37);
      color: #939baf;
      border: none;
      min-width: 768px;
      border: solid 1px rgba(115, 112, 113, 0.37);
      border-radius: 15px;
    }
  }
`;

const Circ = styled.div`
  width: 175px;
  height: 175px;
  background-color: ${(props) => props.color || "rgb(20, 174, 92)"};
  border-radius: 175px / 175px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex: none;
  gap: 14px;
  box-sizing: border-box;
`;

const MainText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 32px;
  font-family: Gilroy-Bold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;

const SubText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: Gilroy-Regular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;
