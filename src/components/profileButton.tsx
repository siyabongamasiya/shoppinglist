import React from "react";

interface ProfileButtonProps {
  src: string;
  alt: string;
  text: string;
}

export default function ProfileButton({ src, alt, text }: ProfileButtonProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <img src={src} alt={alt} style={{ width: "40px", height: "40px" }} />
      <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{text}</span>
    </div>
  );
}
