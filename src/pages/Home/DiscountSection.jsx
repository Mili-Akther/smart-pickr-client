import { motion } from "framer-motion";
import Controller from "../../assets/Product-pic/Frontline-2/Xbox Black Controller.png";
import Drone from "../../assets/Product-pic/Front-pic/Dji Mavic 3 Drone Cemera 2.png";
import Mouse from "../../assets/Product-pic/Front-pic/Stylez_Wireless_Gaming_Mouse.png";
import Logo1 from "../../assets/Logo/icons8-apple-watch-100.png";
import Logo2 from "../../assets/Logo/icons8-motherboard-64.png";
import Logo3 from "../../assets/Logo/terra-tech-50.png";
import Logo4 from "../../assets/Logo/icons8-ergonomic-keyboard-50.png";
import Logo5 from "../../assets/Logo/icons8-apple-tv-80.png";
import Logo6 from "../../assets/Logo/icons8-electronic-invoice-100.png";


const brands = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6];



const DiscountSection = () => {
  return (
    <div className="bg-[#121213c9] px-10 py-12 mb-8">
      <h2 className="text-3xl font-bold mb-12 text-center">Popular Brands</h2>

      {/* Brand Logos */}
      <div className="flex justify-between items-center mx-auto mb-12 border-b border-gray-700 pb-8 max-w-6xl overflow-x-auto scrollbar-hide">
        {brands.map((brand, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0.6 }}
            animate={{
              opacity: [0.6, 0.6, 0.6],
              filter: [
                "brightness(1.2) drop-shadow(0 0 2px #fff)",
                "brightness(1.8) drop-shadow(0 0 12px silver)",
                "brightness(1.2) drop-shadow(0 0 2px #fff)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: idx * 2.3,
            }}
            className="flex-shrink-0 mx-4"
          >
            <img
              src={brand}
              alt={`brand-${idx + 1}`}
              className="h-24 sm:h-28 md:h-32 object-contain"
            />
          </motion.div>
        ))}
      </div>

      {/* Discount Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1820px] h-auto">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-[#3b39397e] to-[#09092591] rounded-xl p-6 flex flex-col sm:flex-row items-center"
        >
          <div className="text-white sm:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Limited Weekly Discount
            </h2>
            <button className="text-xs font-semibold mt-6 sm:mt-12 text-white underline">
              SHOP NOW →
            </button>
          </div>
          <img
            src={Controller}
            alt="controller"
            className="h-40 sm:h-60 lg:h-70 ml-auto mt-4 sm:mt-0"
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-[#3b39397e] to-[#09092591] rounded-xl p-6 text-white overflow-hidden"
        >
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 mt-6">
              Photo Drones
            </h2>
            <p className="text-sm">MF841HN/A 13"</p>
            <p className="text-xs mt-2">DISCOUNT -30%</p>
            <p className="text-2xl font-bold mt-2">$75</p>
          </div>

          {/* Image */}
          <div className="block lg:hidden mt-4">
            <img
              src={Drone}
              alt="drone"
              className="h-48 sm:h-60 object-contain mx-auto md:w-100 md:h-[320px]"
            />
          </div>

          {/* Image for large screens only */}
          <img
            src={Drone}
            alt="drone"
            className="hidden lg:block absolute bottom-1 right-1 h-60 lg:h-82  object-contain md:w-60 lg:w-92"
          />
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-[#3b39397e] to-[#09092591] rounded-xl p-6 text-white flex flex-col sm:flex-row items-center"
        >
          <div className="sm:w-1/2 ">
            <h2 className=" text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              PC Parts <br /> & Elements
            </h2>
            <button className="text-xs font-semibold mt-2 underline">
              SHOP NOW →
            </button>
          </div>
          <img
            src={Mouse}
            alt="mouse"
            className="h-28 sm:h-34 ml-auto mt-4 sm:mt-0"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DiscountSection;
