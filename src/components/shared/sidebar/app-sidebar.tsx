import { SidebarGroup } from "./sidebar-group";
import { SidebarContent } from "./sidebar-content";
import { Sidebar } from "./sidebar";
import { SidebarItem } from "./sidebar-item";
import {  Home, Settings } from "lucide-react";
import { useGetFavoriteGenres } from "@/features/genres/hooks/use-get-favorite-genres";
import { SidebarGenreItems } from "@/features/posts/components/sidebar-genre-items";
import { useGetBoard } from "@/features/boards/hooks/use-get-board";

export const AppSidebar = () => {
    const { data: favoriteGenres, isLoading: isFavoriteGenresLoading } = useGetFavoriteGenres();
    const { data: boards, isLoading: isBoardsLoading } = useGetBoard();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarItem label={"Dashboard"} icon={Home} href="/dashboard"/>
                    <SidebarItem label={"Settings"} icon={Settings} href="/settings"/>
                </SidebarGroup>
                <SidebarGroup>
                    { (!isFavoriteGenresLoading || !isBoardsLoading) && favoriteGenres && boards ? 
                        <SidebarGenreItems
                            favoriteGenres={ favoriteGenres }
                            boards={ boards }
                        />
                    :
                        <></>
                    }
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}