/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import Addservice from "./AdService";
import DeleteService from "./DeleteService";
import { Badge } from "@/components/ui/badge";
import { trimText } from "@/utilis/trimText";
import UpdateServiceData from "./updateServiceData";
import { useGetAllServicesQuery } from "@/redux/api/ServiceApi";

const ServiceManage = () => {
  const { data, isLoading, isError } = useGetAllServicesQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  return (
    <div className="w-full">
      <div className="my-6 px-6">
        <h1 className="text-2xl font-bold text-center dark:text-gray-400 ">Service Management</h1>
      </div>
      <div className="w-full flex items-center justify-end px-6 mt-6">
        
      <Addservice />

      </div>
      <main className="p-6 ">
        <Card>
          <CardContent className="relative">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='bg-transparent'>
                {data?.data?.map((service: any) => {
                  const { _id, description, duration, name, price, createdAt } =
                    service;
                  return (
                    <TableRow className='bg-transparent' key={_id}>
                      <TableCell className="font-medium">{name}</TableCell>
                      <TableCell>{trimText(description, 30)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800"
                        >
                          {duration} Min
                        </Badge>
                      </TableCell>
                      <TableCell>${price}</TableCell>
                      <TableCell>
                        {formatDistanceToNow(createdAt, { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UpdateServiceData service={service} />
                          <DeleteService id={_id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ServiceManage;
