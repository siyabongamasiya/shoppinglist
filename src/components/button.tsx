import * as React from "react";
import "../styles/components/button.css";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

function buttonVariants({
  variant = "default",
  size = "default",
  className = "",
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string }) {
  const classes = [
    "button",
    `button--${variant}`,
    `button--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return classes;
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      data-slot="button"
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Button, buttonVariants };
