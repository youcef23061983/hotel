import { motion } from "framer-motion";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import { AppContext } from "../data managment/AppProvider";
import { useContext } from "react";

const Calendar = ({
  arrival,
  departure,
  date,
  dates,
  open,
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

  // Check if selected dates are disabled
  const isDateRangeDisabled = () => {
    if (!date[0]?.startDate || !date[0]?.endDate) return false;

    const selectedStart = new Date(date[0].startDate);
    const selectedEnd = new Date(date[0].endDate);

    // Check if any date in the selected range is disabled
    for (
      let d = new Date(selectedStart);
      d <= selectedEnd;
      d.setDate(d.getDate() + 1)
    ) {
      if (
        dates.some((disabledDate) => {
          const disabled = new Date(disabledDate);
          return d.toDateString() === disabled.toDateString();
        })
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = () => {
    if (isDateRangeDisabled()) {
      alert("Selected dates are not available. Please choose different dates.");
      return;
    }

    open();
    addToCart(roomData);
  };
  console.log("select test", date);

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
        minDate={date[0]?.startDate}
        disabledDates={dates}
      />
      <motion.button
        className="link-btn"
        variants={calendarchildVariants}
        onClick={handleSubmit}
      >
        submit
      </motion.button>
    </motion.div>
  );
};

export default Calendar;
