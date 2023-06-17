import Select from "react-select";
import styled, { css } from "styled-components";
import { BiDownload } from "react-icons/bi";

export const Table = styled.table`
  border-collapse: collapse;
  text-align: left;
  /* table-layout: fixed; */
  /* overflow: hidden; */
  @media screen and (max-width: 1370px) {
    ${({ scroll }) =>
      scroll &&
      css`
        display: block;
      `}
  }
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  overflow-x: scroll;
`;
export const THead = styled.thead`
  border-top: 1px solid #e4e4e4;
  font-family: GilroySemiBold;
`;
export const TRow = styled.tr`
  border-bottom: 1px solid #e4e4e4;
  cursor: pointer;
  :nth-child(even) {
    background-color: rgba(247, 247, 252, 0.65);
  }
  ${({ StatusRow, status }) =>
    StatusRow
      ? css`
          border-right: 5px solid ${status};
        `
      : null}
`;
export const TH = styled.th`
  color: #939baf;
  padding: .8rem .8rem;
  width: fit-content;
  text-align: center;
`;
export const TBody = styled.tbody`
  font-family: GilroyMedium;
`;
export const TD = styled.td`
  color: #414357;
  padding: .8rem .8rem;
  text-align: center;
`;

export const SFilterBar = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns:  ${props => props.details ? "auto 1fr 1fr" : " 1fr 1fr 1fr 1fr 1fr"};;
`;


export const SearchBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  padding: 1rem;
  height: 100%;
  flex: 1;
  background: #f7f7fc;
  font-size: 24px;
  /* max-width: 270px; */
  color: rgb(147, 155, 175);

  input {
    font-size: 18px;
    font-family: GilroyMedium, sans-serif;
    color: rgb(147, 155, 175);
    width: 100%;
    outline: none;
    border: none;
    background: inherit;
  }
  @media screen and (max-width: 1380px) {
    /* display: none; */
  }
`;

export const DownloadButton = styled(BiDownload)`
  background: #f7f7fc;
  border-radius: 12px;
  padding: 12px 16px;
  height: 100%;
  width: 60px;
  color: rgb(147, 155, 175);
  cursor: pointer;
  margin-left: auto;
`;

export const CustomSelect = styled(Select)`
  z-index: 1;
  color: rgb(147, 155, 175);
  &.select-filter {
    font-family: GilroyMedium;

    .filter-opt__control {
      border-radius: 12px;
      background: #f7f7fc;
      padding: 12px 12px;
      font-size: 18px;
      border: none;
    }
  }
`;

// export const CustomDateRange = styled(DateRangePicker)`
//   &.react-daterange-picker {
//     border-radius: 15px;
//     background: #dfdfdf;
//     padding: 1.2rem 2rem;
//     &.react-daterange-picker .react-daterange-picker__wrapper {
//       border: none;
//     }
//   }
// `;
