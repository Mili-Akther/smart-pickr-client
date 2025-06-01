import React from 'react';
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import logo from "../../assets/technology-logo/technology-50.png";
const Footer = () => {
      return (
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-[#121212] text-white pt-16 pb-6 px-6 md:px-20"
        >
          {/* Main Footer Content */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">
            {/* Logo Section */}
            <div className="col-span-1">
              <div className="mb-4">
                <img
                  src={logo}
                  alt="SmartPickr"
                  className="w-auto h-18 mb-2 drop-shadow-[0_0_10px_blue] brightness-150"
                />
                <h1 className="text-lg font-bold">SmartPickr</h1>
              </div>
              <div className="flex gap-4 mt-4 text-xl">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FaFacebookF className="hover:text-blue-500 transition" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FaLinkedinIn className="hover:text-blue-400 transition" />
                </a>
              </div>
            </div>

            {/* Sections */}
            <div>
              <h3 className="font-semibold mb-2">Products</h3>
              <ul className="space-y-1">
                <li>Smartphones</li>
                <li>Laptops</li>
                <li>Accessories</li>
                <li>Brands</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <ul className="space-y-1">
                <li>Help Center</li>
                <li>FAQ</li>
                <li>Contact Us</li>
                <li>Return Policy</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-1">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Terms</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <ul className="space-y-1">
                <li>Privacy Policy</li>
                <li>Cookies</li>
                <li>Licenses</li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} SmartPickr. All rights reserved.
          </div>
        </motion.footer>
      );
        };
export default Footer;