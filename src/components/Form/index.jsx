import React, { useState } from "react";
import PrimButton from "../PrimButton";
import { Row } from "../Shared";
import {
  Header,
  Input,
  SInputGrp,
  Label,
  SForm,
  SPhoneInput,
  SSelect,
} from "./Form.styles";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

const Form = ({ formConfig }) => {
  const onChane = (data) => {
    console.log("onChane", data);
  };

  return (
    <SForm>
      <Header>{formConfig.header}</Header>
      {formConfig.feilds.map((r, i) => (
        <Row key={r.row} gap={r.gap}>
          {r.feilds.map((f, i) => (
            <InputGrp key={i} f={f} onChange={onChane} />
          ))}
        </Row>
      ))}
      <PrimButton type="submit">{formConfig.CTA}</PrimButton>
    </SForm>
  );
};

export default Form;

const InputGrp = ({ f, value, onChange }) => {
  const [data, setData] = useState();
  if (f.type === "select")
    return (
      <SInputGrp>
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
    );
  if (f.type === "phone")
    return (
      <SInputGrp>
        <Label>{f.label}</Label>
        <PhoneInput
          placeholder={f.label}
          value={data}
          onChange={(data) => console.log("Change", data)}
        />
      </SInputGrp>
    );
  else
    return (
      <SInputGrp>
        <Label>{f.label}</Label>
        <Input
          type={f.type}
          name={f.name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </SInputGrp>
    );
};

const FormConfig = {
  header: "Add a New Cashier",
  CTA: "Add Cashier",
  feilds: [
    {
      row: 1,
      gap: "2rem",
      feilds: [
        {
          name: "name",
          label: "Cashier Name",
          type: "text",
          required: true,
        },
        {
          name: "phone",
          label: "Phone Number",
          type: "phone",
          required: true,
        },
      ],
    },
    {
      row: 2,
      gap: "2rem",
      feilds: [
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          required: true,
        },
      ],
    },
    {
      row: 3,
      gap: "2rem",
      feilds: [
        {
          name: "branch",
          label: "Assigned To Branch",
          type: "select",
          required: true,
        },
      ],
    },
  ],
};
