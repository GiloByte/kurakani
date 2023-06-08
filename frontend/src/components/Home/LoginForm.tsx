import Link from "next/link";
import React from "react";

function LoginForm() {
  return (
    <form className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          className="px-4 py-2 w-80 h-9 text-lg align-middle bg-gray-100 rounded-lg focus:outline-none focus:border focus:border-primary focus:bg-gray-50 focus:placeholder-gray-400/60 placeholder:translate-y-1"
          placeholder="Email or phone number"
        />
        <input
          type="password"
          className="px-4 py-2 w-80 h-9 text-lg align-middle bg-gray-100 rounded-lg focus:outline-none focus:border focus:border-primary focus:bg-gray-50 focus:placeholder-gray-400/60 placeholder:translate-y-1"
          placeholder="Password"
        />
      </div>
      <div className="flex gap-5 items-center">
        <button className="px-5 pt-1 h-10 text-lg font-bold text-white rounded-full bg-primary hover:bg-blue-600">
          Log In
        </button>
        <Link href="#" className="text-sm underline text-primary">
          Forgot your password?
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
