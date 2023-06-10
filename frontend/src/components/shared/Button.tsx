import React from "react";

function Button({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="px-5 pt-1 h-10 text-lg font-bold text-white rounded-full bg-primary hover:bg-secondary"
    >
      {text}
    </button>
  );
}

export default Button;
