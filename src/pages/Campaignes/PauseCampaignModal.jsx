import styled from "styled-components";
import { Col, Row } from "../../components/Shared";

export function PauseCampaignModal() {
  return (
    <RootWrapperPauseCampaignModal>
      <Col gap={"28px"}>
        <Title>Are you sure you want to pause campaign?</Title>
        <SubTitle>Choose a reason for pause</SubTitle>
      </Col>
      <Row gap={"13px"}>
        <OpBtn>Pause for edit</OpBtn>
        <OpBtn>Pause for cancel</OpBtn>
        <OpBtn>Other</OpBtn>
      </Row>
      <NotesInputGrp>
        <AdditionalNotes>Additional notes</AdditionalNotes>
        <TextArea />
      </NotesInputGrp>
      <Button>
        <PauseCampaign>Pause campaign</PauseCampaign>
      </Button>
    </RootWrapperPauseCampaignModal>
  );
}

const RootWrapperPauseCampaignModal = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  border-radius: 50px;
  background-color: white;
  box-sizing: border-box;
  padding: 56px 68px;
`;

const Title = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 28px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  /* line-height: 40px; */
  text-align: left;
`;

const SubTitle = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  /* line-height: 28px; */
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
  font-family: GilroyRegular, sans-serif;
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
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  line-height: 28px;
  text-align: left;
`;

const TextArea = styled.textarea`
  width: 620px;
  height: 146px;
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
  font-family: GilroyRegular, sans-serif;
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
  font-family: Gilroy-Bold, sans-serif;
  font-weight: initial;
  /* line-height: 40px; */
  text-align: left;
`;
