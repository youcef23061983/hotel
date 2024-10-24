import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import UseFetch from "./UseFetch";
import { PiOfficeChair } from "react-icons/pi";

import { LuPartyPopper } from "react-icons/lu";
import { TfiGallery } from "react-icons/tfi";

import Banner from "../pages/Banner";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { motion, useTransform, useScroll } from "framer-motion";
const Events = () => {
  const url = "http://localhost:3000/gallery";
  const key = "gallery";

  const { data, isPending, error } = UseFetch(url, key);

  useEffect(() => {
    document.title = "Events";
  }, []);
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

  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const { scrollYProgress: scrollYProgress } = useScroll({
    ref: ref,
    offset: ["0 1", "0.2 1"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollX = useTransform(scrollYProgress, [0, 1], [-900, 0]);
  const scrollXP = useTransform(scrollYProgress, [0, 1], [-1800, 0]);
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: ref2,
    offset: ["0 1", "0.2 1"],
  });
  const scrollOpacity2 = useTransform(
    scrollYProgress2,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollX2 = useTransform(scrollYProgress2, [0, 1], [-900, 0]);
  const scrollXP2 = useTransform(scrollYProgress2, [0, 1], [-1800, 0]);
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: ref3,
    offset: ["0 1", "0.5 1"],
  });
  const scrollOpacity3 = useTransform(
    scrollYProgress3,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollX3 = useTransform(scrollYProgress3, [0, 1], [-900, 0]);
  const scrollXP3 = useTransform(scrollYProgress3, [0, 1], [-1800, 0]);
  const { scrollYProgress: scrollYProgress4 } = useScroll({
    target: ref4,
    offset: ["0 1", isMediumScreen ? "0.8 1" : "0.6 1"],
  });
  const scrollOpacity4 = useTransform(
    scrollYProgress4,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollX4 = useTransform(scrollYProgress4, [0, 1], [-900, 0]);
  const scrollXP4 = useTransform(scrollYProgress4, [0, 1], [-1800, 0]);
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[5].images[0]}) center/cover `,
        }}
      >
        <Banner title="Events">
          <div className="iconsDetails">
            <div className="iconDetail">
              <LuPartyPopper className="icon" />
              <p>Wedding</p>
            </div>

            <div className="iconDetail">
              <TfiGallery className="icon" />
              <p>Gallery </p>
            </div>
            <div className="iconDetail">
              <PiOfficeChair className="icon" />
              <p style={{ marginLeft: "1rem" }}>Meetings </p>
            </div>
          </div>
        </Banner>
      </div>
      <div className="wellness" ref={ref}>
        <motion.h2
          style={{ opacity: scrollOpacity, x: scrollX }}
          data-testid="EventsH2"
        >
          Elegance in Every Occasion: Unforgettable Events at Legend Hotel
        </motion.h2>
        <motion.p style={{ opacity: scrollOpacity, x: scrollXP }}>
          At Legend Hotel in Batu Ferringhi, Malaysia, we redefine the art of
          hosting exceptional events. Whether it's a grand celebration,
          corporate gathering, or intimate ceremony, our exquisite venues and
          meticulous event planning promise an experience beyond compare. With
          stunning ballrooms, versatile meeting spaces, and outdoor venues set
          against the backdrop of coastal beauty, Legend Hotel provides the
          perfect canvas for any occasion. Our dedicated event team ensures
          every detail is seamlessly executed, from exquisite catering to
          state-of-the-art audiovisual setups. Elevate your events with the
          essence of sophistication and personalized service that epitomizes the
          Legend Hotel experience. Create lasting memories in an atmosphere
          where every event is a masterpiece, and every moment is an elegant
          celebration of life's special occasions.
        </motion.p>
      </div>
      <div className="wellness" ref={ref2}>
        <motion.h2 style={{ x: scrollX2, opacity: scrollOpacity2 }}>
          Whispers of Forever: Timeless Weddings at Legend Hotel
        </motion.h2>
        <motion.p style={{ x: scrollXP2, opacity: scrollOpacity2 }}>
          Celebrate the union of love against the enchanting backdrop of Legend
          Hotel in Batu Ferringhi, Malaysia. Our exquisite venue, embraced by
          the coastal allure, sets the stage for a wedding day as timeless as
          your love story. Whether you envision an intimate seaside ceremony or
          a grand ballroom affair, our dedicated wedding specialists are
          committed to turning your dreams into reality. The stunning
          surroundings provide a picturesque canvas for capturing cherished
          moments, while our expert team attends to every detail, ensuring a
          seamless and magical celebration. From the ceremony to the reception,
          Legend Hotel's commitment to elegance and personalized service
          transforms your wedding day into an unforgettable chapter of your love
          story. Let the whispers of forever begin in a place where every nuance
          of romance is celebrated, and where your wedding becomes a legend in
          its own right.
        </motion.p>
        <Link className="link-btn" to="/contact">
          Contact Us
        </Link>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={data && data[5].images[0]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[1]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[2]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[3]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness" ref={ref3}>
        <motion.h2 style={{ x: scrollX3, opacity: scrollOpacity3 }}>
          Artistry Unveiled: Gallery Showcases at Legend Hotel
        </motion.h2>
        <motion.p style={{ x: scrollXP3, opacity: scrollOpacity3 }}>
          Discover a symphony of visual delights at Legend Hotel in Batu
          Ferringhi, Malaysia, where we proudly curate an ever-evolving gallery
          of artistic expressions. Our gallery events showcase a diverse range
          of creative endeavors, from contemporary masterpieces to culturally
          rich exhibits, providing a platform for both emerging and established
          artists. The gallery spaces within our hotel serve as dynamic
          canvases, capturing the essence of local and international art scenes.
          Join us in celebrating the fusion of culture and creativity, where
          each brushstroke and every sculpture tells a unique story. Legend
          Hotel's commitment to artistic expression transforms our spaces into
          vibrant hubs of inspiration, inviting guests to immerse themselves in
          the beauty and thought-provoking narratives that grace our gallery
          walls. Whether you are an art enthusiast or a curious soul, our
          gallery events promise an enriching experience that transcends the
          ordinary, leaving a lasting impression on the connoisseur in you.
        </motion.p>
        <Link className="link-btn" to="/contact">
          Contact Us
        </Link>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={data && data[5].images[4]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[5]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[6]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness" ref={ref4}>
        <motion.h2 style={{ x: scrollX4, opacity: scrollOpacity4 }}>
          Seamless Convergence: Successful Meetings at Legend Hotel
        </motion.h2>
        <motion.p style={{ x: scrollXP4, opacity: scrollOpacity4 }}>
          Elevate your corporate gatherings at Legend Hotel in Batu Ferringhi,
          Malaysia, where business meets sophistication in seamless harmony. Our
          versatile meeting spaces are designed to accommodate a spectrum of
          events, from intimate boardroom discussions to large-scale
          conferences. With state-of-the-art facilities and a dedicated events
          team, Legend Hotel ensures that every meeting is characterized by
          precision and productivity. Our thoughtfully curated meeting packages
          cater to all your business needs, providing a blend of comfort and
          efficiency. The coastal beauty surrounding our hotel adds a touch of
          inspiration to your corporate endeavors, fostering an environment
          where ideas flourish and connections thrive. Trust Legend Hotel to be
          the backdrop for your successful business events, where every detail
          is meticulously attended to, allowing you to focus on what matters
          most – the success of your meeting.
        </motion.p>
        <Link className="link-btn" to="/contact">
          Contact Us
        </Link>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={data && data[5].images[7]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[8]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Events;
