// import Banner from "../pages/Banner";
// import { useRef, useEffect, useState } from "react";
// import { useScroll, useTransform, motion } from "framer-motion";
// import { MdAttachEmail } from "react-icons/md";
// import emailjs from "@emailjs/browser";
// import { ReactLenis } from "lenis/react";
// import UseFetch from "../data managment/UseFetch";
// const ContactUs = ({ onSubmit }) => {
//   const [formStatus, setFormStatus] = useState(null);
//   const [user, setUser] = useState({ name: "", email: "", comment: "" });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };
//   const url = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;
//   const key = "gallery";
//   const { data, isPending, error } = UseFetch(url, key);
//   const form = useRef();
//   useEffect(() => {
//     document.title = "Contact Us";
//   }, []);
//   const sendEmail = (e) => {
//     e.preventDefault();
//     if (!user.name || !user.email || !user.comment) {
//       alert("Please enter your information");
//       return; // Return early to prevent further execution
//     }
//     if (onSubmit) {
//       onSubmit(user);
//       return; // Skip the emailjs logic in tests
//     }

//     emailjs
//       .sendForm("service_vgkozvc", "template_sv5btsr", form.current, {
//         publicKey: import.meta.env.VITE_CONTACT_PUBLIC_KEY,
//       })
//       .then(
//         () => {
//           setFormStatus("Message sent successfully!");
//           setUser({ name: "", email: "", comment: "" });
//           setTimeout(() => {
//             setFormStatus(null);
//           }, 5000);
//         },
//         (error) => {
//           setFormStatus(`Failed to send message: ${error.text}`);
//         }
//       );
//   };
//   const useMediaQuery = (query) => {
//     const [matches, setMatches] = useState(false);

//     useEffect(() => {
//       const media = window.matchMedia(query);
//       if (media.matches !== matches) {
//         setMatches(media.matches);
//       }

//       const listener = () => {
//         setMatches(media.matches);
//       };

//       if (typeof media.addEventListener === "function") {
//         media.addEventListener("change", listener);
//       } else {
//         media.addListener(listener);
//       }

//       return () => {
//         if (typeof media.removeEventListener === "function") {
//           media.removeEventListener("change", listener);
//         } else {
//           media.removeListener(listener);
//         }
//       };
//     }, [matches, query]);

//     return matches;
//   };
//   const isMediumScreen = useMediaQuery("(min-width: 768px)");

//   const ref1 = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref1,
//     offset: ["0 1", isMediumScreen ? "0.6 1" : "0.4 1"],
//   });
//   const scrollOpacity = useTransform(
//     scrollYProgress,
//     [0, 0.5, 0.7, 1],
//     [0, 0.1, 0.3, 1]
//   );
//   const scrollSend = useTransform(scrollYProgress, [0, 1], ["100vw", "0vw"]);
//   const scrollITouch = useTransform(scrollYProgress, [0, 1], ["-100vw", "0vw"]);

//   if (isPending) return <h2>...is loading</h2>;
//   if (error) return <h2>{error.message}</h2>;

//   return (
//     <div>
//       <div
//         data-testid="custom-element"
//         className="headerimages"
//         style={{
//           background: `url(${data && data[0].images[0]}) center/cover `,
//         }}
//       >
//         <Banner title="CONTACT US">
//           <div className="iconDetail">
//             <MdAttachEmail className="icon" />
//             <p>Email</p>
//           </div>
//         </Banner>
//       </div>
//       <ReactLenis
//         root
//         options={{
//           lerp: 0.05,
//         }}
//       >
//         <div className="form" ref={ref1}>
//           <motion.div
//             className="touches"
//             style={{ x: scrollITouch, opacity: scrollOpacity }}
//           >
//             <h2>GET IN TOUCH</h2>
//             <div className="touch">
//               <h4>Address:</h4>
//               <p>-------</p>
//             </div>
//             <div className="touch">
//               <h4>Phone:</h4>
//               <p>+-- ------</p>
//             </div>
//             <div className="touch">
//               <h4>Fax:</h4>
//               <p>-------</p>
//             </div>
//             <div className="touch">
//               <h4>Email:</h4>
//               <p>----@---.com</p>
//             </div>
//           </motion.div>
//           <motion.div
//             className="send"
//             style={{ x: scrollSend, opacity: scrollOpacity }}
//           >
//             <form ref={form} onSubmit={sendEmail}>
//               <div className="info">
//                 <label htmlFor="name">First Name:</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={user.name}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="info">
//                 <label htmlFor="email">Email:</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={user.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="info">
//                 <label htmlFor="comment">Comment:</label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   style={{ height: "20rem" }}
//                   value={user.comment}
//                   onChange={handleChange}
//                 />
//               </div>
//               <button type="submit" className="room-btn">
//                 Submit
//               </button>
//             </form>
//             {formStatus && (
//               <div className="formStatusMessage" style={{ marginTop: "1rem" }}>
//                 {formStatus}
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </ReactLenis>
//     </div>
//   );
// };

