// require("dotenv").config();
// const express = require("express");
// const app = express();
// app.set("trust proxy", true);

// const PORT = process.env.PORT || 3000;
// const cors = require("cors");
// const morgan = require("morgan");
// const roomsRoutes = require("./routes/rooms.js");
// const galleryRoutes = require("./routes/gallery.js");
// const albumRoutes = require("./routes/album.js");
// const testimonialsRoutes = require("./routes/testimonials.js");
// const bookingsRoutes = require("./routes/bookings.js");
// const authRoutes = require("./routes/authUser.js");
// const aj = require("./libs/arctjet.js");
// const helmet = require("helmet");

// const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);

// app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://hotelmalaysia.vercel.app"],
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     credentials: true, // Allow credentials (cookies)
//     optionsSuccessStatus: 200, // Some legacy browsers choke on 204
//   })
// );

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev")); // Colorful logs
// } else {
//   app.use(morgan("tiny")); // Minimal logs
// }
// app.use(helmet());

// app.use("/rooms", roomsRoutes);
// app.use("/gallery", galleryRoutes);
// app.use("/album", albumRoutes);
// app.use("/testimonials", testimonialsRoutes);
// app.use("/bookings", bookingsRoutes);
// app.use("/auth", authRoutes);
// app.use(async (req, res, next) => {
//   // 🛑 Skip Arcjet on /health
//   if (req.path === "/health" || req.path === "/") return next();
//   if (req.path.startsWith("/assets")) return next();
//   console.log("Client IP:", req.ip);
//   console.log("User-Agent:", req.headers["user-agent"]);
//   console.log("Accept-Language:", req.headers["accept-language"]);
//   console.log("Request Path:", req.path);

//   try {
//     const ajPromise = await aj;

//     const decision = await ajPromise.protect(req, {
//       requested: 1, // specifies that each request consumes 1 token
//     });

//     if (decision.isDenied()) {
//       if (decision.reason.isRateLimit()) {
//         res.status(429).json({ error: "Too Many Requests" });
//       } else if (decision.reason.isBot()) {
//         res.status(403).json({ error: "Bot access denied" });
//       } else {
//         res.status(403).json({ error: "Forbidden" });
//       }
//       return;
//     }

//     // check for spoofed bots
//     if (
//       decision.results.some(
//         (result) => result.reason.isBot() && result.reason.isSpoofed()
//       )
//     ) {
//       res.status(403).json({ error: "Spoofed bot detected" });
//       return;
//     }

//     next();
//   } catch (error) {
//     console.log("Arcjet error", error);
//     next(error);
//   }
// });

// app.post("/create-payment-intent", async (req, res) => {
//   const { total } = req.body;

//   if (!total || total <= 0) {
//     return res.status(400).json({ error: "Invalid amount" });
//   }
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(total * 100), // Properly round to nearest integer
//       currency: "usd",

//       automatic_payment_methods: { enabled: true },
//     });
//     res.json({ clientSecret: paymentIntent.client_secret }); // Send back clientSecret
//   } catch (error) {
//     res.status(400).json({ error: error.message }); // Handle any errors
//   }
// });

// app.get("/config", (req, res) => {
//   res.json({
//     publishableKey: process.env.VITE_STRIPE_PUBLIC_KEY, // Send as JSON object
//   });
// });
// app.post("/retrieve-customer-data", async (req, res) => {
//   try {
//     const { paymentIntentId, room, user, formUser, firebaseUser } = req.body;

//     // const isTestMode = process.env.NODE_ENV === "development";

//     // // Test mode mock data
//     // if (isTestMode) {
//     //   return res.json({
//     //     fullName: "John Doe",
//     //     name: "John Doe",
//     //     email: "testcustomer@example.com",
//     //     country: "US",
//     //     state: "CA",
//     //     city: "Testville",
//     //     street: "123 Test Street",
//     //     transactionId: paymentIntentId || "pi_mock_123456789",
//     //     postalCode: "12345",
//     //     phone: "+15551234567",
//     //     paymentMethod: "visa",
//     //     last4: "4242",
//     //     amount: "10.00",
//     //     currency: "USD",
//     //     created: new Date().toISOString(),
//     //   });
//     // }

//     // Production mode - retrieve real Stripe data
//     const paymentIntent = await stripe.paymentIntents.retrieve(
//       paymentIntentId,
//       {
//         expand: ["payment_method"],
//       }
//     );
//     const formatAddress = (address) =>
//       [
//         address.line1,
//         address.line2,
//         `${address.city}, ${address.state} ${address.postal_code}`,
//         address.country,
//       ]
//         .filter(Boolean)
//         .join("\n");

