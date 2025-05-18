import { useAuth } from '@/features/auth/hooks/use-auth';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user } = useAuth();

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <Outlet />
    </div>
  )
}
