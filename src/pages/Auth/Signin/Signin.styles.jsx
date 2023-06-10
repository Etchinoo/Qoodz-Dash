import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-height: 100vh;
  overflow: hidden;
  color: #282a37;
  /* gap:120px; */
`;

export const FormColumen = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: aqua; */
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: aqua; */
`;
export const Logo = styled.img`
  /* background-color: yellow; */
  /* max-width: 100px; */
  height: 52px;
  /* width: 95.62837219238281px; */
`;
export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 60px;
  /* background-color: blueviolet; */
`;
export const H4 = styled.h4`
  padding: 0;
  margin: 0;
  font-size: 32px;
  /* background-color: bisque; */
`;
export const Form = styled.form`
  /* background-color: aqua; */
  min-width: 420px;
  display: flex;
  flex-direction: column;

  /* gap: 32px; */

  /* width: 100%; */
`;
export const InputGrp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
export const Label = styled.div`
  /* font-family: Gilroy-Medium; */
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
`;
export const Input = styled.input`
  /* max-height: 80px; */
  /* width: 662.6212768554688px; */
  /* left: 125.41796875px; */
  /* top: 514.125px; */
  border-radius: 15px;
  padding: 1rem 2rem;
  /* font-family: Gilroy-Regular; */
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;

  border: 1px solid #7370715e;

  :focus {
    border: 1px solid #ece856;
  }
`;
export const P = styled.div`
  font-size: 24px;
`;
export const ImgColume = styled.div``;
export const Button = styled.button`
  width: 662.62px;
  height: 80px;
  border: none;
  background: #ece856;
  border-radius: 15px;
  /* font-family: "Gilroy-Bold"; */
  font-size: 22px;
  line-height: 40px;
  color: #282a37;

  cursor: pointer;
  transition: all 100ms ease-in-out;
  :hover {
    opacity: 0.8;
  }
`;
export const HelperLink = styled.a`
  text-align: right;
  font-size: 22px;
  line-height: 28px;
  font-family: GilroyRegular;
  /* identical to box height, or 127% */

  color: #0d99ff;
`;
export const Icon = styled.img``;
