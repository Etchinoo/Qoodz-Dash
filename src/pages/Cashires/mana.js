import React from "react";
import styled from "@emotion/styled";

export function Frame44() {
  return (
    <Col>
      <Cric>
        <img src="" alt="" />
      </Cric>
      <TextArea>
        <MainText>Are you sure you want to Delete Cashier?</MainText>
        <SubText>
          Some meaningful help text pertaining to this modal goes here!
        </SubText>
      </TextArea>
      <PrimButton>Delete Cashier</PrimButton>
      <PrimButton>Cancel</PrimButton>
    </Col>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 93px;
  box-sizing: border-box;
`;

const Frame42 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  flex: none;
  gap: 92px;
  box-sizing: border-box;
`;

const Ellipse46 = styled.div`
  width: 175px;
  height: 175px;
  background-color: rgb(255, 117, 76);
  border-radius: 175px / 175px;
`;

const Frame41 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  flex: none;
  gap: 13px;
  box-sizing: border-box;
`;

const AreYouSureYouWantToDeleteCashier = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 32px;
  font-family: Gilroy-Bold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;

const SomeMeaningfulHelpTextPertainingToThisModalGoesHere = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: Gilroy-Regular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;

const Frame43 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 20px;
  box-sizing: border-box;
`;

const Frame39 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  flex: none;
  gap: 10px;
  border-radius: 15px;
  background-color: rgb(255, 117, 76);
  box-sizing: border-box;
  padding: 21px 305px;
`;

const DeleteCashier = styled.span`
  color: white;
  text-overflow: ellipsis;
  font-size: 28px;
  font-family: Gilroy-Bold, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;

const Frame40 = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  flex: none;
  gap: 10px;
  border: solid 1px rgb(128, 129, 145);
  border-radius: 15px;
  background-color: white;
  box-sizing: border-box;
  padding: 21px 355px;
`;

const Cancel = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 28px;
  font-family: Gilroy-Medium, sans-serif;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;
