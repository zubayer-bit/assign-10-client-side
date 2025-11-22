import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaCopyright } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <motion.footer
  className="bg-emerald-900 text-gray-200 py-10"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

      <div className="container px-6 grid md:grid-cols-3 md:text-left max-w-[1160px] mx-auto py-3">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">GreenEarth</h2>
<p className="text-sm mb-3">
  Join our mission to create a greener planet. Participate in tree plantation 
  events, protect nature, and help build a cleaner and healthier environment 
  for the future.
</p>

        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/aboutPage" className="hover:text-blue-400">About</a></li>
            <li><a href="" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3 text-center md:text-right mt-3">
            Follow Us
          </h3>
          <div className="flex justify-center md:justify-end gap-4 text-2xl">
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-blue-500">
              <FaFacebook />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-blue-400">
              <FaSquareXTwitter />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-pink-500">
              <FaInstagram />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="hover:text-red-500">
              <FaYoutube />
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="text-center text-gray-300 text-sm mt-8 border-t border-gray-400 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <i class="fa-regular fa-copyright"></i> {new Date().getFullYear()} GreenEarth. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
