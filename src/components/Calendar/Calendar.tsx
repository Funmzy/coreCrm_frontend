/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./DateRangerPicker.css";

import { fromUnixTime, getMonth, getYear } from "date-fns";
import Button from "../Button/Button";

const years = getYearsBetweenCurrentAndNext5();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type props = {
  setSelectedDate: React.Dispatch<React.SetStateAction<number>>;
  selectedDate: number;
  trigger: React.ReactElement;
  disabled?: boolean;
  withPortal?: boolean;
  inline?: boolean;
  ref?: React.RefObject<any>;
  utc?: boolean;
};
const DatePicker = ({
  setSelectedDate,
  selectedDate,
  disabled,
  withPortal = true,
  inline = false,
  ref,
  trigger,
}: props) => {
  const defaultRef = useRef<any>();

  console.log(fromUnixTime(selectedDate / 1000), "fromUnixTime");

  return (
    <ReactDatePicker
      selected={fromUnixTime(selectedDate / 1000)}
      value={fromUnixTime(selectedDate / 1000).toLocaleDateString()}
      disabled={disabled}
      minDate={new Date()}
      withPortal={withPortal}
      ref={ref ?? defaultRef}
      portalId="ddd"
      inline={inline}
      customInput={trigger}
      onChange={(date: Date | null) => {
        if (date) {
          setSelectedDate(Math.round(date.getTime()));
        }
      }}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
      }) => (
        <div className="flex items-center justify-between px-4">
          <Button
            text="←"
            onClick={decreaseMonth}
            aria-label="Prev page"
            className="text-xs mr-2 py-1"
          ></Button>

          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(+value)}
            className="custom-select"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <Button
            text="→"
            onClick={increaseMonth}
            aria-label="Next page"
            className="text-xs ml-2 py-1"
          ></Button>
        </div>
      )}
    />
  );
};

function getYearsBetweenCurrentAndNext5() {
  const currentYear = new Date().getFullYear();
  const yearsBetween = [];

  for (let year = currentYear; year <= currentYear + 5; year++) {
    yearsBetween.push(year);
  }

  return yearsBetween;
}
export default DatePicker;
