import App from "@/App";
import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@/pages/PageNotFound";
import ServicesSection from "@/components/page/Services/ServicesSection";
import Login from "@/components/page/Login";
import Register from "@/components/page/Register";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import ServiceManage from "@/components/Dashboard/ServiceManagement/ServiceManage";
import ServiceDetails from "@/components/Home/ServiceDetails";
import AllReviews from "@/components/page/AllReviews";

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
        index: true,
        path: "/services/:id",
        element: <ServiceDetails/>
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
      {
        path: "/allreviews",
        element: <AllReviews/>
      },
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'service-management', 
        element: <ServiceManage />
      },
      {
        path: 'service-management', 
        element: <></>
      }
    ]
  }
  
]);

export default router;
