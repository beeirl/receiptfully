import { ArrowRightCircleIcon } from '@beeirl/ui/solid-icons'
import { cn } from '@beeirl/ui/styles'
import { Link } from '@tanstack/react-router'

interface ButtonProps {
  to: string
  children: React.ReactNode
  className?: string
}

export function Button({ to, children, className }: ButtonProps) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800',
        className,
      )}
    >
      {children}
      <ArrowRightCircleIcon className="size-5" />
    </Link>
  )
}
