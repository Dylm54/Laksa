"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useLogout } from "@/app/hooks/useLogout";

export function LogoutButton({ children = "Sign Out", className, onClick, ...props }: ComponentProps<"button">) {
  const logout = useLogout();

  return (
    <button
      {...props}
      type="button"
      className={cn("w-full text-start text-red-600", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) void logout();
      }}
    >
      {children}
    </button>
  );
}
