import React, { useEffect, useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import PageLoad from "../PageLoad/PageLoad";
import { NavLink } from "react-router";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  const handleLogOut = () => {
    logOut()
      .then(() => Swal.fire("User Logged Out Successfully"))
      .catch((error) => Swal.fire(error.message));
  };

  const handleThemeToggle = (e) => {
    setDarkTheme(e.target.checked);
    if (e.target.checked) {
      document.querySelector("html").setAttribute("data-theme", "dark");
    } else {
      document.querySelector("html").setAttribute("data-theme", "light");
    }
  };

  if (loading) return <PageLoad />;

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 shadow-md "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1160px] mx-auto flex justify-between items-center py-1 px-5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co.com/Ngppd3c4/icons8-tree-planting-94.png"
            alt=""
          />
          <h1 className="font-bold text-xl md:text-2xl text-green-700 dark:text-green-400">
            Planting for a Greener Tomorrow
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="flex justify-between items-center gap-x-5">
          <ul className="hidden md:flex gap-5 font-medium text-gray-600 dark:text-gray-300 text-xl">
            <li className="hover:text-green-600 dark:hover:text-green-400 cursor-pointer font-bold underline">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="hover:text-green-600 dark:hover:text-green-400 cursor-pointer font-bold underline">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="hover:text-green-600 dark:hover:text-green-400 cursor-pointer font-bold underline">
              <NavLink to="/upcoming-events">Upcoming Events</NavLink>
            </li>
          </ul>

          {/* Theme Toggle */}
          <input
            type="checkbox"
            onChange={handleThemeToggle}
            checked={darkTheme}
            className="toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-3 items-center">
            {!user ? (
              <>
                <motion.button
                  className="py-[10px] px-[22px] rounded-[4px] bg-green-800 text-white font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink to="/login">Login</NavLink>
                </motion.button>
                <motion.button
                  className="py-[10px] px-[22px] rounded-[4px] bg-green-800 text-white font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink to="/register">Register</NavLink>
                </motion.button>
              </>
            ) : (
              <>
                <div className="dropdown dropdown-end">
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={user?.displayName}
                  >
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-12 rounded-full">
                        <img src={user?.photoURL} alt="profile" />
                      </div>
                    </label>
                  </div>
                  <ul className="menu menu-sm dropdown-content p-2 z-[1] shadow bg-gray-900 dark:text-green-400 rounded-box w-52">
                    <li>
                      <NavLink to="/createEvents">Create Event</NavLink>
                    </li>
                    <li>
                      <NavLink to="/user-manage-events">Manage Events</NavLink>
                    </li>
                    <li>
                      <NavLink to="/joined-events-page">Joined Events</NavLink>
                    </li>
                  </ul>
                </div>

                <motion.button
                  onClick={handleLogOut}
                  className="py-[10px] px-[22px] rounded-[4px]  text-white
                    bg-green-600 hover:bg-green-700
                    dark:bg-green-500 dark:hover:bg-green-400 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {open ? (
            <FaTimes
              size={25}
              onClick={() => setOpen(false)}
              className="cursor-pointer text-gray-700 dark:text-gray-200"
            />
          ) : (
            <FaBars
              size={25}
              onClick={() => setOpen(true)}
              className="cursor-pointer text-gray-700 dark:text-gray-200"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out ${
          open
            ? "max-h-[350px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center py-4 gap-4 font-medium text-gray-700 dark:text-gray-300">
          <NavLink
            to="/upcoming-events"
            className="font-semibold hover:text-green-600 dark:hover:text-green-400"
          >
            Upcoming Events
          </NavLink>

          {!user ? (
            <>
              <motion.button className="w-[80%] py-[10px] rounded-[4px] bg-green-800 font-semibold text-white">
                <NavLink to="/login">Login</NavLink>
              </motion.button>
              <motion.button className="w-[80%] py-[10px] rounded-[4px] bg-green-800 font-semibold text-white">
                <NavLink to="/register">Register</NavLink>
              </motion.button>
            </>
          ) : (
            <>
              <NavLink to="/createEvents">Create Event</NavLink>
              <NavLink to="/user-manage-events">Manage Events</NavLink>
              <NavLink to="/joined-events-page">Joined Events</NavLink>

              <motion.button className="w-[80%] py-[10px] rounded-[4px]  font-semibold  text-white
                    bg-green-600 hover:bg-green-700
                    dark:bg-green-500 dark:hover:bg-green-400">
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
