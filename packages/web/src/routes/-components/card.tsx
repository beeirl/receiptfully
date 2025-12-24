import { cn } from '@beeirl/ui/styles'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn('relative flex w-full justify-center overflow-hidden rounded-xl', className)}
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #fafafa, #f5f5f5)',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }}
    >
      {children}
    </div>
  )
}
