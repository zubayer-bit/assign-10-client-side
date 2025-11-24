import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState();

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/eventsGet/${id}`).then((data) => {
      setEvent(data.data);
    });
  }, [axiosSecure, id]);

  if (!event) {
    return (
      <div className="text-center py-10 text-gray-700 dark:text-gray-300">
        Loading event...
      </div>
    );
  }

  const handleJoinEvent = () => {
    if (!user) {
      Swal.fire({
        title: "You must log in to join this event",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });

      return;
    }

    const joinEventData = {
      title: event.title,
      eventId: id,
      description: event.description,
      eventType: event.eventType,
      thumbnail: event.thumbnail,
      location: event.location,
      eventDate: event.eventDate,
      userEmail: user.email,
    };

    axiosSecure.post("/joinedEvent", joinEventData).then((data) => {
      if (data.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "You have joined this event!",
          timer: 1800,
          showConfirmButton: false,
        }).then(() => {
          navigate("/joined-events-page");
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "You have already joined this event.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="container py-12 px-4 max-w-4xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          bg-white dark:bg-gray-900 
          shadow-xl dark:shadow-gray-800 
          rounded-2xl overflow-hidden 
          hover:shadow-2xl dark:hover:shadow-gray-700 
          transition-all
        "
      >
        {/* ----------------- Banner Image ----------------- */}
        <div className="relative h-72 w-full">
          <img
            src={event.thumbnail}
            alt="Event Banner"
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          <h1 className="absolute bottom-4 left-6 text-white text-3xl font-bold drop-shadow-lg">
            {event.title}
          </h1>
        </div>

        {/* ----------------- Content Section ----------------- */}
        <div
          className="
            px-8 py-6 
            bg-emerald-900 dark:bg-gray-800 
            text-white dark:text-gray-200
          "
        >
          {/* Description */}
          <p className="text-lg leading-relaxed mb-5 font-semibold">
            {event.description}
          </p>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Location */}
            <div className="flex items-center gap-3 bg-green-700 dark:bg-gray-700 p-4 rounded-xl">
              <div>
                <p className="text-sm">Location</p>
                <p className="font-semibold">{event.location}</p>
              </div>
            </div>

            {/* Event Type */}
            <div className="flex items-center gap-3 bg-green-700 dark:bg-gray-700 p-4 rounded-xl">
              <div>
                <p className="text-sm">Event Type</p>
                <p className="font-semibold">{event.eventType}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-3 bg-green-700 dark:bg-gray-700 p-4 rounded-xl">
              <div>
                <p className="text-sm">Event Date</p>
                <p className="font-semibold">
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Join Button */}
          <div className="text-right">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="
                py-3 px-5 text-lg font-bold 
                bg-green-700 hover:bg-green-800 
                dark:bg-green-600 dark:hover:bg-green-500 
                text-white rounded-lg 
                shadow-md hover:shadow-lg
              "
              onClick={handleJoinEvent}
            >
              Join Event
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;
