import {
  useQuery,
  useQueryClient,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { useParams, Link } from "react-router-dom";
import "./detail.css";
import { GrNext, GrPrevious, GrCube } from "react-icons/gr";
import { PiTelevisionSimpleThin } from "react-icons/pi";
import { FaKitchenSet, FaWifi } from "react-icons/fa6";

import { TbAirConditioning, Tb24Hours, TbSofa, TbBath } from "react-icons/tb";
import { MdBalcony } from "react-icons/md";
import { MdOutlineFreeBreakfast, MdOutlinePeopleAlt } from "react-icons/md";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

const Details = () => {
  const { id } = useParams();
  // const queryClient = useQueryClient();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const roomFn = async (id) => {
    const res = await fetch(`http://localhost:3000/rooms/${id}`);
    if (!res.ok) {
      throw Error("ther is no data");
    }
    return res.json();
  };
  const {
    data: roomData,
    isPending,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: () => roomFn(id),
    initialData: () => queryClient.getQueryData("rooms"),
    placeholderData: keepPreviousData,
  });
  const img1 = roomData ? roomData.images[0] : 0;
  const roomImages = roomData ? roomData.images : 0;
  const roomIcons = roomData ? roomData.amenities : 0;

  const [index, setIndex] = useState(0);
  const x = roomData && roomImages.length;

  function renderIcon(iconName) {
    switch (iconName) {
      case "PiTelevisionSimpleThin":
        return <PiTelevisionSimpleThin />;
      case "FaWifi":
        return <FaWifi />;
      case "Air Conditioning":
        return <TbAirConditioning />;
      case "TbSofa":
        return <TbSofa />;
      case "Tb24Hours":
        return <Tb24Hours />;
      case "MdOutlineFreeBreakfast":
        return <MdOutlineFreeBreakfast />;
      case "FaKitchenSet":
        return <FaKitchenSet />;
      case "MdBalcony":
        return <MdBalcony />;
      case "GrCube":
        return <GrCube />;
      case "MdOutlinePeopleAlt":
        return <MdOutlinePeopleAlt />;
      case "TbBath":
        return <TbBath />;

      default:
        return null;
    }
  }
  const square = roomData ? roomData.room_square_footage : [];
  const guest = roomData ? roomData.capacity : [];
  const bath = roomData ? roomData.bath_number : [];
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
  const otherRooms = roomsData
    ? roomsData.filter(
        (room) => room.type === roomData.type && room.id !== roomData.id
      )
    : [];

  if (isPending) {
    return <h2>...is loading</h2>;
  }
  return (
    <div>
      <div className="headerimages">
        <img src={`/${img1}`} alt="" className="detailImg" />

        <Banner title={roomData.name}>
          <div className="iconsDetails">
            <div className="iconDetail">
              <button>{renderIcon(square.icon)}</button>
              <p>{square.number} square foot</p>
            </div>
            <div className="iconDetail">
              <button>{renderIcon(guest.icon)}</button>
              <p>{guest.number} guest</p>
            </div>
            <div className="iconDetail">
              <button>{renderIcon(bath.icon)}</button>
              <p>{bath.number} bathroom</p>
            </div>
          </div>
        </Banner>
      </div>
      <div className="roomSection">
        <div className="p">
          <h2>about the room </h2>
          <p>{roomData.intoduction}</p>
          <Link className="nav-btn" to={`/booking/${id}`}>
            book now
          </Link>
        </div>
        <div className="roomIcons">
          {roomIcons.map((icon, index) => {
            return (
              <div className="icon" key={index}>
                <button>{roomData && renderIcon(icon.icon)}</button>
                <p>{roomData && icon.name}</p>
              </div>
            );
          })}{" "}
        </div>
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
        <p>{roomData && roomData.feedback}</p>
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
