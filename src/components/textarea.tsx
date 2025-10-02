import * as React from "react";
import "../styles/components/textarea.css";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={["textarea", className || ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Textarea };
