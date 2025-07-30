// import { useContext, useEffect, useState } from "react";
// import Checkout from "./Checkout";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { motion } from "framer-motion";
// import CheckoutForm from "./CheckoutForm";
// import { useCallback } from "react";
// import { AppContext } from "../data managment/AppProvider";
// import { FcCheckmark } from "react-icons/fc";
// import { Link } from "react-router-dom";
// import {
//   FaCcPaypal,
//   FaCcStripe,
//   FaUmbrellaBeach,
//   FaCocktail,
//   FaSpa,
// } from "react-icons/fa";
// import { useMutation } from "@tanstack/react-query";

// const Payment = ({ estimatedTotal, allDates, id }) => {
//   const { user, room, roomPayment, payment, roomUser, formUser, firebaseUser } =
//     useContext(AppContext);

//   const [paymentSucceeded, setPaymentSucceeded] = useState(false);
//   const [stripePromise, setStripePromise] = useState(null);
//   const [clientSecret, setClientSecret] = useState(null);

//   const total = user?.total || 0;
//   const paymentUrl = import.meta.env.VITE_PROD_URL_URL;

//   useEffect(() => {
//     fetch(`${paymentUrl}/config`)
//       .then(async (r) => {
//         const { publishableKey } = await r.json();
//         setStripePromise(loadStripe(publishableKey));
//       })
//       .catch((error) => console.error("Error fetching config:", error));
//   }, []);

//   useEffect(() => {
//     fetch(`${paymentUrl}/create-payment-intent`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ total }),
//     })
//       .then(async (r) => {
//         if (!r.ok) {
//           throw new Error("Failed to fetch client secret");
//         }
//         const { clientSecret } = await r.json();
//         setClientSecret(clientSecret);
//       })
//       .catch((error) => console.error("Error fetching client secret:", error));
//   }, []);

//   const handleChange = useCallback(
//     (e) => {
//       const { name, value } = e.target;
//       roomPayment({
//         ...payment,
//         [name]: value,
//       });
//       roomUser({
//         ...user,
//         payment: value,
//         tbluser_id: formUser?.user?.id || firebaseUser?.id,
//       });
//     },
//     [payment, roomPayment]
//   );

//   const url = `${import.meta.env.VITE_PROD_URL_URL}/rooms`;
//   console.log("this is the payment method", payment);
//   console.log("this is the user", user);
//   console.log("form user", formUser?.user?.id);
//   console.log("firebase user", firebaseUser?.id);

//   const patchData = async () => {
//     const updatedUnavailables = room ? [...room.unavailables, ...allDates] : [];

//     const updateRes = await fetch(`${url}/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ unavailables: updatedUnavailables }),
//     });
//   };

//   const { data: add, mutate: unavailableData } = useMutation({
//     mutationFn: patchData,
//   });

//   const bookingFun = async () => {
//     const res = await fetch(`${import.meta.env.VITE_PROD_URL_URL}/bookings`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });
//   };

//   const { data: addBooking, mutate: bookingMutate } = useMutation({
//     mutationFn: bookingFun,
//   });
//   const handleSuccess = useCallback(() => {
//     setPaymentSucceeded(true);
//     unavailableData();
//     bookingMutate();
//   }, [unavailableData, bookingMutate]);

//   const paypalClienId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
//   const initialOptions = {
//     "client-id": paypalClienId,
//     currency: "USD",
//     intent: "capture",
//     components: "buttons",
//     locale: "en_US",
//   };

//   const containerVariants = {
//     hidden: { x: "100vw", opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         type: "spring",
//         stiffness: 50,
//         when: "beforeChildren",
//         staggerChildren: 0.2,
//       },
//     },
//     exit: {
//       x: "-100vw",
//       transition: { ease: "easeInOut" },
//     },
//   };

//   const childVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <div className="min-h-screen bg-[#edeeff] flex items-center justify-center p-4">
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         className="w-full bg-[#edeeff] flex flex-col items-center justify-center p-4"
//       >
//         {/* Tropical Benefits Side */}
//         <div
//           className="w-full md:w-1/2 bg-gradient-to-br from-[#22258a] to-[#0e0f38] text-white p-10 flex flex-col justify-between
//              shadow-[8px_0_15px_-5px_rgba(0,0,0,0.2)]
//              rounded-3xl border border-white/10"
//         >
//           <motion.div variants={childVariants}>
//             <h2 className="text-4xl font-bold mb-4 font-serif text-center">
//               Your <span className="text-yellow-400">Tropical</span> Getaway
//             </h2>
//             <p className="text-yellow-100 mb-6">
//               Complete your booking and start your paradise experience
//             </p>

