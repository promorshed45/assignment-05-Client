import App from "@/App";
import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@/pages/PageNotFound";
import ServicesSection from "@/components/page/Services/ServicesSection";
import Login from "@/components/page/Services/Login";
import Register from "@/components/page/Services/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound/>,
    children: [
      {
        index: true,
        element: <MainLayout />
      },
      {
        index: true,
        path: "/service",
        element: <ServicesSection/>
      },
      {
        path: "/booking",
        element: <></>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
    ],
  },
]);

export default router;
