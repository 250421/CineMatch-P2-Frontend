import { Genre } from "@/features/genres/models/genres";
import { SidebarNoIconItem } from "@/components/shared/sidebar/sidebar-no-icon-item";

interface SidebarGenreItemProps {
  favoriteGenres: string[];
  genres: Genre[];
}

export const SidebarGenreItems = ({ favoriteGenres, genres }: SidebarGenreItemProps) => {    
  return (
    <>
      {
        favoriteGenres.map((genre, index) => {
          return (
            <SidebarNoIconItem
              label={ genre }
              href={ `/message-board/${genres?.find((g) => g.name === genre)?.id}` }
              key={ `${genre}-item-${index}` }
            />
          )
        })
      }
    </>
  );
};