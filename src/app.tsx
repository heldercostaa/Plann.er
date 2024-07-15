import { ConfigProvider, theme } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { ErrorPage } from "./pages/error";
import { TripDetailsPage } from "./pages/trip-details/index";

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
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          fontFamily: "Inter",
          colorPrimary: "#1a2e05",
          fontSize: 15,
        },
        components: {
          DatePicker: {
            hoverBg: "transparent",
            colorTextPlaceholder: "#a1a1aa",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
