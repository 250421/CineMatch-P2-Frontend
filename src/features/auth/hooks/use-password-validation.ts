import { useMemo } from 'react'

export const usePasswordValidation= (password: string) => {
    const hasLowerCase = useMemo(() => { 
      const regex = /(?=.*[a-z])/
      return regex.test(password);
     }, [password])

     const hasUpperCase = useMemo(() => { 
      const regex = /(?=.*[A-Z])/
      return regex.test(password);
     }, [password])

     const hasNumber = useMemo(() => { 
      const regex = /(?=.*[0-9])/
      return regex.test(password);
     }, [password])

     const hasSpecialCharacter = useMemo(() => { 
      const regex = /(?=.*[@#$%^&+=])/
      return regex.test(password);
     }, [password])

     return { hasLowerCase, hasUpperCase, hasNumber, hasSpecialCharacter }
}
