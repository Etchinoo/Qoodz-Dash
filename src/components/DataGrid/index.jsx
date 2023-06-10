import React from "react";
import styled from "styled-components";
import { CustomSelect } from "../DataTableV2/DataTable.styles";
import DateRangePickerV2 from "../DateRangePickerV2";
import { Header, Row } from "../Shared";

const DataGrid = ({ data, component, filters, header }) => {
  const girdElements = data.map((item, index) => {
    return component(item);
  });

  return (
    <Container>
      <Header style={{ fontSize: "22px" }} marginVert={"18px"}>
        <div className="title" style={{ width: "100%" }}>
          {header}
        </div>
        {filters && filters.length > 0 && <Filters filters={filters} />}
      </Header>
      <Grid elements={girdElements} />
    </Container>
  );
};

export default DataGrid;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Filters = ({ data, filters }) => {
  return (
    <Row gap={"1rem"} style={{ justifyContent: "flex-end" }}>
      {filters.map((filter, index) => (
        <div key={index}>
          {filter.type === "Select" ? (
            <CustomSelect
              className="select-filter"
              classNamePrefix="filter-opt"
              isClearable={true}
              isSearchable={true}
              placeholder={filter.label}
              name={filter.key}
              options={filter.opt}
            />
          ) : (
            <DateRangePickerV2 />
          )}
        </div>
      ))}
    </Row>
  );
};
const SFilterBar = styled.div``;

const Grid = ({ elements }) => {
  return (
    <SGrid>
      {elements.map((element, index) => (
        <div key={index}>{element}</div>
      ))}
    </SGrid>
  );
};

const SGrid = styled.div`
  /* max-width: 1200px; */
  margin: 30px auto;
  padding: 0 20px;
  width: 100%;
  display: grid;
  /* Define Auto Row size */
  /* grid-auto-rows: 100px; */
  /*Define our columns */
  /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
  /* grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  /* grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); */
  grid-gap: 1em;
`;
