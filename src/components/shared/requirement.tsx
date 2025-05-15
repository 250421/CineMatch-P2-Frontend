import React from 'react';
import { Check, X } from 'lucide-react'

interface RequirementProps {
  hasBoolean: boolean
  children: React.ReactNode
}

export const Requirement = ({ hasBoolean, children }: RequirementProps) => {
  return (
    <span className='flex flex-row gap-1'>
      { hasBoolean ? <Check className='text-green-400' data-testid="requirement-check" /> : <X className='text-red-400' /> }
      { children }
    </span>
  )
}
