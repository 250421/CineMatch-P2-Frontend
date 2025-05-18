import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
    label: string;
    icon: LucideIcon;
    href: string
}

export const SidebarItem = ({ label, icon: Icon, href }: SidebarItemProps) => {
    return (
        <div>
            <Link to={href}>
            <Button className="w-full flex justify-start text-base text-text-light hover:bg-focus cursor-pointer" variant={"ghost"}>
                <Icon className="size-6 mr-2" />
                {label}
            </Button>
            </Link>
        </div>
    );
};
