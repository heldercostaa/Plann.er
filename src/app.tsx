import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details/index";
import { ErrorPage } from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
