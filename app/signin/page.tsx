"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
// import EmailForm from "./otpform";

export default function SignInPage() {

  const handleSignInWithGithub = async () => {
    await authClient.signIn.social(
      {
        provider: "github",
      },
      {
        onRequest: () => {
          console.log("Requesting...");
        },
        onSuccess: () => {
          
          window.location.href = "/";
        },
        onError: (error) => {
          console.log("Error", error);
        },
      }
    );
  };

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onRequest: () => {
          console.log("Requesting...");
        },
        onSuccess: () => {
  
          window.location.href = "/";
        },
        onError: (error) => {
          console.log("Error", error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md border border-white/15 rounded-2xl p-8 md:p-10 bg-black/60 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold">Welcome back</h1>
          <p className="text-white/60 mt-1 mb-6 max-w-sm">Sign in to continue your smart learning journey.</p>

          <div className="relative w-full mb-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/15"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-wide">
              <span className="px-2 bg-black text-white/50">Sign in with</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignInWithGithub}
            className="py-3 px-4 mb-3 flex justify-center items-center bg-white text-black hover:bg-neutral-200 w-full transition-colors text-sm md:text-base font-medium rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="mr-3" viewBox="0 0 1792 1792">
              <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103z"></path>
            </svg>
            Continue with GitHub
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignInWithGoogle}
            className="py-3 px-4 flex justify-center items-center bg-black border border-white/15 hover:bg-white/5 text-white w-full transition-colors text-sm md:text-base font-medium rounded-full"
          >
            <svg className="w-4 h-4 mr-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.641,6.053,29.084,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.815C14.655,16.174,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C33.641,6.053,29.084,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.196l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.094,5.575 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Continue with Google
          </motion.button>

          <p className="mt-6 text-xs md:text-sm text-white/50 text-center">
            By signing in, you agree to our <a href="#" className="underline hover:text-white">Terms</a> and <a href="#" className="underline hover:text-white">Privacy Policy</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
