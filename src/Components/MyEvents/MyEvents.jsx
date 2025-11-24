import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { motion } from "framer-motion";

const MyEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/userCreatedDataGet?email=${user.email}`)
      .then((data) => setEvents(data.data));
  }, [axiosSecure, user.email]);

  if (events.length === 0) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-700 dark:text-gray-300">
        You haven't created any events yet.
      </div>
    );
  }

  return (
    <div className="max-w-[1160px] mx-auto px-5 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <motion.div
          key={event._id}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="
            card shadow-xl border rounded-xl overflow-hidden
            bg-white dark:bg-gray-900
            border-gray-300 dark:border-gray-700
            hover:shadow-2xl transition-all
          "
        >
          {/* Image */}
          <figure className="h-48">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </figure>

          {/* Body */}
          <div className="card-body">
            <h2 className="card-title text-gray-900 dark:text-gray-100">
              {event.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {event.description?.slice(0, 80)}...
            </p>

            <div className="mt-3 space-y-1 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Location:</span> {event.location}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Event Type:</span>{" "}
                {event.eventType}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Event Date:</span>{" "}
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
            </div>

            {/* Update Button */}
            <div className="card-actions justify-end mt-4">
              <Link to={`/update-event/${event._id}`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    btn btn-sm text-white
                    bg-green-600 hover:bg-green-700
                    dark:bg-green-500 dark:hover:bg-green-400
                  "
                >
                  Update Event
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MyEvents;
