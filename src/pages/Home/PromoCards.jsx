import { motion } from "framer-motion";
import React from "react";
import GTX from "../../assets/Product-pic/Frontline-2/NVIDIA_GeForce_RTX_4060_Ti_8GB_GDDR6_Video_Card.png";
import sony from "../../assets/Product-pic/Frontline-2/Sony Zv1 Mirorless DSLR Cemera.png";

const PromoCards = () => {
  return (
    <div className="bg-black flex items-center justify-center px-4 py-10 min-h-[600px] ">
      <div className="grid md:grid-cols-2 gap-8 max-w-[1820px] w-full ">
        {/* Left Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-b from-gray-800 to-black text-white rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-gray-600 w-full"
        >
          <div className="w-xl">
            <h2 className="text-5xl font-bold leading-tight">
              EZ-77 PC
              <br />
              Worldwide
            </h2>
            <p className="text-sm text-gray-400 mt-2">MF841HN/A 13"</p>
            <p className="text-xs text-gray-500 mt-30 uppercase">Starting at</p>
            <p className="text-4xl font-bold">$1750</p>
          </div>
          <img
            src={GTX}
            alt="GTX Graphics Card"
            className="w-50 md:w-60 lg:w-98 object-contain"
          />
        </motion.div>

        {/* Right Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-b from-gray-800 to-black text-white rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-gray-600"
        >
          <div className="w-xl">
            <h2 className="text-5xl font-bold leading-tight">
              Limited
              <br />
              Weekly
              <br />
              Discount
            </h2>
            <p className="text-sm text-gray-400 mt-4">Discount -30%</p>
            <p className="text-4xl font-bold">$349</p>
          </div>
          <img
            src={sony}
            alt="Blista Camera"
            className="w-50 md:w-40 lg:w-96 object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PromoCards;
