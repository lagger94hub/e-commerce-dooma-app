import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper";

import DataCard from "../../ui/data-card/DataCard";
import Link from "next/link";

const HomeCarousel = (props) => {
  const dataArray = props.dataArray;
  const width = props.width;
  const height = props.height;

  return (
    <section>
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
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 480px
          380: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // when window width is >= 640px
          530: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          780: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
      >
        {dataArray.map((data) => {
          return (
            <SwiperSlide key={data.item_id}>
              <Link href={`${data.item_path}`} passHref>
                <DataCard
                  itemName={data.item_name}
                  itemPhotoURL={data.url}
                  width={width}
                  height={height}
                  discountAmount={data.amount}
                  discountName={data.discount_name}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
export default HomeCarousel;
