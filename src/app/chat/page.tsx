"use client";
import React from "react";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

function page() {
  return (
    <div className="flex justify-center items-center w-full text-xl">
      Select a room to do Kurakani
    </div>
  );
}

export default page;
