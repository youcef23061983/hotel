// import UseFetch from "../data managment/UseFetch";
// import Banner from "../pages/Banner";
// import img from "/images/header/order.jpg";
// import { useScroll, useTransform, motion } from "framer-motion";

// const Order = () => {
//   const sessionId = new URLSearchParams(window.location.search).get(
//     "sessionId"
//   );
//   const informationVariants = {
//     hidden: { x: "100vw", opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 1.5,
//         type: "spring",
//         when: "beforeChildren",
//         staggerChildren: 0.5,
//       },
//     },
//   };

//   const url = `${
//     import.meta.env.VITE_PROD_URL_URL
//   }/order?sessionId=${sessionId}`;

//   const key = "order";

//   const { data: order, error, isPending } = UseFetch(url, key);
//   const {
//     room_id,
//     tbluser_id,
//     arrival,
//     departure,
//     dates,
//     price,
//     total,
//     title,
//     firstname,
//     lastname,
//     countrycode,
//     phonenumber,
//     email,
//     country,
//     city,
//     nationality,
//     termscondition,
//     payment,
//     emailme,
//     transactionId,
//     last4,
//     postalCode,
//     currency,
//   } = order;
//   console.log("order data", order);

//   if (isPending) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!order) return <div>No booking data found</div>;

//   return (
//     <div>
//       <div
//         className="headerimages"
//         style={{
//           background: `url(${img}) center/cover `,
//         }}
//       >
//         <Banner title="YOUR RECEIPT" />
//       </div>
//       <motion.div
//         className="information"
//         variants={informationVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         <div
//           class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
//           style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 0.75rem;"
//         >
//           <div
//             class="p-6 text-white"
//             style="background: linear-gradient(135deg, #22258a, rgb(14, 15, 56));"
//           >
//             <h1 class="text-2xl font-bold">TROPICAL PARADISE RESORT</h1>
//             <p class="opacity-90 mt-1">Booking Confirmation</p>
//           </div>

//           <div class="p-6 border-b" style="border-bottom: 1px solid #e5e7eb;">
//             <div class="flex justify-between">
//               <span class="font-medium" style="color: #3d3e56;">
//                 Guest:
//               </span>
//               <span>John Doe</span>
//             </div>
//             <div class="flex justify-between mt-2">
//               <span class="font-medium" style="color: #3d3e56;">
//                 Booking #:
//               </span>
//               <span>RES-2024-0567</span>
//             </div>
//           </div>

//           <div class="p-6">
//             <div
//               class="flex justify-between py-2 border-b"
//               style="border-bottom: 1px solid #e5e7eb;"
//             >
//               <span class="font-medium" style="color: #3d3e56;">
//                 Room:
//               </span>
//               <span>Deluxe Ocean View</span>
//             </div>
//             <div
//               class="flex justify-between py-2 border-b"
//               style="border-bottom: 1px solid #e5e7eb;"
//             >
//               <span class="font-medium" style="color: #3d3e56;">
//                 Dates:
//               </span>
//               <span>Jul 20 - 25, 2024 (5 nights)</span>
//             </div>
//             <div
//               class="flex justify-between py-2 border-b"
//               style="border-bottom: 1px solid #e5e7eb;"
//             >
//               <span class="font-medium" style="color: #3d3e56;">
//                 Guests:
//               </span>
//               <span>2 Adults</span>
//             </div>
//             <div
//               class="flex justify-between py-2 border-b"
//               style="border-bottom: 1px solid #e5e7eb;"
//             >
//               <span class="font-medium" style="color: #3d3e56;">
//                 Payment:
//               </span>
//               <span>VISA •••• 4242</span>
//             </div>
//           </div>

//           <div
//             class="p-4 bg-gray-50 mx-6 mb-6 rounded-lg"
//             style="background-color: #f9fafb; border-radius: 0.5rem;"
//           >
//             <div class="flex justify-between font-bold">
//               <span style="color: #22258a;">Total:</span>
//               <span style="color: #22258a;">$1,250.00 USD</span>
//             </div>
//           </div>

//           <div class="px-6 pb-6 text-center text-sm" style="color: #3d3e56;">
//             <p>Thank you for choosing Tropical Paradise Resort!</p>
//             <p class="mt-2">For questions: reservations@tropical.com</p>
//             <p class="mt-4 text-xs opacity-75">
//               Booking ID: PI_3PJz6v2eZvKYlo2C
//             </p>
//           </div>
//         </div>{" "}
//       </motion.div>
//     </div>
//   );
// };

// export default Order;

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
          <div className="bg-gradient-to-r from-primaryDark to-primary py-8 px-6 text-center text-white">
            <h1 className="text-2xl md:text-3xl font-bold">
              TROPICAL PARADISE RESORT
            </h1>
            <p className="mt-2 opacity-90">Your booking is confirmed</p>
            <div className="mt-4 bg-white bg-opacity-20 inline-block px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                CONFIRMATION #{order.transaction_id?.slice(-8)}
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
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-gray-500">Dates</p>
                      <p className="font-medium">
                        {arrivalDate} - {departureDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Nights</p>
                    <p className="font-medium">{nights}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-md bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                      <FaHotel className="text-primary" />
                    </div>
                    <div>
                      <p className="text-gray-500">Room Type</p>
                      <p className="font-medium">
                        {roomName} ({roomType})
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Nightly Rate</p>
                    <p className="font-medium">
                      {roomPrice} {order.currency}
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
