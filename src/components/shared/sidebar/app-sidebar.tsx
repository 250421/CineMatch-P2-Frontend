import { SidebarGroup } from "./sidebar-group";
import { SidebarContent } from "./sidebar-content";
import { Sidebar } from "./sidebar";
import { SidebarItem } from "./sidebar-item";
import {  ChevronDown, Home, Settings } from "lucide-react";
import { useGetFavoriteGenres } from "@/features/genres/hooks/use-get-favorite-genres";
import { SidebarGenreItems } from "@/features/posts/components/sidebar-genre-items";
import { useGetBoard } from "@/features/boards/hooks/use-get-board";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const AppSidebar = () => {
    const { data: favoriteGenres, isLoading: isFavoriteGenresLoading } = useGetFavoriteGenres();
    const { data: boards, isLoading: isBoardsLoading } = useGetBoard();

    return (
        <Sidebar>
            <SidebarContent>
                <div className="hidden">
                    <SidebarGroup>
                        <SidebarItem label={"Dashboard"} icon={Home} href="/dashboard"/>
                        <SidebarItem label={"Settings"} icon={Settings} href="/settings"/>
                    </SidebarGroup>
                    <Separator className="bg-focus" />
                </div>
                <Collapsible className="group/collapsible">
                    <SidebarGroup>
                        <CollapsibleTrigger className="flex flex-row p-2 rounded-md cursor-pointer text-border-green hover:bg-focus hover:text-card-green3 font-medium">
                            GENRE BOARDS
                            <ChevronDown className="text-text-light ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="bg-card-green rounded-lg">
                            { (!isFavoriteGenresLoading || !isBoardsLoading) && favoriteGenres && boards ? 
                                <SidebarGenreItems
                                    favoriteGenres={ favoriteGenres }
                                    boards={ boards }
                                />
                            :
                                <></>
                            }
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
        </Sidebar>
    )
}