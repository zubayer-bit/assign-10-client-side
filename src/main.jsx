import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Components/LayOut/Root.jsx";
import Home from "./Components/Home/Home.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import Login from "./Components/Login/Login.jsx";
import Registration from "./Components/Registration/Registration.jsx";
import AboutCard from "./Components/AboutCard/AboutCard.jsx";
import CreateEvent from "./Components/CreateEvent/CreateEvent.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import UpcomingEvents from "./Components/UpcomingEvents/UpcomingEvents.jsx";
import EventDetails from "./Components/EventDetails/EventDetails.jsx";
import JoinedEvents from "./Components/JoinedEvents/JoinedEvents.jsx";
import MyEvents from "./Components/MyEvents/MyEvents.jsx";
import UpdateEvent from "./Components/UpdateEvent/UpdateEvent.jsx";
import Error from "./Components/Error/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        loader: async () => {
          const feature = await fetch("/featuredata.json");
          const featureData = await feature.json();

          const gellary = await fetch("/gallery.json");
          const imageTreePlant = await gellary.json();
          return { featureData, imageTreePlant };
        },
        Component: Home,
      },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Registration></Registration> },
      { path: "/about", element: <AboutCard></AboutCard> },

      {
        path: "/createEvents",
        element: (
          <PrivateRoute>
            <CreateEvent></CreateEvent>
          </PrivateRoute>
        ),
      },

      // create event page
      { path: "/upcoming-events", element: <UpcomingEvents></UpcomingEvents> },

      //events details page:
      { path: "/eventsDetails/:id", element: <EventDetails></EventDetails> },

      //joined event page:
      {
        path: "/joined-events-page",
        element: (
          <PrivateRoute>
            <JoinedEvents></JoinedEvents>
          </PrivateRoute>
        ),
      },

      //only login-user ar personal-joined events show hobe ai component aa:
      {
        path: "/user-manage-events",
        element: (
          <PrivateRoute>
            <MyEvents></MyEvents>
          </PrivateRoute>
        ),
      },

      //manage page aa  "update-event" button a click korle ai component a jabe:
      {
        path: "/update-event/:id",
        element: (
          <PrivateRoute>
            <UpdateEvent></UpdateEvent>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <Error></Error>,
        // handle: { title: "404 | GameHub" },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
