import { useAppSelector } from "@/redux/hook";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();

  // Check if the user is authenticated and has the admin role
  if (user.role === 'admin') {
    return <>{children}</>;
  }

  // If the user is not an admin, redirect to a "not authorized" page or dashboard
  if (user && user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  // Redirect to login page if not authenticated
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
