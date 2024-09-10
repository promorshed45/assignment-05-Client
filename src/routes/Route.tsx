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
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <MainLayout />
      },
      {
        index: true,
        path: "/service",
        element: <AllServices />
      },
      {
        index: true,
        path: "/services/:id",
        element: <ServiceDetails />
      },
      {
        path: "booking/:serviceId/:slotId",
        element: <UserRoute>
          <BookingPage />,
        </UserRoute>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/allreviews",
        element: <AllReviews />
      },
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'service-management',
        element: 
          <AdminRoute>
            <ServiceManage />
          </AdminRoute>
        
      },
      {
        path: 'slots-management',
        element: <AdminRoute>
          <SlotsManage />
        </AdminRoute>
      },

      {
        path: 'users-management',
        element: <AdminRoute>
          <UserManage />
        </AdminRoute>
      },
      {
        path: 'booking-management',
        element: <AdminRoute>
          <BookingList />
        </AdminRoute>
      },
      {
        path: 'update-profile',
        element: <UserRoute>
          <UpdateProfile />
        </UserRoute>
      }
    ]
  }

]);

export default router;
