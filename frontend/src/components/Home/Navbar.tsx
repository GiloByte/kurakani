"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'

const NAV_LINKS = [
  { icon: FaGithub, label: "Github", title: "Star on GitHub", link: "https://github.com/diwash007/kurakani", externalPage: true },
];


function Navbar() {
  const [navbarActive, setNavbarActive] = useState(false);

  return (
    <div className="flex justify-between items-center px-5 lg:px-36 h-[100px] bg-white">
      <Image src="/images/logo.png" alt="logo" height={60} width={80} />
      <div className="hidden gap-10 font-medium lg:flex">
        {NAV_LINKS.map(({ label, title, link, icon, externalPage }, index) => {
          return (
            <>
              {icon ? (
                <>
                  <Link
                    id={`${label}${index}`}
                    className="flex flex-col items-center"
                    href={link}
                    key={index}
                    target={externalPage ? "_blank" : "_self"}
                  >
                    {React.createElement(icon, { className: "w-10 h-10" })}
                    {label}
                  </Link>
                  {
                    title &&
                    <Tooltip delayShow={200} anchorSelect={`#${label}${index}`} place="left">
                     {title}
                    </Tooltip>
                  }

                </>

              ) : (
                <Link
                  id={`${label}${index}`}
                  href={link}
                  key={index}
                  target={externalPage ? "_blank" : "_self"}
                >
                  {label}
                </Link>
              )}
            </>


          );
        })}
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
          {NAV_LINKS.map(({ label, title, link, icon, externalPage }, index) => {
            return (
              <Link title={title} href={link} key={index} target={externalPage ? "_blank" : "_self"}>
                <FaGithub />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Navbar;
