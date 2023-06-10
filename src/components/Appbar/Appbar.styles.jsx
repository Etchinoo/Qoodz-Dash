import styled from "styled-components";
import * as Hi from "react-icons/hi";

export const Container = styled.div`
  /* width: "100%"; */
  max-width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  /* max-width: 100vw; */
  background: #fff;
  z-index: 2;
  border-bottom: 1px solid #e4e4e4;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
`;

export const GreetingCard = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GreetingHeader = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: flex-end;
  gap: 1rem;
`;
export const H4 = styled.div`
  font-size: 24px;
  /* line-height: 40px; */
  color: #282a37;
  font-family: GilroyExtraBold;
`;
export const Icon = styled.img`
  width: 34px;
  height: 34px;
`;
export const P = styled.div`
  font-size: 16px;
  line-height: 28px;
  font-family: "GilroyRegular";
  /* identical to box height, or 117% */

  color: #282a37;
`;

export const ActionCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: aqua; */
`;

export const BranchSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 16px 0;
  padding-left: 1.8rem;
  border-left: 1px solid #e4e4e4;
`;
