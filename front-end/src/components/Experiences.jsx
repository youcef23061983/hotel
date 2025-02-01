import { Link } from "react-router-dom";
import UseFetch from "./UseFetch";
import Banner from "../pages/Banner";
import { useRef, useEffect, useState } from "react";
import { MdOutlineScubaDiving } from "react-icons/md";
import { GiSurfBoard } from "react-icons/gi";

import { MdKayaking } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { motion, useTransform, useScroll } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Experiences = () => {
  const url = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;
  const key = "gallery";

  const { data, isPending, error } = UseFetch(url, key);

  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
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

  const { scrollYProgress: scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.1 1"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollX = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const scrollXP = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: ref2,
    offset: ["0 1", "0.2 1"],
  });
  const scrollOpacity2 = useTransform(
    scrollYProgress2,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollX2 = useTransform(scrollYProgress2, [0, 1], [-200, 0]);
  const scrollXP2 = useTransform(scrollYProgress2, [0, 1], [-200, 0]);
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: ref3,
    offset: ["0 1", isMediumScreen ? "0.37 1" : "0.2 1"],
  });
  const scrollOpacity3 = useTransform(
    scrollYProgress3,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollX3 = useTransform(scrollYProgress3, [0, 1], [-200, 0]);
  const scrollXP3 = useTransform(scrollYProgress3, [0, 1], [-200, 0]);
  const { scrollYProgress: scrollYProgress4 } = useScroll({
    target: ref4,
    offset: ["0 1", isMediumScreen ? "0.53 1" : "0.5 1"],
  });
  const scrollOpacity4 = useTransform(
    scrollYProgress4,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollX4 = useTransform(scrollYProgress4, [0, 1], [-200, 0]);
  const scrollXP4 = useTransform(scrollYProgress4, [0, 1], [-200, 0]);

  const { scrollYProgress: scrollYProgress5 } = useScroll({
    target: ref5,
    offset: ["0 1", "0.6 1"],
  });
  const scrollOpacity5 = useTransform(
    scrollYProgress5,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollX5 = useTransform(scrollYProgress5, [0, 1], [-200, 0]);
  const scrollXP5 = useTransform(scrollYProgress5, [0, 1], [-200, 0]);
  const { scrollYProgress: scrollYProgress6 } = useScroll({
    target: ref6,
    offset: ["0 1", "0.6 1"],
  });
  const scrollOpacity6 = useTransform(
    scrollYProgress6,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollX6 = useTransform(scrollYProgress6, [0, 1], [-200, 0]);
  const scrollXP6 = useTransform(scrollYProgress6, [0, 1], [-200, 0]);
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <Helmet>
        <title>Experiences at LEGEND Hotel - Malaysia</title>
        <meta
          name="description"
          content="Discover the exciting experiences at LEGEND Hotel in Malaysia. Join us for unforgettable adventures."
        />
        <meta
          property="og:title"
          content="Experiences at LEGEND Hotel - Malaysia"
        />
        <meta
          property="og:description"
          content="Discover the exciting experiences at LEGEND Hotel in Malaysia. Join us for unforgettable adventures."
        />
        <meta property="og:image" content={data && data[0].images[0]} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Experiences at LEGEND Hotel - Malaysia"
        />
        <meta
          name="twitter:description"
          content="Discover the exciting experiences at LEGEND Hotel in Malaysia. Join us for unforgettable adventures."
        />
        <meta name="twitter:image" content={data && data[0].images[0]} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="experiences, hotel, Malaysia, LEGEND Hotel, adventures, activities"
        />
        <meta name="author" content="LEGEND Hotel" />
      </Helmet>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[4].images[15]}) center/cover `,
        }}
      >
        <Banner title="EXPERIENCES">
          <div className="iconsDetails">
            <div className="iconDetail">
              <MdKayaking className="icon" />
              <p data-testid="Experiences-paragraph">Kayaking</p>
            </div>

            <div className="iconDetail">
              <MdOutlineScubaDiving className="icon" />
              <p>Diving </p>
            </div>
            <div className="iconDetail">
              <GiSurfBoard className="icon" />
              <p>Windsurfing </p>
            </div>
          </div>
        </Banner>
      </div>
      <div className="spa" ref={ref}>
        <motion.h2 style={{ x: scrollX, opacity: scrollOpacity }}>
          Timeless Luxury Redefined: Unforgettable Experiences at Legend Hotel
        </motion.h2>
        <motion.p style={{ x: scrollXP, opacity: scrollOpacity }}>
          Embark on a journey of unparalleled hospitality and sophistication at
          Legend Hotel, where each moment is crafted to leave an indelible mark
          on your memory. From the moment you step into our opulent lobby, you
          are welcomed into a realm of timeless luxury. Indulge in exquisite
          accommodations, where modern elegance meets traditional charm,
          ensuring a stay beyond ordinary expectations. Our world-class dining
          options tantalize the taste buds with culinary delights, while the spa
          and wellness sanctuary beckons with rejuvenating experiences that
          harmonize mind, body, and spirit. Whether you seek a tranquil escape,
          a culinary adventure, or simply a haven of relaxation, Legend Hotel
          invites you to immerse yourself in a symphony of unparalleled
          experiences, where every detail is meticulously curated to create
          moments that linger long after you depart.
        </motion.p>
      </div>
      <div className="wellness" ref={ref2}>
        <motion.h2
          style={{ x: scrollX2, opacity: scrollOpacity2 }}
          data-testid="Experiences-Kayaking"
        >
          Navigating Serenity: Kayaking Adventures at Legend Hotel's Coastal
          Paradise
        </motion.h2>
        <motion.p
          style={{ x: scrollXP2, opacity: scrollOpacity2 }}
          data-testid="Experiences-Kayaking-Paragraph"
        >
          Embark on an exhilarating aquatic escapade with our Kayaking activity
          at Legend Hotel in Batu Ferringhi, Malaysia. Immerse yourself in the
          natural beauty of our coastal surroundings as you paddle along the
          pristine waters of the Andaman Sea. Our expertly guided kayaking tours
          offer a unique perspective of the picturesque shoreline, where lush
          landscapes meet the crystal-clear waters. Whether you're a seasoned
          kayaker seeking an adrenaline rush or a beginner eager to explore the
          beauty of the sea, our well-equipped kayaks and experienced
          instructors ensure a safe and memorable adventure. Glide through
          hidden coves, discover secluded beaches, and let the rhythmic sound of
          your paddle harmonize with the soothing whispers of the ocean. Legend
          Hotel invites you to embrace the thrill of kayaking and create
          unforgettable memories against the backdrop of Batu Ferringhi's
          coastal paradise.
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
            <img
              src={data && data[4].images[0]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={data && data[4].images[1]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={data && data[4].images[2]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness" ref={ref3}>
        <motion.h2 style={{ x: scrollX3, opacity: scrollOpacity3 }}>
          Soaring Elegance: Parasailing Adventures with a View at Legend Hotel
        </motion.h2>
        <motion.p style={{ x: scrollXP3, opacity: scrollOpacity3 }}>
          Title: "Soaring Elegance: Parasailing Adventures with a View at Legend
          Hotel" Embark on a breathtaking aerial journey with our Parasailing
          activity at Legend Hotel in Batu Ferringhi, Malaysia. Lift off into
          the sky and experience the thrill of soaring high above the azure
          waters of the Andaman Sea. Under the guidance of our certified
          instructors, feel the exhilaration as you ascend gently into the air,
          taking in panoramic views of the coastline and the scenic beauty that
          surrounds Legend Hotel. Whether you're an adrenaline enthusiast or a
          first-time flyer, our state-of-the-art equipment and unwavering
          commitment to safety ensure an unforgettable parasailing experience.
          Delight in the sensation of weightlessness as you float above the
          ocean, and let the cool sea breeze invigorate your senses. Legend
          Hotel invites you to add a touch of adventure to your stay and create
          lasting memories as you embrace the skies in this extraordinary
          parasailing escapade.
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
            <img
              src={data && data[4].images[3]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={data && data[4].images[4]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={data && data[4].images[5]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness" ref={ref4}>
        <motion.h2 style={{ x: scrollX4, opacity: scrollOpacity4 }}>
          Aquatic Discovery: Snorkeling Adventures at Legend Hotel's Coastal
          Haven{" "}
        </motion.h2>
        <motion.p style={{ x: scrollXP4, opacity: scrollOpacity4 }}>
          Dive into the vibrant underwater world with our Snorkeling activity at
          Legend Hotel in Batu Ferringhi, Malaysia. Set against the backdrop of
          the Andaman Sea, our coastal haven offers an unparalleled opportunity
          to explore the rich marine life that thrives beneath the surface.
          Equipped with high-quality snorkeling gear, guests can immerse
          themselves in the crystal-clear waters and discover the kaleidoscope
          of coral reefs and tropical fish that call these depths home. Whether
          you're a seasoned snorkeler or a first-time explorer, our experienced
          guides provide personalized assistance, ensuring a safe and enjoyable
          adventure. Glide through the gentle currents, marvel at the
          technicolor coral gardens, and witness the diverse marine ecosystem
          that flourishes just beyond the shores of Legend Hotel. Indulge in the
          magic of underwater exploration and create unforgettable moments
          amidst the wonders of Batu Ferringhi's coastal paradise.
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
            <img
              src={data && data[4].images[6]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={data && data[4].images[7]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={data && data[4].images[8]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="wellness" ref={ref5}>
        <motion.h2 style={{ x: scrollX5, opacity: scrollOpacity5 }}>
          Graceful Glides: Stand-Up Paddleboarding (SUP) Serenity at Legend
          Hotel
        </motion.h2>
        <motion.p style={{ x: scrollXP5, opacity: scrollOpacity5 }}>
          Title: "Graceful Glides: Stand-Up Paddleboarding (SUP) Serenity at
          Legend Hotel" Embark on a journey of tranquility and balance with our
          Stand-Up Paddleboarding (SUP) activity at Legend Hotel in Batu
          Ferringhi, Malaysia. This serene aquatic adventure invites guests to
          gracefully navigate the calm waters of the Andaman Sea atop a
          paddleboard, offering a unique perspective of the coastal beauty that
          surrounds our esteemed hotel. Whether you are a novice seeking a
          peaceful ride or an experienced paddleboarder craving the thrill of
          the open sea, our well-maintained equipment and expert instructors
          ensure an enjoyable and safe experience. Revel in the gentle rhythm of
          paddling as you cruise along the shoreline, taking in breathtaking
          views of the ocean and absorbing the soothing ambiance of our coastal
          paradise. Legend Hotel invites you to discover the art of stand-up
          paddleboarding, where every stroke becomes a moment of balance, and
          every glide brings you closer to the serene heart of Batu Ferringhi's
          waters.
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
            <img
              src={data && data[4].images[9]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={data && data[4].images[10]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={data && data[4].images[11]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness" ref={ref6}>
        <motion.h2 style={{ x: scrollX6, opacity: scrollOpacity6 }}>
          Riding the Breeze: Windsurfing Thrills at Legend Hotel's Coastal Oasis
        </motion.h2>
        <motion.p style={{ x: scrollXP6, opacity: scrollOpacity6 }}>
          Title: "Riding the Breeze: Windsurfing Thrills at Legend Hotel's
          Coastal Oasis" Embark on an exhilarating journey with our Windsurfing
          activity at Legend Hotel in Batu Ferringhi, Malaysia. Set against the
          backdrop of the Andaman Sea, our coastal oasis invites water sports
          enthusiasts to harness the power of the wind and ride the waves.
          Whether you're a seasoned windsurfer or a novice eager to learn, our
          expert instructors and top-notch equipment ensure a thrilling and safe
          experience. Feel the rush of adrenaline as you skillfully navigate the
          surf, the wind guiding your sail as you carve through the azure
          waters. With the stunning coastal views and reliable sea breezes,
          Legend Hotel provides the perfect setting for windsurfing enthusiasts
          to master the waves or for beginners to take their first exciting
          steps into this dynamic water sport. Join us for an unforgettable
          windsurfing adventure, where the thrill of the sea meets the elegance
          of coastal living at Legend Hotel. Message ChatGPT… ChatGPT can make
          mistakes. Consider checking importa
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
            <img
              src={data && data[4].images[12]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={data && data[4].images[13]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={data && data[4].images[14]}
              alt="slide_image"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Experiences;
