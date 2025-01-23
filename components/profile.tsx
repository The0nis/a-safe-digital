"use client";
// import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronsUpDown } from "lucide-react";
import { auth } from "@/auth";

const Profile = async () => {
  const session = await auth();
  return (
    <div className="">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={""} alt={"user"} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          {session !== null ? session?.user?.email : "No user"}
        </span>
        <span className="truncate text-xs">
          {session !== null ? session?.user?.email : "Unknown"}
        </span>
      </div>
      <ChevronsUpDown className="ml-auto size-4" />
    </div>
  );
};

export default Profile;
