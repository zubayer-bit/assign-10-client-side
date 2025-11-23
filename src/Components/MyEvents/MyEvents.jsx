import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { motion } from "framer-motion";

const MyEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);

  //useEffect use kore data get:
  useEffect(() => {
    //akhn user ar "created-events" ar data get korbo:-->user ar "email" use kore
    axiosSecure.get(`/userCreatedDataGet?email=${user.email}`).then((data) => {
      // console.log(data.data);
      setEvents(data.data);
    });
  }, [axiosSecure, user.email]);

  if (events.length === 0) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        You haven't created any events yet.
      </div>
    );
  }

  return (
    <div className=" max-w-[1160px] mx-auto px-5 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
       
        <motion.div
          key={event._id}
          initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
          className="card bg-base-100 shadow-xl border rounded-xl overflow-hidden hover:shadow-2xl transition-all"
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

            <div className="mt-2 space-y-1 text-gray-700 text-sm">
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
              <Link to={`/update-event/${event._id}`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn bg-green-600 text-white btn-sm"
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