//             <div className="mb-8">
//               <h3 className="text-xl font-semibold mb-4 text-yellow-100">
//                 Booking Summary
//               </h3>
//               <div className="space-y-3">
//                 <p className="flex justify-between text-gray-700">
//                   <span className="font-medium text-[#0e0f38]">Room:</span>
//                   <span className="font-semibold text-[#22258a]">
//                     {room?.name || "Deluxe Suite"}
//                   </span>
//                 </p>
//                 <p className="flex justify-between text-gray-700">
//                   <span className="font-medium text-[#0e0f38]">Duration:</span>
//                   <span className="font-semibold text-[#22258a]">
//                     {user?.dates?.length || "3"} nights
//                   </span>
//                 </p>
//                 <p className="flex justify-between text-gray-700">
//                   <span className="font-medium text-[#0e0f38]">Guests:</span>
//                   <span className="font-semibold text-[#22258a]">
//                     {room?.capacity?.number || "2"} people
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <div className="border-t border-yellow-400/30 pt-6">
//               <p className="flex justify-between items-center text-xl font-bold">
//                 <span className="text-[#0e0f38]">Total:</span>
//                 <span className="text-2xl text-[#22258a]">
//                   {estimatedTotal.toFixed(2)} $
//                 </span>
//               </p>
//             </div>

//             <div className="mt-8 grid grid-cols-3 gap-4">
//               <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center">
//                 <FaUmbrellaBeach className="text-yellow-400 mx-auto text-xl mb-1" />
//                 <p className="text-yellow-100 text-sm">Private Beach</p>
//               </div>
//               <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center">
//                 <FaCocktail className="text-yellow-400 mx-auto text-xl mb-1" />
//                 <p className="text-yellow-100 text-sm">Welcome Drink</p>
//               </div>
//               <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center">
//                 <FaSpa className="text-yellow-400 mx-auto text-xl mb-1" />
//                 <p className="text-yellow-100 text-sm">Spa Access</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Payment Form Side */}
//         <div className="w-full md:w-1/2 p-8 md:p-10">
//           <motion.div variants={childVariants}>
//             <h3 className="text-2xl font-bold text-[#0e0f38] mb-6">
//               Payment Method
//             </h3>

//             <form className="space-y-6 mb-20">
//               <div className="space-y-4">
//                 <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#22258a] transition-colors cursor-pointer">
//                   <input
//                     type="radio"
//                     id="paypal"
//                     name="payment"
//                     value="paypal"
//                     onChange={handleChange}
//                     checked={payment.payment === "paypal"}
//                     className="h-5 w-5 text-[#22258a] focus:ring-[#22258a]"
//                   />
//                   <div className="flex items-center space-x-2">
//                     <FaCcPaypal className="text-2xl text-blue-600" />
//                     <span className="font-medium">PayPal</span>
//                   </div>
//                 </label>

//                 <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#22258a] transition-colors cursor-pointer">
//                   <input
//                     type="radio"
//                     id="stripe"
//                     name="payment"
//                     value="stripe"
//                     onChange={handleChange}
//                     checked={payment.payment === "stripe"}
//                     className="h-5 w-5 text-[#22258a] focus:ring-[#22258a]"
//                   />
//                   <div className="flex items-center space-x-2">
//                     <FaCcStripe className="text-2xl text-purple-600" />
//                     <span className="font-medium">Stripe</span>
//                   </div>
//                 </label>
//               </div>
//             </form>

//             {payment.payment === "paypal" && (
//               <motion.div variants={childVariants}>
//                 <PayPalScriptProvider options={initialOptions}>
//                   <Checkout onSuccess={handleSuccess} />
//                 </PayPalScriptProvider>
//               </motion.div>
//             )}

