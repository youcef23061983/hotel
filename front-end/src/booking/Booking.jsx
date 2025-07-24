import { useEffect, useState } from "react";
import img1 from "/images/gallery/booking.jpg";
import Banner from "../pages/Banner";
import { useParams } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format, differenceInDays, addDays } from "date-fns";
import BookingUseFetch from "../data managment/BookingUseFetch";
import Calendar from "./Calendar";
import Information from "./Information";
import Payment from "./Payment";
import { AppContext } from "../data managment/AppProvider";
import { useContext } from "react";

const Booking = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(false);
  const [calendar, setCalendar] = useState(true);
  const [payment, setPayment] = useState(false);
  const url = `${import.meta.env.VITE_PROD_URL_URL}/rooms`;
  const {
    data: roomData,
    error,
    isPending,
  } = BookingUseFetch(url, "products", id);
  const { roomUser, user } = useContext(AppContext);
  console.log("booking user", user);

  useEffect(() => {
    document.title = "Booking";
  }, []);
  const [dates, setDates] = useState([]);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dateRange = (startDate, endDate) => {
    const dates = [];
    let current = new Date(startDate);
    while (current <= endDate) {
      dates.push(current.getTime());
      current = new Date(current.setDate(current.getDate() + 1));
    }
    return dates;
  };

  const allDates = dateRange(date[0].startDate, date[0].endDate).map((ms) =>
    format(new Date(ms), "MM/dd/yyyy")
  );

  const arrival = format(date[0].startDate, "MM/dd/yyy");

  const departure = format(addDays(date[0].endDate, 1), "MM/dd/yyy");

  const estimatedTotal = roomData ? roomData.price * allDates.length : 0;

  useEffect(() => {
    if (roomData?.unavailables) {
      const parsedDates = roomData.unavailables.map((date) => new Date(date));

      setDates(parsedDates);
    }
  }, [roomData]);

  // const handleChange = (e) => {
  //   const { type, name, value, checked } = e.target;

  //   roomUser({ ...user, [name]: type === "checkbox" ? checked : value });
  // };
  const handleDateChange = (item) => {
    const arrival = format(item.selection.startDate, "MM/dd/yyyy");
    const departure = format(addDays(item.selection.endDate, 1), "MM/dd/yyy");
    const allDates = dateRange(
      item.selection.startDate,
      item.selection.endDate
    ).map((ms) => format(new Date(ms), "MM/dd/yyyy"));

    const numberOfNights =
      differenceInDays(item.selection.endDate, item.selection.startDate) + 1;
    const price = roomData ? roomData.price : 0;

    const total = roomData ? roomData.price * numberOfNights : 0;

    roomUser({
      ...user,
      arrival: arrival,
      departure: departure,
      dates: allDates,
      price,
      total,
      room_id: id,
    });

    setDate([item.selection]);
  };
  const openPatmentcloseInfo = () => {
    setInfo(!info);
    setPayment(!payment);
  };
  const openInfocloseCalendar = () => {
    setInfo(!info);
    setCalendar(!calendar);
  };

  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;
  return (
    <div>
      <div className="headerimages" data-testid="booking-div">
        <img
          src={img1}
          alt="calendarImg"
          loading="lazy"
          className="detailImg"
        />

        <Banner title="BOOKING" />
      </div>
      {calendar && (
        <Calendar
          arrival={arrival}
          departure={departure}
          open={openInfocloseCalendar}
          date={date}
          setDate={setDate}
          handleDateChange={handleDateChange}
          dates={dates}
          roomData={roomData}
        />
      )}
      {info && (
        <Information
          handleDateChange={handleDateChange}
          estimatedTotal={estimatedTotal}
          // handleChange={handleChange}
          open={openPatmentcloseInfo}
        />
      )}
      {payment && (
        <Payment id={id} estimatedTotal={estimatedTotal} allDates={allDates} />
      )}
    </div>
  );
};

export default Booking;
