"use client";

import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import Link from "next/link";
import SignoutButton from "../app/signin/signout";
import { authClient } from "@/lib/auth-client";


export default function UserAvatar() {
    const { data: session } = authClient.useSession();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {session?.user.image ? (
            <Image
              src={session.user.image}
              alt="User"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          ) : (
            <CircleUserRound size={28} className="cursor-pointer" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-28 mr-5">
          <DropdownMenuLabel>
            {" "}
            <Link href="/settings" className="text-indigo-600 hover:underline">
              Settings
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <SignoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