//             {payment.payment === "stripe" && stripePromise && clientSecret && (
//               <motion.div variants={childVariants}>
//                 <Elements stripe={stripePromise} options={{ clientSecret }}>
//                   <CheckoutForm onSuccess={handleSuccess} />
//                 </Elements>
//               </motion.div>
//             )}
//             {paymentSucceeded && (
//               <div className="success">
//                 <button className="success-btn">
//                   <FcCheckmark />
//                 </button>
//                 <h1>congratulations your room has been booked successfully</h1>
//                 <div className="success-div">
//                   <motion.div
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-[#22258a] to-[#0e0f38] hover:from-[#0e0f38] hover:to-[#22258a] text-white py-3 rounded-lg font-bold text-md transition-all duration-300 shadow-md hover:shadow-lg text-center"
//                   >
//                     Complete Booking
//                   </motion.div>
//                   <Link
//                     to={`/rooms/${id}`}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-[#22258a] to-[#0e0f38] hover:from-[#0e0f38] hover:to-[#22258a] text-white py-3 rounded-lg font-bold text-md transition-all duration-300 shadow-md hover:shadow-lg text-center"
//                   >
//                     {`back to your ${room?.type}`}{" "}
//                   </Link>
//                   <Link
//                     to="/rooms"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-[#22258a] to-[#0e0f38] hover:from-[#0e0f38] hover:to-[#22258a] text-white py-3 rounded-lg font-bold text-md transition-all duration-300 shadow-md hover:shadow-lg text-center"
//                   >
//                     back to your rooms
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Payment;

import { useContext, useEffect, useState } from "react";
import Checkout from "./Checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { AppContext } from "../data managment/AppProvider";
import { FcCheckmark } from "react-icons/fc";
import { Link } from "react-router-dom";
import {
  FaCcPaypal,
  FaCcStripe,
  FaUmbrellaBeach,
  FaCocktail,
  FaSpa,
} from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";

const Payment = ({ estimatedTotal, allDates, id }) => {
  const { user, room, roomPayment, payment, roomUser, formUser, firebaseUser } =
    useContext(AppContext);

  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = parseFloat(user?.total.toFixed(2));
  console.log("total", typeof total, parseFloat(user?.total.toFixed(2)));

  const paymentUrl = import.meta.env.VITE_PROD_URL_URL;

  useEffect(() => {
    fetch(`${paymentUrl}/config`)
      .then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey, { locale: "en" }));
      })
      .catch((error) => console.error("Error fetching config:", error));
  }, []);

  // useEffect(() => {
  //   fetch(`${paymentUrl}/create-payment-intent`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ total }),
  //   })
  //     .then(async (r) => {
  //       if (!r.ok) {
  //         throw new Error("Failed to fetch client secret");
  //       }
  //       const { clientSecret } = await r.json();
  //       setClientSecret(clientSecret);
  //     })
  //     .catch((error) => console.error("Error fetching client secret:", error));
  // }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      roomPayment({
        ...payment,
        [name]: value,
      });
      roomUser({
        ...user,
        payment: value,
        tbluser_id: formUser?.user?.id || firebaseUser?.id,
      });
    },
    [payment, roomPayment]
  );

  const url = `${import.meta.env.VITE_PROD_URL_URL}/rooms`;
  console.log("this is the payment method", payment);
  console.log("this is the user", user);

  console.log("form user id ", formUser?.user?.id);
  console.log("formUser user", formUser);
  const price = user?.price;
  console.log("price type", typeof price);

  console.log("room data id type ", room?.id, typeof room?.id);
  const idd = formUser?.user?.id || firebaseUser?.id;
  console.log("tblid type", typeof idd, idd);

  const patchData = async () => {
    const updatedUnavailables = room ? [...room.unavailables, ...allDates] : [];

    const updateRes = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ unavailables: updatedUnavailables }),
    });
  };

  const { data: add, mutate: unavailableData } = useMutation({
    mutationFn: patchData,
  });

  const bookingFun = async () => {
    const res = await fetch(`${import.meta.env.VITE_PROD_URL_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  const { data: addBooking, mutate: bookingMutate } = useMutation({
    mutationFn: bookingFun,
  });
  console.log("dates array", user?.dates);

  console.log(
    "dates without an array",
    Array.isArray(user?.dates)
      ? user.dates.join(",")
      : typeof user?.dates === "string"
      ? user.dates
      : ""
  );
  console.log("allDates", allDates);
  // const formatDateForBackend = (dateStr) => {
  //   const [month, day, year] = dateStr.split("/");
  //   return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  // };

  const formatDateForBackend = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") {
      console.error("Invalid date string:", dateStr);
      return ""; // or throw an error? but we don't want to break the whole process
    }
    const parts = dateStr.split("/");
    if (parts.length !== 3) {
      // Maybe it's already in YYYY-MM-DD format?
      // Check if it matches YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return dateStr;
      }
      console.error("Invalid date format:", dateStr);
      return "";
    }
    const [month, day, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  // Alternatively, we can do:

  // const formatDateForBackend = (dateStr) => {
  //   if (!dateStr) return '';
  //   // If already in YYYY-MM-DD, return as is.
  //   if (typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
  //     return dateStr;
  //   }
  //   // Otherwise, try to parse as MM/DD/YYYY
  //   const parts = dateStr.split('/');
  //   if (parts.length !== 3) {
  //     console.error('Invalid date format (expected MM/DD/YYYY):', dateStr);
  //     return '';
  //   }
  //   const [month, day, year] = parts;
  //   return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  // };
  console.log(
    "formatedDate",
    Array.isArray(user?.dates)
      ? user.dates.map((date) => formatDateForBackend(date)).join(", ")
      : typeof user?.dates === "string"
      ? formatDateForBackend(user.dates)
      : ""
  );
  const updatedUnavailables = room ? [...room.unavailables, ...allDates] : [];

  console.log(
    "unavailables new",
    Array.isArray(updatedUnavailables)
      ? updatedUnavailables.map((date) => formatDateForBackend(date)).join(", ")
      : typeof updatedUnavailables === "string"
      ? formatDateForBackend(updatedUnavailables)
      : ""
  );

  const handleStripeCheckout = async () => {
    const primaryRoom = Array.isArray(room) ? room[0] : room;
    console.log("primary room", primaryRoom);
    const updatedUnavailables = room ? [...room.unavailables, ...allDates] : [];
    console.log("unavailables", updatedUnavailables);

    setIsSubmitting(true);
    try {
      const metadata = {
        firstname: String(user?.firstName || ""),
        lastname: String(user?.lastName || ""),
        fullName: String(
          formUser?.user?.username || `${user?.firstName} ${user?.lastName}`
        ),
        title: String(user?.title || ""),
        arrival: String(user?.arrival || ""),
        departure: String(user?.departure || ""),
        email: String(
          formUser?.user?.email || firebaseUser?.email || user?.email || ""
        ),
        city: String(user?.city || ""),
        country: String(user?.country || ""),
        nationality: String(user?.nationality || ""),
        dates: Array.isArray(user?.dates)
          ? user.dates.map((date) => formatDateForBackend(date)).join(", ")
          : typeof user?.dates === "string"
          ? formatDateForBackend(user.dates)
          : "",
        // dates: formattedDate,

        price: String(user?.price || ""),
        total: String(user?.total?.toFixed(2) || "0.00"),
        phonenumber: String(user?.fullPhone || ""),
        countrycode: String(user?.countryCode || ""),
        termscondition: String(user?.termsCondition || "off"),
        emailme: String(user?.emailMe || "off"),
        room_id: String(room?.id || ""),
        room: JSON.stringify({
          id: primaryRoom?.id,
          name: primaryRoom?.name,
          price: primaryRoom?.price,
          image: primaryRoom?.images?.[0],
        }),
        days: String(user?.dates?.length || ""),
        payment: String(user?.payment || ""),
        tbluser_id: String(formUser?.user?.id || firebaseUser?.id || ""),
        updatedUnavailables: Array.isArray(updatedUnavailables)
          ? updatedUnavailables
              .map((date) => formatDateForBackend(date))
              .join(", ")
          : typeof updatedUnavailables === "string"
          ? formatDateForBackend(updatedUnavailables)
          : "",

        // Company info
        companyName: "LEGEND",
        companyLogoPath: `${window.location.href}/icon.png`,
        companyAddress: "123 ain naaja street",
        companyPhoneNumber: "+123540016247",
        companyCity: "Algiers",
        companyPostalCode: "16000",
        companyState: "Algeria",
      };

      const response = await fetch(
        `${import.meta.env.VITE_PROD_URL_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            metadata,
          }),
        }
      );

      const { sessionId } = await response.json();
      roomPayment(payment);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Stripe checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("room_id", room?.id);

  const handleSuccess = useCallback(() => {
    setPaymentSucceeded(true);
    unavailableData();
    bookingMutate();
  }, [unavailableData, bookingMutate]);

  const paypalClienId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const initialOptions = {
    "client-id": paypalClienId,
    currency: "USD",
    intent: "capture",
    components: "buttons",
    locale: "en_US",
  };

  const containerVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 50,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#edeeff] flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full bg-[#edeeff] flex flex-col items-center justify-center p-4"
      >
        {/* Tropical Benefits Side */}
        <div
          className="w-full md:w-1/2 bg-gradient-to-br from-[#22258a] to-[#0e0f38] text-white p-10 flex flex-col justify-between
             shadow-[8px_0_15px_-5px_rgba(0,0,0,0.2)]
             rounded-3xl border border-white/10"
        >
          <motion.div variants={childVariants}>
            <h2 className="text-4xl font-bold mb-4 font-serif text-center">
              Your <span className="text-yellow-400">Tropical</span> Getaway
            </h2>
            <p className="text-yellow-100 mb-6">
              Complete your booking and start your paradise experience
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-yellow-100">
                Booking Summary
              </h3>
              <div className="space-y-3">
                <p className="flex justify-between text-gray-700">
                  <span className="font-medium text-[#0e0f38]">Room:</span>
                  <span className="font-semibold text-[#22258a]">
                    {room?.name || "Deluxe Suite"}
                  </span>
                </p>
                <p className="flex justify-between text-gray-700">
                  <span className="font-medium text-[#0e0f38]">Duration:</span>
                  <span className="font-semibold text-[#22258a]">
                    {user?.dates?.length || "3"} nights
                  </span>
                </p>
                <p className="flex justify-between text-gray-700">
                  <span className="font-medium text-[#0e0f38]">Guests:</span>
                  <span className="font-semibold text-[#22258a]">
                    {room?.capacity?.number || "2"} people
                  </span>
                </p>
              </div>
            </div>

            <div className="border-t border-yellow-400/30 pt-6">
              <p className="flex justify-between items-center text-xl font-bold">
                <span className="text-[#0e0f38]">Total:</span>
                <span className="text-2xl text-[#22258a]">
                  {estimatedTotal.toFixed(2)} $
                </span>
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center">
                <FaUmbrellaBeach className="text-yellow-400 mx-auto text-xl mb-1" />
                <p className="text-yellow-100 text-sm">Private Beach</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center">
                <FaCocktail className="text-yellow-400 mx-auto text-xl mb-1" />
                <p className="text-yellow-100 text-sm">Welcome Drink</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center">
                <FaSpa className="text-yellow-400 mx-auto text-xl mb-1" />
                <p className="text-yellow-100 text-sm">Spa Access</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payment Form Side */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <motion.div variants={childVariants}>
            <h3 className="text-2xl font-bold text-[#0e0f38] mb-6">
              Payment Method
            </h3>

            <form className="space-y-6 mb-20">
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#22258a] transition-colors cursor-pointer">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    value="paypal"
                    onChange={handleChange}
                    checked={payment.payment === "paypal"}
                    className="h-5 w-5 text-[#22258a] focus:ring-[#22258a]"
                  />
                  <div className="flex items-center space-x-2">
                    <FaCcPaypal className="text-2xl text-blue-600" />
                    <span className="font-medium">PayPal</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#22258a] transition-colors cursor-pointer">
                  <input
                    type="radio"
                    id="stripe"
                    name="payment"
                    value="stripe"
                    onChange={handleChange}
                    checked={payment.payment === "stripe"}
                    className="h-5 w-5 text-[#22258a] focus:ring-[#22258a]"
                  />
                  <div className="flex items-center space-x-2">
                    <FaCcStripe className="text-2xl text-purple-600" />
                    <span className="font-medium">Stripe</span>
                  </div>
                </label>
              </div>
            </form>

            {payment.payment === "paypal" && (
              <motion.div variants={childVariants}>
                <PayPalScriptProvider options={initialOptions}>
                  <Checkout onSuccess={handleSuccess} />
                </PayPalScriptProvider>
              </motion.div>
            )}
            {payment.payment === "stripe" && stripePromise && (
              <button
                onClick={handleStripeCheckout}
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Processing..." : "Proceed to Stripe Checkout"}
              </button>
            )}

            {paymentSucceeded && (
              <div className="success">
                <button className="success-btn">
                  <FcCheckmark />
                </button>
                <h1>congratulations your room has been booked successfully</h1>
                <div className="success-div">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#22258a] to-[#0e0f38] hover:from-[#0e0f38] hover:to-[#22258a] text-white py-3 rounded-lg font-bold text-md transition-all duration-300 shadow-md hover:shadow-lg text-center"
                  >
                    Complete Booking
                  </motion.div>
                  <Link
                    to={`/rooms/${id}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#22258a] to-[#0e0f38] hover:from-[#0e0f38] hover:to-[#22258a] text-white py-3 rounded-lg font-bold text-md transition-all duration-300 shadow-md hover:shadow-lg text-center"
                  >
                    {`back to your ${room?.type}`}{" "}
                  </Link>
                  <Link
                    to="/rooms"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#22258a] to-[#0e0f38] hover:from-[#0e0f38] hover:to-[#22258a] text-white py-3 rounded-lg font-bold text-md transition-all duration-300 shadow-md hover:shadow-lg text-center"
                  >
                    back to your rooms
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;
