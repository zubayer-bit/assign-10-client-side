import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { auth } from "../../Firebase/firebase.config";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { loginUser, googleLogin, logOut } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((result) => {
        const user = result.user;

        if (!user.emailVerified) {
          Swal.fire(
            "Your email is not verified. Please verify your email before login."
          );

          logOut(auth);
          return;
        }

        setSuccess(true);
        setError("");
        form.reset();

        navigate(location.state?.from?.pathname || location.state || "/");
      })
      .catch(() => {
        setError("Please provide valid email and password");
        setSuccess(false);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        navigate(location.state?.from?.pathname || location.state || "/");
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
        className="hero-content  flex-col  lg:flex-row-reverse gap-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Text */}
        <div className="text-center  lg:text-left max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-green-400">
            Please Login!
          </h1>
          <p className="text-gray-600 dark:text-green-500 font-semibold text-sm md:text-base">
            Access your account and join our plantation initiatives to create a
            greener world.
          </p>
        </div>

        {/* Card */}
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
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset space-y-2">
              {/* Email */}
              <label className="label text-gray-800 dark:text-gray-200">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="
                  input input-bordered w-full
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  border-gray-300 dark:border-gray-600
                "
                placeholder="Email"
              />

              {/* Password */}
              <label className="label text-gray-800 dark:text-gray-200">
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                className="
                  input input-bordered w-full
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-gray-100
                  border-gray-300 dark:border-gray-600
                "
                placeholder="Password"
              />

              {/* Login Button */}
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
                Login
              </motion.button>

              {/* Google Login */}
              <motion.button
                onClick={handleGoogleLogin}
                type="button"
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
                <p className="text-green-500 mt-2">Login Successful!</p>
              )
            )}
          </form>

          {/* Footer */}
          <p className="text-center mb-4 text-sm text-gray-700 dark:text-gray-300">
            New to our website?{" "}
            <Link
              className="text-cyan-500 dark:text-cyan-300 hover:text-green-500"
              to="/register"
            >
              Register
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
