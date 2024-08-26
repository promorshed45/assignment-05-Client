import App from "@/App";
import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@/pages/PageNotFound";
import ServicesSection from "@/components/Home/ServicesSection";

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
        element: <ServicesSection/>
      },
      {
        path: "/booking",
        element: <></>
      },
    ],
  },
]);

export default router;
