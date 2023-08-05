import styled from "styled-components";
import { Col, Row } from "../../components/Shared";
import { useState } from "react";
import { PrimaryBtn } from "../../components/FormComponents";
import { APIsConstants } from "../../constants/API.constants";
import { useAtom } from "jotai";

import axios from "axios";
import {
  homeBranchSelctorAtom,
  userAtom,
  userTokenAtom,
} from "../../store/Atoms";
import Loader from "../../components/loader";

export function PauseCampaignModal({ id, getActiveCampaigns }) {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(userTokenAtom);

  const [text, setText] = useState(null);
  const [reasonId, setReasonId] = useState(null);
  const [loading, setLoading] = useState(false);

  const pauseCampaign = () => {
    setLoading(true);
    let data = {
      reason: reasonId,
      additionalNotes: text,
    };
    axios
      .patch(`${APIsConstants.BASE_URL}/campaigns/${id}/pause`, data, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "63cad87c3207fce093f8c08388e5a805",
          Authorization: `Bearer ${token?.accessToken}`,
        },
      })
      .then((res) => {    setLoading(true); getActiveCampaigns()})
      .catch((error) => {
        setLoading(true);
        if (error.response.status === 401) {
          setToken(null);
          setUser(null);
        }
      });
  };

  return (
    <RootWrapperPauseCampaignModal>
      <Col gap={"20px"}>
        <Title>Are you sure you want to pause campaign?</Title>
        <SubTitle>Choose a reason for pause</SubTitle>
      </Col>
      <Row gap={"10px"}>
        <OpBtn onClick={() => setReasonId(1)}>Pause for edit</OpBtn>
        <OpBtn onClick={() => setReasonId(2)}>Pause for cancel</OpBtn>
        <OpBtn onClick={() => setReasonId(3)}>Other</OpBtn>
      </Row>
      <NotesInputGrp>
        <AdditionalNotes>Additional notes</AdditionalNotes>
        <TextArea onChange={(e) => setText(e.target.value)} />
      </NotesInputGrp>

      <PrimaryBtn
        disabled={!(reasonId && text)}
        onClick={() => pauseCampaign()}
      >
        Pause campaign
      </PrimaryBtn>
    </RootWrapperPauseCampaignModal>
  );
}

const RootWrapperPauseCampaignModal = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  border-radius: 50px;
  background-color: white;
  box-sizing: border-box;
  padding: 56px 68px;
`;

const Title = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 32px;
  font-family: GilroyBold;
  font-weight: initial;
  line-height: 40px;
  text-align: left;
`;

const SubTitle = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: GilroyRegular;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;

const OpBtn = styled.div`
  width: 200px;
  /* height: 62px; */
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
  cursor: pointer;
  font-family: GilroyRegular;
`;

const NotesInputGrp = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 24px;
  box-sizing: border-box;
`;

const AdditionalNotes = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: GilroyRegular;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;

const TextArea = styled.textarea`
  width: 620px;
  height: 146px;
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
  font-family: GilroyRegular;
  padding: 1rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  align-self: stretch;
  background-color: rgb(228, 228, 228);
  box-sizing: border-box;
  padding: 16px 28px;
  flex-shrink: 0;
`;

const PauseCampaign = styled.span`
  color: rgba(115, 112, 113, 0.37);
  text-overflow: ellipsis;
  font-size: 22px;
  font-family: GilroyBold;
  font-weight: initial;
  /* line-height: 40px; */
  text-align: left;
`;
