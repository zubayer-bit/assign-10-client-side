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
import PageLoad from "./Components/PageLoad/PageLoad.jsx";

const delayLoader = () =>
  new Promise((resolve) => setTimeout(() => resolve(null), 300));

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
        hydrateFallbackElement: <PageLoad></PageLoad>,
        handle: { title: "Home - Tree Plantation" },
      },
      {
        path: "/login",
        element: <Login />,
        hydrateFallbackElement: <PageLoad></PageLoad>,
        loader: delayLoader,
        handle: { title: "Login - Tree Plantation" },
      },
      {
        path: "/register",
        element: <Registration />,
        hydrateFallbackElement:<PageLoad></PageLoad>,
        loader: delayLoader,
        handle: { title: "Register - Tree Plantation" },
      },
      {
        path: "/about",
        element: <AboutCard />,
        hydrateFallbackElement:<PageLoad></PageLoad>,
        loader: delayLoader,
        handle: { title: "About - Tree Plantation" },
      },

      {
        path: "/createEvents",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
        hydrateFallbackElement:<PageLoad></PageLoad>,
        loader: delayLoader,
        handle: { title: "Create Event - Tree Plantation" },
      },

      {
        path: "/upcoming-events",
        element: <UpcomingEvents />,
        loader: delayLoader,
        hydrateFallbackElement:<PageLoad></PageLoad>,
        handle: { title: "Upcoming Events - Tree Plantation" },
      },

      {
        path: "/eventsDetails/:id",
        element: <EventDetails />,
        loader: delayLoader,
        hydrateFallbackElement:<PageLoad></PageLoad>,
        handle: { title: "Event Details - Tree Plantation" },
      },

      {
        path: "/joined-events-page",
        element: (
          <PrivateRoute>
            <JoinedEvents />
          </PrivateRoute>
        ),
        hydrateFallbackElement:<PageLoad></PageLoad>,
        loader: delayLoader,
        handle: { title: "Joined Events - Tree Plantation" },
      },

      {
        path: "/user-manage-events",
        element: (
          <PrivateRoute>
            <MyEvents />
          </PrivateRoute>
        ),
        hydrateFallbackElement:<PageLoad></PageLoad>,
        loader: delayLoader,
        handle: { title: "My Events - Tree Plantation" },
      },

      {
        path: "/update-event/:id",
        element: (
          <PrivateRoute>
            <UpdateEvent />
          </PrivateRoute>
        ),
        hydrateFallbackElement:<PageLoad></PageLoad>,
        loader: delayLoader,
        handle: { title: "Update Event - Tree Plantation" },
      },

      {
        path: "*",
        element: <Error />,
        hydrateFallbackElement:<PageLoad></PageLoad>,
        loader: delayLoader,
        handle: { title: "404 - Page Not Found" },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <AuthProvider>
      <RouterProvider
        router={router}
       
      />
    </AuthProvider>
  </StrictMode>
);
