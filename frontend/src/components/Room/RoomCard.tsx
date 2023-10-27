"use client";
import { useRoom } from "@/contexts/RoomContext";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import IRoom from "@/interfaces/IRoom";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Avatar from "react-avatar";
import { ImExit } from "react-icons/im";

function RoomCard({ room, users }: { room: IRoom; users: string[] }) {
  const { roomId } = useParams();
  const { myRooms, setMyRooms } = useRoom();
  const { socket } = useSocket();
  const { username } = useUser();
  const router = useRouter();

  return (
    <Link
      href={`chat/${room.id}`}
      className={`flex group relative gap-3 items-center p-2 flex-col sm:flex-row ${
        room.id === roomId ? "bg-gray-100" : ""
      }`}
    >
      <div>
        {room.id === "1" ? (
          <Image
            src="/images/globe.jpg"
            height={50}
            width={50}
            style={{
              objectFit: "cover",
              height: 50,
              width: 50,
              borderRadius: 50,
            }}
            alt="profile"
          />
        ) : (
          <Avatar
            name={room.title}
            round={true}
            size="50"
            className="text-sm"
          />
        )}
      </div>
      <div className="hidden sm:block">
        <p className="font-medium line-clamp-1">{room.title}</p>
        <p className="text-sm text-slate-400">
          <span className="text-xs">🟢</span> {users.length} online
        </p>
      </div>
      {room.id !== "1" && (
        <span
          className="hidden absolute right-3 justify-center items-center p-2 bg-red-500 rounded-full group-hover:flex hover:bg-red-700"
          onClick={(e) => {
            setMyRooms(myRooms.filter((r) => r.id != room.id));
            // removing user from the room in server UsersState
            socket?.emit("leave_room", { username, roomId: room.id });
            e.preventDefault();
            // moving user out of the chat
            router.push("/chat");
          }}
        >
          <ImExit className="text-white" />
        </span>
      )}
    </Link>
  );
}

export default RoomCard;
