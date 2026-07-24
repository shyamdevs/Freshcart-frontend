import React from "react";
import "../CSS/Feature.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import img1 from "../Images/category-bakery-biscuits.jpg";
import img2 from "../Images/category-cleaning-essentials.jpg";
import img3 from "../Images/category-cold-drinks-juices.jpg";
import img4 from "../Images/category-dairy-bread-eggs.jpg";
import img5 from "../Images/category-fruits-vegetables.jpg";
import img6 from "../Images/category-pet-care.jpg";
import img7 from "../Images/category-snack-munchies.jpg";
import img8 from "../Images/category-tea-coffee-drinks.jpg";
import img9 from "../Images/category-atta-rice-dal.jpg";
import img10 from "../Images/category-instant-food.jpg";
import img11 from "../Images/product-img-13.jpg";
import img12 from "../Images/product-img-1.jpg";

export default function Feature() {
  const categories = [
    {
      image: img4,
      title: "Dairy, Bread & Eggs",
    },
    {
      image: img7,
      title: "Snack & Munchies",
    },
    {
      image: img1,
      title: "Bakery & Biscuits",
    },
    {
      image: img10,
      title: "Instant Food",
    },
    {
      image: img8,
      title: "Tea, Coffee & Drinks",
    },
    {
      image: img9,
      title: "Atta, Rice & Dal",
    },
    {
      image: img3,
      title: "Cold Drinks & Juices",
    },
    {
      image: img5,
      title: "Fruits & Vegetables",
    },
    {
      image: img2,
      title: "Cleaning Essentials",
    },
    {
      image: img6,
      title: "Pet Care",
    },
    {
      image: img11,
      title: "Fresh Grocery",
    },
    {
      image: img12,
      title: "Organic Products",
    },
  ];

  return (
    <section className="featured-category-section">

      <div className="featured-category-top">

        <h2>Featured Categories</h2>

        <div className="navigation-buttons">
          <div className="swiper-button-prev1 custom-prev">  <FaArrowLeft /></div>
          <div className="swiper-button-next2 custom-next"><FaArrowRight /></div>
        </div>

      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },

          576: {
            slidesPerView: 2,
          },

          768: {
            slidesPerView: 3,
          },

          992: {
            slidesPerView: 4,
          },

          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="category-card">

              <div className="category-image">
                <img src={item.image} alt={item.title} />
              </div>

              <h5>{item.title}</h5>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}