import React from "react";

interface sidebarProps {
  children: React.ReactNode;
}

export const SidebarContent = ({ children }: sidebarProps) => {
  return <div>{children}</div>;
};
