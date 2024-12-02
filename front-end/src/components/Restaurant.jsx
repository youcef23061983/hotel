import UseFetch from "./UseFetch";
import Banner from "../pages/Banner";
import "./restaurant.css";
import { PiClockAfternoonThin, PiDressThin } from "react-icons/pi";
import { MdRamenDining } from "react-icons/md";
import { MdFoodBank } from "react-icons/md";
import { ReactLenis } from "lenis/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
const Restaurant = () => {
  const url = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;

  const key = "gallery";

  const { data, isPending, error } = UseFetch(url, key);
  useEffect(() => {
    document.title = "restaurant";
  }, []);
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
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

  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: ref,
    offset: ["0 1", isMediumScreen ? "0.4 1" : "0.3 1"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress1,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollX = useTransform(scrollYProgress1, [0, 1], [-900, 0]);
  const scrollImg = useTransform(scrollYProgress1, [0, 1], [900, 0]);

  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: ref2,
    offset: ["0 1", isMediumScreen ? "0.5 1" : "0.39 1"],
  });
  const scrollOpacity2 = useTransform(
    scrollYProgress2,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollX2 = useTransform(scrollYProgress2, [0, 1], [-900, 0]);
  const scrollImg2 = useTransform(scrollYProgress2, [0, 1], [900, 0]);
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: ref3,
    offset: ["0 1", isMediumScreen ? "0.6 1" : "0.47 1"],
  });
  const scrollOpacity3 = useTransform(
    scrollYProgress3,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollX3 = useTransform(scrollYProgress3, [0, 1], [-900, 0]);
  const scrollImg3 = useTransform(scrollYProgress3, [0, 1], [400, 0]);
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[3].images[0]}) center/cover `,
        }}
      >
        <Banner title="dining & restaurant">
          <div className="iconsDetails">
            <div className="iconDetail">
              <MdRamenDining className="icon" />
              <p>Restaurant</p>
            </div>

            <div className="iconDetail">
              <MdFoodBank className="icon" />
              <p>In Dining</p>
            </div>
          </div>
        </Banner>
      </div>
      <div className="restaurantHeader">
        <h2>
          "Dining in Opulence: A Culinary Oasis at Legend Hotel's Exquisite
          Restaurant in Batu Ferringhi, Malaysia"
        </h2>
        <p data-testid="restaurant-paragraph">
          Nestled in the heart of the picturesque Batu Ferringhi in Malaysia,
          Legend Hotel stands as an epitome of elegance and charm. The hotel's
          distinguished restaurant offers a gastronomic journey into the rich
          tapestry of traditional Malaysian cuisine. Guests are welcomed into a
          dining room adorned with exquisite decor, where the fusion of
          contemporary design and cultural elements creates an ambiance of
          sophistication. The menu at this culinary haven boasts an array of
          traditional dishes, each meticulously crafted to showcase the diverse
          flavors of Malaysia. From aromatic Nasi Lemak to succulent Satay
          skewers, the restaurant tantalizes taste buds with a symphony of
          spices and textures. The culinary adventure extends to an impressive
          selection of refreshing beverages, featuring local specialties and
          international favorites. Amidst the plush surroundings, patrons can
          indulge in a culinary experience that not only satiates the palate but
          also immerses them in the rich culinary heritage of Malaysia. At
          Legend Hotel, dining transcends into a sensory celebration, making it
          a must-visit destination for those seeking a taste of Malaysian
          culinary excellence in a truly elegant setting.
        </p>
      </div>
      <div className="otherRooms">
        <h2>
          From Veranda Views to Dining Room Delicacies: A Feast at Legend hotel
          Restaurant
        </h2>
        <ReactLenis
          root
          options={{
            lerp: 0.05,
          }}
        >
          <div className="restaurant" ref={ref}>
            <motion.div style={{ x: scrollX, opacity: scrollOpacity }}>
              <h2>restaurant veranda</h2>
              <p>
                Perched on the edge of culinary delight, the restaurant's
                veranda is a charming retreat that invites guests to dine amidst
                nature's embrace. Overlooking the scenic landscapes of Batu
                Ferringhi, the veranda provides an enchanting setting for a
                memorable dining experience. Here, under the open sky and gentle
                breeze, patrons can indulge in the art of gastronomy while
                basking in the warm glow of ambient lighting. The veranda
                seamlessly blends the rustic charm of outdoor dining with the
                sophistication of an upscale establishment, offering a perfect
                balance for those seeking an al fresco escape. It is a haven
                where the clinking of glasses mingles with the melodies of
                nature, creating an ambiance that elevates every bite to a
                symphony of sensory pleasure.
              </p>
              <div className="restaurantIcons">
                <div className="restaurantIcon">
                  <button>
                    <PiClockAfternoonThin />
                  </button>
                  <div className="iconTitle">
                    <h4>Opening hours </h4>
                    <p>07:00 pm – 10:00 pm</p>
                  </div>
                </div>
                <div className="restaurantIcon">
                  <button>
                    <PiDressThin />
                  </button>
                  <div className="iconTitle">
                    <h4>DRESS CODE </h4>
                    <p>Smart Casual</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div style={{ x: scrollImg, opacity: scrollOpacity }}>
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
                  <img src={data && data[3].images[0]} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={data && data[3].images[1]} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={data && data[3].images[2]} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={data && data[3].images[3]} alt="slide_image" />
                </SwiperSlide>{" "}
                <SwiperSlide>
                  <img src={data && data[3].images[4]} alt="slide_image" />
                </SwiperSlide>
              </Swiper>
            </motion.div>
          </div>

          <div className="restaurant" ref={ref2}>
            <motion.div style={{ x: scrollX2, opacity: scrollOpacity2 }}>
              <h2>traditional food and drink restaurant</h2>
              <p>
                Transporting diners to a bygone era of culinary excellence, the
                traditional food and drink restaurant exudes an air of nostalgia
                and authenticity. The menu is a treasure trove of time-honored
                recipes, each dish a testament to the rich tapestry of culinary
                heritage. From aromatic curries that tell tales of spice-laden
                marketplaces to savory kebabs reminiscent of ancient feasts, the
                restaurant celebrates the artistry of traditional cooking. The
                ambiance resonates with the comforting warmth of familiarity,
                where wooden accents and earthy tones create an inviting
                atmosphere. Meanwhile, the well-curated beverage selection
                offers an exploration of local flavors and international
                classics, providing the perfect accompaniment to the gastronomic
                journey. In this culinary sanctuary, every bite and sip become a
                passage through time, inviting guests to savor the essence of
                tradition in each mouthful.
              </p>
              <div className="restaurantIcons">
                <div className="restaurantIcon">
                  <button>
                    <PiClockAfternoonThin />
                  </button>
                  <div className="iconTitle">
                    <h4>Opening hours </h4>
                    <p>07:00 pm – 10:00 pm</p>
                  </div>
                </div>
                <div className="restaurantIcon">
                  <button>
                    <PiDressThin />
                  </button>
                  <div className="iconTitle">
                    <h4>DRESS CODE </h4>
                    <p>Smart Casual</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div style={{ x: scrollImg2, opacity: scrollOpacity2 }}>
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
                  <img src={data && data[3].images[5]} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={data && data[3].images[6]} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={data && data[3].images[7]} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={data && data[3].images[8]} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={data && data[3].images[9]} alt="slide_image" />
                </SwiperSlide>
              </Swiper>
            </motion.div>
          </div>
          <div className="restaurant" ref={ref3}>
            <motion.div style={{ x: scrollX3, opacity: scrollOpacity3 }}>
              <h2>in dinning room</h2>
              <p>
                Within the dining room's elegant confines, the atmosphere is one
                of refined sophistication, setting the stage for an unparalleled
                culinary experience. Rich hues and tasteful decor create an
                ambiance that seamlessly blends modern luxury with timeless
                charm. Tables adorned with crisp linens await, offering a
                setting that beckons both intimate dinners and celebratory
                gatherings. The soft glow of ambient lighting enhances the
                dining room's allure, casting a warm glow on the faces of
                patrons engaged in the joyous act of shared meals. Impeccable
                service ensures that every moment within this gastronomic haven
                is a celebration, where each dish is presented with precision,
                and every sip of wine is a toast to culinary craftsmanship. The
                dining room becomes a theater of taste, a space where
                conversations flow as effortlessly as the courses, and where the
                art of dining unfolds in an atmosphere of refined indulgence.
              </p>
              <div className="restaurantIcon">
                <button>
                  <PiClockAfternoonThin />
                </button>
                <div className="iconTitle">
                  <h4>Opening hours </h4>
                  <p>10:00 am – 10:00 pm</p>
                </div>
              </div>
            </motion.div>
            <motion.div style={{ x: scrollImg3, opacity: scrollOpacity3 }}>
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
                  <img src={data && data[3].images[10]} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={data && data[3].images[11]} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={data && data[3].images[12]} alt="slide_image" />
                </SwiperSlide>{" "}
                <SwiperSlide>
                  <img src={data && data[3].images[13]} alt="slide_image" />
                </SwiperSlide>
              </Swiper>
            </motion.div>
          </div>
        </ReactLenis>
      </div>
    </div>
  );
};

export default Restaurant;
