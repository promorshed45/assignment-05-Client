import App from "@/App";
import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@/pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: "/",
        element: <MainLayout />
      },
      {
        path: "/service",
        element: <></>
      },
      {
        path: "/booking",
        element: <></>
      },
    ],
  },
]);

export default router;
