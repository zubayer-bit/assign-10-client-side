import React, { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CreateEvent = () => {
  //data receive from authprovider:
  //   const { user } = use(AuthContext);

  //data receive from "useAuth"
  const { user } = useAuth();
  //date picker ar jonno state set kora holo:
  const [eventDate, setEventDate] = useState(null);

  //set error ar state declare kora holo:
  const [error, setError] = useState("");

  //useAxiosSecure ke nea nilam:
  const axiosSecure = useAxiosSecure();

  //navigate set kora holo:
  const navigate = useNavigate();

  //form theke value nilam:
  const handleCreateEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const eventType = form.eventType.value;
    const thumbnail = form.thumbnail.value;
    const location = form.location.value;

    //set validation condition:
    if (!eventDate) {
      setError("Please select a valid event date.");
      return;
    }

    if (eventDate < new Date()) {
      setError("Past dates are not allowed!");
      return;
    }

    setError("");
    console.log({
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
    }); //out:{title: 'plant tree', description: 'come to plant tree', eventType: 'Plantation', thumbnail: 'https://i.ibb.co.com/N2B4nHbZ/tree-plant-7.jpg', location: 'dhaka,mirpur-10',…}

    //------(start)--------server side aa data post korar code:
    //1: (form ar data + user ar email + eventDate) dea akti object make korbo
    const newEventCreatData = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
      email: user.email,
    };

    //data "post" ar code:
    axiosSecure.post("/createEvents", newEventCreatData).then((data) => {
      console.log("after secure call", data.data);

      //jodi data-->data-base a inserted hoa,tahole alert show hobe
      if (data.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Event has been Created",
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>{
          //alert show korar pore navigate hobe
           form.reset();
    // Reset date state
    setEventDate(null);
    navigate("/upcoming-events");
        })
        ;
      }
    });

    //------(end)--------server side aa data post korar code:

   
  };
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-2xl">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Create a New Event
      </h2>

      <form onSubmit={handleCreateEvent} className="space-y-4">
        {/* Title */}
        <div>
          <label className="font-semibold">Event Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full mt-1 px-3 py-2 border rounded"
            placeholder="Enter event title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            required
            className="w-full mt-1 px-3 py-2 border rounded"
            rows="3"
            placeholder="Write a short description..."
          ></textarea>
        </div>

        {/* Event Type */}
        <div>
          <label className="font-semibold">Event Type</label>
          <select
            name="eventType"
            required
            className="w-full mt-1 px-3 py-2 border rounded"
          >
            <option value="">Select Event Type</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
          </select>
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="font-semibold">Thumbnail Image URL</label>
          <input
            type="text"
            name="thumbnail"
            required
            className="w-full mt-1 px-3 py-2 border rounded"
            placeholder="URL"
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Event Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full mt-1 px-3 py-2 border rounded"
            placeholder="Dhaka, Bangladesh"
          />
        </div>

        {/* Date Picker */}
        <div>
          <label className="font-semibold block">Event Date</label>
          <DatePicker
            name="eventDate"
            selected={eventDate}
            onChange={(date) => setEventDate(date)}
            calendarClassName="!bg-white !p-3 !rounded-xl shadow-xl border"
            dayClassName={() =>
              "hover:bg-green-600 hover:text-white rounded-full"
            }
            className="w-full mt-1 px-3 py-2 border rounded"
            placeholderText="Select event date"
            minDate={new Date()} // no past date allowed
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded mt-4"
        >
          Create Event
        </button>
      </form>

      {error && (
        <p className="text-red-600 font-semibold mb-4 bg-red-100 px-3 py-1 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default CreateEvent;
