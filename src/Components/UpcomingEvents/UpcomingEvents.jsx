import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { motion } from "framer-motion";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const axiosSecurity = useAxiosSecure();

  useEffect(() => {
    axiosSecurity
      .get(`/eventsGet?search=${search}&type=${filterType}`)
      .then((data) => {
        const today = new Date();
        const upcoming = data.data.filter(
          (event) => new Date(event.eventDate) >= today
        );
        const sortEventDate = upcoming.sort(
          (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
        );
        setEvents(sortEventDate);
      });
  }, [axiosSecurity, filterType, search]);

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-500"
      >
        Upcoming <span className="text-green-600 dark:text-green-400">Events</span>
      </motion.h2>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search event by name"
          className="input input-bordered w-full md:w-80 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-60 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Event Types</option>
          <option value="Cleanup">Cleanup</option>
          <option value="Plantation">Plantation</option>
          <option value="Donation">Donation</option>
        </select>
      </div>

      {events.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No upcoming events found.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="hover:shadow-2xl transition-all"
          >
            <div className="card bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700">
              <figure>
                <img
                  src={event.thumbnail}
                  className="w-full h-60 object-cover"
                  alt={event.title}
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {event.title}
                </h2>

                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Location:</strong> {event.location}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Event Type:</strong> {event.eventType}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
                </p>

                <div className="card-actions justify-end mt-4">
                  <Link to={`/eventsDetails/${event._id}`}>
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      viewport={{ once: true }}
                      whileHover={{
                        backgroundColor: "#15803d",
                        boxShadow: "0 6px 14px rgba(0, 0, 0, 0.18)",
                      }}
                      whileTap={{
                        backgroundColor: "#166534",
                      }}
                      className="btn bg-green-600 text-white btn-sm transition-all duration-300"
                    >
                      View Event
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
