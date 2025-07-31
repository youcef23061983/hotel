import UseFetch from "../data managment/UseFetch";
import Banner from "../pages/Banner";
import img from "/images/header/order.jpg";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaCreditCard, FaHotel } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import BookingUseFetch from "../data managment/BookingUseFetch";

const Order = () => {
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const url = `${
    import.meta.env.VITE_PROD_URL_URL
  }/order?session_id=${sessionId}`;

  const key = "order";

  const { data: order, error, isPending } = UseFetch(url, key);
  const id = order?.room_id;
  console.log("order booking data", order);
  const detailurl = `${import.meta.env.VITE_PROD_URL_URL}/rooms`;
  const {
    data: roomData,
    error: detailRoomerror,
    isPending: detailRoompending,
  } = BookingUseFetch(id ? detailurl : null, "room", id);
  console.log("order roomdata", roomData);

  if (isPending || detailRoompending)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error || detailRoomerror)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">Error Loading Order</h2>
        <p className="mt-2 text-gray-600">
          {error?.message || detailRoomerror?.message}
        </p>
      </div>
    );

  if (!order || !roomData)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Booking Found</h2>
        <p className="mt-2 text-gray-600">
          We couldn't find your booking details
        </p>
      </div>
    );

  // Calculate nights stayed
  const nights = order.dates ? order.dates.length : 1;
  const arrivalDate = new Date(order.arrival).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const departureDate = new Date(order.departure).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Room details
  const roomImage = roomData.images?.[0] || img;
  const roomName = roomData.name || "Deluxe Room";
  const roomType = roomData.type || "Standard";
  const roomPrice = roomData.price || order.price;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Banner */}
      <div
        className="headerimages"
        style={{
          background: `url(${img}) center/cover `,
        }}
      >
        <Banner title="YOUR RECEIPT" />
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 py-12 -mt-16 relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Confirmation Card */}
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto"
          variants={itemVariants}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primaryDark to-primary py-8 px-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">
              TROPICAL PARADISE RESORT
            </h1>
            <p className="mt-2 opacity-90">Your booking is confirmed</p>
            <div className="mt-4 bg-white bg-opacity-20 inline-block px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                CONFIRMATION #{order.transaction_id?.slice(-8)}...
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            {/* Guest Information */}
            <motion.div className="mb-8" variants={itemVariants}>
              <h2 className="text-xl font-semibold text-primaryDark mb-4 flex items-center">
                <FaUser className="mr-2" /> Guest Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">
                    {order.firstname} {order.lastname}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{order.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{order.phonenumber}</span>
                </div>
              </div>
            </motion.div>

            {/* Booking Details */}
            <motion.div className="mb-8" variants={itemVariants}>
              <h2 className="text-xl font-semibold text-primaryDark mb-4 flex items-center">
                <FaHotel className="mr-2" /> Booking Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-2 text-sm" />
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Dates
                      </p>
                      <p className="font-medium text-sm">
                        {arrivalDate} - {departureDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                      Nights
                    </p>
                    <p className="font-medium text-sm">{nights}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-md bg-primary bg-opacity-10 flex items-center justify-center mr-2">
                      <FaHotel className="text-primary text-sm" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Room Type
                      </p>
                      <p className="font-medium text-sm">
                        {roomName}{" "}
                        <span className="text-gray-400">({roomType})</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                      Nightly Rate
                    </p>
                    <p className="font-medium text-sm">
                      {typeof roomPrice === "number"
                        ? roomPrice.toFixed(2)
                        : roomPrice}{" "}
                      {order.currency}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Room Image */}
            <motion.div className="mb-8" variants={itemVariants}>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={roomImage}
                  alt={roomName}
                  className="w-full h-48 object-cover"
                />
                <div className="bg-gray-50 p-3">
                  <p className="text-sm text-gray-600">
                    {roomData.introduction ||
                      "Your luxurious accommodation awaits"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div className="mb-8" variants={itemVariants}>
              <h2 className="text-xl font-semibold text-primaryDark mb-4 flex items-center">
                <FaCreditCard className="mr-2" /> Payment Information
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium flex items-center">
                    {order.payment === "stripe" ? (
                      <>
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded mr-2">
                          CARD
                        </span>
                        •••• {order.last4}
                      </>
                    ) : (
                      order.payment?.toUpperCase()
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium text-sm">
                    {order.transaction_id}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Total Amount */}
            <motion.div
              className="bg-primary bg-opacity-5 rounded-lg p-6 mb-6"
              variants={itemVariants}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-primaryDark">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-primary">
                  {order.total} {order.currency}
                </span>
              </div>
            </motion.div>

            {/* Help Section */}
            <motion.div
              className="text-center text-sm text-gray-600"
              variants={itemVariants}
            >
              <p>Need help with your booking?</p>
              <p className="mt-1">
                Contact our reservations team at{" "}
                <span className="text-primary font-medium">
                  reservations@tropical.com
                </span>
              </p>
              <p className="mt-4 text-xs text-gray-400">
                Booking reference: {order.transaction_id}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          className="max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-md p-6"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-primaryDark mb-4">
            What's Next?
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                <FaCalendarAlt className="text-primary" />
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium">Pre-arrival email</p>
                <p className="text-sm text-gray-600">
                  We'll send you check-in instructions 3 days before your
                  arrival
                </p>
              </div>
              <IoIosArrowForward className="text-gray-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Order;
