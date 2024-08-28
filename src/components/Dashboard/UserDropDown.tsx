import { LogOut, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const UserDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Avatar className="size-10 bg-slate-700 shadow-lg">
            {/* <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
            /> */}
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 mr-3">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
