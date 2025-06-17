import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { FaHeadphones, FaLaptop } from "react-icons/fa";
import { LuTabletSmartphone, LuWashingMachine } from "react-icons/lu";
import { RiCameraSwitchLine } from "react-icons/ri";
import { HiMiniTv } from "react-icons/hi2";
import { GiCooler } from "react-icons/gi";

import img1 from "../../assets/bannerIMG/WP-54778Y_Console.png";
import img2 from "../../assets/bannerIMG/mechanical-keyboard-G-5.png";
import img3 from "../../assets/bannerIMG/Drone.jpg";
import img4 from "../../assets/bannerIMG/headphone-2.png";

const Banner = () => {
  const slides = [
    {
      title: "WP-54778Y Console",
      subtitle: "ULTRA CX70 2QF-621XPL",
      button: "Shop Now",
      image: img1,
    },
    {
      title: "mechanical keyboard G-5",
      subtitle: "XX70 2Q-621XPL Pro",
      button: "Discover",
      image: img2,
    },
    {
      title: "New CQ-2545 Photo Drone",
      subtitle: "RWX70 2QF-621XPP",
      button: "Learn More",
      image: img3,
    },
    {
      title: "SPELLOND Pro Gaming Headphones",
      subtitle: "Immersive Surround Sound",
      button: "Buy Now",
      image: img4,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full p-12 text-white bg-gradient-to-r from-[#3d3b3b] to-[#000000]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: false }}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation
        pagination={{ clickable: true }}
        className="h-[80vh] md:h-[80vh] lg:h-[90vh"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {activeIndex === index && (
              <div
                key={index}
                className="w-full max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-y-8 px-2 md:px-10 py-10"
              >
                <div className="max-w-xl mx-auto">
                  <h1 className="text-3xl lg:text-5xl font-bold mb-2">
                    {slide.title}
                  </h1>
                  <p className="text-lg lg:text-xl text-gray-300 mb-4">
                    {slide.subtitle}
                  </p>
                  <button className="bg-blue-700 hover:bg-blue-600 px-6 py-3 text-white font-semibold rounded shadow-lg">
                    {slide.button}
                  </button>
                </div>
                <div className="max-w-[800px] flex justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-[300px] md:max-h-[500px] lg:max-h-[600px] object-contain h-[50vh] md:h-[80vh] lg:h-[90vh]"
                  />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Category Navigation Bar */}
      <div className=" text-white px-4 py-4 flex flex-wrap justify-center gap-6 text-sm md:text-base border-t border-gray-700">
        <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <FaLaptop className="text-lg" />
          Computers & Laptops
        </div>
        <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <LuTabletSmartphone className="text-lg" />
          Smartphones & Tablets
        </div>
        <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <RiCameraSwitchLine className="text-lg" />
          Cameras & Lenses
        </div>
        <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          ⚡ Appliances
        </div>
        <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <HiMiniTv className="text-lg" />
          TV & Audio
        </div>
        <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <FaHeadphones className="text-lg" />
          Headphones
        </div>
        <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <LuWashingMachine className="text-lg" />
          Washing Machines
        </div>
        <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <GiCooler className="text-lg" />
          Fridges & Coolers
        </div>
      </div>
    </div>
  );
};

export default Banner;
