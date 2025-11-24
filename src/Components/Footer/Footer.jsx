import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-emerald-900 dark:bg-gray-900 
                 text-gray-100 dark:text-gray-300 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container px-6 grid md:grid-cols-3 md:text-left max-w-[1160px] mx-auto py-3">

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white dark:text-green-300 mb-3">
            GreenEarth
          </h2>

          <p className="text-sm text-gray-200 dark:text-gray-400 mb-3">
            Join our mission to create a greener planet. Participate in tree
            plantation events, protect nature, and help build a cleaner and
            healthier environment for the future.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white dark:text-green-300 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-blue-300 dark:hover:text-blue-400 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/aboutPage"
                className="hover:text-blue-300 dark:hover:text-blue-400 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-300 dark:hover:text-blue-400 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white dark:text-green-300 mb-3 text-center md:text-right mt-3">
            Follow Us
          </h3>

          <div className="flex justify-center md:justify-end gap-4 text-2xl">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-blue-400 dark:hover:text-blue-300"
            >
              <FaFacebook />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-gray-300 dark:hover:text-gray-200"
            >
              <FaSquareXTwitter />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-pink-400 dark:hover:text-pink-300"
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#"
              className="hover:text-red-500 dark:hover:text-red-400"
            >
              <FaYoutube />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        className="text-center text-gray-200 dark:text-gray-400 text-sm mt-8 border-t border-gray-500 dark:border-gray-700 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        © {new Date().getFullYear()} GreenEarth. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
