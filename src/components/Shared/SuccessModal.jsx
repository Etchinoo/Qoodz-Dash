import styled from "styled-components";
import { Col, Row } from "../Shared";
import checkmark from "../../assets/checkmark.png";

const SuccessModal = ({ mainText, subText }) => {
  return (
    <Col center gap={"12px"} paddingVert={"120px"} paddingHorz={"20px"}>
      <Circ>
        <img src={checkmark} alt="" />
      </Circ>
      <br />
      {/* <TextArea> */}
        <MainText>{mainText}</MainText>
        <SubText>{subText}</SubText>
      {/* </TextArea> */}
    </Col>
  );
};

export default SuccessModal;

const Circ = styled.div`
  width: 120px;
  height: 120px;
  background-color: rgb(20, 174, 92);
  border-radius: 120px / 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;



const MainText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 28px;
  font-family: GilroyBold, sans-serif;
  font-weight: initial;
  text-align: center;
`;

const SubText = styled.span`
  color: rgb(40, 42, 55);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: Gilroy-Regular, sans-serif;
  font-weight: initial;
  text-align: center;
`;
