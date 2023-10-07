"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {BsMoonStars,BsSun} from "react-icons/bs";
import { useTheme } from "next-themes";
import DarkModeSwitch from "../shared/DarkModeSwitch";

const NAV_LINKS = [
  { title: "Star on GitHub", link: "https://github.com/diwash007/kurakani" },
];

function Navbar() {
  const [navbarActive, setNavbarActive] = useState(false);
  const {theme} = useTheme();

  return (
    <div className="flex fixed justify-between items-center px-5 lg:px-36 w-screen h-[100px] bg-white dark:bg-black">
      <Image src="/images/logo.png" alt="logo" height={60} width={80} />
      <div className="hidden gap-10 font-medium lg:flex">
        {NAV_LINKS.map((item, index) => {
          return (
            <Link href={item.link} key={index} target="_blank">
              {item.title}
            </Link>
          );
        })}
        <DarkModeSwitch />
      </div>
      <div
        className="flex gap-10 font-medium lg:hidden"
        onClick={() => setNavbarActive((prev) => !prev)}
      >
        {navbarActive ? (
          <AiOutlineClose size={30} />
        ) : (
          <AiOutlineMenu size={30} />
        )}
      </div>
      {navbarActive && (
        <div className="absolute top-[100px] bg-white font-medium">
          {NAV_LINKS.map((item, index) => {
            return (
              <Link href={item.link} key={index} target="_blank">
                {item.title}
              </Link>
            );
          })}
          <DarkModeSwitch />
        </div>
      )}
    </div>
  );
}

export default Navbar;
