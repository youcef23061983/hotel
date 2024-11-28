import UseFetch from "./UseFetch";
import Banner from "../pages/Banner";
import { useEffect } from "react";
import { MdMonochromePhotos } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const url = `${import.meta.env.VITE_PROD_URL_URL}/album`;

  const key = "album";

  const { data, isPending, error } = UseFetch(url, key);

  useEffect(() => {
    document.title = "Gallery";
  }, []);

  let types = data ? [...new Set(data.map((pictures) => pictures.type))] : [];

  const typeFilter = searchParams.get("type");
  const filterData = typeFilter
    ? data?.filter((picture) => picture.type === typeFilter)
    : data;
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <div
        data-testid="div-gallery"
        className="headerimages"
        style={{
          background: `url(${data && data[0].images[0]}) center/cover `,
        }}
      >
        <Banner title="GALLERY">
          <div className="iconDetail">
            <MdMonochromePhotos className="icon" />
            <p>Gallery</p>
          </div>
        </Banner>
      </div>

      <div className="galleryButtons">
        {types.map((type, id) => (
          <button
            className={`galleryButton ${
              typeFilter === type ? "selected" : null
            }`}
            key={id}
            name="type"
            id="type"
            value={type}
            onClick={() => setSearchParams({ type })}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="galleryList">
        {filterData
          ? filterData[0].images.map((image, index) => {
              return (
                <div className="galleryImage">
                  <img key={index} src={image} className="img" />
                </div>
              );
            })
          : []}
      </div>
    </div>
  );
};

export default Gallery;
