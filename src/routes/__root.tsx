import { createRootRoute, Outlet } from '@tanstack/react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <div>
      <QueryClientProvider client={queryClient}>
        <div className='h-full min-h-screen bg-linear-to-t from-bg-green to-bg-blue'>
          <div className='top-0 left-0 bottom-0 right-0 w-full h-full min-h-screen bg-[url(assets/popcorn.svg)] bg-center bg-repeat bg-size-[100px] bg-blend-overlay'>
            <Outlet />
          </div>
        </div>
        <Toaster/>
      </QueryClientProvider>
    </div>
  ),
})