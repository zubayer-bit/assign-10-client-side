import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { motion } from "framer-motion";

const UpcomingEvents = () => {
  //create state for get events data:
  const [events, setEvents] = useState([]);

  //import kora nilam...."useAxiosSecurity"
  const axiosSecurity = useAxiosSecure();
  //data get korlam "useEffect" and "axios" use kore:
  useEffect(() => {
    axiosSecurity.get("/eventsGet").then((data) => {
      console.log(data.data); //out:
      // {_id: '691feae0075eb2152058ace2', title: 'first event', description: 'Come if you are interested.', eventType: 'Plantation', thumbnail: 'https://i.ibb.co.com/N2B4nHbZ/tree-plant-7.jpg',
      // eventDate: "2026-01-03T08:00:00.000Z", …}

      //now previous date ar events gulu jeno baad hoa,tar code:
      //1: aj ker date ta nilam:
      const today = new Date(); //ai code ar maddome aj ker "date and time" paoa jai date object hisebe

      //2:only upcoming events gulu show korar condition
      //new Date(event.eventDate)-->ata mane event ar date ta string cilo akhn "Date object" a convert hoa gelo
      const upcoming = data.data.filter(
        (event) => new Date(event.eventDate) >= today
      );

      //akhn date dea sort kore nilam events gulu ke:
      const sortEventDate = upcoming.sort(
        (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
      );

      //akhn ai final data ke "state" ar moddhe set korbo
      setEvents(sortEventDate);
    });
  }, [axiosSecurity]);

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10"
      >
        Upcoming <span className="text-green-600">Events</span>
      </motion.h2>

      {events.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No upcoming events found.
        </p>
      )}

      {/* Grid layout */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <motion.div
           initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            key={event._id}
            className="hover:shadow-2xl transition-all"
          >
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={event.thumbnail}
                  className="w-full h-60 object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-xl font-semibold">
                  {event.title}
                </h2>

                <p className="text-gray-600">
                  <strong>Location:</strong> {event.location}
                </p>

                <p className="text-gray-600">
                  <strong>Event Type:</strong> {event.eventType}
                </p>

                <p className="text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>

                <div className="card-actions justify-end mt-4 ">
                  <Link to={`/eventsDetails/${event._id}`}>

               <motion.button
  initial={{ opacity: 0, y: 8 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  viewport={{ once: true }}

  whileHover={{
    backgroundColor: "#15803d",
    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.18)"
  }}

  whileTap={{
    backgroundColor: "#166534"
  }}

  className="btn bg-green-600 text-white btn-sm transition-all duration-300"
>
  View Event
</motion.button>


                    {/* <button >
                      
                    </button> */}
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
