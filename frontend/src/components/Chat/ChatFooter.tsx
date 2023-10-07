import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import React, { useRef, useState } from "react";
import { AiFillPlusCircle, AiFillLike } from "react-icons/ai";
import { BsImage, BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

function ChatFooter({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState<string>("");
  const { socket } = useSocket();
  const { username } = useUser();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const inputRef = useRef<any | null>(null);

  const onEmojiPick = (emojiObj: any) => {
    setMessage((prevInput) => prevInput + emojiObj.emoji);
    inputRef.current.focus();
    setShowEmojiPicker(false);
  };

  const handleSendMessage = (e: any, message: string) => {
    e.preventDefault();
    if (message.trim()) {
      socket?.emit("send_message", {
        text: message,
        name: username,
        time: new Date(),
        socketId: socket.id,
        roomId: roomId,
      });
    }
    setMessage("");
  };

  const handleTyping = () => {
    socket?.emit("typing", message ? username + " is typing ..." : "");
  };

  return (
    <div className="basis-[8%] border-t-2 p-2 flex items-center gap-4">
      {message.length === 0 && (
        <>
          <AiFillPlusCircle size={20} className="cursor-pointer text-primary" />
          <BsImage size={20} className="cursor-pointer text-primary" />
        </>
      )}
      <div className="relative w-full ">
        <div className="absolute -right-8 sm:right-0 bottom-12 ">
          {showEmojiPicker && (
            <Picker
              onEmojiClick={onEmojiPick}
              previewConfig={{ showPreview: false }}
            />
          )}
        </div>
        <BsEmojiSmileFill
          size={20}
          className="cursor-pointer absolute top-[6px] right-2 text-primary "
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />

        <form onSubmit={(e) => handleSendMessage(e, message)}>
          <input
            ref={inputRef}
            type="text"
            value={message}
            className="w-full h-8 p-2 transition-all bg-gray-100 rounded-full focus:outline-none dark:text-black"
            placeholder="Aa"
            onKeyUp={handleTyping}
            onChange={(e) => {
              setMessage(e.target.value), setShowEmojiPicker(false);
            }}
          />
        </form>
      </div>
      {message.length === 0 ? (
        <AiFillLike
          size={28}
          className="cursor-pointer text-primary"
          onClick={(e) => handleSendMessage(e, "👍")}
        />
      ) : (
        <IoMdSend
          size={28}
          className="cursor-pointer text-primary"
          onClick={(e) => handleSendMessage(e, message)}
        />
      )}
    </div>
  );
}

export default ChatFooter;
