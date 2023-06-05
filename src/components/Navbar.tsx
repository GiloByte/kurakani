import React from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  "Features",
  "Desktop App",
  "Privacy & Safety",
  "For Developers",
];

function Navbar() {
  return (
    <div className="flex fixed justify-between items-center px-36 w-screen h-[100px] bg-white">
      <Image src="/images/icon.png" alt="logo" height={40} width={40} />
      <div className="flex gap-10 font-medium">
        {NAV_LINKS.map((item, index) => {
          return <Link href="#">{item}</Link>;
        })}
      </div>
    </div>
  );
}

export default Navbar;
