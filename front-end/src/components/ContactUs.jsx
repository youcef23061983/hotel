import { useQuery } from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { useRef } from "react";

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
      <div className="form">
        <div className="touches">
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
        </div>
        <div className="send">
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
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
