"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import "../styles/components/toggle.css";

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={["toggle", className || ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Toggle };
