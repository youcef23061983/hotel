import Banner from "../pages/Banner";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { MdAttachEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";
import UseFetch from "./UseFetch";
import { ReactLenis } from "lenis/react";

const ContactUs = () => {
  const [formStatus, setFormStatus] = useState(null);

  const [user, setUser] = useState({ name: "", email: "", comment: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const url = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;
  const key = "gallery";
  const { data, isPending, error } = UseFetch(url, key);
  const form = useRef();

  useEffect(() => {
    document.title = "Contact Us";
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    // Validation check
    if (!user.name || !user.email || !user.comment) {
      alert("Please enter your information");
      return; // Return early to prevent further execution
    }

    emailjs
      .sendForm("service_vgkozvc", "template_sv5btsr", form.current, {
        publicKey: import.meta.env.VITE_CONTACT_PUBLIC_KEY,
      })
      .then(
        () => {
          setFormStatus("Message sent successfully!");
          setUser({ name: "", email: "", comment: "" });
          setTimeout(() => {
            setFormStatus(null);
          }, 5000);
        },
        (error) => {
          setFormStatus(`Failed to send message: ${error.text}`);
        }
      );
  };
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }

      const listener = () => {
        setMatches(media.matches);
      };

      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", listener);
      } else {
        media.addListener(listener);
      }

      return () => {
        if (typeof media.removeEventListener === "function") {
          media.removeEventListener("change", listener);
        } else {
          media.removeListener(listener);
        }
      };
    }, [matches, query]);

    return matches;
  };
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const ref1 = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref1,
    offset: ["0 1", isMediumScreen ? "0.6 1" : "0.4 1"],
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
        data-testid="custom-element"
        className="headerimages"
        style={{
          background: `url(${data && data[0].images[0]}) center/cover `,
        }}
      >
        <Banner title="CONTACT US">
          <div className="iconDetail">
            <MdAttachEmail className="icon" />
            <p>Email</p>
          </div>
        </Banner>
      </div>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <div className="form" ref={ref1}>
          <motion.div
            className="touches"
            style={{ x: scrollITouch, opacity: scrollOpacity }}
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
            style={{ x: scrollSend, opacity: scrollOpacity }}
          >
            <form ref={form} onSubmit={sendEmail}>
              <div className="info">
                <label htmlFor="name">First Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
              <div className="info">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="info">
                <label htmlFor="comment">Comment:</label>
                <textarea
                  id="comment"
                  name="comment"
                  style={{ height: "20rem" }}
                  value={user.comment}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="room-btn">
                Submit
              </button>
            </form>
            {formStatus && (
              <div className="formStatusMessage" style={{ marginTop: "1rem" }}>
                {formStatus}
              </div>
            )}
          </motion.div>
        </div>
      </ReactLenis>
    </div>
  );
};

export default ContactUs;
