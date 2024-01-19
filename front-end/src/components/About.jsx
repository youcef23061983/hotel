import { useQuery } from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { Link } from "react-router-dom";

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
      <div className="section">
        <div className="imgDiv">
          <img src={data && data[7].images[1]} alt="" className="img" />
        </div>
        <div className="p">
          <h2>
            Coastal Elegance: Legend Hotel's Enchanting Locale in Batu Ferringhi
          </h2>
          <p>
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
          </p>
          <Link className="link-btn" to="../google">
            location
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