// export default ContactUs;
import Banner from "../pages/Banner";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { MdAttachEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { ReactLenis } from "lenis/react";
import UseFetch from "../data managment/UseFetch";

const ContactUs = ({ onSubmit }) => {
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
    if (!user.name || !user.email || !user.comment) {
      alert("Please enter your information");
      return;
    }
    if (onSubmit) {
      onSubmit(user);
      return;
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

  if (isPending) return <h2 className="text-center text-xl">...is loading</h2>;
  if (error)
    return (
      <h2 className="text-center text-xl text-red-500">{error.message}</h2>
    );

  return (
    <div className="min-h-screen bg-[#edeeff] font-poppins">
      {/* Header Section */}
      <div
        data-testid="custom-element"
        className="headerimages h-[70vh] relative flex items-center justify-center text-center bg-cover bg-center"
        style={{
          background: `linear-gradient(rgba(14, 15, 56, 0.7), rgba(34, 37, 138, 0.5)), url(${
            data && data[0].images[0]
          }) center/cover`,
        }}
      >
        <Banner title="CONTACT US">
          <div className="iconDetail flex items-center justify-center space-x-2 text-white">
            <MdAttachEmail className="icon text-2xl" />
            <p className="text-lg font-medium">Email</p>
          </div>
        </Banner>

        {/* Tropical Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#edeeff] to-transparent"></div>
        <div className="absolute top-4 right-4 text-4xl text-white opacity-20">
          🌴
        </div>
        <div className="absolute bottom-4 left-4 text-3xl text-white opacity-20">
          🌺
        </div>
      </div>

      {/* Contact Form Section */}
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <div className="form container mx-auto px-4 py-16 max-w-6xl" ref={ref1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              className="touches bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#22258a]"
              style={{ x: scrollITouch, opacity: scrollOpacity }}
            >
              <h2 className="text-3xl font-bold text-[#0e0f38] mb-8 relative">
                GET IN TOUCH
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-[#ff7e5f] rounded-full"></div>
              </h2>

              <div className="space-y-6">
                <div className="touch group">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-[#22258a] rounded-full flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-white text-sm"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-[#0e0f38]">
                      Address:
                    </h4>
                  </div>
                  <p className="text-[#3d3e56] ml-11 group-hover:text-[#22258a] transition-colors">
                    Kuala Lumpur City Center, 50088 Kuala Lumpur, Malaysia
                  </p>
                </div>

                <div className="touch group">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-[#22258a] rounded-full flex items-center justify-center">
                      <i className="fas fa-phone text-white text-sm"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-[#0e0f38]">
                      Phone:
                    </h4>
                  </div>
                  <p className="text-[#3d3e56] ml-11 group-hover:text-[#22258a] transition-colors">
                    +60 3-1234 5678
                  </p>
                </div>

                <div className="touch group">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-[#22258a] rounded-full flex items-center justify-center">
                      <i className="fas fa-fax text-white text-sm"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-[#0e0f38]">
                      Fax:
                    </h4>
                  </div>
                  <p className="text-[#3d3e56] ml-11 group-hover:text-[#22258a] transition-colors">
                    +60 3-1234 5679
                  </p>
                </div>

                <div className="touch group">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-[#22258a] rounded-full flex items-center justify-center">
                      <i className="fas fa-envelope text-white text-sm"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-[#0e0f38]">
                      Email:
                    </h4>
                  </div>
                  <p className="text-[#3d3e56] ml-11 group-hover:text-[#22258a] transition-colors">
                    info@tropicalmalaysia.com
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-[#0e0f38] mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {["facebook", "twitter", "instagram", "youtube"].map(
                    (platform) => (
                      <div
                        key={platform}
                        className="w-10 h-10 bg-[#22258a] rounded-full flex items-center justify-center text-white hover:bg-[#0e0f38] transition-colors cursor-pointer"
                      >
                        <i className={`fab fa-${platform}`}></i>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="send bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#ff7e5f]"
              style={{ x: scrollSend, opacity: scrollOpacity }}
            >
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="info">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#0e0f38] mb-2"
                  >
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22258a] focus:border-transparent transition-all"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="info">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#0e0f38] mb-2"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22258a] focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="info">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-[#0e0f38] mb-2"
                  >
                    Comment:
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={user.comment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#22258a] focus:border-transparent transition-all resize-none"
                    rows="6"
                    placeholder="Tell us about your tropical Malaysia experience..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#22258a] to-[#0e0f38] text-white py-4 px-6 rounded-lg font-semibold hover:from-[#0e0f38] hover:to-[#22258a] transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </div>
                </button>
              </form>

              {formStatus && (
                <div
                  className={`formStatusMessage mt-4 p-4 rounded-lg text-center font-medium ${
                    formStatus.includes("successfully")
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-red-100 text-red-700 border border-red-300"
                  }`}
                >
                  {formStatus}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </ReactLenis>
    </div>
  );
};

export default ContactUs;
