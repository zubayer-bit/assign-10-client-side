import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const EventDetails = () => {
  //location:
  const location = useLocation();
  //navigate:
  const navigate = useNavigate();
  //upcoming theke je "_id" send kora hoa ce,ta "useParmas" dea ai component aa receive kore nibo
  const { id } = useParams();
  //data receive from "useAuth"
  const { user } = useAuth();
  const [event, setEvent] = useState();

  //import kora nilam...."useAxiosSecurity"
  const axiosSecurity = useAxiosSecure();

  //akhn data get korbo
  useEffect(() => {
    axiosSecurity.get(`/eventsGet/${id}`).then((data) => {
      console.log(data.data); //out:{_id: '692039035483653998dda36c', title: '4th event', description: 'come for donation', eventType: 'Donation', thumbnail: 'https://i.ibb.co.com/N2B4nHbZ/tree-plant-7.jpg',…}
      setEvent(data.data);
    });
  }, [axiosSecurity, id]);

  if (!event) {
    return <div className="text-center py-10">Loading event...</div>;
  }

  //--------------"joint event" button a click korle...oi "data" akti new "id" soho server aa "Post" korbo akhn:
  const handleJoinEvent = () => {
    //jodi login kora na thake tahole login page aa navigate hobe: rr user jodi thake tahole navigate hobe na:
    if (!user) {
      Swal.fire({
        title: "You must log in to join this event",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // User clicked "Login"
          navigate("/login", { state: { from: location } });
        }
        // If user clicked Cancel → nothing happens
      });

      return; // Stop join logic
    }

    //"event ar data", "new id", "user-email" ke dea akti new object create kora holo,
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

    //akhn ai data ke "post" kora holo:
    axiosSecurity.post("/joinedEvent", joinEventData).then((data) => {
      //akhn condition set korbo,jodi user alredy join kora thake,tahole "data" ar moddhe kono "insertedId" asbe na karon server-side theke tokhon kono "insertedId" return korbe na...ai ta server-side aa set kore daoa hobe
      if (data.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "You have joined this event!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "You have already joined this event.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      console.log(data.data);
    });
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="container py-12 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl  overflow-hidden hover:shadow-2xl transition-all"
      >
        {/* -----------------Banner Image-----------(start)--------- */}
        <div className="relative h-72 w-full ">
          <img
            src={event.thumbnail}
            alt="Event Banner"
            className="w-full h-full "
          />
          <div className=" absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <h1 className="absolute bottom-4 left-6 text-white text-3xl font-bold drop-shadow-lg">
            {event.title}
          </h1>
        </div>

        {/* --------------Event Contents******(start)******** */}
        <div className="px-8 py-6  bg-emerald-900">
          {/* Description */}
          <p className="text-white text-lg leading-relaxed mb-5 font-bold">
            {event.description}
          </p>

          {/* ********(start)*********Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="flex items-center gap-3 bg-green-700 p-4 rounded-xl ">
              <div>
                <p className="text-sm text-white">Location</p>
                <p className="font-semibold text-white">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-green-700 p-4 rounded-xl ">
              <div className="">
                <p className="text-sm  text-white ">Event Type</p>
                <p className="font-semibold text-white ">{event.eventType}</p>
              </div>
            </div>

            <div className="flex items-center gap-3  p-4 rounded-xl bg-green-700">
              <div>
                <p className="text-sm text-white">Event Date</p>
                <p className="font-semibold text-white">
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Button *********(start)******* */}
          <div className="text-right">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className=" py-3 font-bold bg-green-700 text-white px-5 text-lg rounded-lg shadow-md hover:shadow-lg"
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
