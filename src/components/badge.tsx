import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import "../styles/components/badge.css";

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & { variant?: "default" | "secondary" | "destructive" | "outline"; asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={["badge", className || ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Badge };
