"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import ThemeSwitcher from "../ThemeSwitcher";

const NAV_LINKS = [
  { title: "Star on GitHub", link: "https://github.com/diwash007/kurakani" },
];

function Navbar() {
  const [navbarActive, setNavbarActive] = useState(false);

  return (
    <div className="flex fixed justify-between items-center px-5 lg:px-36 w-screen h-[100px] ">
      <Image src="/images/logo.png" alt="logo" height={60} width={80} />
      <div className="hidden gap-10 font-medium lg:flex">
        {NAV_LINKS.map((item, index) => {
          return (
            <Link href={item.link} key={index} target="_blank">
              {item.title}
            </Link>
          );
        })}
        <ThemeSwitcher />
      </div>
      <div
        className="flex gap-10 font-medium cursor-pointer lg:hidden"
        onClick={() => setNavbarActive((prev) => !prev)}
      >
        {navbarActive ? (
          <AiOutlineClose size={30} />
        ) : (
          <AiOutlineMenu size={30} />
        )}
      </div>
      {navbarActive && (
        <div className="text-white absolute top-[80px] bg-gradient-to-r from-purple-500 to-pink-500 right-6 rounded-full font-medium text-xl pt-2 px-4">
          {NAV_LINKS.map((item, index) => {
            return (
              <Link href={item.link} key={index} target="_blank">
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Navbar;
