import { FaPhone, FaTruck, FaGift } from "react-icons/fa";
import { motion } from "framer-motion";
import Watch from "../../assets/Product-pic/Front-pic/sports watch.png";
import Tablet from "../../assets/Product-pic/Front-pic/mobile-tablet.jpg";
import Console from "../../assets/Product-pic/Front-pic/console.jpg";

// Animation variants
const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
};

const zoomIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.5 } },
};

const Info = () => {
  return (
    <div className="px-6 py-8 max-w-[1820px] mx-auto space-y-10 bg-gradient-to-r from-[#3b39397e] to-[#09092591]">
      {/* Top Info Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl">
        {/* Left Item */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4"
        >
          <FaPhone className="text-3xl" />
          <div className="text-left">
            <p className="text-sm text-gray-500">Call Center</p>
            <p className="text-lg font-bold">+001 2345 678</p>
          </div>
        </motion.div>

        {/* Middle Item */}
        <motion.div
          variants={zoomIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <FaTruck className="text-3xl" />
          <div className="text-left">
            <p className="text-sm text-gray-500">Free Delivery</p>
            <p className="text-lg font-bold">For all amounts over $100</p>
          </div>
        </motion.div>

        {/* Right Item */}
        <motion.div
          variants={slideFromRight}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <FaGift className="text-3xl" />
          <div className="text-left">
            <p className="text-sm text-gray-500">Gift Cards</p>
            <p className="text-lg font-bold">Save up to 20%</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Card 1 - Watch */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          className="md:col-span-1 bg-gradient-to-t from-gray-800 to-black rounded-lg flex justify-between items-center"
        >
          <div className="p-2">
            <h3 className="text-xl font-semibold">
              Sports
              <br />
              Watches
            </h3>
            <button className="mt-4 text-sm font-semibold text-primary hover:underline">
              SHOP NOW →
            </button>
          </div>

          <div className="w-38 h-36 overflow-hidden">
            <img
              src={Watch}
              alt="Sports Watch"
              className="w-52 h-44 object-cover object-left"
            />
          </div>
        </motion.div>

        {/* Card 2 - Mobile & Tablet */}
        <motion.div
          variants={zoomIn}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.03 }}
          className="md:col-span-3 bg-blue-800 p-6 rounded-lg text-white flex justify-between items-center"
        >
          <div>
            <h3 className="text-xl font-semibold">Mobiles & Tablets</h3>
            <button className="mt-4 text-sm font-semibold hover:underline">
              SHOP NOW →
            </button>
          </div>
          <div className="w-[800px]  h-30 mask-b-from-50% overflow-hidden mx-auto -mb-6">
            <img
              src={Tablet}
              alt="Tablet"
              className="object-cover w-full h-full object-center"
            />
          </div>
        </motion.div>

        {/* Card 3 - Gaming Console */}
        <motion.div
          variants={slideFromRight}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          className="md:col-span-1 bg-gradient-to-t from-gray-800 to-black rounded-lg flex justify-between items-center"
        >
          <div className="p-2">
            <h3 className="text-xl font-semibold">
              Gaming
              <br />
              Consoles
            </h3>
            <button className="mt-4 text-sm font-semibold text-primary hover:underline">
              SHOP NOW →
            </button>
          </div>

          <div className="w-52 h-38 overflow-hidden  inset-y-8 right-0">
            <img
              src={Console}
              alt="Gaming Console"
              className="w-60 h-42 object-cover object-left"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Info;
