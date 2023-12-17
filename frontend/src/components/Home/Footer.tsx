import React from "react";

function Footer() {
  return (
    <footer className="flex justify-center items-center px-5 mt-5 mb-2 lg:px-36">
      <div className="w-full">
        <span className="font-semibold">
          © Kurakani {new Date().getFullYear()}.{" "}
        </span>
        <span className="font-light">
          Made with ❤️ and JS by{" "}
          <a
            href="https://diwashdahal.com.np"
            target="_blank"
            className="text-primary"
          >
            Diwash Dahal
          </a>
          .
        </span>
      </div>
    </footer>
  );
}

export default Footer;
