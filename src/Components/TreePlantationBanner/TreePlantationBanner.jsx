import { motion } from "framer-motion";

const TreePlantationBanner = () => {
  return (
    <div className="relative bg-gray-100 dark:bg-gray-900">
      <div
        className="hero min-h-[80vh]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-60"></div>

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content text-center text-gray-900 dark:text-gray-100"
        >
          <div className="max-w-2xl">
            <div>
              <img
                className="w-[60px] mx-auto"
                src="https://i.ibb.co.com/1fbdtMgX/icons8-seed-48.png"
                alt=""
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-green-700 dark:text-green-400">
                Join Our Tree Plantation Movement
              </h1>
            </div>

            <p className="text-lg opacity-90 mb-6 text-gray-700 dark:text-gray-300">
              Let's make our environment greener, cleaner and brighter.
              Participate in local tree plantation events and help build a
              sustainable future for our next generations.
            </p>

            <button className="btn border-none bg-green-800 dark:bg-green-600 px-8 text-white hover:bg-green-700 dark:hover:bg-green-500 transition-colors">
              Support Tree Plantation
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TreePlantationBanner;