//     const customerData = {
//       amount: user?.total || (paymentIntent.amount / 100).toFixed(2) || "0.00",
//       dates: user?.dates?.length || "no nights",
//       fullName: user?.firstName + " " + user?.lastName || "Not provided",
//       street: user?.address || "123 Test Street",
//       email: formUser.user.email || firebaseUser?.email || "Not provided",
//       country: user?.country || "N/A",
//       city: user?.city || "",
//       postalCode: user?.postalCode || "12345",
//       items: room,
//       // fullName:
//       //   paymentIntent.payment_method?.billing_details?.name || "Not provided",

//       // email:
//       //   paymentIntent.receipt_email ||
//       //   paymentIntent.payment_method?.billing_details?.email ||
//       //   "Not provided",
//       // country:
//       //   paymentIntent.payment_method?.billing_details?.address?.country ||
//       //   "N/A",
//       // state:
//       //   paymentIntent.payment_method?.billing_details?.address?.state || "",
//       // address: paymentIntent.billing_details?.address
//       //   ? formatAddress(paymentIntent.billing_details.address)
//       //   : "No address provided",
//       // city: paymentIntent.payment_method?.billing_details?.address?.city || "",
//       // street:
//       //   paymentIntent.payment_method?.billing_details?.address?.line1 || "",

//       transactionId: paymentIntent.id,
//       postalCode:
//         paymentIntent.payment_method?.billing_details?.address?.postal_code ||
//         "",

//       phone:
//         user?.countryCode + " " + user?.phoneNumber ||
//         paymentIntent.payment_method?.billing_details?.phone ||
//         " Not provided",
//       paymentMethod: paymentIntent.payment_method?.card?.brand || "Unknown",
//       last4: paymentIntent.payment_method?.card?.last4 || "****",
//       currency: paymentIntent.currency.toUpperCase() || "USD",
//       created:
//         new Date(paymentIntent.created * 1000).toISOString() ||
//         new Date().toISOString(),
//     };

//     res.json(customerData);
//   } catch (err) {
//     res.status(500).json({
//       error: "Failed to retrieve customer data",
//       details: err.message,
//     });
//   }
// });
// app.get("/", (req, res) => {
//   res.send("API is running ✅");
// });
// app.listen(PORT, () => {
//   console.log("Server is running on port", PORT);
// });

require("dotenv").config();
const express = require("express");
const app = express();
app.set("trust proxy", true);

const PORT = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const roomsRoutes = require("./routes/rooms.js");
const galleryRoutes = require("./routes/gallery.js");
const albumRoutes = require("./routes/album.js");
const testimonialsRoutes = require("./routes/testimonials.js");
const bookingsRoutes = require("./routes/bookings.js");
const authRoutes = require("./routes/authUser.js");
const aj = require("./libs/arctjet.js");
const helmet = require("helmet");

