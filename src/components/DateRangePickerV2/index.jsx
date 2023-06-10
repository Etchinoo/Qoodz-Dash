import React, { useEffect, useRef, useState } from "react";
import {
  FaCalendar,
  FaCalendarAlt,
  FaChevronDown,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import styled from "styled-components";
import { PrimaryBtn } from "../../pages/Cashires/FormComponents.styles";
import { Col, Row } from "../Shared";

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const DateRangePickerV2 = ({
  options,
  withOptions = false,
  placeHolder,
  setselectedDate,
}) => {
  const [open, setOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [displayValue, setDisplayValue] = useState("From - To");

  //a function to close the date picker when clicked outside using useRef hook
  const ref = useRef();
  useClickOutside(ref, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (setselectedDate) setselectedDate({ fromDate, toDate });
  }, [fromDate, toDate]);

  const DSF = (date) => {
    // convert date string from  2023-04-08 to 8 Apr
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  const setDisplay = (from, to) => {
    if (from && to) {
      setDisplayValue(`${DSF(from)} - ${DSF(to)}`);
    } else if (from) {
      setDisplayValue(`${DSF(from)} -`);
    } else if (to) {
      setDisplayValue(`- ${DSF(to)}`);
    } else {
      setDisplayValue("From - To");
    }
  };

  const onAction = (action) => {
    switch (action) {
      case "save":
        setDisplay(fromDate, toDate);
        setOpen(false);
        break;
      case "clear":
        setFromDate("");
        setToDate("");
        break;
      default:
        break;
    }
  };

  return (
    <CalContainer>
      <Container>
        <Row gap={"28px"} onClick={() => setOpen(!open)}>
          <Text>{displayValue}</Text>
          {open ? <FaAngleUp /> : <FaAngleDown />}
        </Row>
      </Container>
      {open && (
        <OptionsContainer ref={ref}>
          <OptionsList>
            <CustomRange>
              <Row spread>
                <Text>From</Text>
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Row>
              <Row spread>
                <Text>To</Text>
                <Input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Row>
            </CustomRange>
          </OptionsList>

          <Row spread mt={"8px"}>
            <Actions onClick={() => onAction("save")}>Save</Actions>
            <Actions skelaton onClick={() => onAction("clear")}>
              Clear
            </Actions>
          </Row>
        </OptionsContainer>
      )}
    </CalContainer>
  );
};

export default DateRangePickerV2;

const CalContainer = styled.div`
  position: relative;
`;
const Container = styled.div`
  display: flex;
  // width: max-content;
  justify-content: space-between;
  text-align: center;
  border-radius: 15px;
  background: #f7f7fc;
  box-sizing: border-box;
  padding: 18px 24px;
  height: 100%;
  position: relative;
  color: #939baf;
  cursor: pointer;
  font-family: "Gilroy-Medium";
  font-size: 24px;
  line-height: 28px;
`;

const Text = styled.span`
  color: rgb(147, 155, 175);
  text-overflow: ellipsis;
  font-size: 18px;
  font-family: GilroyMedium, sans-serif;
  /* font-weight: initial; */
  /* line-height: 28px; */
  text-align: left;
`;

const OptionsContainer = styled.div`
  width: 300px;
  /* background-color: yellow; */
  position: absolute;
  margin-top: 2%;
  /* left: 10px; */
  border-radius: 15px;
  background-color: rgb(247, 247, 252);
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 18px 24px;
  z-index: 1;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionItem = styled.li`
  font-size: 18px;
  font-family: GilroyMedium, sans-serif;
  cursor: pointer;
  border-bottom: 1px solid rgba(115, 112, 113, 0.37);
`;

const CustomRange = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Input = styled.input`
  border: solid 1px rgba(115, 112, 113, 0.37);
  border-radius: 15px;
  font-family: GilroyRegular, sans-serif;
  padding: 1rem;
  margin-top: 8px;
  border-radius: 15px;
  background-color: rgb(247, 247, 252);
  box-sizing: border-box;

  /* padding: 18px 24px; */
`;

const Actions = styled.button`
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  text-overflow: ellipsis;
  font-size: 18px;
  background-color: transparent;
  font-family: GilroyMedium, sans-serif;
  /* font-weight: initial; */
  /* line-height: 28px; */
  text-align: left;
  cursor: pointer;
`;
