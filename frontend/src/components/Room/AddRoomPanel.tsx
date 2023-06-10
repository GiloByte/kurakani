"use client";
import { useRoom } from "@/contexts/RoomContext";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function AddRoomPanel({ hideAddRoomPanel }: any) {
  const [title, setTitle] = useState<string>("");
  const [id, setId] = useState<string>("");
  const { myRooms, setMyRooms } = useRoom();
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMyRooms([
      ...myRooms,
      {
        title,
        id,
      },
    ]);
    hideAddRoomPanel(true);
    router.replace("/chat/" + id);
  };

  return (
    <div className="flex absolute top-0 left-0 z-20 flex-col justify-center items-center px-6 py-8 mx-auto w-full h-screen backdrop-blur-sm lg:py-0">
      <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold tracking-tight leading-tight text-gray-900 md:text-2xl">
            Create or join room
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Room Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 focus:outline-none  text-gray-900 sm:text-sm rounded-lg border focus:border-primary block w-full p-2.5 "
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="roomId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Room ID
              </label>
              <input
                type="text"
                id="roomId"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="bg-gray-50  focus:outline-none text-gray-900 sm:text-sm rounded-lg border focus:border-primary block w-full p-2.5 "
                required={true}
              />
            </div>
            <button
              type="submit"
              className="px-5 pt-1 h-10 text-lg font-bold text-white rounded-full bg-primary hover:bg-secondary"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRoomPanel;
