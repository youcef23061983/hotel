require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const morgan = require("morgan");
const roomsRoutes = require("./routes/rooms.js");
const galleryRoutes = require("./routes/gallery.js");
const albumRoutes = require("./routes/album.js");
const testimonialsRoutes = require("./routes/testimonials.js");
const bookingsRoutes = require("./routes/bookings.js");
const authRoutes = require("./routes/authUser.js");

const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

app.use(morgan("dev"));
app.use("/rooms", roomsRoutes);
app.use("/gallery", galleryRoutes);
app.use("/album", albumRoutes);
app.use("/testimonials", testimonialsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/auth", authRoutes);

app.post("/create-payment-intent", async (req, res) => {
  const { total } = req.body;

  if (!total || total <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Properly round to nearest integer
      currency: "usd",

      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret }); // Send back clientSecret
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle any errors
  }
});

app.get("/config", (req, res) => {
  res.json({
    publishableKey: process.env.VITE_STRIPE_PUBLIC_KEY, // Send as JSON object
  });
});
app.post("/retrieve-customer-data", async (req, res) => {
  try {
    const { paymentIntentId, room, user, formUser, firebaseUser } = req.body;

    // const isTestMode = process.env.NODE_ENV === "development";

    // // Test mode mock data
    // if (isTestMode) {
    //   return res.json({
    //     fullName: "John Doe",
    //     name: "John Doe",
    //     email: "testcustomer@example.com",
    //     country: "US",
    //     state: "CA",
    //     city: "Testville",
    //     street: "123 Test Street",
    //     transactionId: paymentIntentId || "pi_mock_123456789",
    //     postalCode: "12345",
    //     phone: "+15551234567",
    //     paymentMethod: "visa",
    //     last4: "4242",
    //     amount: "10.00",
    //     currency: "USD",
    //     created: new Date().toISOString(),
    //   });
    // }

    // Production mode - retrieve real Stripe data
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId,
      {
        expand: ["payment_method"],
      }
    );
    const formatAddress = (address) =>
      [
        address.line1,
        address.line2,
        `${address.city}, ${address.state} ${address.postal_code}`,
        address.country,
      ]
        .filter(Boolean)
        .join("\n");

    const customerData = {
      amount: user?.total || (paymentIntent.amount / 100).toFixed(2) || "0.00",
      dates: user?.dates?.length || "no nights",
      fullName: user?.firstName + " " + user?.lastName || "Not provided",
      street: user?.address || "123 Test Street",
      email: formUser.user.email || firebaseUser?.email || "Not provided",
      country: user?.country || "N/A",
      city: user?.city || "",
      postalCode: user?.postalCode || "12345",
      items: room,
      // fullName:
      //   paymentIntent.payment_method?.billing_details?.name || "Not provided",

      // email:
      //   paymentIntent.receipt_email ||
      //   paymentIntent.payment_method?.billing_details?.email ||
      //   "Not provided",
      // country:
      //   paymentIntent.payment_method?.billing_details?.address?.country ||
      //   "N/A",
      // state:
      //   paymentIntent.payment_method?.billing_details?.address?.state || "",
      // address: paymentIntent.billing_details?.address
      //   ? formatAddress(paymentIntent.billing_details.address)
      //   : "No address provided",
      // city: paymentIntent.payment_method?.billing_details?.address?.city || "",
      // street:
      //   paymentIntent.payment_method?.billing_details?.address?.line1 || "",

      transactionId: paymentIntent.id,
      postalCode:
        paymentIntent.payment_method?.billing_details?.address?.postal_code ||
        "",

      phone:
        user?.countryCode + " " + user?.phoneNumber ||
        paymentIntent.payment_method?.billing_details?.phone ||
        " Not provided",
      paymentMethod: paymentIntent.payment_method?.card?.brand || "Unknown",
      last4: paymentIntent.payment_method?.card?.last4 || "****",
      currency: paymentIntent.currency.toUpperCase() || "USD",
      created:
        new Date(paymentIntent.created * 1000).toISOString() ||
        new Date().toISOString(),
    };

    res.json(customerData);
  } catch (err) {
    res.status(500).json({
      error: "Failed to retrieve customer data",
      details: err.message,
    });
  }
});
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
