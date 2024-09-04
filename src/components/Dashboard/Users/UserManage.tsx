/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useGetAllUsersQuery,
    useUpdateUserRoleMutation,
} from "@/redux/api/userApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hook";
import { Card, CardContent } from "@/components/ui/card";

const UserManage = () => {
    const { token } = useAppSelector((state) => state.user);
    const { data: users, isLoading, isError } = useGetAllUsersQuery(token);

    const [updateUserRole] = useUpdateUserRoleMutation();

    const handleRoleUpdate = async (userId: string, role: string) => {
        try {
            await updateUserRole({ userId, role, token }).unwrap();
            toast.success("Role Updated Successfully");
        } catch (error) {
            console.error("Failed to update role", error);
            toast.error("Failed to update role.",)
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong. Please try again later.</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <main className="p-6 ">
                <Card>
                    <CardContent className="relative">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='bg-transparent'>
                                {users?.data?.map((service: any) => {
                                    const { _id, name, email, role } =
                                        service;
                                    return (
                                        <TableRow className='bg-transparent' key={_id}>
                                            <TableCell className="font-medium">{name}</TableCell>
                                            <TableCell>{email}</TableCell>
                                            <TableCell>
                                                <div
                                                    className={`px-2 py-2 rounded-md text-center font-semibold ${role === 'admin' ? 'bg-green-300' : 'bg-slate-500'
                                                        } text-slate-950`}
                                                >
                                                    {role}
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <Select
                                                    onValueChange={(value) => handleRoleUpdate(_id, value)}
                                                    defaultValue={role}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select Role" />
                                                    </SelectTrigger>
                                                    <SelectContent className="flex mx-auto">
                                                        <SelectGroup>
                                                            <SelectItem value="admin">Admin</SelectItem>
                                                            <SelectItem value="user">User</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>

                                                </Select>
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

export default UserManage;
