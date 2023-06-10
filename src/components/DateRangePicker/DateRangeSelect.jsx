// A date range picker component using styled-components.

// Path: src/components/DateRangePicker.jsx

import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  addDays,
} from "date-fns";

const DateRangePicker = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    setDate(subMonths(date, 1));
  };

  const handleNextMonth = () => {
    setDate(addMonths(date, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const renderDays = () => {
    // 1. Get the first day of the month
    const monthStart = startOfMonth(date);

    // 2. Get the last day of the month
    const monthEnd = endOfMonth(monthStart);

    // 3. Get the first day of the week
    const startDate = startOfWeek(monthStart);

    // 4. Get the last day of the week
    const endDate = endOfWeek(monthEnd);
    // 5. Format the date
    const dateFormat = "d";
    // 6. Create an array to hold the rows
    const rows = [];
    // 7. Create an array to hold the days
    let days = [];
    // 8. Create a date variable to hold the current day
    let day = startDate;
    // 9. Create a variable to hold the formatted date
    let formattedDate = "";
    // 10. Loop through the days
    while (day <= endDate) {
      // 11. Loop through the days of the week
      for (let i = 0; i < 7; i++) {
        // 12. Format the date
        formattedDate = format(day, dateFormat);
        // 13. Create a clone of the date
        const cloneDay = day;
        // 14. Add the days to the array
        days.push(
          <DateRangePickerBodyCell
            key={day}
            onClick={() => handleDateClick(cloneDay)}
            className={`cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
          >
            <span className="bg">{formattedDate}</span>
          </DateRangePickerBodyCell>
        );

        // 15. Add one day to the current day
        day = addDays(day, 1);
      }

      // 16. Add the days array to the rows array
      rows.push(
        <DateRangePickerBodyRow key={day}>{days}</DateRangePickerBodyRow>
      );

      // 17. Reset the days array
      days = [];
    }

    // 18. Return the rows array
    return rows;
  };

  return (
    <DateRangePickerDIV>
      <DateRangePickerHeader>
        <DateRangePickerHeaderButton onClick={handlePrevMonth}>
          <FaChevronLeft />
        </DateRangePickerHeaderButton>
        <DateRangePickerHeaderTitle>
          {format(date, "MMMM yyyy")}
        </DateRangePickerHeaderTitle>
        <DateRangePickerHeaderButton onClick={handleNextMonth}>
          <FaChevronRight />
        </DateRangePickerHeaderButton>
      </DateRangePickerHeader>
      <DateRangePickerBody>{renderDays()}</DateRangePickerBody>
    </DateRangePickerDIV>
  );
};

export default DateRangePicker;

const DateRangePickerDIV = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 300px;
`;

const DateRangePickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DateRangePickerHeaderButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
`;

const DateRangePickerHeaderTitle = styled.h3`
  margin: 0;
`;

const DateRangePickerBody = styled.div``;

const DateRangePickerBodyRow = styled.div`
  display: flex;
`;

const DateRangePickerBodyCell = styled.div`
  flex: 1;
  padding: 5px;
  text-align: center;
  background-color: ${(props) => (props.active ? "aqua" : "none")};
  .disabled {
    color: #ccc;
  }
  .selected {
    background-color: aqua;
  }
`;
