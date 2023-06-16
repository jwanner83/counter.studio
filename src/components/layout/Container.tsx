import { ReactNode } from 'react'

type ContainerProps = {
  variant?: 'wide' | 'small' | 'default'
  children: ReactNode[] | ReactNode
  classes?: string
}

export default function Container ({ children, variant = 'default', classes = '' }: ContainerProps) {
  let max = 'max-w-[1000px]'

  switch (variant) {
    case 'wide':
      max = 'max-w-[1300px] px-12'
      break
    case 'small':
      max = 'max-w-[800px]'
  }

  return (
    <div className={`mx-auto px-8 w-full relative overflow-x-hidden md:overflow-x-visible ${max} ${classes}`}>
      {children}
    </div>
  )
}