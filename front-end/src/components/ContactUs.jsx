import { useQuery } from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import UseFetch from "./UseFetch";
const ContactUs = () => {
  const url = "http://localhost:3000/gallery";

  const { data, isPending, error } = UseFetch(url);
  const form = useRef();
  useEffect(() => {
    document.title = "Contact Us";
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_vgkozvc", "template_sv5btsr", form.current, {
        publicKey: "_ISOAOSTfbmyXLWd5",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
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
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

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
          <form ref={form} onSubmit={sendEmail}>
            <div className="info">
              <label htmlFor="name">First Name:</label>
              <input type="text" name="name" />
            </div>
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
