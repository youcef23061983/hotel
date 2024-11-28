import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactLenis } from "lenis/react";

import "./homepage.css";
import Banner from "./Banner";
import video from "/video.mp4";
import { useScroll, useTransform, motion } from "framer-motion";
import UseFetchQueries from "../components/UseFetchQueries";
const Homepage = () => {
  const url1 = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;
  const key1 = "gallery";

  const url2 = `${import.meta.env.VITE_PROD_URL_URL}/rooms`;
  const key2 = "rooms";

  const {
    data1: data,
    data2: roomsData,
    isPending1,
    error1,
    isPending2,
    error2,
  } = UseFetchQueries(url1, key1, url2, key2);
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
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: ref,
    offset: ["0 1", "0.1 0"],
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: ref2,
    offset: ["0 1", "0.4 1"],
  });
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: ref3,
    offset: ["0 1", isMediumScreen ? "0.7 1" : "0.6 1"],
  });
  const { scrollYProgress: scrollYProgress4 } = useScroll({
    target: ref4,
    offset: ["0 1", "0.85 1"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress1,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollOpacity2 = useTransform(
    scrollYProgress2,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollOpacity3 = useTransform(
    scrollYProgress3,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollOpacity4 = useTransform(
    scrollYProgress4,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollX = useTransform(scrollYProgress1, [0, 1], [-300, 0]);
  const scrollImg = useTransform(scrollYProgress1, [0, 1], [300, 0]);

  const scrollX2 = useTransform(scrollYProgress2, [0, 1], [-300, 0]);
  const scrollX3 = useTransform(scrollYProgress3, [0, 1], [-300, 0]);
  const scrollImg3 = useTransform(scrollYProgress3, [0, 1], [300, 0]);
  const scrollX4 = useTransform(scrollYProgress4, [0, 1], [-300, 0]);
  const scrollImg4 = useTransform(scrollYProgress4, [0, 1], [300, 0]);

  if (isPending1 || isPending2) return <h2>...is loading</h2>;
  if (error1) return <h2>{error1.message}</h2>;
  if (error2) return <h2>{error2.message}</h2>;

  return (
    <>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <div className="headerimages">
          <video src={video} autoPlay loop muted className="video" />
          <Banner title="you find legend in legend hotel" />
        </div>
        <div className="section" ref={ref}>
          <motion.div
            className="imgDiv"
            style={{
              opacity: scrollOpacity,
              x: scrollImg,
            }}
          >
            <img src={data && data[0]?.images[5]} alt="" className="img" />
          </motion.div>
          <motion.div
            className="p"
            style={{
              opacity: scrollOpacity,
              x: scrollX,
            }}
          >
            <h2>Enchanting Elegance: Welcome to Legend</h2>
            <p>
              Welcome to our exquisite hotel, where luxury meets comfort to
              create an unparalleled guest experience. Nestled in the heart of
              Batu Ferringhi, our establishment boasts a seamless blend of
              modern elegance and warm hospitality. Each meticulously designed
              room or suite offers a sanctuary of relaxation, featuring
              contemporary amenities and stylish decor. Our commitment to
              personalized service is evident in every detail, from the
              attentive staff ready to cater to your needs to the array of
              on-site facilities, including a gourmet restaurant, a rejuvenating
              spa, and state-of-the-art fitness center. Whether you're here for
              business or leisure, our hotel provides a haven of sophistication,
              ensuring that your stay is not just a visit but a cherished
              memory. Discover the epitome of hospitality at our Legend.
            </p>
            <Link className="link-btn" to="about">
              explore more
            </Link>
          </motion.div>
        </div>
        <motion.div className="roomSlider" ref={ref2}>
          <motion.h2
            style={{
              opacity: scrollOpacity2,
              x: scrollX2,
            }}
          >
            ROOMS & SUITES
          </motion.h2>
          <motion.p>
            Nestled across two interconnected buildings, Legend Hotel in Batu
            Ferringhi, Malaysia, stands as a haven of luxury with 30 double
            rooms, 5 single rooms, and an exclusive selection of 36 suites and
            junior suites. Offering a perfect blend of sophistication and
            comfort, families can cherish privacy in our interconnected rooms or
            indulge in the lavish Family Suite on the top floor, providing
            panoramic views of the captivating surroundings. Following our
            meticulous renovation in 2018, Legend Hotel boasts rooms adorned
            with elegant wooden parquet flooring, setting the stage for a truly
            luxurious experience.From the private balconies, guests can relish
            breathtaking views of the vibrant cityscape, creating an enchanting
            backdrop to your stay.
          </motion.p>
        </motion.div>

        <div className="container">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
            style={{ width: "auto", height: "auto" }}
          >
            {roomsData &&
              roomsData.map((room) => {
                const { name, images, id } = room;
                return (
                  <SwiperSlide key={id}>
                    <Link to={`/rooms/${id}`}>
                      <img src={images[0]} alt="slide_image" />
                    </Link>

                    <h3 style={{ textAlign: "center" }}>{name}</h3>
                  </SwiperSlide>
                );
              })}

            <div className="slider-controller">
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
            </div>
          </Swiper>
        </div>
        <div className="section" ref={ref3}>
          <motion.div
            className="imgDiv"
            style={{
              opacity: scrollOpacity3,
              x: scrollImg3,
            }}
          >
            <img src={data && data[3].images[0]} alt="" className="img" />
          </motion.div>
          <motion.div
            className="p"
            style={{
              opacity: scrollOpacity3,
              x: scrollX3,
            }}
          >
            <h2>RESTAURANTS</h2>
            <p>
              Discover a symphony of flavors at Legend Hotel, where our diverse
              array of restaurants invites you on a culinary exploration in the
              heart of Batu Ferringhi, Malaysia. From the exotic to the
              familiar, each dining venue is a unique blend of global influences
              and local flair. Whether you crave the spices of Malaysian
              cuisine, the sophistication of international dishes, or the
              laid-back charm of casual dining, our restaurants offer a variety
              to suit every palate. Each culinary experience is crafted with
              passion and precision, creating a delightful mosaic of tastes that
              will leave a lasting impression. Welcome to Legend Hotel, where
              our many restaurants promise a journey through the world of
              exceptional dining.
            </p>
            <Link className="link-btn" to="restaurant">
              explore more
            </Link>
          </motion.div>
        </div>
        <div className="section" ref={ref4}>
          <motion.div
            className="imgDiv"
            style={{
              opacity: scrollOpacity4,
              x: scrollImg4,
            }}
          >
            <img src={data && data[2].images[3]} alt="" className="img" />
          </motion.div>
          <motion.div
            className="p"
            style={{
              opacity: scrollOpacity4,
              x: scrollX4,
            }}
          >
            <h2>SPA & WELLNESS</h2>
            <p>
              Indulge in ultimate relaxation and rejuvenation at Legend Hotel's
              Leisure and Wellness center in the serene enclave of Batu
              Ferringhi, Malaysia. Our state-of-the-art facilities are designed
              to harmonize body and mind, offering a sanctuary for both leisure
              and wellness enthusiasts. Immerse yourself in a world of
              tranquility with our spa treatments, tailored to pamper and
              revitalize. Whether you seek a peaceful escape in our lush gardens
              or a invigorating workout in our modern fitness center, we cater
              to every wellness need. At Legend Hotel, we redefine the art of
              leisure and wellness, ensuring an experience that uplifts your
              spirit and enhances your well-being. Welcome to a haven where
              relaxation meets rejuvenation, and every moment is dedicated to
              your personal oasis of serenity.
            </p>
            <Link className="link-btn" to="wellness">
              explore more
            </Link>
          </motion.div>
        </div>
      </ReactLenis>
    </>
  );
};

export default Homepage;
