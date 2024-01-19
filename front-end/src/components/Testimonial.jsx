import { useQuery } from "@tanstack/react-query";
import Banner from "../pages/Banner";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

const Testimonial = () => {
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
  const testimonilasFn = async () => {
    const res = await fetch("http://localhost:3000/testimonials");
    if (!res.ok) {
      throw Error("ther is no data");
    }
    return res.json();
  };
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: testimonilasFn,
  });
  console.log(testimonials);
  return (
    <div>
      <div
        className="headerimages"
        style={{
          background: `url(${data && data[7].images[5]}) center/cover `,
        }}
      >
        <Banner title="TESTIMONIALS" />
      </div>
      <div className="testimonials">
        <h2>Echoes of Excellence: Guests Speak About Legend Hotel</h2>
        <p>
          At Legend Hotel in Batu Ferringhi, the stories of our guests paint a
          vivid tapestry of unforgettable experiences. In their own words, they
          share tales of unparalleled hospitality, exquisite accommodations, and
          the seamless fusion of luxury and coastal charm. Many commend the
          dedicated staff whose warmth and attentiveness left an indelible mark,
          ensuring every need was met with a smile. Guests express admiration
          for the stunning views that unfold from their rooms, capturing the
          essence of Batu Ferringhi's coastal allure. Whether it's the culinary
          delights, spa indulgences, or the myriad of activities, testimonials
          echo the sentiment that Legend Hotel transcends expectations, creating
          lasting memories for every visitor. The shared stories of joy and
          satisfaction weave together to form a testament to our commitment to
          excellence, making Legend Hotel not just a destination but a cherished
          part of our guests' life stories.
        </p>
      </div>
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
            const { name, date, img, text } = testimonial;

            return (
              <SwiperSlide style={{ height: "auto" }}>
                <div className="testimonials">
                  <div className="testimonialDiv">
                    <div className="testimonialImg">
                      <img
                        src={img}
                        style={{ width: "3rem", height: "3rem" }}
                      />
                    </div>
                    <div className="testimonialName">
                      <p>{name}</p>
                      <p>{date}</p>
                    </div>
                  </div>
                  <p>{text}</p>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Testimonial;
