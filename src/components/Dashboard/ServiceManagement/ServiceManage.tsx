

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDistanceToNow } from "date-fns";
import { ListOrderedIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Addservice from "./AdService";
import DeleteService from "./DeleteService";
import { Badge } from "@/components/ui/badge";
import { trimText } from "@/utilis/trimText";
import { useGetServicesQuery } from "@/redux/api/ServiceApi";
import UpdateServiceData from "./updateServiceData";

const ServiceManage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const { data, isFetching } = useGetServicesQuery({
    searchTerm,
    limit,
    page,
    sort,
  });

  return (
    <div className="w-full">
      <div className="my-6 px-6">
        <h1 className="text-2xl font-bold text-center dark:text-gray-400 ">Service Management</h1>
      </div>
      <div className="w-full flex items-center justify-between px-6 mt-6">
        <form
          className="flex w-[350px]"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            setSearchTerm(form.search.value);
          }}
        >
          <div className="relative w-full ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-5 text-muted-foreground w-auto" />
            </div>
            <Input
              type="search"
              name="search"
              onBlur={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="block w-full p-4 pl-10 text-sm text-foreground bg-transparent border-gray-700 text-white rounded-md shadow-sm focus:ring-primary "
            />
          </div>
          <Button variant='outline' type="submit" className="ml-[10px]">
            Search
          </Button>
        </form>
        <div className="flex justify-center center gap-[20px]">
          <Select onValueChange={(e) => setLimit(Number(e))}>
            <SelectTrigger className="">
              <ListOrderedIcon className="h-4 w-4" />
              <SelectValue placeholder="Limit per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Content limit</SelectLabel>
                <SelectItem value="10">Limit: 10</SelectItem>
                <SelectItem value="20">Limit: 20</SelectItem>
                <SelectItem value="30">Limit: 30</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setSort}>
            <SelectTrigger>
              <ListOrderedIcon className="h-4 w-4" />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectGroup className="w-[100px]">
              <SelectContent>
                <SelectItem value="-createdAt">New first</SelectItem>
                <SelectItem value="createdAt">Old first</SelectItem>
              </SelectContent>
            </SelectGroup>
          </Select>
          <Addservice />
        </div>
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
                {data?.data?.map((service) => {
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
                          <UpdateServiceData id={_id} data={service}/>
                          <DeleteService id={_id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {isFetching ? (
              <div className="w-full h-full absolute top-0 left-0 skeleton opacity-[0.6] rounded-[10px] center">
                <span className="text-primaryMat">Loading...</span>
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </main>
      <div className="w-full px-6 flex items-center justify-start gap-[10px]">
        <p>Page:</p>
        <Pagination className="w-fit mx-0">
          <PaginationContent>
            {Array.from({
              length: Math.ceil((data?.totalDoc || 0) / limit),
            }).map((_, i) => (
              <PaginationItem key={i + "page"}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  className={`${
                    page === i + 1
                      ? "bg-primary text-muted hover:bg-primary"
                      : "text-primary"
                  } border-[1px] border-primary`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ServiceManage;
