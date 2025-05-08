import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth')({
  component: Auth,
})

function Auth() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}