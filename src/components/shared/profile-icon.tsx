import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface ProfileIconProps {
  name: string;
}

export const ProfileIcon = ({ name }: ProfileIconProps) => {
  function getInitials(name: string) {
    return (name[0] + name[1]).toUpperCase();
  }

  return (
    <Avatar>
      <AvatarFallback className="bg-slate-200">{ getInitials(name) }</AvatarFallback>
    </Avatar>
  )
}