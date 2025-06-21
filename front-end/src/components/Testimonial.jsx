// import Banner from "../pages/Banner";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
// import { EffectCoverflow, Pagination } from "swiper/modules";
// import { useRef, useState, useEffect } from "react";
// import { motion, useTransform, useScroll } from "framer-motion";
// import UseFetchQueries from "./UseFetchQueries";
// import Rating from "./Rating";
// import { Helmet } from "react-helmet-async";

// const Testimonial = () => {
//   const url1 = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;

//   const key1 = "gallery";
//   const url2 = `${import.meta.env.VITE_PROD_URL_URL}/testimonials`;
//   const key2 = "testimonials";
//   const {
//     data1: data,
//     data2: testimonials,
//     isPending1,
//     isPending2,
//     error1,
//     error2,
//   } = UseFetchQueries(url1, key1, url2, key2);

//   const ref = useRef(null);

//   const useMediaQuery = (query) => {
//     const [matches, setMatches] = useState(false);

//     useEffect(() => {
//       const media = window.matchMedia(query);
//       if (media.matches !== matches) {
//         setMatches(media.matches);
//       }

//       const listener = () => {
//         setMatches(media.matches);
//       };

//       if (typeof media.addEventListener === "function") {
//         media.addEventListener("change", listener);
//       } else {
//         media.addListener(listener);
//       }

//       return () => {
//         if (typeof media.removeEventListener === "function") {
//           media.removeEventListener("change", listener);
//         } else {
//           media.removeListener(listenerList);
//         }
//       };
//     }, [matches, query]);

//     return matches;
//   };
//   const isMediumScreen = useMediaQuery("(min-width: 768px)");

//   const { scrollYProgress: scrollYProgress1 } = useScroll({
//     ref: ref,
//     offset: ["0 1", isMediumScreen ? "0.42 1" : "0.4 1"],
//   });
//   const scrollOpacity = useTransform(
//     scrollYProgress1,
//     [0, 0.5, 1],
//     [0, 0.3, 1]
//   );
//   const scrollX = useTransform(scrollYProgress1, [0, 1], [-900, 0]);
//   const scrollImg = useTransform(scrollYProgress1, [0, 1], [900, 0]);
//   if (isPending1 || isPending2) return <h2>...is loading</h2>;
//   if (error1) return <h2>{error1.message}</h2>;
//   if (error2) return <h2>{error2.message}</h2>;

//   return (
//     <div>
//       <Helmet>
//         <title>Testimonials - LEGEND Hotel</title>
//         <meta
//           name="description"
//           content="Read testimonials from our satisfied guests at LEGEND Hotel in Malaysia. Discover their experiences and stories."
//         />
//         <meta property="og:title" content="Testimonials - LEGEND Hotel" />
//         <meta
//           property="og:description"
//           content="Read testimonials from our satisfied guests at LEGEND Hotel in Malaysia. Discover their experiences and stories."
//         />
//         <meta property="og:image" content={data && data[0].images[0]} />
//         <meta property="og:url" content={window.location.href} />

//         {/* Twitter Meta Tags */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="Testimonials - LEGEND Hotel" />
//         <meta
//           name="twitter:description"
//           content="Read testimonials from our satisfied guests at LEGEND Hotel in Malaysia. Discover their experiences and stories."
//         />
//         <meta name="twitter:image" content={data && data[0].images[0]} />
//         <meta name="robots" content="index, follow" />
//         <meta
//           name="keywords"
//           content="testimonials, hotel, Malaysia, LEGEND Hotel, guest experiences, reviews"
//         />
//         <meta name="author" content="LEGEND Hotel" />
//       </Helmet>
//       <div
//         className="headerimages"
//         data-testid="div-testimonial"
//         style={{
//           background: `url(${data && data[7]?.images[5]}) center/cover `,
//         }}
//       >
//         <Banner title="TESTIMONIALS" />
//       </div>
//       <div ref={ref}>
//         <motion.div
//           style={{ x: scrollX, opacity: scrollOpacity }}
//           className="testimonials"
//         >
//           <h2>Echoes of Excellence: Guests Speak About Legend Hotel</h2>
//           <p>
//             At Legend Hotel in Batu Ferringhi, the stories of our guests paint a
//             vivid tapestry of unforgettable experiences. In their own words,
//             they share tales of unparalleled hospitality, exquisite
//             accommodations, and the seamless fusion of luxury and coastal charm.
//             Many commend the dedicated staff whose warmth and attentiveness left
//             an indelible mark, ensuring every need was met with a smile. Guests
//             express admiration for the stunning views that unfold from their
//             rooms, capturing the essence of Batu Ferringhi's coastal allure.
//             Whether it's the culinary delights, spa indulgences, or the myriad
//             of activities, testimonials echo the sentiment that Legend Hotel
//             transcends expectations, creating lasting memories for every
//             visitor. The shared stories of joy and satisfaction weave together
//             to form a testament to our commitment to excellence, making Legend
//             Hotel not just a destination but a cherished part of our guests'
//             life stories.
//           </p>
//         </motion.div>
//         <motion.div style={{ x: scrollImg, opacity: scrollOpacity }}>
//           <Swiper
//             effect={"coverflow"}
//             grabCursor={true}
//             centeredSlides={true}
//             slidesPerView={"auto"}
//             coverflowEffect={{
//               rotate: 50,
//               stretch: 0,
//               depth: 100,
//               modifier: 1,
//               slideShadows: true,
//             }}
//             pagination={true}
//             modules={[EffectCoverflow, Pagination]}
//             className="mySwiper"
//           >
//             {testimonials &&
//               testimonials.map((testimonial) => {
//                 const { name, date, img, text, rating } = testimonial;

