import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const JoinedEvents = () => {
  // //data receive from "useAuth"
  const { user } = useAuth();
  //import kora nilam...."useAxiosSecurity"
  const axiosSecurity = useAxiosSecure();

  const [joinedEvents, setJoinedEvents] = useState([]);

  //akhn user ar joined event ar data gulu "get" korbo:
  useEffect(() => {
    axiosSecurity.get(`/joinedDataGet?email=${user.email}`).then((data) => {
      setJoinedEvents(data.data);
    });
  }, [axiosSecurity, user.email]);

  if (joinedEvents.length === 0) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        You haven't joined any events yet.
      </div>
    );
  }
  return (
    <div className="max-w-[1160px] mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Joined Events
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {joinedEvents.map((event) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card bg-base-100 shadow-xl border rounded-xl overflow-hidden"
          >
            <figure className="h-48">
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{event.title}</h2>
              <p className="text-gray-600 text-sm">
                {event.description?.slice(0, 80)}...
              </p>

              <div className="mt-3 space-y-1 text-gray-700 text-sm">
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

              <div className="card-actions justify-end mt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-green-600 text-white btn-sm"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JoinedEvents;
