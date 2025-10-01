import React from "react";
import { FaPlus } from "react-icons/fa";

interface ButtonProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  style: React.CSSProperties;
}

export default function Button({ text, onClick, icon, style }: ButtonProps) {
  return (
    <div id="button-container" >
      {icon}
      <button
        onClick={onClick}
        style={style}
      >
        {text}
      </button>
    </div>
  );
}
