import App from "@/App";
import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@/components/PageNotFound";
import AllServices from "@/components/page/Services/AllServices";
import Login from "@/components/page/Login";
import Register from "@/components/page/Register";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import ServiceManage from "@/components/Dashboard/ServiceManagement/ServiceManage";
import ServiceDetails from "@/components/page/Services/ServiceDetails";
import AllReviews from "@/components/page/AllReviews";
import SlotsManage from "@/components/Dashboard/Slots/SlotsManage";
import UserManage from "@/components/Dashboard/Users/UserManage";
import BookingList from "@/components/Dashboard/Users/BookingList";
import BookingPage from "@/components/page/Booking";
import UpdateProfile from "@/components/Dashboard/Users/UpdateProfile";

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
        element: <AllServices/>
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
        path: "booking/:serviceId/:slotId",
        element: <BookingPage />,
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
        path: 'slots-management', 
        element: <SlotsManage/>
      },

      {
        path: 'users-management', 
        element: <UserManage/>
      },
      {
        path: 'booking-management', 
        element: <BookingList/>
      },
      {
        path: 'update-profile', 
        element: <UpdateProfile/>
      }
    ]
  }
  
]);

export default router;
