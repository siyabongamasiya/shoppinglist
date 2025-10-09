import * as React from "react";
import "../styles/components/alert.css";

function Alert({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: "default" | "destructive" }) {
  const classes = [
    "alert",
    variant === "destructive" ? "alert--destructive" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-slot="alert" role="alert" className={classes} {...props} />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  const classes = ["alert__title", className || ""].filter(Boolean).join(" ");
  return <div data-slot="alert-title" className={classes} {...props} />;
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const classes = ["alert__description", className || ""].filter(Boolean).join(" ");
  return <div data-slot="alert-description" className={classes} {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
