import { useState, useEffect } from "react";

function Toast({ message }: { message: string }) {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className='flex justify-center mb-1 fixed bottom-14 sm:bottom-16 left-1/2'>
      {isVisible && (
        <p className='text-sm sm:text-base max-w-fit p-1 px-3 bg-primary text-white rounded-lg items-center'>
          {message}
        </p>
      )}
    </div>
  );
}

export default Toast;
