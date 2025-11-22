import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { auth } from "../../Firebase/firebase.config";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Login = () => {
  //using useLOcation and useNavigate hook to navigate after login:
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  //receive data from authProvider login function:
  const { loginUser, googleLogin, logOut } = useContext(AuthContext);

  //state for email input field
  const [email, setEmail] = useState("");
  //error set for password validation
  const [error, setError] = useState("");
  //step:1 ("success" notification dekhanor code...)..declare state...
  //akdm first aa...success hoa nai,....tai by default "false" thakbe...then jokhon data pabe mane success hoa ce...tai tokhon "true" hobe...
  const [success, setSuccess] = useState(false);
  //---------------(start)----------------handleLogin function:
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password }); //out: {email: 'bangddlssadeshi@gmail.com', password: 'sdfsdfdf34fdA#'}

    //--------(start)---------login function call from authProvider:
    loginUser(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;

        //-------------varify eamil before login-----------(start)
        if (!user.emailVerified) {
            Swal.fire("Your email is not verified. Please verify your email before login.");

       
          logOut(auth);
          return;
        }

        //-------------varify eamil before login-----------(end)

        //step:2 set success true when registration success:
        setSuccess(true);
        setError("");
        // //reset form after successfull registration:
        form.reset();
        console.log(user);

        navigate(location.state?.from?.pathname || location.state || "/");
      })
      .catch((error) => {
        // console.log(error);
        // const errorCode = error.code;
        const errorMessage = error.message;
        setError("Please provide valid email and password");
        setSuccess(false);
      });

    //--------(end)---------login function call from authProvider:
  };
  //---------------(end)----------------handleLogin function:

  //-------------(start)-----------google login button function:
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const loggedUser = result.user;

        console.log(loggedUser); //out:_UserImpl{providerId: 'firebase', proactiveRefresh: ProactiveRefresh, reloadUserInfo: {…}, reloadListener: null, uid: 'NZdZNTw0Zlf6xYzAw8UXd3vqCjy2',…}
        // navigate(location.state || '/');

        navigate(location.state?.from?.pathname || location.state || "/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        // console.log(errorMessage);
      });
  };

  //-------------(end)-----------google login button function:

  //-------------(start)-----------handleForgotPassword function:
//   const handleForgotPassword = () => {
//     // if(!email){
//     //   alert('Please provide your email address to reset your password.');
//     //   return;
//     // }
//     navigate("/forget-password", { state: { email } });
//   };
  return (
    <motion.div
      className="hero bg-base-200 min-h-screen px-4"
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
        {/* Text Section */}
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Please Login!</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Access your account and explore the world of gaming.
          </p>
        </div>

        {/* Form Section */}
        <motion.div
          className="card bg-base-100 w-full max-w-sm shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset">
              {/* Email input */}
              <label className="label">Email</label>
              <input
                required
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                value={email}
                placeholder="Email"
              />

              {/* Password input */}
              <label className="label">Password</label>
              <input
                required
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Password"
              />

              {/* Forgot Password */}
              {/* <button
                onClick={handleForgotPassword}
                type="button"
                className="text-left mt-2"
              >
                <a className="link link-hover text-sm text-cyan-600">
                  Forgot password?
                </a>
              </button> */}

              {/* Login Button */}
              <motion.button
                type="submit"
                className="btn btn-neutral mt-4 w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>

              {/* Google Login */}
              <motion.button
                onClick={handleGoogleLogin}
                className="btn bg-white text-black border border-[#e5e5e5] mt-3 w-full flex items-center justify-center gap-2"
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

            {/* set ternary condition */}
            {error ? (
              <p className="text-teal-400">{error} </p>
            ) : (
              success && <p className="text-green-500">Login Successful!</p>
            )}
          </form>

          {/* Footer */}
          <p className="text-center mb-4 text-sm">
            New to our website?{" "}
            <Link
              className="text-cyan-500 hover:text-green-400 underline"
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
