/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hook";

const AdminOverview = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  console.log('admin overview', user.role);
//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Something went wrong. Please try again later.</p>;



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
            <Button
              onClick={() => navigate("/update-profile")}
              className="mt-4"
            >
              Profile Info
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;