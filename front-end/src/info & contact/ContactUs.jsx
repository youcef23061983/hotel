import Banner from "../pages/Banner";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { MdAttachEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { ReactLenis } from "lenis/react";
import UseFetch from "../data managment/UseFetch";
import {
  FaComments,
  FaMapMarkerAlt,
  FaPhone,
  FaFax,
  FaEnvelope,
  FaUser,
  FaEdit,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
} from "react-icons/fa";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

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
    offset: ["start end", "end start"],
  });

  // Improved animations with better timing
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );

  const scrollITouch = useTransform(scrollYProgress, [0, 0.4], [-100, 0]);

  const scrollSend = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <>
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
        <div className="relative min-h-screen py-20 px-4" ref={ref1}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-[#22258a] to-[#0e0f38] rounded-full opacity-10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-[#ff7e5f] to-[#22258a] rounded-full opacity-5 blur-2xl"></div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative z-10">
            {/* Left Side - Get in Touch */}
            <motion.div
              className="group w-full h-full"
              style={{
                x: scrollITouch,
                opacity: scrollOpacity,
                scale: scrollScale,
              }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] w-full h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#22258a] to-[#0e0f38] rounded-2xl flex items-center justify-center shadow-lg">
                    <FaComments className="text-white text-xl" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0e0f38] to-[#22258a] bg-clip-text text-transparent">
                    GET IN TOUCH
                  </h2>
                </div>

                <div className="space-y-6 flex-1">
                  {[
                    {
                      icon: FaMapMarkerAlt,
                      title: "Address:",
                      content:
                        "Kuala Lumpur City Center, 50088 Kuala Lumpur, Malaysia",
                      color: "from-emerald-500 to-green-600",
                    },
                    {
                      icon: FaPhone,
                      title: "Phone:",
                      content: "+60 3-1234 5678",
                      color: "from-blue-500 to-cyan-600",
                    },
                    {
                      icon: FaFax,
                      title: "Fax:",
                      content: "+60 3-1234 5679",
                      color: "from-purple-500 to-indigo-600",
                    },
                    {
                      icon: FaEnvelope,
                      title: "Email:",
                      content: "info@tropicalmalaysia.com",
                      color: "from-rose-500 to-pink-600",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="group/item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className="text-white text-sm" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-[#0e0f38] mb-1">
                            {item.title}
                          </h4>
                          <p className="text-[#3d3e56] leading-relaxed group-hover/item:text-[#22258a] transition-colors duration-300">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-gray-200/50">
                  <h4 className="text-lg font-semibold text-[#0e0f38] mb-4 text-center">
                    Follow Our Journey
                  </h4>
                  <div className="flex justify-center gap-3">
                    {[
                      { icon: FaFacebookF, color: "hover:bg-blue-600" },
                      { icon: FaTwitter, color: "hover:bg-sky-500" },
                      {
                        icon: FaInstagram,
                        color:
                          "hover:bg-gradient-to-r from-purple-600 to-pink-600",
                      },
                      { icon: FaYoutube, color: "hover:bg-red-600" },
                      { icon: FaTiktok, color: "hover:bg-black" },
                    ].map((social, index) => (
                      <motion.div
                        key={index}
                        className={`w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-[#3d3e56] cursor-pointer transition-all duration-300 hover:scale-110 hover:text-white hover:border-transparent shadow-lg hover:shadow-xl ${social.color}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              className="w-full h-full"
              style={{
                x: scrollSend,
                opacity: scrollOpacity,
                scale: scrollScale,
              }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 w-full h-full">
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[#0e0f38] to-[#22258a] bg-clip-text text-transparent mb-3">
                    Send Us a Message
                  </h3>
                  <p className="text-[#3d3e56]">
                    We'd love to hear from you. Send us a message and we'll
                    respond as soon as possible.
                  </p>
                </motion.div>

                <form
                  ref={form}
                  onSubmit={sendEmail}
                  className="space-y-6 flex flex-col"
                >
                  <div className="flex-1 space-y-6">
                    <motion.div
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-[#0e0f38] mb-2 uppercase tracking-wider"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#22258a] focus:ring-2 ring-[#22258a]/20 transition-all duration-300 placeholder-gray-400 text-[#0e0f38] font-medium shadow-lg focus:shadow-xl"
                          placeholder="Enter your first name"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3d3e56]">
                          <FaUser className="text-sm" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#0e0f38] mb-2 uppercase tracking-wider"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#22258a] focus:ring-2 ring-[#22258a]/20 transition-all duration-300 placeholder-gray-400 text-[#0e0f38] font-medium shadow-lg focus:shadow-xl"
                          placeholder="Enter your email address"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#3d3e56]">
                          <FaEnvelope className="text-sm" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="group flex-1 flex flex-col"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <label
                        htmlFor="comment"
                        className="block text-sm font-semibold text-[#0e0f38] mb-2 uppercase tracking-wider"
                      >
                        Your Message
                      </label>
                      <div className="relative flex-1">
                        <textarea
                          id="comment"
                          name="comment"
                          value={user.comment}
                          onChange={handleChange}
                          className="w-full h-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#22258a] focus:ring-2 ring-[#22258a]/20 transition-all duration-300 placeholder-gray-400 text-[#0e0f38] font-medium shadow-lg focus:shadow-xl resize-none"
                          placeholder="Tell us about your tropical Malaysia experience or ask us anything..."
                        />
                        <div className="absolute right-3 top-3 text-[#3d3e56]">
                          <FaEdit className="text-sm" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-[#22258a] to-[#0e0f38] text-white py-4 px-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform mt-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <span>Send Message</span>
                      <FaPaperPlane className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f38] to-[#22258a] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.button>
                </form>

                {formStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-3 rounded-xl text-center font-semibold backdrop-blur-lg border ${
                      formStatus.includes("successfully")
                        ? "bg-emerald-50/80 text-emerald-700 border-emerald-200"
                        : "bg-rose-50/80 text-rose-700 border-rose-200"
                    } shadow-lg`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {formStatus.includes("successfully") ? (
                        <FaCheckCircle />
                      ) : (
                        <FaExclamationCircle />
                      )}
                      {formStatus}
                    </div>
                  </motion.div>
                )}

                <div className="mt-6 text-center">
                  <p className="text-xs text-[#3d3e56]">
                    <FaClock className="inline mr-1" />
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ReactLenis>
    </>
  );
};

export default ContactUs;
