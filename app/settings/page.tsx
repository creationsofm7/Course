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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl border border-white/15 rounded-2xl p-8 md:p-10 bg-black/60 backdrop-blur-sm">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Settings</h1>
        {session ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg border border-white/10 p-4">
                <div className="text-white/60 text-xs uppercase tracking-wide mb-1">Name</div>
                <div className="text-white/90 break-words">{session.user.name}</div>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <div className="text-white/60 text-xs uppercase tracking-wide mb-1">Email</div>
                <div className="text-white/90 break-words">{session.user.email}</div>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <div className="text-white/60 text-xs uppercase tracking-wide mb-1">Theme</div>
                <div className="text-white/90">{session.user.DarkMode ? "Light" : "Dark"}</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <form action={changeTheme}>
                <ThemeToggle />
              </form>
              <SignoutButton />
            </div>
          </>
        ) : (
          <p className="text-white/60 mb-4">Please sign in to view your settings.</p>
        )}
      </div>
    </div>
  );
}
