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
const orderRoutes = require("./routes/order.js");
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
const patchUnavailables = require("./utils/unavailablesOrder.js");
const sendEmailBrevo = require("./utils/sendEmailBrevo");

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://hotelmalaysia.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  }),
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
        process.env.STRIPE_WEBHOOK_SECRET,
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
          },
        );
        console.log("📦 Raw session data:", JSON.stringify(session, null, 2));

        // Extract customer details with proper fallbacks
        const metadata = session.metadata || {};

        const customerDetails = session.customer_details || {};
        const email =
          customerDetails.email || metadata.email || "no-email@example.com";
        const room_id = metadata?.room_id;

        const phone = customerDetails.phone || metadata.phonenumber;
        const country =
          session.shipping_details?.address?.country ||
          session.metadata?.country;
        const city = session.shipping_details?.address?.city || metadata?.city;
        const total = session.amount_total / 100 || metadata.total;

        const tbluser_id = metadata.tbluser_id;

        const room = JSON.parse(metadata.room || "[]");
        const payment = "stripe" || "no method";
        const arrival = metadata?.arrival;
        const departure = metadata?.departure;

        const price = Number(metadata.price).toFixed(2) || "0.00";
        const title = metadata?.title;
        const fullName = customerDetails.name || metadata.fullName;
        const names = fullName.split(" ");
        const firstname = names[0] || metadata?.firstname;
        const lastname = names.slice(1).join(" ") || metadata?.lastname;

        const countrycode =
          metadata.countrycode || customerDetails?.phone?.slice(0, 4);
        const phonenumber = metadata.phonenumber || customerDetails?.phone;
        const nationality =
          metadata.nationality || customerDetails?.address?.country;
        const termscondition = metadata?.termscondition;
        const emailme = metadata?.emailme;
        const paymentIntent = session.payment_intent;
        const paymentMethod = paymentIntent?.payment_method;

        // Get last 4 digits of card (if card payment)
        const last4 = paymentMethod?.card?.last4 || "N/A";

        // Get postal code (billing address)
        const postalCode =
          session.customer_details?.address?.postal_code || "N/A";

        // Transaction ID (Stripe Payment Intent ID)
        const transactionId = session.payment_intent.id;
        const orderId = session.id;

        // Currency (e.g., "USD")
        const currency = session.currency.toUpperCase();
        // 1. Convert dates back to proper array format for PostgreSQL
        let datesArray = [];
        if (metadata?.dates) {
          if (typeof metadata?.dates === "string") {
            // Handle both comma-separated and JSON string formats
            if (metadata?.dates?.startsWith("[")) {
              // JSON array string format
              datesArray = JSON.parse(metadata?.dates);
            } else {
              // Comma-separated string format
              datesArray = metadata?.dates
                ?.split(",")
                .map((date) => date.trim());
            }
          } else if (Array.isArray(metadata?.dates)) {
            datesArray = metadata?.dates;
          }
        }

        // 1. Convert unavailables dates back to proper array format for PostgreSQL\\\\\\\\\\\\\\\\\\\\\\
        let unavailablesArray = [];
        if (metadata?.updatedUnavailables) {
          if (typeof metadata?.updatedUnavailables === "string") {
            // Handle both comma-separated and JSON string formats
            if (metadata?.updatedUnavailables?.startsWith("[")) {
              // JSON array string format
              unavailablesArray = JSON.parse(metadata?.updatedUnavailables);
            } else {
              // Comma-separated string format
              unavailablesArray = metadata?.updatedUnavailables
                ?.split(",")
                .map((date) => date.trim());
            }
          } else if (Array.isArray(metadata?.updatedUnavailables)) {
            unavailablesArray = metadata?.updatedUnavailables;
          }
        }
        console.log("📅 Dates comeback:", metadata?.dates);
        console.log("📅 Dates array:", datesArray);

        console.log("❌ Unavailables array:", unavailablesArray);

        const orderData = {
          room_id,
          tbluser_id,
          arrival,
          departure,
          dates: datesArray,
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
          session_id: orderId, // Stripe Payment Intent ID
          transaction_id: transactionId,
          last4, // Last 4 digits of card (if applicable)
          postalCode, // Billing postal code
          currency,
        };
        console.log("💳 Payment Details:", {
          transactionId,
          last4,
          postalCode,
          currency,
        });
        console.log("📦 Webhook Data:", orderData);
        const unavailableOrder = {
          unavailables: unavailablesArray,
          id: room_id,
        };

        // Save to database
        await saveOrderToDatabase(orderData);
        await patchUnavailables(unavailableOrder);
        console.log("💾 Order saved to database");
        console.log("💰 Payment Details:", {
          transactionId,
          total: total.toFixed(2),
          currency,
          email: email,
          phone: phone ? "provided" : "not provided",
        });
        console.log("📱 My Phone Number:", phone);
        console.log("🛡️ My Session:", session);

        // Send email notification
        try {
          // await sendEmail({
          //   to: email,
          //   subject: `🧾 Order Confirmation #${transactionId}`,
          //   html: `
          //     <p>Hello ${fullName},</p>
          //     <p>Thank you for your order <strong>#${transactionId}</strong>.</p>
          //     <p>Total: <strong> ${total} ${currency}</strong></p>
          //     // <p>View your order details <a href="${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/order/${transactionId}">here</a>.</p>
          //     <p>If you have any questions, please contact our support team.</p>
          //   `,
          // });
          console.log("BREVO_API_KEY:", process.env.BREVO_API_KEY);
          console.log("GMAIL_USER:", process.env.GMAIL_USER);
          const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7f9; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; letter-spacing: -0.5px; }
    .header p { margin: 12px 0 0 0; opacity: 0.9; font-size: 16px; }
    .content { padding: 35px 30px; }
    .greeting { margin-bottom: 25px; }
    .greeting h2 { color: #1e3c72; margin: 0 0 8px 0; font-size: 24px; }
    .greeting p { color: #5a6e7c; margin: 0; }
    .booking-summary { background: linear-gradient(135deg, #f8fafc, #f1f5f9); padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #e2e8f0; }
    .booking-summary h3 { color: #1e3c72; margin: 0 0 20px 0; font-size: 18px; display: flex; align-items: center; gap: 8px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .info-item { background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #2a5298; }
    .info-label { font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 4px; }
    .info-value { font-size: 16px; font-weight: 600; color: #1e293b; }
    .room-details { background: white; border-radius: 12px; overflow: hidden; margin: 20px 0; border: 1px solid #e2e8f0; }
    .room-header { background: #f8fafc; padding: 15px 20px; border-bottom: 1px solid #e2e8f0; }
    .room-header h4 { margin: 0; color: #1e3c72; font-size: 18px; }
    .room-content { padding: 20px; }
    .room-image { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px; }
    .room-amenities { display: flex; flex-wrap: wrap; gap: 8px; margin: 15px 0; }
    .amenity-badge { background: #eef2ff; color: #2a5298; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
    .dates-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .dates-table th { text-align: left; padding: 12px 8px; background: #f1f5f9; color: #374151; font-weight: 600; border-radius: 8px; }
    .dates-table td { padding: 10px 8px; border-bottom: 1px solid #e2e8f0; }
    .price-breakdown { background: #fef9e3; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #f59e0b; }
    .price-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .total-row { border-top: 2px solid #e2e8f0; margin-top: 8px; padding-top: 12px; font-weight: bold; font-size: 18px; color: #2a5298; }
    .guest-info { background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #10b981; }
    .guest-info h4 { color: #047857; margin: 0 0 15px 0; display: flex; align-items: center; gap: 8px; }
    .guest-details { margin: 10px 0; }
    .guest-details p { margin: 6px 0; }
    .important-info { background: #fff7ed; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #f97316; }
    .important-info h4 { color: #c2410c; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px; }
    .important-info ul { margin: 0; padding-left: 20px; color: #7c2d12; }
    .important-info li { margin-bottom: 8px; }
    .footer { text-align: center; padding: 30px; background: #1e293b; color: #cbd5e1; }
    .footer a { color: #60a5fa; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
    .button { display: inline-block; background: #2a5298; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 15px 0; transition: background-color 0.2s; }
    .button:hover { background: #1e3c72; }
    @media (max-width: 600px) {
      .content { padding: 25px 20px; }
      .info-grid { grid-template-columns: 1fr; }
      .header h1 { font-size: 24px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏨 Booking Confirmed!</h1>
      <p>Your luxury stay is now reserved</p>
    </div>
    <div class="content">
      <div class="greeting">
        <h2>Dear ${fullName},</h2>
        <p>Thank you for choosing Hotel Malaysia! We're delighted to confirm your upcoming stay.</p>
      </div>

      <div class="booking-summary">
        <h3>📋 Booking Details</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Booking Reference</div>
            <div class="info-value">#${transactionId}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Booking Date</div>
            <div class="info-value">${new Date().toLocaleDateString()}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Check-in</div>
            <div class="info-value">📅 ${new Date(arrival).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Check-out</div>
            <div class="info-value">📅 ${new Date(departure).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Nights Stay</div>
            <div class="info-value">✨ ${datesArray.length} Nights</div>
          </div>
          <div class="info-item">
            <div class="info-label">Payment Status</div>
            <div class="info-value">✅ Paid via ${payment}</div>
          </div>
        </div>
      </div>

      <div class="room-details">
        <div class="room-header">
          <h4>🛏️ Selected Room</h4>
        </div>
        <div class="room-content">
          <h3 style="margin: 0 0 10px 0; color: #1e3c72;">${room?.name}</h3>

          ${room?.image ? `<img src="${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/${room.image}" alt="${room?.name}" class="room-image" style="max-width: 100%; height: auto;" onerror="this.style.display='none'">` : ""}
         
        </div>
      </div>

      <div class="price-breakdown">
        <h4 style="margin: 0 0 15px 0; color: #b45309;">💰 Price Breakdown</h4>
        <div class="price-row">
          <span>Room Rate per Night</span>
          <span>${currency} ${(price / datesArray.length).toFixed(2)}</span>
        </div>
        <div class="price-row">
          <span>Number of Nights (${datesArray.length})</span>
          <span>${currency} ${price}</span>
        </div>
        <div class="price-row">
          <span>Taxes & Service Charges</span>
          <span>Included</span>
        </div>
        <div class="total-row">
          <span>Total Amount Paid</span>
          <span>${currency} ${total.toFixed(2)}</span>
        </div>
      </div>

      <div class="guest-info">
        <h4>👤 Guest Information</h4>
        <div class="guest-details">
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phonenumber ? `<p><strong>Phone:</strong> ${countrycode || ""} ${phonenumber}</p>` : ""}
          ${nationality ? `<p><strong>Nationality:</strong> ${nationality}</p>` : ""}
        </div>
      </div>

      <div class="important-info">
        <h4>📍 Important Information</h4>
        <ul>
          <li><strong>Check-in Time:</strong> 2:00 PM onwards</li>
          <li><strong>Check-out Time:</strong> 12:00 PM noon</li>
          <li><strong>ID Requirement:</strong> Valid government ID/passport required at check-in</li>
          <li><strong>Cancellation Policy:</strong> Free cancellation up to 48 hours before check-in</li>
          <li><strong>Deposit:</strong> A security deposit may be required upon arrival</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/order/${transactionId}" class="button">
          View Booking Details
        </a>
        <p style="font-size: 12px; color: #64748b; margin-top: 12px;">
          Need to modify your booking? Visit your booking page
        </p>
      </div>

      <div style="background: #eef2ff; padding: 20px; border-radius: 12px; text-align: center;">
        <h4 style="color: #1e3c72; margin: 0 0 10px 0;">📞 Need Assistance?</h4>
        <p style="margin: 0; color: #5a6e7c;">
          Contact our 24/7 concierge service:<br>
          <strong>Phone:</strong> +60 123 456 789 | <strong>Email:</strong> reservations@hotelmalaysia.com
        </p>
      </div>
    </div>
    <div class="footer">
      <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} Hotel Malaysia. All rights reserved.</p>
      <p style="margin: 0 0 5px 0; font-size: 12px;">123 Jalan Bukit Bintang, Kuala Lumpur, 55100, Malaysia</p>
      <p style="margin: 0; font-size: 12px;">
        <a href="#">Privacy Policy</a> | <a href="#">Terms & Conditions</a> | <a href="#">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
`;
          await sendEmailBrevo({
            to: email, // Customer's email
            subject: `🧾 Order Confirmation #${transactionId}`,
            html: emailHtml,
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
            //   transactionId,
            //   total,
            // });

            // await sendSMS({
            //   phone: phone,
            //   message: `Hi ${fullName}, your order #${transactionId} of ${currency} ${(
            //     total / 100
            //   ).toFixed(2)} was received. Thank you!`,
            // });

            // const pdfBuffer = await generateInvoicePDF(metadata, transactionId);
            // const pdfUrl = await uploadInvoice(session.id, pdfBuffer);

            // await sendtwilioSMS({
            //   phone: phone,
            //   // message: `Hi ${fullName}, your order #${transactionId} of ${currency} ${total} $ was received. Thank you!`,
            //   message: "hi i am youcef here, it works",
            //   pdfUrl,
            // });
            await sendtwilioSMS({
              phone: phone,
              message: `Hi ${fullName}, your order #${transactionId} of ${total} ${currency} was received. Thank you!`,
            });
            console.log("📱 twilio SMS notifications sent to", phone);
            console.log("🆔 SID:", process.env.TWILIO_SID);
            console.log("🔑 AUTH:", process.env.TWILIO_AUTH);

            // await sendTwilioCall({
            //   phone: phone,
            //   message: `Hi ${fullName}, your order #${transactionId} of ${currency} ${(
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
      }
    }

    res.status(200).json({ received: true });
  },
);

app.use(express.json());

app.use("/rooms", roomsRoutes);
app.use("/gallery", galleryRoutes);
app.use("/album", albumRoutes);
app.use("/testimonials", testimonialsRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/auth", authRoutes);
app.use("/order", orderRoutes);

app.post("/create-checkout-session", async (req, res) => {
  const { metadata } = req.body;
  console.log("room_id", metadata.room_id);
  console.log("room data (string)", metadata?.room);

  const parseRoom = JSON.parse(metadata?.room || "{}");
  console.log("metada checkout data", metadata);

  console.log("✅ Parsed room object", parseRoom);
  console.log("✅ Parsed room image", parseRoom.image);

  try {
    const rawImagePath = parseRoom.image;

    if (!rawImagePath) {
      return res.status(400).json({ error: "Room image path is missing" });
    }

    const cleanPath = rawImagePath.replace(/^\//, "");
    const encodedPath = encodeURI(cleanPath);
    const imageUrl = `${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/${encodedPath}`;

    console.log("Final Image URL:", imageUrl);
    const parsedPrice = parseFloat(parseRoom?.price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ error: "Invalid room price in metadata" });
    }

    //    // 1. Safely get the image path with optional chaining and default value
    // const rawImagePath = metadata?.room?.image || '';
    // console.log('Raw image path:', rawImagePath);

    // if (!rawImagePath) {
    //   throw new Error('No image path found in metadata');
    // }

    // // 2. Remove leading slash if present (safely)
    // const cleanPath = typeof rawImagePath === 'string'
    //   ? rawImagePath.replace(/^\//, '')
    //   : '';

    // // 3. Encode the entire path (not just spaces) for URL safety
    // const encodedPath = encodeURIComponent(cleanPath);

    // // 4. Build full URL - decode just the slashes for proper routing
    // const imageUrl = `${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/${
    //   encodedPath.replace(/%2F/g, '/')
    // }`;

    console.log("Final image URL:", imageUrl);

    const days = metadata?.days || [];
    console.log("dates", metadata?.dates);
    console.log("dates length", metadata?.dates?.length);
    console.log("days: ", days);

    // Validate image URL
    if (imageUrl && !isValidUrl(imageUrl)) {
      console.warn(`Invalid image URL: ${imageUrl}`);
    }

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: parseRoom?.name || "Hotel Room Booking",
            images: [imageUrl],
          },
          unit_amount: Math.round(parsedPrice * 100), // ✅ Safe now
        },
        quantity: days || 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: metadata.email,
      metadata: {
        ...metadata,
        stay_duration: days,
      },
      success_url: `${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_PUBLIC_ROOMS_FRONTEND_URL}/rooms`,
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

// Helper function to validate URLs
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
app.get("/config", (req, res) => {
  res.json({
    publishableKey: process.env.VITE_STRIPE_PUBLIC_KEY, // Send as JSON object
  });
});
app.get("/", (req, res) => {
  res.send("API is running ✅");
});
if (process.env.NODE_ENV === "production") {
  app.use(async (req, res, next) => {
    // 🛑 Skip Arcjet on /health
    if (req.path === "/health" || req.path === "/" || req.path === "/webhook")
      return next();
    if (req.path.startsWith("/assets")) return next();
    console.log("Client IP:", req.ip);
    console.log("User-Agent:", req.headers["user-agent"]);
    console.log("Accept-Language:", req.headers["accept-language"]);
    console.log("Request Path:", req.path);

    try {
      const ajPromise = await aj;

      const decision = await ajPromise.protect(req, {
        requested: 1, // specifies that each request consumes 1 token
      });

      if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
          res.status(429).json({ error: "Too Many Requests" });
        } else if (decision.reason.isBot()) {
          res.status(403).json({ error: "Bot access denied" });
        } else {
          res.status(403).json({ error: "Forbidden" });
        }
        return;
      }

      // check for spoofed bots
      if (
        decision.results.some(
          (result) => result.reason.isBot() && result.reason.isSpoofed(),
        )
      ) {
        res.status(403).json({ error: "Spoofed bot detected" });
        return;
      }

      next();
    } catch (error) {
      console.log("Arcjet error", error);
      next(error);
    }
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
