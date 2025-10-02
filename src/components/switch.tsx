"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import "../styles/components/switch.css";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={["switch", className || ""].filter(Boolean).join(" ")}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="switch__thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
