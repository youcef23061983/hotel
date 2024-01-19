import { useQuery } from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { useState } from "react";

const Gallery = () => {
  const [gallery, setGallery] = useState({ type: "room" });

  const galleryFn = async () => {
    const res = await fetch("http://localhost:3000/album");
    if (!res.ok) {
      throw Error("There is no data");
    }
    return res.json();
  };

  const { data } = useQuery({
    queryKey: ["album"],
    queryFn: galleryFn,
  });

  let types = data ? [...new Set(data.map((pictures) => pictures.type))] : [];
  const filterData = data?.filter((pictures) => {
    const typeFilter =
      gallery.type === "room" || pictures.type === gallery.type;
    return typeFilter;
  });

  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[0].images[0]}) center/cover `,
        }}
      >
        <Banner title="GALLERY" />
      </div>

      <div className="galleryButtons">
        {types.map((type, id) => (
          <button
            className="galleryButton"
            key={id}
            name="type"
            id="type"
            value={type}
            onClick={() => setGallery({ type })}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="galleryList">
        {filterData &&
          filterData[0].images.map((image, index) => {
            return (
              <div className="galleryImage">
                <img key={index} src={image} className="img" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;
