// import "./styles.css";

import styled from "styled-components";
import { ChangeEvent, useState } from "react";

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 52px;
  height: 28px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: #00bea7;

    &:before {
      transform: translate(24px, -50%);
    }
  }
`;

const ToggleSwitch = ({ value, onChange }) => {
  return (
    <Label>
      {/* <span>Toggle is {checked ? "on" : "off"}</span> */}
      <Input
        checked={value}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
      />
      <Switch />
    </Label>
  );
};

export default ToggleSwitch;

// export default function App() {
//   return (
//     <div className="App">
//       <ToggleSwitch />
//       <ToggleSwitch />
//     </div>
//   );
// }
