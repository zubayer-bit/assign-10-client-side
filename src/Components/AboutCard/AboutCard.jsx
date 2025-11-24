import React from "react";
import { FaLeaf, FaSeedling, FaHandsHelping } from "react-icons/fa";

const AboutCard = () => {
  return (
    <div
      className="
        max-w-3xl mx-auto 
        bg-white dark:bg-gray-900
        shadow-lg rounded-2xl p-8 mt-10 mb-10 
        border border-green-200 dark:border-green-700
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <FaLeaf className="text-green-600 dark:text-green-400 text-3xl" />
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
          About Our Mission
        </h2>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
        We are dedicated to creating a greener and healthier planet through 
        community-driven tree plantation events. Our mission is to inspire and 
        empower individuals to take actionable steps towards protecting nature, 
        restoring green balance, and ensuring a sustainable environment for 
        future generations.
      </p>

      {/* Feature Points */}
      <div className="grid sm:grid-cols-2 gap-5">

        {/* Card 1 */}
        <div
          className="
            flex gap-3 items-start p-4 
            bg-green-50 dark:bg-gray-800
            border border-green-100 dark:border-green-600
            rounded-xl
          "
        >
          <FaSeedling className="text-green-600 dark:text-green-400 text-2xl mt-1" />
          <div>
            <h3 className="font-semibold text-green-700 dark:text-green-300">
              Tree Plantation Drives
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We organize regular plantation events to restore natural greenery 
              in urban and rural areas.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="
            flex gap-3 items-start p-4 
            bg-green-50 dark:bg-gray-800
            border border-green-100 dark:border-green-600
            rounded-xl
          "
        >
          <FaHandsHelping className="text-green-600 dark:text-green-400 text-2xl mt-1" />
          <div>
            <h3 className="font-semibold text-green-700 dark:text-green-300">
              Community Volunteering
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Join our community of volunteers who are contributing to a cleaner 
              and greener tomorrow.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutCard;
