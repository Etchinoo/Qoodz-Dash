import styled from "styled-components";
import * as Fa from "react-icons/fa";
export function DatePicker() {
  return (
    <RootWrapperDatePicker>
        <Text>15 Mar - 12 Apr</Text>
        <Fa.FaChevronDown />
    </RootWrapperDatePicker>
  );
}

const RootWrapperDatePicker = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: Row;
  align-items: center;
  border-radius: 15px;
  background-color: rgb(247, 247, 252);
  box-sizing: border-box;
  gap: 28px;
  padding: 18px 24px;
  height: 100%;
`;



const Text = styled.span`
  color: rgb(147, 155, 175);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyMedium, sans-serif;
  /* font-weight: initial; */
  /* line-height: 28px; */
  text-align: left;
`;
