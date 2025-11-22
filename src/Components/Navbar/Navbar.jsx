import React, { use, useState } from "react";
import { SiEpicgames } from "react-icons/si";
import { FaBars, FaTimes } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { hover, motion } from "framer-motion";
import PageLoad from "../PageLoad/PageLoad";
import { NavLink } from "react-router";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut, loading } = use(AuthContext);
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("User Logged Out Successfully");
        
      })
      .catch((error) => {
        Swal.fire(error.message);
        
      });
  };

  if (loading) {
    return <PageLoad></PageLoad>;
  }

  return (
    <motion.div
      className="bg-[#f2f6f2] shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1160px] mx-auto flex justify-between items-center py-1 px-5">
        {/* ----------(start)-----Logo-------- */}
        <div className="flex items-center gap-2">
          <img src="https://i.ibb.co.com/Ngppd3c4/icons8-tree-planting-94.png" alt="" />
          <h1 className="font-bold text-xl md:text-2xl  text-green-700">
            Planting for a Greener Tomorrow
          </h1>
        </div>

        {/* ------------Desktop Menu------------------ */}
        <div className="flex justify-between items-center gap-x-5">
          <ul className="hidden md:flex gap-5 font-medium text-gray-600 text-xl">
          

            <li className="hover:text-[#089e2e] cursor-pointer font-bold underline">
              <NavLink to="/">Home</NavLink>
            </li>

              <li className="hover:text-[#089e2e] cursor-pointer font-bold underline">
              <NavLink to="/about">About</NavLink>
            </li>
              
              
            <li className="hover:text-[#089e2e] cursor-pointer font-bold underline">
              <NavLink to="/upcoming-events">Upcoming Events</NavLink>
              
            </li>
          </ul>

          {/* ----------Desktop Buttons********---------- */}
          <div className="hidden md:flex gap-3 items-center">
            {!user ? (
              <>
                <motion.button
                  className="py-[10px] px-[22px] rounded-[4px] bg-gradient-to-r bg-green-800 text-white font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink to="/login">Login</NavLink>
                </motion.button>

                <motion.button
                  className="py-[10px] px-[22px] rounded-[4px] bg-gradient-to-r bg-green-800 text-white font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink to="/register">Register</NavLink>
                </motion.button>
              </>
            ) : (
              <>
                {/*------------ Profile Picture Dropdown*************** */}
               
<div className="dropdown  dropdown-end">

  {/* ---------------Tooltip *********** */}
  <div
    className="tooltip tooltip-bottom"
    data-tip={user?.displayName}
  >
    {/* --------------Dropdown *********** */}
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-12 rounded-full">
        <img src={user?.photoURL} alt="profile" />
      </div>
    </label>
  </div>

  {/*--------------- Dropdown------------ Menu********** */}
  <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content p-2 z-[1] shadow bg-white rounded-box w-52"
  >
    <li><NavLink to="/createEvents">Create Event</NavLink></li>
    <li><NavLink to="/manage-events">Manage Events</NavLink></li>
    <li><NavLink to="/joined-events">Joined Events</NavLink></li>
  </ul>

</div>

                <motion.button
                    onClick={handleLogOut}
                    className="py-[10px] px-[22px] rounded-[4px] text-white bg-green-800 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavLink>LogOut</NavLink>
                  </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Mobile-------- Menu-----------*****-- Button */}
        <div className="md:hidden">
          {open ? (
            <FaTimes
              size={25}
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <FaBars
              size={25}
              onClick={() => setOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      {/*---------(start)----- Mobile Dropdown Menu******* */}
      <motion.div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ease-in-out ${
          open
            ? "max-h-[350px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center py-4 gap-4 font-medium text-gray-700">
         

          {/* ------------------Mobile Menu */}
          <NavLink to="/upcoming-events" className="font-semibold hover:text-[#229c4f]">
            Upcoming Events
          </NavLink>

          {!user ? (
            <>
              <motion.button className="w-[80%] py-[10px] rounded-[4px] bg-green-800
font-semibold text-white">
                <NavLink to="/login">Login</NavLink>
              </motion.button>

              <motion.button className="w-[80%] py-[10px] rounded-[4px] bg-gradient-to-r bg-green-800
font-semibold text-white">
                <NavLink to="/register">Register</NavLink>
              </motion.button>
            </>
          ) : (
            <>
              {/* Mobile Dropdown ----------------*/}
              <NavLink to="/create-event">Create Event</NavLink>
              <NavLink to="/manage-events">Manage Events</NavLink>
              <NavLink to="/joined-events">Joined Events</NavLink>

              <motion.button
                onClick={handleLogOut}
                className="w-[80%] py-[10px] rounded-[4px] bg-green-800
font-semibold text-white"
              >
                Logout
              </motion.button>
            </>
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
