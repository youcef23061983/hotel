import React, { useState, useRef, useEffect } from "react";
import Banner from "../pages/Banner";
import { Link } from "react-router-dom";
import { motion, useTransform, useScroll } from "framer-motion";
import img1 from "../images/header/roomsheader.jpg";
import UseFetch from "./UseFetch";

const Rooms = () => {
  const url = "http://localhost:3000/rooms";
  const key = "rooms";

  const { data: roomsData, error, isPending } = UseFetch(url, key);
  useEffect(() => {
    document.title = "Rooms";
  }, []);
  const [user, setUser] = useState({
    name: "",
    type: "all",
    price: 0,
    capacity: 1,
    minPrice: 0,
    maxPrice: 0,
    room_square_footage: 0,
    size: 0,
    minSize: 0,
    maxSize: 0,
    maxChildren: 0,
    breakfast: false,
    pets_allowed: false,
    living_room: false,
    butler_service: false,
  });
  let maxPrice = roomsData
    ? Math.max(...roomsData.map((room) => room.price))
    : 0;
  let minPrice = roomsData
    ? Math.min(...roomsData.map((room) => room.price))
    : 0;
  let minSize = roomsData
    ? Math.min(...roomsData.map((room) => room.room_square_footage.number))
    : 0;
  let maxSize = roomsData
    ? Math.max(...roomsData.map((room) => room.room_square_footage.number))
    : 0;
  let types = roomsData
    ? ["all", ...new Set(roomsData.map((room) => room.type))]
    : [];

  let maxChildren = roomsData
    ? Math.max(...roomsData.map((room) => room.max_children))
    : 0;

  types = types.map((type, index) => {
    return (
      <option value={type} key={index}>
        {type}
      </option>
    );
  });

  let people = roomsData
    ? [...new Set(roomsData.map((room) => room.capacity.number))]
    : [];
  people = people.map((capacity, index) => {
    return (
      <option value={capacity} key={index}>
        {capacity}
      </option>
    );
  });
  const filterRooms = roomsData?.filter((room) => {
    const typeFiler = user.type === "all" || room.type === user.type;
    const capacityFilter =
      user.capacity === 1 || room.capacity.number === parseInt(user.capacity);
    const sizefilter =
      user.minSize === 0 ||
      (room.room_square_footage.number >= parseInt(user.minSize) &&
        room.room_square_footage.number <= parseInt(user.maxSize));
    const priceFilter = user.price === 0 || room.price >= user.price;
    const breakfastFilter = !user.breakfast || room.breakfast;
    const petFilter = !user.pets_allowed || room.pets_allowed;
    const livingroomFilter = !user.living_room || room.living_room;
    const butlerserviceFilter = !user.butler_service || room.butler_service;
    const childrenfilter =
      user.maxChildren === 0 || room.max_children >= parseInt(user.maxChildren);
    return (
      typeFiler &&
      capacityFilter &&
      sizefilter &&
      priceFilter &&
      breakfastFilter &&
      petFilter &&
      livingroomFilter &&
      butlerserviceFilter &&
      childrenfilter
    );
  });
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const ref = useRef(null);

  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(
      () => window.matchMedia(query).matches
    );

    useEffect(() => {
      const media = window.matchMedia(query);

      const listener = () => {
        setMatches(media.matches);
      };

      if (media.addEventListener) {
        media.addEventListener("change", listener);
      } else {
        media.addListener(listener);
      }

      return () => {
        if (media.removeEventListener) {
          media.removeEventListener("change", listener);
        } else {
          media.removeListener(listener);
        }
      };
    }, [query]);

    return matches;
  };

  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const { scrollYProgress } = useScroll({
    ref: ref,
    offset: ["0 1", isMediumScreen ? "0.6 1" : "0.3 1"],
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.02, 1], [0, 0.5, 1]);
  const scrollX = useTransform(scrollYProgress, [0, 1], ["30vw", "0vw"]);
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <div
        data-testid="rooms-div"
        className="headerimages"
        style={{
          background: `url(${img1}) center/cover `,
        }}
      >
        <Banner title="choose your room" />
      </div>
      <div className="searchcontainer">
        <motion.form
          className="searchElements"
          style={{
            opacity: scrollOpacity,
            scale: scrollScale,
            x: scrollX,
          }}
        >
          <div className="searchElement">
            <label htmlFor="type">room &suite type</label>
            <select
              name="type"
              id="type"
              value={user.type}
              onChange={handleChange}
              className="formSelect"
            >
              {types}
            </select>
          </div>
          <div className="searchElement">
            <label htmlFor="capacity">guests</label>
            <select
              name="capacity"
              id="capacity"
              value={user.capacity}
              onChange={handleChange}
              className="formSelect"
            >
              {people}
            </select>
          </div>

          <div className="searchElement">
            <label htmlFor="price">price:{user.price} $</label>
            <input
              type="range"
              name="price"
              id="price"
              value={user.price}
              min={minPrice}
              max={maxPrice}
              onChange={handleChange}
              className="formSelect"
            />
          </div>
          <div>
            <div className="searchElement">
              <label htmlFor="minSize">min size</label>

              <input
                type="number"
                name="minSize"
                id="minSize"
                value={user.minSize}
                min={minSize}
                onChange={handleChange}
                className="formSize"
              />
            </div>
            <div className="searchElement">
              <label htmlFor="maxSize">max size</label>
              <input
                type="number"
                name="maxSize"
                id="maxSize"
                value={user.maxSize}
                max={maxSize}
                onChange={handleChange}
                className="formSize"
              />
            </div>
          </div>
          <div className="searchElement">
            <div className="elementCheck">
              <input
                type="checkbox"
                name="breakfast"
                id="breakfast"
                checked={user.breakfast}
                onChange={handleChange}
              />
              <label htmlFor="breakfast">breafast</label>
            </div>
            <div className="elementCheck">
              <input
                type="checkbox"
                name="pets_allowed"
                id="pets_allowed"
                checked={user.pets_allowed}
                onChange={handleChange}
              />
              <label htmlFor="pets_allowed">pets_allowed</label>
            </div>
            <div className="elementCheck">
              <input
                type="checkbox"
                name="living_room"
                id="living_room"
                checked={user.living_room}
                onChange={handleChange}
              />
              <label htmlFor="living_room">living room</label>
            </div>
            <div className="elementCheck">
              <input
                type="checkbox"
                name="butler_service"
                id="butler_service"
                checked={user.butler_service}
                onChange={handleChange}
              />
              <label htmlFor="butler_service">butler_service</label>
            </div>
          </div>
          <div className="searchElement">
            <label htmlFor="maxChildren">max children</label>
            <div className="inputSize">
              <input
                type="number"
                name="maxChildren"
                id="maxChildren"
                value={user.maxChildren}
                max={maxChildren}
                min="0"
                onChange={handleChange}
                className="formSize"
              />
            </div>
          </div>
        </motion.form>
        <motion.div layout className="roomslist">
          {roomsData &&
            filterRooms.map((room) => {
              const { name, images, id, price } = room;
              return (
                <motion.div
                  layout
                  transition={{ duration: 0.8 }}
                  className="room"
                  key={id}
                >
                  <div className="roomdiv">
                    <img src={images[0]} className="img" />
                  </div>
                  <h4>{name}</h4>
                  <div className="priceDiv">
                    <Link to={`${id}`} className="room-btn">
                      explore more
                    </Link>
                    <Link className="room-btn">{price} $ per night </Link>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </div>
  );
};

export default Rooms;
