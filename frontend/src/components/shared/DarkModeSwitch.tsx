"use client";
import React from "react";
import { useTheme } from "next-themes";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const DarkModeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-5">
      {theme === "light" ? (
        <BsMoonStarsFill
          size={25}
          color="#6C63FF"
          className="text-slate-400 cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BsSunFill
          size={25}
          color="#6C63FF"
          className="text-yellow-400 cursor-pointer"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};

export default DarkModeSwitch;
