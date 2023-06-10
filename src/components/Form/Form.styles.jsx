// import PhoneInput from "react-phone-number-input";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";

export const SForm = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 52px;
  box-sizing: border-box;
  padding: 2rem;
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
  padding: 1rem 0;
`;

export const SPhoneInput = styled(PhoneInput)`
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
  width: 100%;
  /* padding: 1rem 1rem; */
`;

export const SSelect = styled(Select)`
  width: 100%;
  &.select-filter {
    width: 100%;
    .filter-opt__control {
      border-radius: 15px;
      padding: 1rem 1rem;
      font-size: 24px;
      width: 100%;
      border: solid 1px rgba(115, 112, 113, 0.37);
      color: #939baf;
      border: none;
      min-width: 768px;
      border: solid 1px rgba(115, 112, 113, 0.37);
      border-radius: 15px;
    }
  }
`;
