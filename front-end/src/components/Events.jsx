import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Banner from "../pages/Banner";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
const Events = () => {
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

  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[5].images[0]}) center/cover `,
        }}
      >
        <Banner title="EXPERIENCES"></Banner>
      </div>
      <div className="wellness">
        <h2>
          Elegance in Every Occasion: Unforgettable Events at Legend Hotel
        </h2>
        <p>
          At Legend Hotel in Batu Ferringhi, Malaysia, we redefine the art of
          hosting exceptional events. Whether it's a grand celebration,
          corporate gathering, or intimate ceremony, our exquisite venues and
          meticulous event planning promise an experience beyond compare. With
          stunning ballrooms, versatile meeting spaces, and outdoor venues set
          against the backdrop of coastal beauty, Legend Hotel provides the
          perfect canvas for any occasion. Our dedicated event team ensures
          every detail is seamlessly executed, from exquisite catering to
          state-of-the-art audiovisual setups. Elevate your events with the
          essence of sophistication and personalized service that epitomizes the
          Legend Hotel experience. Create lasting memories in an atmosphere
          where every event is a masterpiece, and every moment is an elegant
          celebration of life's special occasions.
        </p>
      </div>
      <div className="wellness">
        <h2>Whispers of Forever: Timeless Weddings at Legend Hotel</h2>
        <p>
          Celebrate the union of love against the enchanting backdrop of Legend
          Hotel in Batu Ferringhi, Malaysia. Our exquisite venue, embraced by
          the coastal allure, sets the stage for a wedding day as timeless as
          your love story. Whether you envision an intimate seaside ceremony or
          a grand ballroom affair, our dedicated wedding specialists are
          committed to turning your dreams into reality. The stunning
          surroundings provide a picturesque canvas for capturing cherished
          moments, while our expert team attends to every detail, ensuring a
          seamless and magical celebration. From the ceremony to the reception,
          Legend Hotel's commitment to elegance and personalized service
          transforms your wedding day into an unforgettable chapter of your love
          story. Let the whispers of forever begin in a place where every nuance
          of romance is celebrated, and where your wedding becomes a legend in
          its own right.
        </p>
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
            <img src={data && data[5].images[0]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[1]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[2]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[3]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness">
        <h2>Artistry Unveiled: Gallery Showcases at Legend Hotel</h2>
        <p>
          Discover a symphony of visual delights at Legend Hotel in Batu
          Ferringhi, Malaysia, where we proudly curate an ever-evolving gallery
          of artistic expressions. Our gallery events showcase a diverse range
          of creative endeavors, from contemporary masterpieces to culturally
          rich exhibits, providing a platform for both emerging and established
          artists. The gallery spaces within our hotel serve as dynamic
          canvases, capturing the essence of local and international art scenes.
          Join us in celebrating the fusion of culture and creativity, where
          each brushstroke and every sculpture tells a unique story. Legend
          Hotel's commitment to artistic expression transforms our spaces into
          vibrant hubs of inspiration, inviting guests to immerse themselves in
          the beauty and thought-provoking narratives that grace our gallery
          walls. Whether you are an art enthusiast or a curious soul, our
          gallery events promise an enriching experience that transcends the
          ordinary, leaving a lasting impression on the connoisseur in you.
        </p>
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
            <img src={data && data[5].images[4]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[5]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[6]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness">
        <h2>Seamless Convergence: Successful Meetings at Legend Hotel</h2>
        <p>
          Elevate your corporate gatherings at Legend Hotel in Batu Ferringhi,
          Malaysia, where business meets sophistication in seamless harmony. Our
          versatile meeting spaces are designed to accommodate a spectrum of
          events, from intimate boardroom discussions to large-scale
          conferences. With state-of-the-art facilities and a dedicated events
          team, Legend Hotel ensures that every meeting is characterized by
          precision and productivity. Our thoughtfully curated meeting packages
          cater to all your business needs, providing a blend of comfort and
          efficiency. The coastal beauty surrounding our hotel adds a touch of
          inspiration to your corporate endeavors, fostering an environment
          where ideas flourish and connections thrive. Trust Legend Hotel to be
          the backdrop for your successful business events, where every detail
          is meticulously attended to, allowing you to focus on what matters
          most – the success of your meeting.
        </p>
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
            <img src={data && data[5].images[7]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[5].images[8]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Events;
