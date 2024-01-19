import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { TbPool, TbMassage } from "react-icons/tb";
import { PiClockAfternoonThin } from "react-icons/pi";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

const Wellness = () => {
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
          background: `url(${data && data[2].images[0]}) center/cover `,
        }}
      >
        <Banner title="WELLNESS & SPA">
          <div className="iconsDetails">
            <div className="iconDetail">
              <button>
                <TbPool />
              </button>
              <p>pool</p>
            </div>
            <div className="iconDetail">
              <button>
                <TbMassage />
              </button>
              <p>treatment</p>
            </div>
            <div className="iconDetail">
              <button>
                <MdOutlineSportsGymnastics />
              </button>
              <p>gym</p>
            </div>
          </div>
        </Banner>
      </div>
      <div className="spa">
        <h2>
          Serenity Unveiled: Holistic Bliss at Legend Hotel's Spa and Wellness
          Sanctuary in Batu Ferringhi, Malaysia
        </h2>
        <p>
          At Legend Hotel in Batu Ferringhi, Malaysia, the spa and wellness
          facilities extend an oasis of tranquility and rejuvenation to guests
          seeking respite from the rigors of everyday life. The spa, a sanctuary
          of serenity, offers a holistic approach to well-being, where expert
          therapists curate personalized experiences to nurture the mind, body,
          and spirit. Luxurious treatments draw inspiration from both
          traditional Malaysian therapies and modern spa techniques, creating a
          harmonious blend of ancient wisdom and contemporary comfort. The spa's
          serene ambiance, adorned with soothing tones and natural textures,
          sets the stage for relaxation. Additionally, wellness amenities such
          as a well-equipped fitness center and yoga sessions provide avenues
          for holistic rejuvenation. Whether indulging in a therapeutic massage,
          unwinding in the sauna, or participating in rejuvenating activities,
          guests at Legend Hotel's spa and wellness center embark on a journey
          of self-discovery and revitalization in a haven designed for ultimate
          relaxation.
        </p>
      </div>
      <div className="wellness">
        <h2>
          Azure Tranquility: The Enchanting Poolside Haven at Legend Hotel's Spa
          and Wellness Center in Batu Ferringhi, Malaysia
        </h2>
        <p>
          Nestled within the opulent embrace of Legend Hotel's Spa and Wellness
          Center in Batu Ferringhi, Malaysia, lies an azure haven that
          transcends the ordinary— the enchanting swimming pool. Surrounded by
          lush greenery and adorned with elegant loungers, this aquatic retreat
          beckons guests to indulge in a sensory symphony of relaxation. The
          crystal-clear waters reflect the tropical skies, creating a serene
          atmosphere that complements the holistic ethos of the spa. Whether
          guests seek a refreshing morning swim or a leisurely afternoon soak,
          the poolside ambiance offers an idyllic setting for unwinding. With a
          seamless fusion of natural beauty and modern luxury, the swimming pool
          at Legend Hotel becomes a sanctuary where the cares of the world
          dissolve, and the journey to rejuvenation begins with a refreshing
          plunge into tranquility.
        </p>
        <div className="restaurantIcons">
          <div className="restaurantIcon">
            <button>
              <PiClockAfternoonThin />
            </button>
            <div className="iconTitle">
              <h4>Opening hours </h4>
              <p>08:00 pm – 08:00 pm</p>
            </div>
          </div>
        </div>

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
            <img src={data && data[2].images[1]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[2]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[3]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[4]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness">
        <h2>
          Harmony of Rejuvenation: Tailored Spa Treatments at Legend Hotel's
          Wellness Sanctuary
        </h2>
        <p>
          Title: "Harmony of Rejuvenation: Tailored Spa Treatments at Legend
          Hotel's Wellness Sanctuary" Indulge in an exquisite journey of
          self-care and renewal at Legend Hotel's distinguished spa and wellness
          center in Batu Ferringhi, Malaysia. Our carefully curated spa
          treatments are designed to transport you into a realm of tranquility,
          where expert therapists blend ancient healing traditions with modern
          techniques. From invigorating massages that melt away tension to
          rejuvenating facials that enhance your natural radiance, each
          treatment is a bespoke experience tailored to harmonize mind, body,
          and spirit. Immerse yourself in the soothing ambiance of our spa,
          adorned with calming aesthetics and infused with the essence of
          relaxation. At Legend Hotel, our commitment to well-being extends
          beyond accommodation, inviting you to embark on a transformative
          wellness journey that leaves you refreshed, revitalized, and truly
          harmonized.
        </p>
        <div className="restaurantIcons">
          <div className="restaurantIcon">
            <button>
              <PiClockAfternoonThin />
            </button>
            <div className="iconTitle">
              <h4>Opening hours </h4>
              <p>08:00 pm – 08:00 pm</p>
            </div>
          </div>
        </div>
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
            <img src={data && data[2].images[5]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[6]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[7]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[8]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness">
        <h2>Radiant Bliss: Unwind in Opulence at Legend Hotel's Spa Sauna</h2>
        <p>
          Embark on a journey of unparalleled relaxation within the refined
          ambiance of Legend Hotel's Spa Sauna in Batu Ferringhi, Malaysia. Our
          sauna is a haven of tranquility, where the subtle interplay of heat
          and rejuvenation unfolds in opulent surroundings. Immerse yourself in
          the enveloping warmth as aromatic scents infuse the air, creating an
          atmosphere conducive to complete serenity. The sauna experience at
          Legend Hotel is a sanctuary for detoxification and revitalization,
          offering a refuge from the stresses of modern life. Luxuriate in the
          plush comfort of this therapeutic haven, where the ethereal glow of
          the sauna's ambiance mirrors the radiant bliss that awaits within.
          Discover a profound sense of well-being as you let the cares of the
          day melt away in our spa sauna, a jewel in the crown of our holistic
          wellness offerings.
        </p>
        <div className="restaurantIcons">
          <div className="restaurantIcon">
            <button>
              <PiClockAfternoonThin />
            </button>
            <div className="iconTitle">
              <h4>Opening hours </h4>
              <p>08:00 pm – 08:00 pm</p>
            </div>
          </div>
        </div>
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
            <img src={data && data[2].images[9]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[10]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[11]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[12]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness">
        <h2>
          Aqua Elysium: Revitalize in Luxury at Legend Hotel's Spa Jacuzzi
        </h2>
        <p>
          Indulge in the epitome of aquatic luxury at Legend Hotel's Spa Jacuzzi
          in Batu Ferringhi, Malaysia. Our Jacuzzi is a retreat of opulence,
          inviting guests to unwind in a blissful embrace of warm, bubbling
          waters. Immerse yourself in the therapeutic jets that massage away
          tension, creating a symphony of relaxation for both body and soul. The
          Spa Jacuzzi at Legend Hotel is a haven where the soothing sounds of
          cascading water harmonize with the lush surroundings, providing a
          sensory escape. Enveloped in an atmosphere of refined elegance, this
          aquatic sanctuary offers an intimate space for rejuvenation and
          intimate moments. Discover the transformative power of hydrotherapy in
          our Spa Jacuzzi, where the art of relaxation reaches new heights, and
          the stresses of the outside world dissolve in the embrace of luxurious
          tranquility.
        </p>
        <div className="restaurantIcons">
          <div className="restaurantIcon">
            <button>
              <PiClockAfternoonThin />
            </button>
            <div className="iconTitle">
              <h4>Opening hours </h4>
              <p>08:00 pm – 08:00 pm</p>
            </div>
          </div>
        </div>
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
            <img src={data && data[2].images[13]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[14]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[15]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[16]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="wellness">
        <h2>
          Aqua Elysium: Revitalize in Luxury at Legend Hotel's Spa Jacuzzi
        </h2>
        <p>
          Indulge in the epitome of aquatic luxury at Legend Hotel's Spa Jacuzzi
          in Batu Ferringhi, Malaysia. Our Jacuzzi is a retreat of opulence,
          inviting guests to unwind in a blissful embrace of warm, bubbling
          waters. Immerse yourself in the therapeutic jets that massage away
          tension, creating a symphony of relaxation for both body and soul. The
          Spa Jacuzzi at Legend Hotel is a haven where the soothing sounds of
          cascading water harmonize with the lush surroundings, providing a
          sensory escape. Enveloped in an atmosphere of refined elegance, this
          aquatic sanctuary offers an intimate space for rejuvenation and
          intimate moments. Discover the transformative power of hydrotherapy in
          our Spa Jacuzzi, where the art of relaxation reaches new heights, and
          the stresses of the outside world dissolve in the embrace of luxurious
          tranquility.
        </p>
        <div className="restaurantIcons">
          <div className="restaurantIcon">
            <button>
              <PiClockAfternoonThin />
            </button>
            <div className="iconTitle">
              <h4>Opening hours </h4>
              <p>08:00 pm – 08:00 pm</p>
            </div>
          </div>
        </div>
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
            <img src={data && data[2].images[17]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[18]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[19]} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={data && data[2].images[20]} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Wellness;