const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);
const sendEmail = require("./utils/sendEmail");
const sendwhatsappSMS = require("./utils/whatsappSMS.js");
const { sendSMS } = require("./utils/sendSMS.js");
const saveOrderToDatabase = require("./utils/saveOrderToDb.js");
const { sendtwilioSMS } = require("./utils/sendtwilioSms&call.js");
const generateInvoicePDF = require("./utils/generateInvoicePDF .js");
const { uploadInvoice } = require("./utils/uploadInvoiceToStorage .js");
app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://hotelmalaysia.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Colorful logs
} else {
  app.use(morgan("tiny")); // Minimal logs
}
app.post(
  "/webhook",
  // Use express.raw middleware to get raw body for signature verification
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    console.log("Signature:", sig ? "Present" : "Missing"); // Verify headers

    if (!sig) {
      console.error("❌ Missing Stripe signature");
      return res.status(400).send("Missing Stripe signature");
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body, // Use raw body directly
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("🟢 Event type:", event.type); // Confirm event parsing
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle checkout.session.completed events
    if (event.type === "checkout.session.completed") {
      console.log("🛒 Checkout session completed - starting processing"); // Entry point

      try {
        console.log("🔔 Handling checkout.session.completed event");

        // Retrieve the expanded session
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items", "payment_intent.payment_method"],
          }
        );
        console.log("📦 Raw session data:", JSON.stringify(session, null, 2));

        // Extract customer details with proper fallbacks
        const metadata = session.metadata || {};

        const customerDetails = session.customer_details || {};
        const email =
          customerDetails.email || metadata.email || "no-email@example.com";
        const room_id = metadata?.room_id || "Not provided";

        const phone = customerDetails.phone || metadata.phonenumber || null;
        const orderId = session.id;
        const amount = metadata?.dates?.length;
        const currency = session.currency.toUpperCase();
        const country =
          session.shipping_details?.address?.country ||
          session.metadata?.country ||
          "Not provided";

        const address =
          session.shipping_details?.address?.line1 || "no-email@example.com";
        const city =
          session.shipping_details?.address?.city ||
          metadata?.city ||
          "Not provided";
        const total = session.amount_total / 100 || metadata.total || "0";

        const tbluser_id = metadata.tbluser_id || "guest";

        const room = JSON.parse(metadata.room || "[]");
        const payment = "stripe" || "no method";
        const arrival = metadata?.arrival;
        const departure = metadata?.departure;
        const dates = metadata?.dates;
        const price = metadata?.room?.price;
        const title = metadata?.room?.title;
        const fullName =
          customerDetails.name || metadata.fullName || "Valued Customer";
        const names = fullName.split(" ");
        const firstname = names[0] || metadata?.firstName || "";
        const lastname = names.slice(1).join(" ") || metadata?.lastName || "";

        const countrycode =
          metadata.countryCode || customerDetails?.phone?.slice(0, 4) || "0000";
        const phonenumber =
          metadata.fullPhone || customerDetails?.phone || "0000000000";
        const nationality =
          metadata.nationality ||
          customerDetails?.address?.country ||
          "Not provided";

        const termscondition = metadata?.termsCondition || "not provided";
        const emailme = metadata?.emailMe;

        // Log important details

        // Prepare order data for database
        const orderData = {
          room_id,
          tbluser_id,
          arrival,
          departure,
          dates,
          price,
          total,
          title,
          firstname,
          lastname,
          countrycode,
          phonenumber,
          email,
          country,
          city,
          nationality,
          termscondition,
          payment,
          emailme,
          room,
        };

        // Save to database
        await saveOrderToDatabase(orderData);
        console.log("💾 Order saved to database");
        console.log("💰 Payment Details:", {
          orderId,
          total: total.toFixed(2),
          currency,
          email: email,
          phone: phone ? "provided" : "not provided",
        });
        console.log("📱 My Phone Number:", metadata?.phone);
        console.log("🛡️ My Session:", session);

        // Send email notification
        try {
          await sendEmail({
            to: email,
            subject: `🧾 Order Confirmation #${orderId}`,
            html: `
              <p>Hello ${fullName},</p>
              <p>Thank you for your order <strong>#${orderId}</strong>.</p>
              <p>Total: <strong> ${total} ${currency}</strong></p>
              // <p>View your order details <a href="${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/order/${orderId}">here</a>.</p>
              <p>If you have any questions, please contact our support team.</p>
            `,
          });
          console.log("📧 Confirmation email sent to", fullName);
        } catch (emailError) {
          console.error("❌ Failed to send email:", emailError.message);
        }

        // Send SMS notifications if phone number exists and textbelt accept the country:
        if (phone) {
          try {
            // await sendwhatsappSMS({
            //   phone: phone,
            //   name: fullName,
            //   orderId,
            //   total,
            // });

            // await sendSMS({
            //   phone: phone,
            //   message: `Hi ${fullName}, your order #${orderId} of ${currency} ${(
            //     total / 100
            //   ).toFixed(2)} was received. Thank you!`,
            // });

            // const pdfBuffer = await generateInvoicePDF(metadata, orderId);
            // const pdfUrl = await uploadInvoice(session.id, pdfBuffer);

            // await sendtwilioSMS({
            //   phone: phone,
            //   // message: `Hi ${fullName}, your order #${orderId} of ${currency} ${total} $ was received. Thank you!`,
            //   message: "hi i am youcef here, it works",
            //   pdfUrl,
            // });
            // await sendtwilioSMS({
            //   phone: phone,
            //   message: `Hi ${fullName}, your order #${orderId} of ${total} ${currency} was received. Thank you!`,
            // });
            console.log("📱 twilio SMS notifications sent to", phone);
            console.log("🆔 SID:", process.env.TWILIO_SID);
            console.log("🔑 AUTH:", process.env.TWILIO_AUTH);

            // await sendTwilioCall({
            //   phone: phone,
            //   message: `Hi ${fullName}, your order #${orderId} of ${currency} ${(
            //     total / 100
            //   ).toFixed(2)} $ was received. Thank you!`,
            // });
            // console.log("📱 SMS notifications sent to", phone);
          } catch (smsError) {
            console.error("❌ Failed to send SMS:", smsError.message);
          }
        }
      } catch (processingError) {
        console.error("❌ Order processing failed:", processingError);
        // Here you should implement your error handling logic:
        // - Log to error tracking service
        // - Retry mechanism
        // - Alert your team
      }
    }

    // Return a response to Stripe to prevent retries
    res.status(200).json({ received: true });
  }
);