//                 return (
//                   <SwiperSlide style={{ height: "auto" }}>
//                     <div className="testimonials">
//                       <div className="testimonialDiv">
//                         <div className="testimonialImg">
//                           <img
//                             src={img}
//                             style={{ maxWidth: "3rem", maxHeight: "3rem" }}
//                             alt="testimonialImg"
//                             loading="lazy"
//                           />
//                         </div>
//                         <div className="testimonialName">
//                           <p>{name}</p>

//                           <div className="rating">
//                             <p>{date}</p>
//                             <div className="rating">
//                               <div>
//                                 <Rating rating={rating} />
//                               </div>
//                               <p>{rating}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <p>{text}</p>
//                     </div>
//                   </SwiperSlide>
//                 );
//               })}
//           </Swiper>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Testimonial;
import Banner from "../pages/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
// import UseFetchQueries from "./UseFetchQueries";
import Rating from "./Rating";
import { format } from "date-fns";

import { Helmet } from "react-helmet-async";
import UseFetchQueries from "../data managment/UseFetchQueries";

const Testimonial = () => {
  const url1 = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;

  const key1 = "gallery";
  const url2 = `${import.meta.env.VITE_PROD_URL_URL}/testimonials`;
  const key2 = "testimonials";
  const {
    data1: data,
    data2: testimonials,
    isPending1,
    isPending2,
    error1,
    error2,
  } = UseFetchQueries(url1, key1, url2, key2);

  const ref = useRef(null);
  console.log("testiomonials", testimonials);

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
    ref: ref,
    offset: ["0 1", isMediumScreen ? "0.42 1" : "0.4 1"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress1,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollX = useTransform(scrollYProgress1, [0, 1], [-900, 0]);
  const scrollImg = useTransform(scrollYProgress1, [0, 1], [900, 0]);
  if (isPending1 || isPending2) return <h2>...is loading</h2>;
  if (error1) return <h2>{error1.message}</h2>;
  if (error2) return <h2>{error2.message}</h2>;
  console.log("date", testimonials);

  return (
    <div>
      <Helmet>
        <title>Testimonials - LEGEND Hotel</title>
        <meta
          name="description"
          content="Read testimonials from our satisfied guests at LEGEND Hotel in Malaysia. Discover their experiences and stories."
        />
        <meta property="og:title" content="Testimonials - LEGEND Hotel" />
        <meta
          property="og:description"
          content="Read testimonials from our satisfied guests at LEGEND Hotel in Malaysia. Discover their experiences and stories."
        />
        <meta property="og:image" content={data && data[0].images[0]} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Testimonials - LEGEND Hotel" />
        <meta
          name="twitter:description"
          content="Read testimonials from our satisfied guests at LEGEND Hotel in Malaysia. Discover their experiences and stories."
        />
        <meta name="twitter:image" content={data && data[0].images[0]} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="testimonials, hotel, Malaysia, LEGEND Hotel, guest experiences, reviews"
        />
        <meta name="author" content="LEGEND Hotel" />
      </Helmet>
      <div
        className="headerimages"
        data-testid="div-testimonial"
        style={{
          background: `url(${data && data[7]?.images[5]}) center/cover `,
        }}
      >
        <Banner title="TESTIMONIALS" />
      </div>
      <div ref={ref}>
        <motion.div
          style={{ x: scrollX, opacity: scrollOpacity }}
          className="testimonials"
        >
          <h2>Echoes of Excellence: Guests Speak About Legend Hotel</h2>
          <p>
            At Legend Hotel in Batu Ferringhi, the stories of our guests paint a
            vivid tapestry of unforgettable experiences. In their own words,
            they share tales of unparalleled hospitality, exquisite
            accommodations, and the seamless fusion of luxury and coastal charm.
            Many commend the dedicated staff whose warmth and attentiveness left
            an indelible mark, ensuring every need was met with a smile. Guests
            express admiration for the stunning views that unfold from their
            rooms, capturing the essence of Batu Ferringhi's coastal allure.
            Whether it's the culinary delights, spa indulgences, or the myriad
            of activities, testimonials echo the sentiment that Legend Hotel
            transcends expectations, creating lasting memories for every
            visitor. The shared stories of joy and satisfaction weave together
            to form a testament to our commitment to excellence, making Legend
            Hotel not just a destination but a cherished part of our guests'
            life stories.
          </p>
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
            {testimonials &&
              testimonials.map((testimonial) => {
                const { name, date, img, text, rating } = testimonial;
                const formattedDate = format(new Date(date), "MM/dd/yyyy");

                return (
                  <SwiperSlide style={{ height: "auto" }}>
                    <div className="testimonials">
                      <div className="testimonialDiv">
                        <div className="testimonialImg">
                          <img
                            src={img}
                            style={{ maxWidth: "3rem", maxHeight: "3rem" }}
                            alt="testimonialImg"
                            loading="lazy"
                          />
                        </div>
                        <div className="testimonialName">
                          <p>{name}</p>

                          <div className="rating">
                            {/* <p>{formattedDate}</p> */}
                            <div className="rating">
                              <div>
                                <Rating rating={rating} />
                              </div>
                              <p>{rating} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>{text}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;
