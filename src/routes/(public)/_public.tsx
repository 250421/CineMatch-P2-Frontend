import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Outlet />
    </div>
  )
}
