"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import "../styles/components/separator.css";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={["separator", className || ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Separator };
