import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ModalContainer from "../Modal";
import {
  CustomSelect,
  DownloadButton,
  SearchBar,
  SFilterBar,
} from "./DataTable.styles";
import { DatePicker } from "../DateRangePicker";
import { DownloadRequestModal } from "./DownloadRequestModal";
import useWindowSize from "../../hooks/useWindowSize";
import { breakpoints } from "../../theme/v";
import styled from "styled-components";
import DateRangePickerV2 from "../DateRangePickerV2";

const Filterbar = ({
  onSearch,
  searchValue,
  filters,
  onFilter,
  download,
  searchPlaceholder,
  setSelectedDate,
  setSelectedCity,
  setSelectedGender,
  details,
}) => {
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const size = useWindowSize();
  const onChange = (e) => {
    console.log("onChange: ", e);
  };

  const handleSelectChange = (e, filter) => {
    if (filter.name == "city" && setSelectedCity) {
      setSelectedCity(e);
    }
    if (filter.name == "gender" && setSelectedGender) {
      setSelectedGender(e);
    }
  };

  return (
    <SFilterBar details={details}>
      {open && (
        <ModalContainer setOpen={setOpen}>
          <DownloadRequestModal onDone={setOpen} />
        </ModalContainer>
      )}
      {size.width < breakpoints.xl ? (
        <>
          <SearchBar>
            <div
              style={{
                display: "flex",
              }}
            >
              <AiOutlineSearch size={24} />
            </div>
            <input
              // style={{ width: "100%" }}
              type="text"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={searchPlaceholder}
            />
          </SearchBar>
          {download ? (
            <>
              <DownloadButton
                size={28}
                onClick={() => {
                  setOpen(true);
                }}
              />
            </>
          ) : null}
        </>
      ) : (
        <>
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
                  onChange={(e) => handleSelectChange(e, filter)}
                />
              ) : (
                <DateRangePickerV2 setselectedDate={setSelectedDate} />
              )}
            </div>
          ))}
          <SearchBar>
            <div
              style={{
                display: "flex",
              }}
            >
              <AiOutlineSearch size={24} />
            </div>
            <input
              // style={{ width: "100%", background:"red" }}
              type="text"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={searchPlaceholder}
            />
          </SearchBar>
          {download ? (
            <>
              <DownloadButton
                size={28}
                onClick={() => {
                  setOpen(true);
                }}
              />
            </>
          ) : null}
        </>
      )}
    </SFilterBar>
  );
};

export default Filterbar;

const OptionsButton = styled.button``;
