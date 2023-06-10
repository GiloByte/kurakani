import IRoom from "@/interfaces/IRoom";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import Avatar from "react-avatar";

function RoomCard({ room, users }: { room: IRoom; users: string[] }) {
  const { roomId } = useParams();
  return (
    <Link
      href={`chat/${room.id}`}
      className={`flex gap-3 items-center p-2 flex-col sm:flex-row ${
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
      <div>
        <p className="font-medium line-clamp-1">{room.title}</p>
        <p className="text-sm text-slate-400">
          <span className="text-xs">🟢</span> {users.length} online
        </p>
      </div>
    </Link>
  );
}

export default RoomCard;
