import { useQuery } from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

const About = () => {
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
  useEffect(() => {
    document.title = "About Us";
  }, []);
  const ref = useRef(null);
  const { scrollYProgress: scrollYProgress } = useScroll({
    ref: ref,
    offset: ["0 1", "0.6 1"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const scrollX = useTransform(scrollYProgress, [0, 1], [-900, 0]);
  const scrollImg = useTransform(scrollYProgress, [0, 1], [900, 0]);
  const scrollXP = useTransform(scrollYProgress, [0, 1], [-1800, 0]);
  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[7].images[0]}) center/cover `,
        }}
      >
        <Banner title="ABOUT US" />
      </div>
      <div className="section" ref={ref}>
        <motion.div
          className="imgDiv"
          style={{
            opacity: scrollOpacity,
            x: scrollImg,
            animationDuration: 2,
          }}
        >
          <img src={data && data[7].images[1]} alt="" className="img" />
        </motion.div>
        <div className="p">
          <motion.h2
            style={{
              x: scrollX,
              opacity: scrollOpacity,
            }}
          >
            Coastal Elegance: Legend Hotel's Enchanting Locale in Batu Ferringhi
          </motion.h2>
          <motion.p
            style={{
              x: scrollXP,
              opacity: scrollOpacity,
            }}
          >
            Nestled along the pristine shores of Batu Ferringhi in Malaysia,
            Legend Hotel unveils a haven of coastal elegance that captures the
            essence of paradise. Positioned against the backdrop of the Andaman
            Sea, our hotel offers a breathtaking panorama of azure waters and
            lush landscapes. The idyllic location provides a perfect blend of
            serenity and vibrancy, with the lively energy of the nearby markets
            harmonizing with the tranquil ambiance of our coastal oasis. Guests
            are invited to explore the captivating surroundings, from the
            vibrant street art of Batu Ferringhi to the sun-kissed beaches just
            steps away. Legend Hotel's strategic locale not only provides a
            picturesque retreat but also serves as a gateway to the rich
            cultural tapestry and natural wonders that define this enchanting
            region. Whether you seek relaxation or adventure, our hotel's prime
            location ensures that every moment is immersed in the beauty and
            allure of Batu Ferringhi's coastal charm.
          </motion.p>
          <Link className="link-btn" to="../google">
            location
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
