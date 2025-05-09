import { useAuth } from "@/features/auth/hooks/use-auth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/(auth)/_auth")({
  component: Auth,
});

function Auth() {
  const { data: user, isLoading } = useAuth();

  if(isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="p-2">
      <Outlet />
    </div>
  );
}
