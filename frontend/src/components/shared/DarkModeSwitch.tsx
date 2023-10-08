"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsMoonStars, BsSun } from "react-icons/bs";

const DarkModeSwitch = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex items-center gap-5">
      {theme === "dark" ? (
        <BsMoonStars
          size={25}
          className="text-slate-400 cursor-pointer"
          onClick={() => setTheme("light")}
        />
      ) : (
        <BsSun
          size={30}
          className="text-yellow-400 cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
};

export default DarkModeSwitch;
