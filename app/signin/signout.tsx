"use client"

import { authClient } from "@/lib/auth-client";
import {redirect} from "next/navigation";


export default function SignoutButton() {
  
  return (
    <button className="text-black dark:text-white " onClick={async () => {
      await authClient.signOut().then(() => {
        redirect("/");
      });
    }}>Sign out</button>
  );
}