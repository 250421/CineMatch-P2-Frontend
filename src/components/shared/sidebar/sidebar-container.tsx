import { useSidebarJotai } from "@/hooks/use-sidebarJotai";
import React from "react";

interface sidebarContainerProps {
  children: React.ReactNode;
}

export const SidebarContainer = ({ children }: sidebarContainerProps) => {
  const { mounted } = useSidebarJotai();
  if (!mounted) return null;

  return <div>{children}</div>;
};
