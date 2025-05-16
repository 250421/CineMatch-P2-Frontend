import { Genre } from "@/features/genres/models/genres";
import { SidebarNoIconItem } from "@/components/shared/sidebar/sidebar-no-icon-item";

interface SidebarGenreItemProps {
  favoriteGenres: string[];
  genres: Genre[];
}

export const SidebarGenreItem = ({ favoriteGenres, genres }: SidebarGenreItemProps) => {    
  return (
    <>
      {
        favoriteGenres.map((genre) => {
          return (
            <SidebarNoIconItem
              label={ genre }
              href={ `/message-board/${genres?.find((g) => g.name === genre)?.id}` }
            />
          )
        })
      }
    </>
  );
};