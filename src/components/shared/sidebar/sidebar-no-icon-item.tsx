import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

interface SidebarItemProps {
    label: string;
    href: string
}

export const SidebarNoIconItem = ({ label, href }: SidebarItemProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleClick() {
    queryClient.invalidateQueries().then(() => {
      queryClient.fetchQuery({ queryKey: ["posts"] });
      navigate({ to: href });
    });
  }

  return (
    <div>
      <Link to={ href }>
        <Button className="w-full flex justify-start" variant={ "ghost" } onClick={ handleClick }>
          { label }
        </Button>
      </Link>
    </div>
  );
};