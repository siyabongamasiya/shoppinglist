"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import "../styles/components/avatar.css";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={["avatar", className || ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={["avatar-image", className || ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={["avatar-fallback", className || ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
