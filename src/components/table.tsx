"use client";

import * as React from "react";
import "../styles/components/table.css";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="table-container">
      <table
        data-slot="table"
        className={["table", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={["table-header", className || ""].filter(Boolean).join(" ")} {...props} />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody data-slot="table-body" className={["table-body", className || ""].filter(Boolean).join(" ")} {...props} />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot data-slot="table-footer" className={["table-footer", className || ""].filter(Boolean).join(" ")} {...props} />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr data-slot="table-row" className={["table-row", className || ""].filter(Boolean).join(" ")} {...props} />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th data-slot="table-head" className={["table-head", className || ""].filter(Boolean).join(" ")} {...props} />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td data-slot="table-cell" className={["table-cell", className || ""].filter(Boolean).join(" ")} {...props} />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption data-slot="table-caption" className={["table-caption", className || ""].filter(Boolean).join(" ")} {...props} />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
