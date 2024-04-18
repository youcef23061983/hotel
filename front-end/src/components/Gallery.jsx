import UseFetch from "./UseFetch";
import Banner from "../pages/Banner";
import { useState, useEffect } from "react";

const Gallery = () => {
  const [gallery, setGallery] = useState({ type: "room" });

  const url = "http://localhost:3000/album";
  const { data, isPending, error } = UseFetch(url);

  useEffect(() => {
    document.title = "Gallery";
  }, []);

  let types = data ? [...new Set(data.map((pictures) => pictures.type))] : [];
  const filterData = data?.filter((pictures) => {
    const typeFilter =
      gallery.type === "room" || pictures.type === gallery.type;
    return typeFilter;
  });
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

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
