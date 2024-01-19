import { useQuery } from "@tanstack/react-query";
import Banner from "../pages/Banner";
const Google = () => {
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
          background: `url(${data && data[7].images[3]}) center/cover `,
        }}
      >
        <Banner title="LOCATION" />
      </div>
      <div className="section">
        <div
          className="imgDiv"
          style={{
            background: `url(${data && data[7].images[4]}) center/cover `,
          }}
        >
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127101.22260081589!2d100.11475742635658!3d5.430154236448533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ae80856dc49ed%3A0x290819646728a690!2sBatu%20Ferringhi%20Beach!5e0!3m2!1sfr!2sdz!4v1705239534603!5m2!1sfr!2sdz"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="p">
          <h2>Seaside Splendor: Discovering the Allure of Batu Ferringhi</h2>
          <p>
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
          </p>
        </div>
      </div>
    </div>
  );
};

export default Google;
