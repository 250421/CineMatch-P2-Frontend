import { SidebarNoIconItem } from "@/components/shared/sidebar/sidebar-no-icon-item";
import { Board } from "@/features/boards/models/board";

interface SidebarGenreItemProps {
  favoriteGenres: string[];
  boards: Board[];
}

export const SidebarGenreItems = ({ favoriteGenres, boards }: SidebarGenreItemProps) => {
  return (
    <>
      {
        favoriteGenres.map((genre, index) => {
          return (
            <SidebarNoIconItem
              label={ genre }
              href={ `/message-board/${boards?.find((board) => board.name === genre)?.id}` }
              key={ `${genre}-item-${index}` }
            />
          )
        })
      }
    </>
  );
};