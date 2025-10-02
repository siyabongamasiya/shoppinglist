"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import "../styles/components/dropdown-menu.css";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={["dropdown-menu-content", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  }) {
    return (
      <DropdownMenuPrimitive.Item
        data-slot="dropdown-menu-item"
        data-inset={inset}
        data-variant={variant}
        className={["dropdown-menu-item", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
    return (
      <DropdownMenuPrimitive.CheckboxItem
        data-slot="dropdown-menu-checkbox-item"
        className={["dropdown-menu-checkbox-item", className || ""].filter(Boolean).join(" ")}
        checked={checked}
        {...props}
      >
        <span className="indicator">
          <DropdownMenuPrimitive.ItemIndicator>
            <CheckIcon />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.CheckboxItem>
    );
  }

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
    return (
      <DropdownMenuPrimitive.RadioItem
        data-slot="dropdown-menu-radio-item"
        className={["dropdown-menu-radio-item", className || ""].filter(Boolean).join(" ")}
        {...props}
      >
        <span className="indicator">
          <DropdownMenuPrimitive.ItemIndicator>
            <CircleIcon />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.RadioItem>
    );
  }

function DropdownMenuLabel({
  className,
  inset,
  ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }) {
    return (
      <DropdownMenuPrimitive.Label
        data-slot="dropdown-menu-label"
        data-inset={inset}
        className={["dropdown-menu-label", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

function DropdownMenuSeparator({
  className,
  ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
    return (
      <DropdownMenuPrimitive.Separator
        data-slot="dropdown-menu-separator"
        className={["dropdown-menu-separator", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

function DropdownMenuShortcut({
  className,
  ...props
  }: React.ComponentProps<"span">) {
    return (
      <span
        data-slot="dropdown-menu-shortcut"
        className={["dropdown-menu-shortcut", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }) {
    return (
      <DropdownMenuPrimitive.SubTrigger
        data-slot="dropdown-menu-sub-trigger"
        data-inset={inset}
        className={["dropdown-menu-sub-trigger", className || ""].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
        <span style={{ marginLeft: "auto" }}><ChevronRightIcon /></span>
      </DropdownMenuPrimitive.SubTrigger>
    );
  }

function DropdownMenuSubContent({
  className,
  ...props
  }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
    return (
      <DropdownMenuPrimitive.SubContent
        data-slot="dropdown-menu-sub-content"
        className={["dropdown-menu-sub-content", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
