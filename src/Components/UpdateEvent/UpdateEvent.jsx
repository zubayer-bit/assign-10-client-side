import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateEvent = () => {
  //upcoming theke je "_id" send kora hoa ce,ta "useParmas" dea ai component aa receive kore nibo
  const { id } = useParams();

  const [event, setEvent] = useState();
 const [selectedDate, setSelectedDate] = useState(null);
  //navigate:
  const navigate = useNavigate();

  //import kora nilam...."useAxiosSecurity"
  const axiosSecurity = useAxiosSecure();

  //akhn data get korbo
  useEffect(() => {
    axiosSecurity.get(`/eventsGet/${id}`).then((data) => {
      console.log(data.data); //out:{_id: '692039035483653998dda36c', title: '4th event', description: 'come for donation', eventType: 'Donation', thumbnail: 'https://i.ibb.co.com/N2B4nHbZ/tree-plant-7.jpg',…}
      setEvent(data.data);


      // convert DB date → JS date
      if (data.data.eventDate) {
        setSelectedDate(new Date(data.data.eventDate));
      }
    });
  }, [axiosSecurity, id]);

  if (!event) {
    return <div className="text-center py-10">Loading event...</div>;
  }

  //akhn update data "Put" korar code:
  const handleCreateEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const eventType = form.eventType.value;
    const thumbnail = form.thumbnail.value;
    const location = form.location.value;
    // const eventDate = form.eventDate.value;

    // Date from DatePicker → JS Date object
    const eventDate = selectedDate;

    // console.log({

    //   title,
    //   description,
    //   eventType,
    //   thumbnail,
    //   location,
    //   eventDate,
    // });

    //update data gulu ke akti object ar moddhe nea nibo:
    const updateEventData = {
      title,
      description,
      eventType,
      thumbnail,
      location,
      eventDate,
    };

    //akhn ai form ar update data gulu ke "put" korbo:
    axiosSecurity
      .put(`/updateEventData/${id}`, updateEventData)
      .then((data) => {
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
    <div className="max-w-xl mx-auto p-6 shadow-lg border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Event</h2>

      <form onSubmit={handleCreateEvent} className="space-y-4">
        {/* Title */}
        <div>
          <label className="font-semibold">Event Title</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={event.title}
            className="w-full mt-1 px-3 py-2 border rounded"
            placeholder="Enter event title"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="font-semibold">Event Type</label>
          <select
            name="eventType"
            required
            defaultValue={event.eventType}
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
            defaultValue={event.thumbnail}
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
            defaultValue={event.location}
            className="w-full mt-1 px-3 py-2 border rounded"
            placeholder="Dhaka, Bangladesh"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            required
            defaultValue={event.description}
            className="w-full mt-1 px-3 py-2 border rounded"
            rows="3"
            placeholder="Write a short description..."
          ></textarea>
        </div>

        {/* Date  */}
        {/* <div>
          <label className="font-semibold block">Event Date</label>
          <input
            type="date"
            name="eventDate"
            required
            defaultValue={event.eventDate.split("T")[0]}
            min={new Date().toISOString().split("T")[0]}
            className="input input-bordered w-full mb-4"
          />
        </div> */}


         {/* DatePicker */}
        <div>
          <label className="font-semibold block">Event Date</label>

          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()} // prevent past dates
            className="input input-bordered w-full mb-4"
            required
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
    </div>
  );
};

export default UpdateEvent;
