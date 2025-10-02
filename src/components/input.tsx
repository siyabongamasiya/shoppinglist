import * as React from "react";
import "../styles/components/input.css";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={["input", className || ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Input };
