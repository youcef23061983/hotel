import { motion } from "framer-motion";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import { AppContext } from "../pages/AppProvider";
import { useContext } from "react";

const Calendar = ({
  arrival,
  departure,
  date,
  dates,
  setInfo,
  info,
  setCalendar,
  calendar,
  handleDateChange,
  roomData,
}) => {
  const { addToCart } = useContext(AppContext);

  const calendarVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        type: "spring",
        when: "beforeChildren",
        staggerChildren: 0.5,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut", type: "spring", duration: 2 },
    },
  };
  const calendarchildVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="calendarContainer"
      variants={calendarVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h2 variants={calendarchildVariants}>SELECT YOUR DATES</motion.h2>
      <motion.div className="calendar" variants={calendarchildVariants}>
        <IoCalendarNumberOutline />

        <Link>
          {arrival} to {departure}{" "}
        </Link>
      </motion.div>
      <DateRange
        className="calendar"
        editableDateInputs={true}
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
        ranges={date}
        minDate={date[0].startDate}
        disabledDates={dates}
      />
      <motion.button
        className="link-btn"
        variants={calendarchildVariants}
        onClick={() => {
          setInfo(!info);
          setCalendar(!calendar);
          addToCart(roomData);
        }}
      >
        submit
      </motion.button>
    </motion.div>
  );
};

export default Calendar;
