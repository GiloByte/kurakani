import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import React, { useRef, useState } from "react";
import { AiFillPlusCircle, AiFillLike } from "react-icons/ai";
import { BsImage, BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend, IoMdCloseCircle } from "react-icons/io";
import Picker from "emoji-picker-react";
import Toast from "../shared/Toast";

function ChatFooter({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState<string>("");
  const { socket } = useSocket();
  const { username } = useUser();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const inputRef = useRef<any | null>(null);
  const fileRef = useRef<any | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>("")

  const onEmojiPick = (emojiObj: any) => {
    setMessage((prevInput) => prevInput + emojiObj.emoji);
    inputRef.current.focus();
    setShowEmojiPicker(false);
  };

  const handleSendMessage = (e: any, message: string) => {
    e.preventDefault();
    if (message.trim() || image) {
      socket?.emit("send_message", {
        text: message,
        name: username,
        time: new Date(),
        socketId: socket.id,
        roomId: roomId,
        image,
      });
    }
    setMessage("");
    setImage(null);
  };

  const handleTyping = () => {
    socket?.emit("typing", message ? username + " is typing ..." : "");
  };

  const handleImageErrors = (e: any) => {
    const data = e.target.files[0];
    if (data.size > 1e7 || data.type.split("/")[0] !== "image"){
      data.size > 1e7 ? setToastMessage("Image size should not exceed 10 MB") : setToastMessage("Please use a valid image format")
      e.target.value = "";
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1500)
      return true
    };
    return false
  };

  const handleImageUpload = (e: any) => {
    setImage(null);
    const data = e.target.files[0];
    if(handleImageErrors(e)) return
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64 = reader.result as string
      setImage(base64);
      e.target.value = "";
    };
    reader.readAsDataURL(data);
  };

  return (
    <>
    {
      showToast && <Toast message={toastMessage}/>
    }
    { image &&
      <div className="relative border border-primary rounded-lg max-w-[6rem] h-24 ml-4 mb-1">
        <IoMdCloseCircle size={20} className="absolute -right-2 -top-2 text-xs cursor-pointer text-red-600" onClick={() => setImage(null)}/>
        <img src={image} className="w-full h-full object-contain"/>
      </div>
    }
    <div className="basis-[8%] border-t-2 p-2 flex items-center gap-4 border-gray dark:border-gray-800">
      {message.length === 0 && (
        <>
          <AiFillPlusCircle size={20} className="cursor-pointer text-primary" />
          <BsImage
            size={20}
            className="cursor-pointer text-primary"
            onClick={() => fileRef.current.click()}
          />
          <input
            type="file"
            name="image" 
            ref={fileRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </>
      )}
      <div className="relative w-full">
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
          className="cursor-pointer absolute top-[6px] right-2 text-primary"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />

        <form onSubmit={(e) => handleSendMessage(e, message)}>
          <input
            ref={inputRef}
            type="text"
            value={message}
            className="text-black w-full h-8 p-2 transition-all bg-gray-100 rounded-full focus:outline-none"
            placeholder="Aa"
            onKeyUp={handleTyping}
            onChange={(e) => {
              setMessage(e.target.value), setShowEmojiPicker(false);
            }}
          />
        </form>
      </div>
      {message.length === 0 && !image ? (
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
    </>
  );
}

export default ChatFooter;
