import moment from "moment";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";


export default function BookMovieLayout() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().unix());
  const [selectedTime, setSelectedTime] = useState("");
  const [showtimeID, setShowtimeID] = useState(null);

//   useEffect(() => {
//     setSelectedCity("");
//     setSelectedDate(moment().unix());
//     setSelectedTime("");
//     setSelectedTheater(null);
//   }, []);

  return (
    <Outlet
      context={{
        selectedCity,
        setSelectedCity,
        selectedDate,
        selectedTheater,
        selectedTime,
        setSelectedDate,
        setSelectedTheater,
        setSelectedTime,
        showtimeID, setShowtimeID
      }}
    />
  );
}
