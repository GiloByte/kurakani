import React from "react";

function Footer() {
  return (
    <div className="flex justify-center items-center px-5 mb-5 lg:px-36">
      <div className="w-full">
        <span className="font-semibold">
          © Kurakani {new Date().getFullYear()}.{" "}
        </span>
      </div>
    </div>
  );
}

export default Footer;
