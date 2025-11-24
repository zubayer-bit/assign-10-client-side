import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const JoinedEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/joinedDataGet?email=${user.email}`).then((data) => {
      setJoinedEvents(data.data);
    });
  }, [axiosSecure, user.email]);

  if (joinedEvents.length === 0) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-700 dark:text-gray-300">
        You haven't joined any events yet.
      </div>
    );
  }

  return (
    <div className="max-w-[1160px] mx-auto px-5 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700 dark:text-green-400">
        Your Joined Events
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {joinedEvents.map((event) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
              card 
              bg-white dark:bg-gray-900 
              shadow-xl border 
              border-gray-200 dark:border-gray-700 
              rounded-xl overflow-hidden
            "
          >
            <figure className="h-48">
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-gray-900 dark:text-gray-100">
                {event.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {event.description?.slice(0, 80)}...
              </p>

              <div className="mt-3 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {event.location}
                </p>
                <p>
                  <span className="font-semibold">Event Type:</span>{" "}
                  {event.eventType}
                </p>
                <p>
                  <span className="font-semibold">Event Date:</span>{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>

              {/* Future details button (optional)
              <div className="card-actions justify-end mt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-green-600 text-white btn-sm"
                >
                  View Details
                </motion.button>
              </div> */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JoinedEvents;
