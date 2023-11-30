import React, { useState, forwardRef, useImperativeHandle } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.scss";

const CalendarComponent = forwardRef((props, ref) => {
  const { isValidDate } = props;
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [formattedDateIn, setFormattedDateIn] = useState(null);
  const [formattedDateOut, setFormattedDateOut] = useState(null);
  const [activeCheck, setActiveCheck] = useState("CheckIn");
  const [isShow, setIsShow] = useState(true);

  const formatDate = (date) => {
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    setFormattedDateIn(formatDate(date));
  };
  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
    setFormattedDateOut(formatDate(date));
    isValidDate();
  };

  const handleCheckIn = () => {
    setActiveCheck("CheckIn");
    setIsShow(true);
  };

  const handleCheckOut = () => {
    setActiveCheck("CheckOut");
    setIsShow(true);
  };
  useImperativeHandle(ref, () => ({
    FetchDates() {
      return {
        checkIn: checkInDate,
        checkOut: checkOutDate,
      };
    },
  }));
  return (
    <div className="calendar">
      <div className="button">
        <button onClick={() => handleCheckIn()} className={activeCheck === "CheckIn" ? "btn check-active" : "btn"}>
          {formattedDateIn ? formattedDateIn : "Check In"}
        </button>
        <button onClick={() => handleCheckOut()} className={activeCheck === "CheckOut" ? "btn check-active" : "btn"}>
          {formattedDateOut ? formattedDateOut : "Check Out"}
        </button>
      </div>
      {isShow ? (
        <div className="check-in">
          {activeCheck === "CheckIn" && <Calendar onChange={handleCheckInChange} value={checkInDate} />}
          {activeCheck === "CheckOut" && <Calendar onChange={handleCheckOutChange} value={checkOutDate} />}
        </div>
      ) : null}
    </div>
  );
});

export default CalendarComponent;
