import { useQuery } from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const ContactUs = () => {
  const galleryFn = async () => {
    const res = await fetch("http://localhost:3000/gallery");
    if (!res.ok) {
      throw Error("ther is no data");
    }
    return res.json();
  };
  const { data } = useQuery({
    queryKey: ["gallery"],
    queryFn: galleryFn,
  });
  const form = useRef();

  const submitHandlle = (e) => {
    e.preventDsefault();
    emailjs.sendForm(
      "service_x1kny1g",
      "template_omz0d42",
      form.current,
      "G_hm2mMywVMLgQQnp"
    );

    e.target.reset();
  };
  const ref2 = useRef(null);
  const { scrollYProgress: scrollYProgress } = useScroll({
    ref: ref2,
    offset: ["0 1", "0.6 1"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollSend = useTransform(scrollYProgress, [0, 1], ["100vw", "0vw"]);
  const scrollITouch = useTransform(scrollYProgress, [0, 1], ["-100vw", "0vw"]);

  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[0].images[0]}) center/cover `,
        }}
      >
        <Banner title="CONTACT US" />
      </div>
      <div className="form" ref={ref2}>
        <motion.div
          className="touches"
          style={{
            x: scrollITouch,
            opacity: scrollOpacity,
          }}
        >
          <h2>GET IN TOUCH</h2>
          <div className="touch">
            <h4>Address:</h4>
            <p>-------</p>
          </div>
          <div className="touch">
            <h4>Phone:</h4>
            <p>+-- ------</p>
          </div>
          <div className="touch">
            <h4>Fax:</h4>
            <p>-------</p>
          </div>
          <div className="touch">
            <h4>Email:</h4>
            <p>----@---.com</p>
          </div>
        </motion.div>
        <motion.div
          className="send"
          style={{
            x: scrollSend,
            opacity: scrollOpacity,
          }}
        >
          <form ref={form} onSubmit={submitHandlle}>
            <div className="info">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" name="firstName" />
            </div>
            <div className="info">
              <label htmlFor="lasttName">Last Name:</label>
              <input type="text" name="lastName" />
            </div>{" "}
            <div className="info">
              <label htmlFor="phone">Phone:</label>
              <input type="number" name="phone" />
            </div>{" "}
            <div className="info">
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" />
            </div>{" "}
            <div className="info">
              <label htmlFor="comment">Comment:</label>
              <textarea name="comment" />
            </div>
            <button onClick="submit" className="room-btn">
              Submit:
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
