import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { NewBtn } from "../../pages/Cashires/FormComponents.styles";
import Appbar from "../Appbar";
import Navbar from "../Navbar";
import { Col, Row } from "../Shared";
import Sidebar from "../Sidebar";
import useWindowSize from "../../hooks/useWindowSize";
import { useAtom } from "jotai";
import { SidebarStateAtom } from "../../store/Atoms";
import { SSelect } from "../FormComponents";
import { useEffect, useState } from "react";
import DateRangePickerV2 from "../DateRangePickerV2";
const Layout = ({
  children,
  header,
  addNew,
  shadow = false,
  filterOptions,
  filterValue,
  filterChange,
  setselectedDate,
}) => {
  const size = useWindowSize();
  const [SidebarState, setSidebarState] = useAtom(SidebarStateAtom);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const childrenWidth = !SidebarState ? size.width - 92 : size.width - 250;
  const nav = useNavigate();

  useEffect(() => {
    if (filterOptions) {
      setDropdownOptions(filterOptions);
    }
  }, [filterOptions]);

  return (
    <Container width={size.width}>
      <Sidebar />
      <Col width={childrenWidth}>
        <Appbar width={childrenWidth} filterOptions={filterOptions} />
        <Col
          shadow={shadow}
          master
          paddingHorz={"42px"}
          paddingVert={"2rem"}
          gap={"32px"}
        >
          {header && header.type === "master" ? (
            <Header marginVert={"18px"}>
              {header.title}{" "}
              {header.AddNew ? (
                <NewBtn
                  onClick={() => {
                    addNew();
                  }}
                >
                  {header.addNewText}
                </NewBtn>
              ) : null}
              {header.filter && header.filter === "dropdown" ? (
                // <SSelect
                //   style={{ maxWidth: "200px" }}
                //   className="select-filter"
                //   classNamePrefix="filter-opt"
                //   options={dropdownOptions}
                // />

                <DateRangePickerV2 setselectedDate={setselectedDate} />
              ) : null}
            </Header>
          ) : null}
          {header && header.type === "detail" ? (
            <Header marginVert={"18px"} spread={header.AddNew}>
              <Row
                gap={"1rem"}
                onClick={() => nav(`${header?.to}`, { replace: true })}
                style={{ cursor: "pointer" }}
              >
                <BsChevronLeft size={24} /> {header.title}{" "}
              </Row>
              {header.AddNew ? (
                <NewBtn
                  onClick={() => {
                    addNew();
                  }}
                >
                  {header.addNewText}
                </NewBtn>
              ) : null}
            </Header>
          ) : null}
          {children}
        </Col>
      </Col>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  position: relative;
  display: flex;
  background: ${(props) => props.background || "#FFFFFF"};
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  overflow-x: hidden;
  height: 100vh;
  /* overflow-y: hidden; */
`;

const Header = styled.div`
  /* background-color: yellow; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  font-family: GilroyBold;
  height: 28px;
  font-size: 28px;
  line-height: 0px;
  color: #282a37;
  padding-right: 105px;
  ${(props) =>
    props.pointer
      ? css`
          cursor: pointer;
        `
      : css`
          cursor: default;
        `}
`;
