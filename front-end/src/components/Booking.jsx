import { useState } from "react";

import { IoCalendarNumberOutline } from "react-icons/io5";
import img1 from "../images/gallery/booking.jpg";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { useParams, Link } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

const Booking = () => {
  const { id } = useParams();

  const storedUnavailables = localStorage.getItem(`room_${id}_unavailables`);
  const initialDates = storedUnavailables ? JSON.parse(storedUnavailables) : [];

  const [dates, setDates] = useState(initialDates);
  const [calender, setCalendar] = useState(true);
  const [form, setForm] = useState(false);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
  const roomFn = async (id) => {
    const res = await fetch(`http://localhost:3000/rooms/${id}`);
    if (!res.ok) {
      throw Error("ther is no data");
    }
    return res.json();
  };
  const {
    data: roomData,
    isPending,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: () => roomFn(id),
    initialData: () => queryClient.getQueryData("rooms"),
    placeholderData: keepPreviousData,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate.getTime());
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const allDates = dateRange(date[0].startDate, date[0].endDate);

  const handle = async (e) => {
    e.preventDefault();

    // Fetch the current room data
    const roomRes = await fetch(`http://localhost:3000/rooms/${id}`);
    if (!roomRes.ok) {
      throw Error("Failed to fetch room data");
    }
    const currentRoomData = await roomRes.json();

    // Combine existing and new dates, removing duplicates
    const updatedUnavailables = [...currentRoomData.unavailables, ...allDates];
    // Send a PATCH request to update the unavailables array
    const updateRes = await fetch(`http://localhost:3000/rooms/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ unavailables: updatedUnavailables }),
    });

    if (!updateRes.ok) {
      throw Error("Failed to update room data");
    }

    // Update the local storage with the new dates
    localStorage.setItem(
      `room_${id}_unavailables`,
      JSON.stringify(updatedUnavailables)
    );

    // Update the local state with the new dates
    setDates(updatedUnavailables);
    setCalendar(!calender);
    setForm(!form);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem(`room_${id}_unavailables`);
    // Add additional keys to remove if needed
  };

  // clearLocalStorage();
  return (
    <div>
      <div className="headerimages">
        <img src={img1} alt="" className="detailImg" />

        <Banner title="BOOKING" />
      </div>
      {calender && (
        <div className="calendarContainer">
          <div className="calendarDate">
            <IoCalendarNumberOutline />
            <Link>{`${new Intl.DateTimeFormat("en-us", {
              dateStyle: "full",
              timeStyle: "short",
            }).format(date[0].startDate)} to ${new Intl.DateTimeFormat(
              "en-us",
              {
                dateStyle: "full",
                timeStyle: "short",
              }
            ).format(date[0].endDate)} `}</Link>
          </div>
          <DateRange
            className="calendar"
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
            disabledDates={dates}
          />
          <button type="submit" onClick={handle}>
            submit
          </button>
        </div>
      )}
      {form && (
        <div>
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <h2>LEGEND HOTEL</h2>
            <div>
              <p>Arrival:</p>
              <p>
                {new Intl.DateTimeFormat("en-us", {
                  dateStyle: "full",
                }).format(date[0].startDate)}
              </p>
            </div>
            <div>
              <p>Departure:</p>
              <p>
                {new Intl.DateTimeFormat("en-us", {
                  dateStyle: "full",
                }).format(date[0].endDate + 1)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
