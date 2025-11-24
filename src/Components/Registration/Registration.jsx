import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Registration = () => {
  const navigate = useNavigate();

  const {
    registerUser,
    setUser,
    googleLogin,
    emailVarification,
    logOut,
    updateUserProfile,
  } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlerRegistration = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    // Name validation
    if (name.length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }

    // Email validation
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailCheck.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    // URL validation
    const urlCheck = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlCheck.test(photo)) {
      setError("Please provide a valid URL for the photo.");
      return;
    }

    // Password validation
    const passwordCheck = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordCheck.test(password)) {
      setError(
        "Password must be at least 6 characters and include uppercase & lowercase letters."
      );
      return;
    }

    // Registration function:
    registerUser(email, password)
      .then((result) => {
        const registeredUser = result.user;

        // Update profile
        updateUserProfile({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({
              ...registeredUser,
              displayName: name,
              photoURL: photo,
            });
          })
          .catch(() => {
            setUser(registeredUser);
          });

        // Verification email
        emailVarification(registeredUser).then(() => {
          logOut();
          Swal.fire(
            "Verification email sent! Please verify your email before login."
          );
        });

        setSuccess(true);
        setError("");
        form.reset();

        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(false);
      });
  };

  // Google Login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch(() => {});
  };

  return (
    <motion.div
      className="
        hero min-h-screen px-4
        
        transition-colors duration-300
      "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="hero-content flex-col lg:flex-row-reverse gap-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Left Section */}
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-green-400">
            Please Register!
          </h1>
          <p className="text-gray-600 dark:text-green-500 font-semibold text-sm md:text-base">
            Become a part of our plantation community and contribute to a
            greener world.
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          className="
            card w-full max-w-sm shadow-2xl
            bg-white dark:bg-gray-800
            border border-gray-300 dark:border-gray-700
            transition-all
          "
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form onSubmit={handlerRegistration} className="card-body">
            <fieldset className="fieldset space-y-2">
              {/* Name */}
              <label className="label text-gray-800 dark:text-gray-200">
                Name
              </label>
              <input
                required
                name="name"
                type="text"
                className="
                  input input-bordered w-full
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  border-gray-300 dark:border-gray-600
                "
                placeholder="Your name"
              />

              {/* Email */}
              <label className="label text-gray-800 dark:text-gray-200">
                Email
              </label>
              <input
                required
                name="email"
                type="email"
                className="
                  input input-bordered w-full
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  border-gray-300 dark:border-gray-600
                "
                placeholder="Email"
              />

              {/* Photo URL */}
              <label className="label text-gray-800 dark:text-gray-200">
                Photo URL
              </label>
              <input
                required
                type="text"
                name="photo"
                className="
                  input input-bordered w-full
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  border-gray-300 dark:border-gray-600
                "
                placeholder="Photo URL"
              />

              {/* Password */}
              <label className="label text-gray-800 dark:text-gray-200">
                Password
              </label>
              <input
                required
                name="password"
                type="password"
                className="
                  input input-bordered w-full
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  border-gray-300 dark:border-gray-600
                "
                placeholder="Password"
              />

              {/* Register Button */}
              <motion.button
                type="submit"
                className="
                  btn mt-4 w-full
                  bg-gray-900 text-white
                  dark:bg-green-600 dark:hover:bg-green-500
                  hover:bg-gray-800
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>

              {/* Google Login */}
              <motion.button
                onClick={handleGoogleLogin}
                className="
                  btn mt-3 w-full flex items-center gap-2
                  bg-white text-black
                  dark:bg-gray-700 dark:text-white
                  border border-gray-300 dark:border-gray-600
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </motion.button>
            </fieldset>

            {/* Error / Success */}
            {error ? (
              <p className="text-red-500 mt-2">{error}</p>
            ) : (
              success && (
                <p className="text-green-500 mt-2">Registration Successful!</p>
              )
            )}
          </form>

          {/* Footer */}
          <p className="text-center mb-4 text-sm text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              className="text-cyan-500 dark:text-cyan-300 hover:text-green-500"
              to="/login"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Registration;
