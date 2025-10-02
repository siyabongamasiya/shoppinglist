import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import "../styles/components/navigation-menu.css";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
  }) {
    return (
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        data-viewport={viewport}
        className={["navigation-menu", className || ""].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
        {viewport && <NavigationMenuViewport />}
      </NavigationMenuPrimitive.Root>
    );
  }

function NavigationMenuList({
  className,
  ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
    return (
      <NavigationMenuPrimitive.List
        data-slot="navigation-menu-list"
        className={["navigation-menu-list", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

function NavigationMenuItem({
  className,
  ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
    return (
      <NavigationMenuPrimitive.Item
        data-slot="navigation-menu-item"
        className={["navigation-menu-item", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

function NavigationMenuTrigger({
  className,
  children,
  ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
    return (
      <NavigationMenuPrimitive.Trigger
        data-slot="navigation-menu-trigger"
        className={["navigation-menu-trigger", className || ""].filter(Boolean).join(" ")}
        {...props}
      >
        {children}{" "}
        <ChevronDownIcon
          className="navigation-menu-trigger__chevron"
          aria-hidden="true"
        />
      </NavigationMenuPrimitive.Trigger>
    );
  }

function NavigationMenuContent({
  className,
  ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
    return (
      <NavigationMenuPrimitive.Content
        data-slot="navigation-menu-content"
        className={["navigation-menu-content", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

function NavigationMenuViewport({
  className,
  ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
    return (
    <div className="navigation-menu-viewport-wrap">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={["navigation-menu-viewport", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    </div>
    );
  }

function NavigationMenuLink({
  className,
  ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
    return (
      <NavigationMenuPrimitive.Link
        data-slot="navigation-menu-link"
        className={["navigation-menu-link", className || ""].filter(Boolean).join(" ")}
        {...props}
      />
    );
  }

function NavigationMenuIndicator({
  className,
  ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
    return (
      <NavigationMenuPrimitive.Indicator
        data-slot="navigation-menu-indicator"
        className={["navigation-menu-indicator", className || ""].filter(Boolean).join(" ")}
        {...props}
      >
        <div className="navigation-menu-indicator__tip" />
      </NavigationMenuPrimitive.Indicator>
    );
  }

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
