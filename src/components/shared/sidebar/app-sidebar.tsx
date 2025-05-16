import { SidebarGroup } from "./sidebar-group";
import { SidebarContent } from "./sidebar-content";
import { Sidebar } from "./sidebar";
import { SidebarItem } from "./sidebar-item";
import {  Home, Settings } from "lucide-react";
import { useGetGenres } from "@/features/genres/hooks/use-get-genres";
import { useGetFavoriteGenres } from "@/features/genres/hooks/use-get-favorite-genres";
import { SidebarGenreItem } from "@/features/posts/components/SidebarGenreItem";

export const AppSidebar = () => {
    const { data: genres } = useGetGenres();
    const { data: favoriteGenres, isLoading: isFavoriteGenresLoading } = useGetFavoriteGenres();

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarItem label={"Dashboard"} icon={Home} href="/dashboard"/>
                    <SidebarItem label={"Settings"} icon={Settings} href="/settings"/>
                </SidebarGroup>
                <SidebarGroup>
                    { !isFavoriteGenresLoading && favoriteGenres && genres ? 
                        <SidebarGenreItem
                            favoriteGenres={favoriteGenres}
                            genres={genres}
                        />
                    :
                        <></>
                    }
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}