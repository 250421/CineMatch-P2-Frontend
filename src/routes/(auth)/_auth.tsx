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
    <div className="p-2">
      <Outlet />
    </div>
  );
}
