import { auth } from "../../lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { changeTheme } from "../actions/actions";
import { ThemeToggle } from "@/components/LoadingButton";
import SignoutButton from "../signin/signout";

export default async function Settings() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>
        {session ? (
          <>
            <p className="text-gray-600 mb-4">Name: {session.user.name}</p>
            <p className="text-gray-600 mb-4">Email: {session.user.email}</p>
            <p className="text-gray-600 mb-4">
              Dark Mode: {session.user.DarkMode ? "Enabled" : "Disabled"}
            </p>
         
            <div className="flex flex-row items-center gap-2">
              <form action={changeTheme}>
                <ThemeToggle />
              </form>
              <div className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600">
                <SignoutButton />
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-600 mb-4">
            Please sign in to view your settings
          </p>
        )}
      </div>
    </div>
  );
}
