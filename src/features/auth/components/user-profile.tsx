import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '../hooks/use-auth';
import { Loader2 } from 'lucide-react';

export const UserProfile = () => {
  const { data: user, isLoading } = useAuth();

  if(isLoading) {
    return <Loader2 className='animate-spin' />
  }

  function getInitials(name: string) {
    if(name.length > 1)
      return (name[0] + name[1]).toUpperCase();
    return "AN";
  }

  return (
    <Avatar>
      <AvatarFallback>{ getInitials(user?.username ?? "") }</AvatarFallback>
    </Avatar>
  )
}
