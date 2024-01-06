import {
  useQuery,
  useQueryClient,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { useParams } from "react-router-dom";
import img from "../images/rooms/standard double room/img1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./detail.css";

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
  console.log(roomData && roomData.images[0]);
  const [swiper, setSwiper] = useState(null);
  // const [selectedImage, setSelectedImage] = useState(roomData.images[0]);

  // const handleSlideChange = () => {
  //   const activeIndex = swiper?.activeIndex;
  //   if (activeIndex !== undefined) {
  //     setSelectedImage(images[activeIndex]);
  //   }
  // };

  if (isPending) {
    return <h2>...is loading</h2>;
  }
  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `<img src={${
            roomData && roomData.images[0]
          }/> center/cover`,
        }}
      >
        <Banner title={roomData.name} />
      </div>
      <h2>{roomData.id}</h2>
      <div className="roomSection">
        <div className="p">
          <h2>about the room </h2>
          <p>{roomData.intoduction}</p>
          <button className="nav-btn">book now </button>
        </div>
        <div className="roomIcon">
          <img src={img} alt="" className="img" />
        </div>
      </div>
      <div>
        <Swiper
          onSwiper={(swiper) => setSwiper(swiper)}
          // onSlideChange={handleSlideChange}
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          speed={600}
          parallax={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Parallax, Pagination, Navigation]}
          className="mySwiper"
        >
          {roomData.images.map((image, index) => (
            <SwiperSlide
              key={index}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Details;
