import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "./homepage.css";
import Banner from "./Banner";
import video from "../assets/video.mp4";

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
  return (
    <div>
      <div
        className="headerimages"
        // style={{
        //   background: `url(${data && data[0].images[index]}) center/cover `,
        // }}
      >
        <video src={video} autoPlay loop muted className="video" />
        <Banner title="you find legend in legend hotel" />
      </div>
      <div className="section">
        <div className="imgDiv">
          <img src={data && data[0].images[5]} alt="" className="img" />
        </div>
        <div className="p">
          <h2>Enchanting Elegance: Welcome to Legend</h2>
          <p>
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
          </p>
          <Link className="link-btn">explore more</Link>
        </div>
      </div>
      <div className="roomSlider">
        <h2>ROOMS & SUITES</h2>
        <p>
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
        </p>
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
      <div className="section">
        <div className="imgDiv">
          <img src={data && data[3].images[0]} alt="" className="img" />
        </div>
        <div className="p">
          <h2>RESTAURANTS</h2>
          <p>
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
          </p>
          <Link className="link-btn" to="restaurant">
            explore more
          </Link>
        </div>
      </div>
      <div className="section">
        <div className="imgDiv">
          <img src={data && data[2].images[3]} alt="" className="img" />
        </div>
        <div className="p">
          <h2>SPA & WELLNESS</h2>
          <p>
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
          </p>
          <Link className="link-btn">explore more</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
