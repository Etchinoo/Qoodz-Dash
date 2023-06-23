import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { filterList } from "../../utlis/filterFunctions";
import HttpClient from "../../utlis/HttpClient";
import { searchBy } from "../../utlis/searchFunctions";
import { dateDescending } from "../../utlis/sortingFunctions";
import { Table, TBody, TD, TH, THead, TRow } from "./DataTable.styles";
import Filterbar from "./Filterbar";
import { BiEdit } from "react-icons/bi";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";
import moment from "moment";

const getAllResources = async (key, page, limit) => {
  try {
    const res = await HttpClient.get(`/${key}?_page=${page}&_limit=${limit}`);
    console.log(res);
    console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const DataTableV2 = ({
  data,
  columns,
  onSelect,
  filters,
  download,
  actionHandler,
  qkey,
  searchPlaceholder,
  StatusRow = false,
  scroll = false,
  setSelectedDate,
  setSearchKeyword,
  setSelectedCity,
  setSelectedGender,
  setSelectedBranch,
  setSelectedType,
  details,
  hasChild,
  searchCategories,
  setSelectedCategory,
}) => {
  const [sorted, setSorted] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { width, height } = useWindowSize();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const res = dateDescending(data, "date");
      setSorted(res);
    }
    if (setSearchKeyword) {
      setSearchKeyword(searchQuery);
    }
  }, [data, searchQuery]);
  return (
    <Container>
      <Filterbar
        filters={filters}
        onSearch={(e) => setSearchQuery(e)}
        download={download}
        searchPlaceholder={searchPlaceholder}
        details={details}
        setSelectedDate={setSelectedDate}
        setSelectedGender={setSelectedGender}
        setSelectedCity={setSelectedCity}
        searchCategories={searchCategories}
        setSelectedCategory={setSelectedCategory}
        setSelectedBranch={setSelectedBranch}
        setSelectedType={setSelectedType}
      />
      {data ? (
        <>
          <Table scroll={scroll} sWidth={width} sHeight={height}>
            <THead>
              <TRow>
                {/* <TH>
                  <input type="checkbox" />
                </TH> */}
                {columns.map((column, index) =>
                  column.visability ? <TH key={index}>{column.name}</TH> : null
                )}
              </TRow>
            </THead>
            <TBody>
              {sorted.map((row) => (
                <TRow
                  key={row.id}
                  StatusRow={StatusRow}
                  status={row.status ? "green" : "red"}
                  onClick={() =>
                    hasChild &&
                    navigate(`/${qkey}/${row.id}`, { replace: true })
                  }
                >
                  {/* <TD>
                    <input type="checkbox" />
                  </TD> */}
                  {columns.map((column, i) =>
                    column.visability ? (
                      <TD key={i}>
                        {column.type === "action" ? (
                          <>
                            <BiEdit
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                actionHandler({ key: column.key, id: row.id,row:row })
                              }
                            />
                          </>
                        ) : column.link === true ? (
                          row[column.key]
                        ) : column.type === "object" ? (
                          row[column.key][column.subKey]
                        ) : column.type === "date" ? (
                          moment(row[column.key]).format("DD/MM")
                        ) : (
                          row[column.key]
                        )}
                      </TD>
                    ) : null
                  )}
                </TRow>
              ))}
            </TBody>
          </Table>
        </>
      ) : (
        <NoData>No Data</NoData>
      )}
    </Container>
  );
};

export default DataTableV2;

const Container = styled.div`
  height: 100vh;
  background: #ffffff;
  box-shadow: 1px 4px 77px rgba(237, 237, 255, 0.89);
  border-radius: 25px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  /* flex: 1; */
  /* min-width: 1000px; */
  gap: 1rem;
  overflow-x: scroll;
  overflow: hidden;
  transition: all 0.5s ease;

  @media screen and (max-width: 1380px) {
    /* width: 100%; */
    /* background: red; */
  }
`;

const SLInk = styled(Link)`
  text-decoration: none;
  // color: #0d99ff;
  cursor: pointer;
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 2rem;
  font-weight: 600;
  font-family: "GilroyBold", sans-serif;
`;
