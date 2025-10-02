import "../styles/components/skeleton.css";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={["skeleton", className || ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export { Skeleton };
