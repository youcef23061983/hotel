import Banner from "../pages/Banner";
import { useParams, Link } from "react-router-dom";
import "./detail.css";
import { GrNext, GrPrevious, GrCube } from "react-icons/gr";
import { PiTelevisionSimpleThin } from "react-icons/pi";
import { FaKitchenSet, FaWifi } from "react-icons/fa6";

import { TbAirConditioning, Tb24Hours, TbSofa, TbBath } from "react-icons/tb";
import { MdBalcony } from "react-icons/md";
import { MdOutlineFreeBreakfast, MdOutlinePeopleAlt } from "react-icons/md";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQueries, useQueryClient } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { useScroll, useTransform, motion } from "framer-motion";

const Details = () => {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const url = "http://localhost:3000/rooms";
  const key1 = "rooms";

  const Fn1 = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw Error("there is no first data");
    }
    return res.json();
  };

  const Fn2 = async () => {
    const res = await fetch(`${url}/${id}`);
    if (!res.ok) {
      throw Error("there is no second data");
    }
    return res.json();
  };

  const queryClient = useQueryClient();

  const [
    { data: roomsData, isPending: isPending1, error: error1 },
    { data: roomData, isPending: isPending2, error: error2 },
  ] = useQueries({
    queries: [
      {
        queryKey: [key1],
        queryFn: Fn1,
      },
      {
        queryKey: [key1, id],
        queryFn: Fn2,
        initialData: () => {
          const data = queryClient.getQueryData([key1]);

          return data ? data.find((d) => d.id === parseInt(id)) : undefined;
        },
        enabled: !!id,
      },
    ],
  });

  useEffect(() => {
    if (roomData) {
      const name = roomData.name || "";
      document.title = name;
    }
  }, [roomData]);
  const img1 = roomData ? roomData.images[0] : null;

  const roomImages = roomData ? roomData.images : null;
  const roomIcons = roomData ? roomData.amenities : 0;
  const x = roomData ? roomImages.length : 0;
  const square = roomData ? roomData.room_square_footage : [];
  const guest = roomData ? roomData.capacity : [];
  const bath = roomData ? roomData.bath_number : [];

  function renderIcon(iconName) {
    switch (iconName) {
      case "PiTelevisionSimpleThin":
        return <PiTelevisionSimpleThin className="icon" />;
      case "FaWifi":
        return <FaWifi className="icon" />;
      case "Air Conditioning":
        return <TbAirConditioning className="icon" />;
      case "TbSofa":
        return <TbSofa className="icon" />;
      case "Tb24Hours":
        return <Tb24Hours />;
      case "MdOutlineFreeBreakfast":
        return <MdOutlineFreeBreakfast className="icon" />;
      case "FaKitchenSet":
        return <FaKitchenSet className="icon" />;
      case "MdBalcony":
        return <MdBalcony className="icon" />;
      case "GrCube":
        return <GrCube className="icon" />;
      case "MdOutlinePeopleAlt":
        return <MdOutlinePeopleAlt className="icon" />;
      case "TbBath":
        return <TbBath className="icon" />;

      default:
        return null;
    }
  }

  const otherRooms = roomsData
    ? roomsData.filter(
        (room) => room.type === roomData.type && room.id !== roomData.id
      )
    : [];
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
          media.removeListener(listenerList);
        }
      };
    }, [matches, query]);

    return matches;
  };
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const ref = useRef(null);
  const { scrollYProgress: scrollYProgress } = useScroll({
    ref: ref,
    offset: ["0 1", isMediumScreen ? "0.3 1" : "0.2 1"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    [0, 0.1, 0.3, 1]
  );
  const scrollIcon = useTransform(scrollYProgress, [0, 1], ["70vw", "0vw"]);
  const scrollP = useTransform(scrollYProgress, [0, 1], ["-70vw", "0vw"]);

  if (isPending1 || isPending2) return <h2>...is loading</h2>;
  if (error1) return <h2>{error1.message}</h2>;
  if (error2) return <h2>{error2.message}</h2>;
  return (
    <div>
      <div className="headerimages">
        <img src={`/${img1}`} alt="no image" className="detailImg" />

        <Banner title={roomData.name}>
          <div className="iconsDetails">
            <div className="iconDetail">
              {renderIcon(square.icon)}
              <p>{square.number} square foot</p>
            </div>
            <div className="iconDetail">
              {renderIcon(guest.icon)}
              <p>{guest.number} guest</p>
            </div>
            <div className="iconDetail">
              {renderIcon(bath.icon)}
              <p>{bath.number} bathroom</p>
            </div>
          </div>
        </Banner>
      </div>
      <div className="roomSection" ref={ref}>
        <motion.div
          className="p"
          style={{ opacity: scrollOpacity, x: scrollP }}
        >
          <h2 data-testid="h2">about the room </h2>
          <p>{roomData ? roomData.intoduction : ""}</p>
          <Link className="nav-btn" to={`/booking/${id}`}>
            book now
          </Link>
        </motion.div>
        <motion.div
          className="roomIcons"
          style={{ opacity: scrollOpacity, x: scrollIcon }}
        >
          {roomIcons.map((icon, index) => {
            return (
              <div className="icon" key={index}>
                <button>{roomData && renderIcon(icon.icon)}</button>
                <p>{roomData && icon.name}</p>
              </div>
            );
          })}{" "}
        </motion.div>
      </div>

      <div>
        <div className="roomImages">
          <img src={`/${roomImages && roomImages[index]}`} className="img" />
        </div>
        <div className="sliderButtons">
          <button
            className="sliderButton"
            onClick={() => setIndex((prev) => prev - 1)}
            disabled={index == 0}
          >
            <GrPrevious />
          </button>
          <button
            className="sliderButton"
            onClick={() => setIndex((prev) => (prev + 1) % x)}
            disabled={index == x - 1}
          >
            <GrNext />
          </button>
        </div>
      </div>

      <div className="feedBack">
        <h2>feed back</h2>
        <p>{roomData ? roomData.feedback : ""}</p>
      </div>
      <div className="otherRooms">
        <h2>other rooms</h2>
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
          {otherRooms &&
            otherRooms.map((room) => {
              const { name, images, id } = room;
              return (
                <SwiperSlide key={id}>
                  <div className="otherRoom">
                    <Link to={`/rooms/${id}`}>
                      <img src={`/${images[0]}`} alt="slide_image" />
                    </Link>

                    <h3>{name}</h3>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default Details;
