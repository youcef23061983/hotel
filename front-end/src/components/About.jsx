import Banner from "../pages/Banner";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import UseFetch from "./UseFetch";
import { ReactLenis } from "lenis/react";

const About = () => {
  const url = `${import.meta.env.VITE_PROD_URL_URL}/gallery`;

  const key = "gallery";

  const { data, isPending, error } = UseFetch(url, key);

  useEffect(() => {
    document.title = "About Us";
  }, []);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.4 1"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const scrollX = useTransform(scrollYProgress, [0, 1], [-900, 0]);
  const scrollImg = useTransform(scrollYProgress, [0, 1], [900, 0]);
  const scrollXP = useTransform(scrollYProgress, [0, 1], [-1800, 0]);

  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <div
          className="headerimages"
          data-testid="about-element"
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
              Coastal Elegance: Legend Hotel's Enchanting Locale in Batu
              Ferringhi
            </motion.h2>
            <motion.p
              data-testid="about-paragraph"
              style={{
                x: scrollXP,
                opacity: scrollOpacity,
              }}
            >
              Nestled along the pristine shores of Batu Ferringhi in Malaysia,
              Legend Hotel unveils a haven of coastal elegance that captures the
              essence of paradise. Positioned against the backdrop of the
              Andaman Sea, our hotel offers a breathtaking panorama of azure
              waters and lush landscapes. The idyllic location provides a
              perfect blend of serenity and vibrancy, with the lively energy of
              the nearby markets harmonizing with the tranquil ambiance of our
              coastal oasis. Guests are invited to explore the captivating
              surroundings, from the vibrant street art of Batu Ferringhi to the
              sun-kissed beaches just steps away. Legend Hotel's strategic
              locale not only provides a picturesque retreat but also serves as
              a gateway to the rich cultural tapestry and natural wonders that
              define this enchanting region. Whether you seek relaxation or
              adventure, our hotel's prime location ensures that every moment is
              immersed in the beauty and allure of Batu Ferringhi's coastal
              charm.
            </motion.p>
            <Link className="link-btn" to="../google">
              location
            </Link>
          </div>
        </div>
      </ReactLenis>
    </>
  );
};

export default About;
