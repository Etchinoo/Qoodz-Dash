import styled from "styled-components";

const CheckBoxWithLabel = ({ label, value, onChange, col, reverse, align }) => {
  return (
    <Container>
      {!reverse ? (
        <>
          <CheckBox type="checkbox" value={value} onChange={onChange} />
          <Label>{label || ""}</Label>
        </>
      ) : (
        <>
          <Label>{label || ""}</Label>
          <CheckBox type="checkbox" value={value} onChange={onChange} />
        </>
      )}
    </Container>
  );
};

export default CheckBoxWithLabel;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckBox = styled.input`
  box-sizing: border-box;

  /* position: absolute; */
  width: 34.47px;
  height: 34.47px;
  /* left: 440.83px; */
  /* top: 1020.24px; */

  border: 1px solid #000000;
  border-radius: 14px;
`;

const Label = styled.label`
  color: rgb(40, 42, 55);
  font-size: 24px;
  text-align: left;
`;
