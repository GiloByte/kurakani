import React from "react";

function ChatImage({ imgURL }: { imgURL: string }) {
  return (
    <div className='w-36 sm:w-44 flex justify-center items-center'>
      <img src={imgURL} className='object-contain' />
    </div>
  );
}

export default ChatImage;
