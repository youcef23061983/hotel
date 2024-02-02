import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./homepage.css";
import Banner from "./Banner";
import video from "../assets/video.mp4";
import { useScroll, useTransform, motion } from "framer-motion";

const Homepage = () => {
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
  const roomsFn = async () => {
    const res = await fetch("http://localhost:3000/rooms");
    if (!res.ok) {
      throw Error("ther is no data");
    }
    return res.json();
  };
  const { data: roomsData } = useQuery({
    queryKey: ["rooms"],
    queryFn: roomsFn,
  });

  const [index, setIndex] = useState(0);
  const x = (data && data[0].images.length) || 0;

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % x);
    }, 1000);

    return () => clearInterval(slider);
  }, [x]);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    ref: ref,
    offset: ["0 1", "0.3 1"],
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    ref: ref2,
    offset: ["0 1", "0.45 1"],
  });
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    ref: ref3,
    offset: ["0 1", "0.7 1"],
  });
  const { scrollYProgress: scrollYProgress4 } = useScroll({
    ref: ref4,
    offset: ["0 1", "0.9 1"],
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
  const scrollX = useTransform(scrollYProgress1, [0, 1], [-900, 0]);
  const scrollImg = useTransform(scrollYProgress1, [0, 1], [900, 0]);
  const scrollXP = useTransform(scrollYProgress1, [0, 1], [-1800, 0]);

  const scrollX2 = useTransform(scrollYProgress2, [0, 1], [-900, 0]);
  const scrollXP2 = useTransform(scrollYProgress2, [0, 1], [-1800, 0]);
  const scrollX3 = useTransform(scrollYProgress3, [0, 1], [-900, 0]);
  const scrollXP3 = useTransform(scrollYProgress3, [0, 1], [-1800, 0]);
  const scrollImg3 = useTransform(scrollYProgress3, [0, 1], [900, 0]);
  const scrollX4 = useTransform(scrollYProgress4, [0, 1], [-900, 0]);
  const scrollXP4 = useTransform(scrollYProgress4, [0, 1], [-1800, 0]);
  const scrollImg4 = useTransform(scrollYProgress4, [0, 1], [900, 0]);

  const isSmallScreen = window.matchMedia("(min-width: 336px)").matches;
  const isLargeScreen = window.matchMedia("(min-width: 776px)").matches;

  return (
    <div>
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
          <img src={data && data[0].images[5]} alt="" className="img" />
        </motion.div>
        <div className="p">
          <motion.h2
            style={{
              opacity: scrollOpacity,
              x: scrollX,
            }}
          >
            Enchanting Elegance: Welcome to Legend
          </motion.h2>
          <motion.p
            style={{
              opacity: scrollOpacity,
              x: scrollXP,
            }}
          >
            Welcome to our exquisite hotel, where luxury meets comfort to create
            an unparalleled guest experience. Nestled in the heart of Batu
            Ferringhi, our establishment boasts a seamless blend of modern
            elegance and warm hospitality. Each meticulously designed room or
            suite offers a sanctuary of relaxation, featuring contemporary
            amenities and stylish decor. Our commitment to personalized service
            is evident in every detail, from the attentive staff ready to cater
            to your needs to the array of on-site facilities, including a
            gourmet restaurant, a rejuvenating spa, and state-of-the-art fitness
            center. Whether you're here for business or leisure, our hotel
            provides a haven of sophistication, ensuring that your stay is not
            just a visit but a cherished memory. Discover the epitome of
            hospitality at our Legend.
          </motion.p>
          <Link className="link-btn" to="about">
            explore more
          </Link>
        </div>
      </div>
      <div className="roomSlider" ref={ref2}>
        <motion.h2
          style={{
            opacity: scrollOpacity2,
            x: scrollX2,
          }}
        >
          ROOMS & SUITES
        </motion.h2>
        <motion.p
          style={{
            opacity: scrollOpacity2,
            x: scrollXP2,
          }}
        >
          Nestled across two interconnected buildings, Legend Hotel in Batu
          Ferringhi, Malaysia, stands as a haven of luxury with 30 double rooms,
          5 single rooms, and an exclusive selection of 36 suites and junior
          suites. Offering a perfect blend of sophistication and comfort,
          families can cherish privacy in our interconnected rooms or indulge in
          the lavish Family Suite on the top floor, providing panoramic views of
          the captivating surroundings. Following our meticulous renovation in
          2018, Legend Hotel boasts rooms adorned with elegant wooden parquet
          flooring, setting the stage for a truly luxurious experience.From the
          private balconies, guests can relish breathtaking views of the vibrant
          cityscape, creating an enchanting backdrop to your stay.
        </motion.p>
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
        <div className="p">
          <motion.h2
            style={{
              opacity: scrollOpacity3,
              x: scrollX3,
            }}
          >
            RESTAURANTS
          </motion.h2>
          <motion.p
            style={{
              opacity: scrollOpacity3,
              x: scrollXP3,
            }}
          >
            Discover a symphony of flavors at Legend Hotel, where our diverse
            array of restaurants invites you on a culinary exploration in the
            heart of Batu Ferringhi, Malaysia. From the exotic to the familiar,
            each dining venue is a unique blend of global influences and local
            flair. Whether you crave the spices of Malaysian cuisine, the
            sophistication of international dishes, or the laid-back charm of
            casual dining, our restaurants offer a variety to suit every palate.
            Each culinary experience is crafted with passion and precision,
            creating a delightful mosaic of tastes that will leave a lasting
            impression. Welcome to Legend Hotel, where our many restaurants
            promise a journey through the world of exceptional dining.
          </motion.p>
          <Link className="link-btn" to="restaurant">
            explore more
          </Link>
        </div>
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
        <div className="p">
          <motion.h2
            style={{
              opacity: scrollOpacity4,
              x: scrollX4,
            }}
          >
            SPA & WELLNESS
          </motion.h2>
          <motion.p
            style={{
              opacity: scrollOpacity4,
              x: scrollXP4,
            }}
          >
            Indulge in ultimate relaxation and rejuvenation at Legend Hotel's
            Leisure and Wellness center in the serene enclave of Batu Ferringhi,
            Malaysia. Our state-of-the-art facilities are designed to harmonize
            body and mind, offering a sanctuary for both leisure and wellness
            enthusiasts. Immerse yourself in a world of tranquility with our spa
            treatments, tailored to pamper and revitalize. Whether you seek a
            peaceful escape in our lush gardens or a invigorating workout in our
            modern fitness center, we cater to every wellness need. At Legend
            Hotel, we redefine the art of leisure and wellness, ensuring an
            experience that uplifts your spirit and enhances your well-being.
            Welcome to a haven where relaxation meets rejuvenation, and every
            moment is dedicated to your personal oasis of serenity.
          </motion.p>
          <Link className="link-btn" to="wellness">
            explore more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