app.use(express.json());

app.use("/rooms", roomsRoutes);
app.use("/gallery", galleryRoutes);
app.use("/album", albumRoutes);
app.use("/testimonials", testimonialsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/auth", authRoutes);

// app.post("/create-checkout-session", async (req, res) => {
//   const { metadata, successUrl, cancelUrl } = req.body;
//   const { room, dates } = metadata;

//   try {
//     const cartItems = JSON.parse(room || "[]"); // ✅ parse it
//     console.log("room", [cartItems]);

//     const line_items = [cartItems]?.map((item) => {
//       return {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: room.name || "Unnamed Product",
//             images: [
//               `${process.env.VITE_PUBLIC_PRODUCTS_FRONTEND_URL}/${room.images[0]}`,
//             ],
//           },
//           unit_amount: Math.round(Number(item.price || 0) * 100), // ✅ safe
//         },
//         quantity: dates?.length || 1,
//       };
//     });

//     const sessionParams = {
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       customer_email: metadata.email,
//       phone_number_collection: { enabled: true },
//       metadata: {
//         ...metadata,
//         amount: dates?.length || "0",
//       },
//       success_url: `${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/order?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/rooms`,
//       shipping_address_collection: {
//         allowed_countries: ["US", "CA", "FR", "DZ"],
//       },
//       automatic_tax: {
//         enabled: false, // Set to true if you want Stripe to handle taxes
//       },
//     };

//     const session = await stripe.checkout.sessions.create(sessionParams);
//     res.json({ sessionId: session.id });
//   } catch (err) {
//     console.error("Stripe Session Error:", err);
//     res.status(400).json({
//       error: "Failed to create checkout session",
//       details: err.message,
//     });
//   }
// });

app.post("/create-checkout-session", async (req, res) => {
  const { metadata } = req.body;

  try {
    // 1. Parse and validate room data
    const room =
      typeof metadata.room === "string"
        ? JSON.parse(metadata.room || "{}")
        : metadata.room || {};

    const dates = metadata.dates || [];

    // 2. Validate essential fields
    if (!room.price || isNaN(room.price)) {
      throw new Error("Invalid room price");
    }
    if (!metadata.email) {
      throw new Error("Customer email is required");
    }

    // 3. Create line item
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: room.name || "Hotel Room Booking",
            images: room.image
              ? [
                  `${process.env.VITE_PUBLIC_PRODUCTS_FRONTEND_URL}/${room.image}`,
                ]
              : [],
          },
          unit_amount: Math.round(Number(room.price) * 100), // in cents
        },
        quantity: dates.length || 1,
      },
    ];

    // 4. Create session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: metadata.email,
      phone_number_collection: { enabled: true },
      metadata: {
        room_id: room.id,
        stay_duration: dates.length.toString(),
      },
      success_url: `${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/rooms`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "FR", "DZ"],
      },
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(400).json({
      error: err.message || "Payment failed",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});
app.get("/config", (req, res) => {
  res.json({
    publishableKey: process.env.VITE_STRIPE_PUBLIC_KEY, // Send as JSON object
  });
});
app.get("/", (req, res) => {
  res.send("API is running ✅");
});
// app.use(async (req, res, next) => {
//   // 🛑 Skip Arcjet on /health
//   if (req.path === "/health" || req.path === "/" || req.path === "/webhook")
//     return next();
//   if (req.path.startsWith("/assets")) return next();
//   console.log("Client IP:", req.ip);
//   console.log("User-Agent:", req.headers["user-agent"]);
//   console.log("Accept-Language:", req.headers["accept-language"]);
//   console.log("Request Path:", req.path);

//   try {
//     const ajPromise = await aj;

//     const decision = await ajPromise.protect(req, {
//       requested: 1, // specifies that each request consumes 1 token
//     });

//     if (decision.isDenied()) {
//       if (decision.reason.isRateLimit()) {
//         res.status(429).json({ error: "Too Many Requests" });
//       } else if (decision.reason.isBot()) {
//         res.status(403).json({ error: "Bot access denied" });
//       } else {
//         res.status(403).json({ error: "Forbidden" });
//       }
//       return;
//     }

//     // check for spoofed bots
//     if (
//       decision.results.some(
//         (result) => result.reason.isBot() && result.reason.isSpoofed()
//       )
//     ) {
//       res.status(403).json({ error: "Spoofed bot detected" });
//       return;
//     }

//     next();
//   } catch (error) {
//     console.log("Arcjet error", error);
//     next(error);
//   }
// });

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
