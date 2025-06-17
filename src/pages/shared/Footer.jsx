import React from "react";
import {
  FaInstagram,
  FaDiscord,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../assets/technology-logo/technology-50.png";
import GradientText from "../../animations/GradientText";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className=" bg-gradient-to-r from-[#272727] to-[#000000] text-white pt-20 pb-8 px-6 md:px-20 relative overflow-hidden"
    >
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <GradientText animationSpeed={6}>CONNECT WITH SMARTPICKR</GradientText>

        <p className="mt-4 text-base md:text-lg text-gray-400">
          Subscribe to our newsletter and follow us on socials
        </p>
      </motion.div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">
        {/* Logo & Socials */}
        <div className="col-span-1 text-center md:text-left -mt-12">
          <img
            src={logo}
            alt="SmartPickr"
            className="w-auto h-20 mx-auto md:mx-0 drop-shadow-[0_0_10px_blue] brightness-150"
          />
          <h1 className="text-xl font-bold">SmartPickr</h1>
          <p className="text-gray-400 text-sm mt-2">support@smartpickr.com</p>
          <div className="flex gap-4 mt-4 justify-center md:justify-start text-2xl ">
            {[FaFacebookF, FaLinkedinIn, FaInstagram, FaDiscord, FaTwitter].map(
              (Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="hover:text-blue-500"
                >
                  <Icon />
                </motion.a>
              )
            )}
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="font-semibold mb-3">Products</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Smartphones</li>
            <li>Laptops</li>
            <li>Accessories</li>
            <li>Brands</li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Help Center</li>
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Return Policy</li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-1 text-gray-300">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Terms</li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Privacy Policy</li>
            <li>Cookies</li>
            <li>Licenses</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="border-t border-white/20 mt-14 pt-6 text-center text-xs text-gray-500"
      >
        © {new Date().getFullYear()} SmartPickr. Built with for aspiring
        dreamers.
      </motion.div>

      {/* Pulse animation */}
      <style>{`
        .animate-pulse {
          animation: pulseText 3s ease-in-out infinite;
        }

        @keyframes pulseText {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;
