import UseFetch from "./UseFetch";
import Banner from "../pages/Banner";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const Google = () => {
  const url = "http://localhost:3000/gallery";

  const { data, isPending, error } = UseFetch(url);
  const ref = useRef(null);
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
    offset: ["0 1", isMediumScreen ? "0.65 1" : "0.58 1"],
  });
  const scrollOpacity = useTransform(
    scrollYProgress1,
    [0, 0.5, 1],
    [0, 0.3, 1]
  );
  const scrollX = useTransform(scrollYProgress1, [0, 1], [-900, 0]);
  const scrollImg = useTransform(scrollYProgress1, [0, 1], [900, 0]);
  const scrollXP = useTransform(scrollYProgress1, [0, 1], [-1800, 0]);
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[7].images[3]}) center/cover `,
        }}
      >
        <Banner title="LOCATION" />
      </div>
      <div className="section" ref={ref}>
        <motion.div
          className="imgDiv"
          style={{
            background: `url(${data && data[7].images[4]}) center/cover `,
            x: scrollImg,
            opacity: scrollOpacity,
          }}
        >
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127101.22260081589!2d100.11475742635658!3d5.430154236448533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ae80856dc49ed%3A0x290819646728a690!2sBatu%20Ferringhi%20Beach!5e0!3m2!1sfr!2sdz!4v1705239534603!5m2!1sfr!2sdz"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
        <div className="p">
          <motion.h2 style={{ x: scrollX, opacity: scrollOpacity }}>
            Seaside Splendor: Discovering the Allure of Batu Ferringhi
          </motion.h2>
          <motion.p style={{ x: scrollXP, opacity: scrollOpacity }}>
            Nestled along the northwestern coast of Penang, Malaysia, Batu
            Ferringhi stands as a jewel in the crown of tropical destinations.
            Renowned for its pristine sandy beaches and crystal-clear waters,
            this coastal haven is a melting pot of cultural vibrancy and natural
            beauty. The name "Batu Ferringhi" translates to "Foreigner's Rock,"
            echoing its history as a favored retreat for international
            travelers. Visitors are greeted with a tapestry of experiences, from
            the bustling night markets offering local crafts and delectable
            street food to the serene beachfront, where the sunsets paint the
            sky in hues of orange and pink. Adventure enthusiasts can indulge in
            water sports, while cultural explorers can immerse themselves in the
            vibrant arts scene. Batu Ferringhi seamlessly combines relaxation
            and excitement, making it a sought-after destination where every
            corner reveals a new facet of its seaside splendor.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Google;
