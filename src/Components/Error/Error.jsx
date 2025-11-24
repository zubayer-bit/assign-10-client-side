import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Error = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-6xl font-extrabold mb-4 text-red-600 dark:text-red-400"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        
        404
      </motion.h1>
      <motion.h2
        className="text-2xl md:text-3xl font-semibold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Page Not Found
      </motion.h2>
      <motion.p
        className="mb-6 text-center text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Oops! The page you are looking for does not exist or has been moved.
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all"
        >
          Go Back Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Error;
