import Banner from "../pages/Banner";
import { useParams, useLocation, Link } from "react-router-dom";
import "./detail.css";
import { GrNext, GrPrevious, GrCube } from "react-icons/gr";
import { PiTelevisionSimpleThin } from "react-icons/pi";
import { FaKitchenSet, FaWifi } from "react-icons/fa6";

import { TbAirConditioning, Tb24Hours, TbSofa, TbBath } from "react-icons/tb";
import { MdBalcony } from "react-icons/md";
import { MdOutlineFreeBreakfast, MdOutlinePeopleAlt } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQueries, useQueryClient } from "@tanstack/react-query";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { useScroll, useTransform, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import DetailUseFetchQueries from "./DetailUseFetchQueries";

const Details = () => {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const url1 = `${import.meta.env.VITE_PROD_URL_URL}/rooms`;
  const key1 = "rooms";

  const location = useLocation();

  const {
    data1: roomsData,
    data2: roomData,
    isPending1,
    isPending2,
    error1,
    error2,
  } = DetailUseFetchQueries(url1, key1, id);

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
          media.removeListener(listener);
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
  const goBack = (search) => {
    if (search && search.includes("room")) {
      return "go back to rooms";
    } else if (search && search.includes("suite")) {
      return "go back to suites";
    } else {
      return "go back to all rooms & suites";
    }
  };
  if (isPending1 || isPending2) return <h2>...is loading</h2>;
  if (error1) return <h2>{error1.message}</h2>;
  if (error2) return <h2>{error2.message}</h2>;
  return (
    <div>
      <Helmet>
        <title>{roomData.name}</title>
        <meta
          name="description"
          content={
            roomData.name ||
            "Discover the details of our luxurious rooms at LEGEND Hotel in Malaysia. Experience comfort and elegance."
          }
        />
        <meta
          property="og:title"
          content={roomData.name || "Room Details - LEGEND Hotel"}
        />
        <meta
          property="og:description"
          content="Discover the details of our luxurious rooms at LEGEND Hotel in Malaysia. Experience comfort and elegance."
        />
        <meta property="og:image" content={img1} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Room Details - LEGEND Hotel" />
        <meta
          name="twitter:description"
          content="Discover the details of our luxurious rooms at LEGEND Hotel in Malaysia. Experience comfort and elegance."
        />
        <meta name="twitter:image" content={img1} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="room details, hotel, Malaysia, luxury, comfort, LEGEND Hotel"
        />
        <meta name="author" content="LEGEND Hotel" />
        <meta
          property="og:url"
          content={`https://hotelmalaysia.vercel.app/rooms/${id}`}
        />
      </Helmet>
      <div className="headerimages">
        <img
          src={`${img1}`}
          alt="noimage"
          loading="lazy"
          className="detailImg"
        />

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
          <Link
            className="nav-btn"
            to={`..${location.state?.search || ""}`}
            relative="path"
          >
            &larr;
            <span>{goBack(location.state?.search)}</span>
          </Link>
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
          <img
            src={`${roomImages && roomImages[index]}`}
            className="img"
            loading="lazy"
          />
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
                      <img
                        src={`${images[0]}`}
                        alt="slide_image"
                        loading="lazy"
                      />
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
