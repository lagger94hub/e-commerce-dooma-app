import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper";

import ProductCard from "../../products/product-card/ProductCard";

const HomeCarousel = (props) => {
  const productsArray = props.productsArray;
  const width = props.width;
  const height = props.height;

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={20}
      slidesPerGroup={1}
      loop={true}
      loopFillGroupWithBlank={true}
      pagination={{
        clickable: true,
      }}
      // allowTouchMove={true}
      navigation={true}
      modules={[Pagination, Navigation]}
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }}
      className="mySwiper"
    >
      {productsArray.map((product) => {
        return (
          <SwiperSlide key={product.id}>
            <ProductCard
              productName={product.name}
              productImage={product.image}
              width={width}
              height={height}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default HomeCarousel;
