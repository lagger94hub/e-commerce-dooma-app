import React from "react";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Navigation } from "swiper";

import DataCard from "../../ui/data-cards/DataCard";
import classes from './_display-0.module.scss'


const Display0 = (props) => {
  const dataArray = props.dataArray;
  const width = props.width;
  const height = props.height;

  return (
    <div className={`${'flex-col gap-32p falign-center'} ${classes.carousal}`}>
      <p className={classes.title}>{dataArray[0].display_name}</p>
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
    </div>
  );
};
export default Display0;
