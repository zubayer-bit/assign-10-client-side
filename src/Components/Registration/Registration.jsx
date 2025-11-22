import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Registration = () => {
  //using  useNavigate hook to navigate after registration:
  
  const navigate = useNavigate();

  //receive data from authProvider register function:
  const {registerUser,setUser, googleLogin, emailVarification, logOut,updateUserProfile} = use(AuthContext);

  //error set for password validation
  const [error, setError] = useState('');
  //step:1 ("success" notification dekhanor code...)..declare state...
  //akdm first aa...success hoa nai,....tai by default "false" thakbe...then jokhon data pabe mane success hoa ce...tai tokhon "true" hobe...
  const [success, setSuccess] = useState(false);

  //data receive handler for registration
  const handlerRegistration = (event) =>{
    event.preventDefault();
    // console.log(event.target); //out:<form class="card-body">…</form>flex
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    // console.log(name,email,photo ,password);  //out: FocusTask maishsssmubsdassir89@gmail.com https://i.ibb.co.com/qYzC8gwM/FitBuddy.jpg aAdfdfdffefefe

    //name validation:
    if(name.length < 3){
      setError('Name must be at least 3 characters long.');
      return;
    }

    //email validation:
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailCheck.test(email)){
      setError('Please provide a valid email address.');
      return;
    }
    //photo URL validation:
    const urlCheck = /^(ftp|http|https):\/\/[^ "]+$/;
    if(!urlCheck.test(photo)){
      setError('Please provide a valid URL for the photo.');
      return;
    }
    //password validation:
    const passwordCheck = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if(!passwordCheck.test(password)){
      setError('Password must be at least 6 characters long and contain at least one uppercase and one lowercase letter.');
      return;
    }
// -------------------------(start)-----------------------------------registration function call:
    //register function from "authProvider" call here:
    registerUser(email,password)
    .then(result =>{
      const registeredUser = result.user;
      // console.log(registeredUser); //out: _UserImpl{providerId: 'firebase', proactiveRefresh: ProactiveRefresh, reloadUserInfo: {…}, reloadListener: null, uid: 'rrQJ38gFcwToMZVjBysoFb3EeMc2',…}

      //--------------(start)-----------update user profile(name, photo) after registration:
      updateUserProfile({
        displayName: name,
        photoURL: photo
      }).then(() => {
  // Profile updated!
  setUser({...registeredUser, displayName: name,
        photoURL: photo});
}).catch((error) => {
  // An error occurred
  // console.log(error);
  //jodi kono error hoa tahole ager user data gului set hoa jabe:
  setUser(registeredUser);
});
//--------------(end)-----------update user profile(name, photo) after registration:
      

      //--------------(start)-----------send varification email commande
      emailVarification(registeredUser)
      .then(() => {
        logOut();
            Swal.fire("Verification email sent! Please verify your email before login.");

          return;
        

        //   //-------------varify eamil before registration-----------(start)
        //    if (!registeredUser.emailVerified) {
        //     logOut(auth);
        //   alert('Your email is not verified. Please verify your email.After verification you can login.');
          
        //   return;
        // }
        // //-------------varify eamil before registration-----------(end)


        
  });
    //--------------(end)-----------send varification email commande

      //step:2 set success true when registration success:
      setSuccess(true);
       setError("");
      // //reset form after successfull registration:
      form.reset();
      navigate('/');
    })
    .catch(error =>{
      // const errorCode = error.code;
    const errorMessage = error.message;
      setError(errorMessage);
      setSuccess(false);
    })
    // -------------------------(end)-----------------------------------registration function call:

    

  }

  //  //-------------(start)-----------google login button function:
    const handleGoogleLogin = () =>{
      googleLogin()
      .then(result =>{
        const loggedUser = result.user;
        setUser(loggedUser);
        // console.log(loggedUser);  //out:_UserImpl{providerId: 'firebase', proactiveRefresh: ProactiveRefresh, reloadUserInfo: {…}, reloadListener: null, uid: 'NZdZNTw0Zlf6xYzAw8UXd3vqCjy2',…}
        navigate('/');
      })
      .catch(error =>{
        const errorMessage = error.message;
        // console.log(errorMessage);
      })


  }

  //-------------(end)-----------google login button function:
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
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Please Register!
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Create your account to explore, play, and connect with gamers
            worldwide.
          </p>
        </div>

        {/* Form Section */}
        <motion.div
          className="card bg-base-100 w-full max-w-sm shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form onSubmit={handlerRegistration} className="card-body">
            <fieldset className="fieldset">
              {/* Name input */}
              <label className="label">Name</label>
              <input
              required
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Your name"
              />

              {/* Email input */}
              <label className="label">Email</label>
              <input
              required
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
              />
              {/* Photo URL */}
              <label className="label">Photo URL</label>
                <input
                required
                  type="text"
                  name="photo"
                  className="input"
                  placeholder="Photo URL"
                />


              {/* Password input */}
              <label className="label">Password</label>
              <input
              required
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
              />

              {/* Register Button */}
              <motion.button
                type="submit"
                className="btn btn-neutral mt-4 w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>

              {/* Google Login */}
              <motion.button
                onClick={handleGoogleLogin}
                className="btn bg-white text-black border border-[#e5e5e5] mt-3 w-full flex items-center gap-2 justify-center"
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
             {/* set error massage */}
          {/* {error && <p className="text-teal-400">{error} </p>} */}
          {error ? <p className="text-teal-400">{error} </p> : success && <p className="text-green-500">Registration Successful!</p>}
          </form>
         


          {/* Footer Text */}
          <p className="text-center mb-4 text-sm">
            Already have an account?{" "}
            <Link
              className="text-cyan-500 hover:text-green-400 underline"
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
