import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/eventsGet/${id}`).then((data) => {
      setEvent(data.data);

      if (data.data.eventDate) {
        setSelectedDate(new Date(data.data.eventDate));
      }
    });
  }, [axiosSecure, id]);

  if (!event) {
    return (
      <div className="text-center py-10 text-gray-700 dark:text-gray-300">
        Loading event...
      </div>
    );
  }

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const updateEventData = {
      title: form.title.value,
      description: form.description.value,
      eventType: form.eventType.value,
      thumbnail: form.thumbnail.value,
      location: form.location.value,
      eventDate: selectedDate,
    };

    axiosSecure.put(`/updateEventData/${id}`, updateEventData).then((data) => {
      if (data.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Event Updated Successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/user-manage-events");
      }
    });
  };

  return (
    <div
      className="
        max-w-xl mx-auto p-6 mt-10 mb-10
        shadow-lg border rounded-lg 
        bg-white dark:bg-gray-900 
        border-gray-300 dark:border-gray-700
        text-gray-800 dark:text-gray-200
      "
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-green-400">
        Update Event
      </h2>

      <form onSubmit={handleCreateEvent} className="space-y-4">

        {/* Title */}
        <div>
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={event.title}
            className="
              w-full mt-1 px-3 py-2 border rounded
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-200
              border-gray-300 dark:border-gray-600
              placeholder-gray-500 dark:placeholder-gray-400
            "
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Event Type
          </label>
          <select
            name="eventType"
            required
            defaultValue={event.eventType}
            className="
              w-full mt-1 px-3 py-2 border rounded
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
          >
            <option value="">Select Event Type</option>
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
          </select>
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Thumbnail Image URL
          </label>
          <input
            type="text"
            name="thumbnail"
            required
            defaultValue={event.thumbnail}
            className="
              w-full mt-1 px-3 py-2 border rounded
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Event Location
          </label>
          <input
            type="text"
            name="location"
            required
            defaultValue={event.location}
            className="
              w-full mt-1 px-3 py-2 border rounded
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            required
            defaultValue={event.description}
            rows="3"
            className="
              w-full mt-1 px-3 py-2 border rounded
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
          />
        </div>

        {/* DatePicker */}
        <div>
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Event Date
          </label>

          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            className="
              w-full mt-1 px-3 py-2 border rounded
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-200
              border-gray-300 dark:border-gray-600
            "
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full bg-green-600 hover:bg-green-700 
            dark:bg-green-500 dark:hover:bg-green-400
            text-white font-semibold py-2 rounded mt-4
          "
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
