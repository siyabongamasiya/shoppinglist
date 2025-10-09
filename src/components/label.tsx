"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import "../styles/components/label.css";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={["label", className || ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Label };
