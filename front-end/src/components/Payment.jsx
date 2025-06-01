import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import CheckoutForm from "./CheckoutForm";
import { useCallback } from "react";
import { AppContext } from "../pages/AppProvider";

const Payment = ({ bookingMutate, unavailableData, open }) => {
  const { user, room, roomPayment, payment } = useContext(AppContext);
  console.log("user in payment", user);
  console.log("type of", typeof user?.total);

  console.log("room in payment", room);

  const navigate = useNavigate();
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const total = user?.total || 0; // Ensure total is defined
  console.log("Total in Payment in front:", total);

  useEffect(() => {
    fetch("http://localhost:3000/config") // Correct URL for the config
      .then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey)); // Use publishableKey
        console.log("Publishable Key:", publishableKey);
      })
      .catch((error) => console.error("Error fetching config:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/create-payment-intent", {
      // Correct URL for create-payment-intent
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total }),
    })
      .then(async (r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch client secret");
        }
        const { clientSecret } = await r.json();
        console.log("Client Secret:", clientSecret);
        setClientSecret(clientSecret);
      })
      .catch((error) => console.error("Error fetching client secret:", error));
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      roomPayment({
        ...payment,
        [name]: value,
      });
    },
    [payment, roomPayment, paymentSucceeded]
  );

  const paymentSubmit = useCallback((e) => {
    e.preventDefault();
    open();

    // navigate("/bill");
  }, []);

  const handleSuccess = useCallback(() => {
    setPaymentSucceeded(true);
    unavailableData();
    bookingMutate();
  }, [unavailableData, bookingMutate, open]);

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
        duration: 2,
        type: "spring",
        stiffness: 50,
        when: "beforeChildren",
        staggerChildren: 1,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };
  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="loginContainer" variants={containerVariants}>
        <h3>Payment Method</h3>
        <form onSubmit={paymentSubmit} className="login-form">
          <label>
            Paypal:
            <input
              type="radio"
              id="paypal"
              name="payment"
              value="paypal"
              onChange={handleChange}
              checked={payment.payment === "paypal"}
            />
          </label>{" "}
          <br />
          <label>
            Stripe:
            <input
              type="radio"
              id="stripe"
              name="payment"
              value="stripe"
              onChange={handleChange}
              checked={payment.payment === "stripe"}
            />
          </label>
          <br />
          {/* {paymentSucceeded && ( */}
          <button type="submit" className="addCart">
            Continue
          </button>
          {/* )} */}
        </form>
        {payment.payment === "paypal" && (
          <PayPalScriptProvider
            options={initialOptions}
            variants={childVariants}
          >
            <Checkout onSuccess={handleSuccess} />
          </PayPalScriptProvider>
        )}
        {payment.payment === "stripe" && stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm onSuccess={handleSuccess} />
          </Elements>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Payment;
