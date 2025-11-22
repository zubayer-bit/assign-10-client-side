import { motion } from "framer-motion";

const GallerySection = ({ imageTreePlant }) => {
  return (
    <div className="py-20 bg-[#f0fdf4]">
      <div className="max-w-[1160px] mx-auto px-5 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-green-700 mb-12">
          Event Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imageTreePlant.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={item.image}
                className="w-full h-64 object-cover transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
