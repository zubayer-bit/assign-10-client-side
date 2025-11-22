import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
    return (
        <motion.div
          className="max-w-[1160px] mx-auto px-4 py-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.fieldset
            className="fieldset bg-base-200 border border-base-300 rounded-box p-6 md:p-10 text-center shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="font-bold text-2xl md:text-3xl mb-2">
              Subscribe to our Newsletter
            </h1>

            <p className="text-sm md:text-base text-gray-700 mb-5 max-w-2xl mx-auto">
              Get the latest game updates and exclusive offers directly in your game mailbox!
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0 max-w-md mx-auto">
              <input
                type="email"
                name="email"
                className="input input-bordered w-full sm:join-item"
                placeholder="Enter Your Email"
              />

              <motion.input
                type="submit"
                value="Subscribe"
                className="btn btn-primary w-full sm:w-auto sm:join-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
          </motion.fieldset>
        </motion.div>
    );
};

export default Newsletter;
