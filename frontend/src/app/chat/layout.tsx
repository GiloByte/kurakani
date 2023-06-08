import RoomSideBar from "@/components/Room/RoomSideBar";
import MessageProvider from "@/contexts/MessageContext";
import RoomProvider from "@/contexts/RoomContext";
import SocketProvider from "@/contexts/SocketContext";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoomProvider>
      <SocketProvider>
        <MessageProvider>
          <div className="flex h-screen">
            <RoomSideBar />
            {children}
          </div>
        </MessageProvider>
      </SocketProvider>
    </RoomProvider>
  );
}
