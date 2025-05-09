import { UserDropdown } from '../user-dropdown'

export const Navbar = () => {
  return (
    <nav className="py-4 bg-sky-200 border-b">
        <div className="flex items-center justify-between max-w-screen mx-auto w-11/12">
            <ul>
                <h1 className='text-3xl font-bond'>CinaMatch</h1>
            </ul>
            <ul>
                <UserDropdown/>
            </ul>
        </div>
    </nav>
  )
}
