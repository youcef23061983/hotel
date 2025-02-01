import UseFetch from "./UseFetch";
import Banner from "../pages/Banner";
import { MdMonochromePhotos } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const url = `${import.meta.env.VITE_PROD_URL_URL}/album`;

  const key = "album";

  const { data, isPending, error } = UseFetch(url, key);

  let types = data ? [...new Set(data.map((pictures) => pictures.type))] : [];

  const typeFilter = searchParams.get("type");
  const filterData = typeFilter
    ? data?.filter((picture) => picture.type === typeFilter)
    : data;
  if (isPending) return <h2>...is loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <Helmet>
        <title>Gallery at LEGEND Hotel - Malaysia</title>
        <meta
          name="description"
          content="Explore the gallery of LEGEND Hotel in Malaysia. Discover the beauty and elegance of our hotel through stunning images."
        />
        <meta
          property="og:title"
          content="Gallery at LEGEND Hotel - Malaysia"
        />
        <meta
          property="og:description"
          content="Explore the gallery of LEGEND Hotel in Malaysia. Discover the beauty and elegance of our hotel through stunning images."
        />
        <meta property="og:image" content={data && data[0].images[0]} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Gallery at LEGEND Hotel - Malaysia"
        />
        <meta
          name="twitter:description"
          content="Explore the gallery of LEGEND Hotel in Malaysia. Discover the beauty and elegance of our hotel through stunning images."
        />
        <meta name="twitter:image" content={data && data[0].images[0]} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="gallery, hotel, Malaysia, LEGEND Hotel, images, photos"
        />
        <meta name="author" content="LEGEND Hotel" />
      </Helmet>

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
                  <img key={index} src={image} className="img" loading="lazy" />
                </div>
              );
            })
          : []}
      </div>
    </div>
  );
};

export default Gallery;
