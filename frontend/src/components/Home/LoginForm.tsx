"use client";
import { useUser } from "@/contexts/UserContext";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [name, setName] = useState<string>();
  const { setUsername } = useUser();
  const router = useRouter();

  const handleInputChange = (e: any) => {
    setName(e.target.value);
  };

  const onStart = (e: any) => {
    e.preventDefault();
    name && setUsername(name);
    router.push("/chat");
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={onStart}>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          className="px-4 py-2 w-80 h-10 bg-gray-100 rounded-full focus:outline-none focus:border focus:border-primary focus:bg-gray-50 focus:placeholder-gray-400/60 placeholder:text-sm"
          placeholder="Display Name"
          onChange={handleInputChange}
          minLength={3}
          maxLength={20}
          required={true}
        />
        {/* <div className="flex gap-2 p-2">
          <input type="checkbox" className="w-4 h-4 text-white accent-primary" />
          <p className="font-light">Keep me signed in</p>
        </div> */}
      </div>
      <div className="flex gap-5 items-center">
        <button className="px-5 pt-1 h-10 text-lg font-bold text-white rounded-full bg-primary hover:bg-secondary">
          Start Kurakani
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
