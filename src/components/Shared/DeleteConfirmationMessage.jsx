import styled, { css } from "styled-components";
import deleteemoji from "../../assets/deleteemoji.png";
import { Col } from "../Shared/index";
const DeleteConfirmationMessage = ({
  mainText,
  subText,
  onConfirm,
  onCancel,
}) => {
  return (
    <RootWrapperDeleteConfirmation>
      <ImageContainer>
        <Emoji src={deleteemoji} alt="image of Emoji" />
      </ImageContainer>
      <Col gap="13px">
        <MainText>{mainText}</MainText>
        <SubText>{subText}</SubText>
      </Col>
      <Col gap="20px">
        <PrimaryBtn danger="true" onClick={onConfirm}>
          Delete Cashier
        </PrimaryBtn>
        <ShadowBtn onClick={() => onCancel(false)}>Cancel</ShadowBtn>
      </Col>
    </RootWrapperDeleteConfirmation>
  );
};

export default DeleteConfirmationMessage;

const RootWrapperDeleteConfirmation = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  box-sizing: border-box;
  padding: 120px;
  /* paddingVert={"120px"} paddingHorz={"20px"} */
`;

const ImageContainer = styled.div`
  background-color: rgb(255, 117, 76);
  width: 120px;
  height: 120px;
  border-radius: 120px / 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Emoji = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
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
  font-family: GilroyRegular, sans-serif;
  font-weight: initial;
  text-align: center;
`;

const ShadowBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 16px 120px;
  font-size: 24px;
  border: none;
  background-color: white;
  outline: none;
  border: solid 1px rgb(128, 129, 145);
  font-family: GilroyMedium, sans-serif;
  cursor: pointer;
`;

export const PrimaryBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 16px 120px;
  outline: none;
  border: none;
  font-size: 24px;
  background-color: rgb(236, 232, 86);
  color: rgb(40, 42, 55);
  font-family: GilroyBold, sans-serif;
  ${(props) =>
    props.disabled &&
    css`
      background-color: rgb(228, 228, 228);
      color: rgba(115, 112, 113, 0.37);
    `}
  ${(props) =>
    props.danger &&
    css`
      background-color: rgb(255, 117, 76);
      color: white;
    `}
`;
