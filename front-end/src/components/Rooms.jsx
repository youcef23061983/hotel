import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Banner from "../pages/Banner";
import { Link } from "react-router-dom";
const Rooms = () => {
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
    ? Math.min(...roomsData.map((room) => room.room_square_footage))
    : 0;
  let maxSize = roomsData
    ? Math.max(...roomsData.map((room) => room.room_square_footage))
    : 0;
  let types = roomsData
    ? ["all", ...new Set(roomsData.map((room) => room.type))]
    : [];

  types = types.map((type, index) => {
    return (
      <option value={type} key={index}>
        {type}
      </option>
    );
  });

  let people = roomsData
    ? [...new Set(roomsData.map((room) => room.capacity))]
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
      user.capacity === 1 || room.capacity === parseInt(user.capacity);
    const sizefilter =
      user.minSize === 0 ||
      (room.room_square_footage >= parseInt(user.minSize) &&
        room.room_square_footage <= parseInt(user.maxSize));
    const priceFilter = user.price === 0 || room.price >= user.price;
    const breakfastFilter = !user.breakfast || room.breakfast;
    const petFilter = !user.pets_allowed || room.pets_allowed;
    const livingroomFilter = !user.living_room || room.living_room;
    const butlerserviceFilter = !user.butler_service || room.butler_service;
    return (
      typeFiler &&
      capacityFilter &&
      sizefilter &&
      priceFilter &&
      breakfastFilter &&
      petFilter &&
      livingroomFilter &&
      butlerserviceFilter
    );
  });
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  console.log(roomsData && roomsData[0].images[0]);
  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[6].images[0]}) center/cover `,
        }}
      >
        <Banner title="choose your room" />
      </div>
      <div className="searchcontainer">
        <form className="searchElements">
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
            <label htmlFor="price">price:${user.price}</label>
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
          <div className="searchElement">
            <label htmlFor="size">size</label>
            <div className="inputSize">
              <input
                type="number"
                name="minSize"
                id="minSize"
                value={user.minSize}
                min={minSize}
                onChange={handleChange}
                className="formSize"
              />
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
        </form>
        <div className="roomslist">
          {roomsData &&
            filterRooms.map((room) => {
              const { name, images, id } = room;
              return (
                <div className="room" key={id}>
                  <div className="roomdiv">
                    <img src={images[0]} className="img" />
                  </div>
                  <h4>{name}</h4>
                  <h4>{id}</h4>

                  <Link to={`/rooms/${id}`} className="room-btn">
                    explore more
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
