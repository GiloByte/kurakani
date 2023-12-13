"use client";
import { useUser } from "@/contexts/UserContext";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

function LoginForm() {
  const [name, setName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUsername } = useUser();
  const router = useRouter();

  const handleInputChange = (e: any) => {
    setName(e.target.value);
  };

  const onStart = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if(name) {
      localStorage.setItem("name", name);
      setUsername(name);
    }
    router.push("/chat");
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={onStart}>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          className="text-black px-4 py-2 w-80 h-10 bg-gray-100 rounded-full focus:outline-none focus:border focus:border-primary focus:bg-gray-50 focus:placeholder-gray-400/60 placeholder:text-sm"
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
        <button
          type="submit"
          className="flex justify-center items-center w-40 btn"
        >
          {isLoading ? (
            <ClipLoader color="white" size={20} />
          ) : (
            "Start Kurakani"
          )}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
