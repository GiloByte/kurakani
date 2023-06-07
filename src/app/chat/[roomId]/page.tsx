"use client";
import ChatBody from "@/components/Chat/ChatBody";
import ChatFooter from "@/components/Chat/ChatFooter";
import ChatHeader from "@/components/Chat/ChatHeader";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function page() {
  const [messages, setMessages] = useState([]);
  const {roomId} = useParams()
  console.log(roomId)
  return (
    <div className="flex flex-col w-full h-screen">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
}

export default page;
