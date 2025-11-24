import { motion } from "framer-motion";

const FeatureSection = ({ featureData }) => {
  return (
    <div className="py-20 bg-[#f0fdf4] dark:bg-gray-900">
      <div className="max-w-[1160px] mx-auto px-5 text-center">
        
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400 mb-12"
        >
          What We Offer
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featureData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card bg-white dark:bg-gray-800 shadow-xl dark:shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-green-600 dark:text-green-300">{item.icon}</div>

                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
