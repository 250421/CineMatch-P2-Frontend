import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Authicated User!</div>;
}
