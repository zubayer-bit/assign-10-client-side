import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const CreateEvent = () => {
  const { user } = useAuth();
  const [eventDate, setEventDate] = useState(null);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const form = e.target;

    const newEvent = {
      title: form.title.value,
      description: form.description.value,
      eventType: form.eventType.value,
      thumbnail: form.thumbnail.value,
      location: form.location.value,
      eventDate,
      email: user.email,
    };

    if (!eventDate) return setError("Please select a valid event date.");
    if (eventDate < new Date()) return setError("Past dates are not allowed!");
    setError("");

    axiosSecure.post("/createEvents", newEvent).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Your Event has been Created",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          form.reset();
          setEventDate(null);
          navigate("/upcoming-events");
        });
      }
    });
  };

  return (
    <div className="
      max-w-2xl mx-auto mt-10 mb-10
      bg-white dark:bg-gray-900 
      shadow-lg p-8 rounded-2xl 
      text-gray-800 dark:text-gray-200
    ">
      <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6">
        Create a New Event
      </h2>

      <form onSubmit={handleCreateEvent} className="space-y-4">

        {/* Title */}
        <div>
          <label className="font-semibold dark:text-gray-200">Event Title</label>
          <input
            type="text"
            name="title"
            required
            className="
              w-full mt-1 px-3 py-2 border rounded 
              bg-white dark:bg-gray-800 
              text-gray-800 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
            placeholder="Enter event title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold dark:text-gray-200">Description</label>
          <textarea
            name="description"
            required
            className="
              w-full mt-1 px-3 py-2 border rounded 
              bg-white dark:bg-gray-800 
              text-gray-800 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
            rows="3"
            placeholder="Write a short description..."
          ></textarea>
        </div>

        {/* Event Type */}
        <div>
          <label className="font-semibold dark:text-gray-200">Event Type</label>
          <select
            name="eventType"
            required
            className="
              w-full mt-1 px-3 py-2 border rounded 
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
          >
            <option value="">Select Event Type</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
          </select>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="font-semibold dark:text-gray-200">Thumbnail Image URL</label>
          <input
            type="text"
            name="thumbnail"
            required
            className="
              w-full mt-1 px-3 py-2 border rounded 
              bg-white dark:bg-gray-800 
              text-gray-800 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
            placeholder="URL"
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold dark:text-gray-200">Event Location</label>
          <input
            type="text"
            name="location"
            required
            className="
              w-full mt-1 px-3 py-2 border rounded 
              bg-white dark:bg-gray-800 
              text-gray-800 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
            placeholder="Dhaka, Bangladesh"
          />
        </div>

        {/* Date Picker */}
        <div>
          <label className="font-semibold dark:text-gray-200 block">Event Date</label>

          <DatePicker
            selected={eventDate}
            onChange={(date) => setEventDate(date)}
            calendarClassName="!bg-white dark:!bg-gray-800 !p-3 !rounded-xl shadow-xl border dark:border-gray-700"
            dayClassName={() =>
              "hover:bg-green-600 hover:text-white rounded-full transition"
            }
            className="
              w-full mt-1 px-3 py-2 border rounded
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
            placeholderText="Select event date"
            minDate={new Date()}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full bg-green-600 hover:bg-green-700 
            text-white font-semibold py-2 rounded mt-4
          "
        >
          Create Event
        </button>
      </form>

      {error && (
        <p className="text-red-600 dark:text-red-400 font-semibold mt-4 bg-red-100 dark:bg-red-900 px-3 py-1 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default CreateEvent;
