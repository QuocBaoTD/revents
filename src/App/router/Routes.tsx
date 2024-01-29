import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashBoard from "../../features/events/dashboard/EventDashBoard";
import EventDetailPage from "../../features/events/details/EventDetailPage";
import EventForm from "../../features/events/form/EventForm";
import Scratch from "../../features/scratch/Scratch";
import AccountPage from "../../features/auth/AccountPage";
import ProfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";
import UnAuthComponent from "../layout/UnAuthComponent";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/manage/:id",
            element: <EventForm />,
          },
          {
            path: "/profiles/:id",
            element: <ProfilePage />,
          },
          {
            path: "/createEvent",
            element: <EventForm key="createEvent" />
          },
          {
            path: "/account",
            element: <AccountPage />,
          },
        ],
      },
      {
        path: "/events",
        element: <EventDashBoard />,
      },
      {
        path: "/events/:id",
        element: <EventDetailPage />,
      },

      {
        path: "/scratch",
        element: <Scratch />,
      },
      {
        path: "/unauthorised",
        element: <UnAuthComponent/>
      }
    ],
  },
]);
