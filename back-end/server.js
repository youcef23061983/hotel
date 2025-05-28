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
app.get("/", (req, res) => {
  res.send("Welcome to the Rooms API");
});
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
