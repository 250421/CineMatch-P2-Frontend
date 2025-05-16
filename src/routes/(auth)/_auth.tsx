import { Navbar } from "@/components/shared/navbar";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { SidebarContainer } from "@/components/shared/sidebar/sidebar-container";
import { SidebarMainWrapper } from "@/components/shared/sidebar/sidebar-main-wrapper";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useGetFavoriteGenres } from "@/features/genres/hooks/use-get-favorite-genres";
import { createFileRoute, Navigate, Outlet, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/(auth)/_auth")({
  component: Auth,
});

function Auth() {
  const { data: user, isLoading } = useAuth();
  const { data: favoriteGenres, isLoading: isFavoriteGenresLoading } = useGetFavoriteGenres();
  const navigate = useNavigate();

  if(!isFavoriteGenresLoading && favoriteGenres?.filter(value => value !== null).length === 0) {
    navigate({ to: "/select-genres" });
  }

  if(isLoading || isFavoriteGenresLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin size-8" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <SidebarContainer>
      <Navbar />
      <AppSidebar />
      <SidebarMainWrapper>
        <main className="max-w-screen mx-auto w-11/12 py-10">
          <Outlet />
        </main>
      </SidebarMainWrapper>
    </SidebarContainer>
  );
}
