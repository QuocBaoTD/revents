import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashBoard from "../../features/events/dashboard/EventDashBoard";
import EventDetailPage from "../../features/events/details/EventDetailPage";
import EventForm from "../../features/events/form/EventForm";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        path: "/events",
        element: <EventDashBoard />,
      },
      {
        path: "/events/:id",
        element: <EventDetailPage />,
      },
      {
        path: "/manage/:id",
        element: <EventForm />,
      },
      {
        path: "/createEvent",
        element: <EventForm />,
      },
    ],
  },
]);
