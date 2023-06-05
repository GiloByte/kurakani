"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";

const NAV_LINKS = [
  "Features",
  "Desktop App",
  "Privacy & Safety",
  "For Developers",
];

function Navbar() {
  const [navbarActive, setNavbarActive] = useState(false);

  return (
    <div className="flex fixed justify-between items-center px-5 md:px-36 w-screen h-[100px] bg-white">
      <Image src="/images/icon.png" alt="logo" height={40} width={40} />
      <div className="hidden gap-10 font-medium md:flex">
        {NAV_LINKS.map((item, index) => {
          return <Link href="#">{item}</Link>;
        })}
      </div>
      <div
        className="flex gap-10 font-medium md:hidden"
        onClick={() => setNavbarActive((prev) => !prev)}
      >
        <AiOutlineMenu size={30} />
      </div>
      {navbarActive && (
        <div className="absolute top-[100px] w-screen h-screen">kaalo</div>
      )}
    </div>
  );
}

export default Navbar;
