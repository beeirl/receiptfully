import { cn } from '@beeirl/ui/styles'

interface SeparatorProps {
  className?: string
}

export function Separator({ className }: SeparatorProps) {
  return <hr className={cn('border-t border-gray-100', className)} />
}
