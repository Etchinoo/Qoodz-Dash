// Dual Date Range Picker with styled-components and date-fns using 2 DateRagePicker components staked side by side to be show when the user click on the div and can select 2 dates a start date and an end date and if is clicked outside the div the component will be hidden.
//

import React, { useState } from "react";
import styled from "styled-components";
import DateRangePicker from "./DateRangePicker";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Col } from "./Shared";

const DualDateRangePicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  return (
    <DateRangeInput>
      <DateInputFeild onClick={() => setShowPicker(!showPicker)}>
        <div>15 Mar - 12Apr</div>
        <FaChevronDown />
      </DateInputFeild>
      {showPicker ? (
        <DualDateRangePickerDIV>
          <Col>
            <div>From</div>
            <DateRangePicker
              date={startDate}
              handleDateClick={handleStartDate}
              showPicker={showPicker}
            />
          </Col>
          <Col>
            <div>To</div>
            <DateRangePicker
              date={startDate}
              handleDateClick={handleStartDate}
              showPicker={showPicker}
            />
          </Col>
          {/* <div style={{display}}>to</div> */}
          {/* <DateRangePicker
            date={endDate}
            handleDateClick={handleEndDate}
            showPicker={showPicker}
          /> */}
        </DualDateRangePickerDIV>
      ) : null}
    </DateRangeInput>
  );
};

export default DualDateRangePicker;

const DateRangeInput = styled.div`
  position: relative;
`;

const DateInputFeild = styled.div`
  /* width: 311.21px; */
  /* height: 84.17px; */
  background: #4f4f70;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  gap: 1rem;
  padding: 1rem 1rem;
  cursor: pointer;
`;

const DualDateRangePickerDIV = styled.div`
  position: absolute;
  top: 60px;
  left: -16 0px;
  display: flex;
  /* justify-content: space-between; */
  /* width: 100%; */
  /* padding: 10px; */
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  cursor: pointer;
`;

// Path: src/components/DateRangePicker.jsx
