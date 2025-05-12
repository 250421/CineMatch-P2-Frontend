import { SidebarGroup } from "./sidebar-group";
import { SidebarContent } from "./sidebar-content";
import { Sidebar } from "./sidebar";
import { SidebarItem } from "./sidebar-item";
import {  Home, Settings } from "lucide-react";

export const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarItem label={"Dashboard"} icon={Home} href="/dashboard"/>
                    <SidebarItem label={"Settings"} icon={Settings} href="/settings"/>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}