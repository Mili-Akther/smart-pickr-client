import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Keyboard from "../../assets/Product-pic/Frontline-2/Razer Huntsman TKL V3 Linear Switch.png";
import Headphone from "../../assets/Product-pic/Front-pic/LOGITECHGG733HEADSET-BLACK.png"
import Fan from "../../assets/Product-pic/Frontline-2/Deepcool AK500 Ditgital RGB Cpu Cooler.png";
import Case from "../../assets/Product-pic/Front-pic/Dell Alienware Area-51 Gaming Desktop.png";
import SSD from "../../assets/Product-pic/Front-pic/Samsung_SSD_870_EVO_SATA_III_Sata3_2_5_inch.png";
import { CgHeart } from "react-icons/cg";
const products = [
  {
    id: 1,
    category: "EXTERNAL SSDS",
    name: "RGB Double Shot PBT QUACK Mechanical Keyboard",
    price: "$390",
    image: Keyboard,
  },
  {
    id: 2,
    category: "EXTERNAL SSDS",
    name: "Gaming Headphones Over-Ear FX-9909 Plus Blue/Black",
    price: "$810",
    oldPrice: "$890",
    image: Headphone,
  },
  {
    id: 3,
    category: "INTERNAL SSDS",
    name: "CPU Air Cooler FP120 Fan Anodized Gun-Metalic Black",
    price: "$155",
    image: Fan,
  },
  {
    id: 4,
    category: "INTERNAL SSDS",
    name: "High-Airflow CXC-10269 Computer Case Black w/ Blue",
    price: "$3,850",
    image: Case,
  },
  {
    id: 5,
    category: "EXTERNAL SSDS",
    name: '2TB SSD 3D TLC 6Gb/s 2.5" Internal Solid State Drive T253A300',
    price: "$450",
    image: SSD,
  },
];

const TrendingSlider = () => {
  return (
    <div className="bg-black text-white p-12">
      <h2 className="text-3xl font-bold mb-4">Trending Products</h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={4}
        navigation
        loop
        autoplay={{ delay: 3000 }}
        className="pb-6"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-[#1c1c1e] rounded-xl p-4 hover:scale-105 transition-all duration-300">
              <div className="absolute top-3 right-3 text-white text-xl cursor-pointer">
                <CgHeart></CgHeart>
              </div>
              <p className="text-sm text-gray-400 mb-2">{product.category}</p>
              <img
                src={product.image}
                alt={product.name}
                className="h-80 w-auto mx-auto mb-4"
              />
              <h3 className="font-semibold text-base min-h-[3.5rem]">
                {product.name}
              </h3>
              <div className="mt-2 text-lg font-bold flex items-center gap-2">
                {product.price}
                {product.oldPrice && (
                  <span className="line-through text-gray-400 text-sm">
                    {product.oldPrice}
                  </span>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingSlider;
