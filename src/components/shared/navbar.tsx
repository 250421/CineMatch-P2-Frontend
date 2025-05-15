import { Plus } from 'lucide-react'
import { UserDropdown } from '../user-dropdown'
import { Button } from '../ui/button'
import { useNavigate } from '@tanstack/react-router'

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed z-10 w-full py-4 bg-sky-200 border-b">
        <div className="flex items-center justify-between max-w-screen ml-15 mr-8">
            <ul>
                <h1 className='text-3xl font-bond'>CinaMatch</h1>
            </ul>
            <ul>
              <div className="flex flex-row gap-4 items-center">
                <Button 
                  className="bg-green-500 hover:bg-green-600 rounded-full"
                  onClick={ () => navigate({ to: "/new-post" }) }
                >
                  <Plus /> Create
                </Button>
                <UserDropdown/>
              </div>
            </ul>
        </div>
    </nav>
  )
}
