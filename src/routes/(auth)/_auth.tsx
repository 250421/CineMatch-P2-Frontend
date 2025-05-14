import { CommentBox } from "@/components/comments/comment-box";
import { Navbar } from "@/components/shared/navbar";
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { SidebarContainer } from "@/components/shared/sidebar/sidebar-container";
import { SidebarMainWrapper } from "@/components/shared/sidebar/sidebar-main-wrapper";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth")({
  component: Auth,
});

function Auth() {
  const { data: user } = useAuth();

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <SidebarContainer>
      <AppSidebar />
      <SidebarMainWrapper>
        <Navbar />
        <main className="max-w-screen mx-auto w-11/12 py-10">
          <Outlet />
          <h3>This is auth</h3>
          <CommentBox postId={1}/>
          {/* <CommentList postId="1"/> */}
        </main>
      </SidebarMainWrapper>
    </SidebarContainer>
  );
}
