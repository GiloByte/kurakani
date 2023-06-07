"use client";
import RoomSideBar from "@/components/Room/RoomSideBar";
import RoomProvider from "@/contexts/RoomContext";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoomProvider>
      <div className="flex h-screen">
        <RoomSideBar />
        {/* <div className="h-screen"></div> */}
        {children}
        {/* <div className='w-1/4 h-screen border border-l-2'></div> */}
      </div>
    </RoomProvider>
  );
}
