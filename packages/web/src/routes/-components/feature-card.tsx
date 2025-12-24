import { cn } from '@beeirl/ui/styles'
import { Card } from './card'

type FeatureColor = 'purple' | 'blue' | 'green' | 'rose'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: FeatureColor
}

const colorClasses: Record<FeatureColor, string> = {
  purple: 'text-purple-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
  rose: 'text-rose-600',
}

export function FeatureCard({ title, description, icon, color }: FeatureCardProps) {
  const textColor = colorClasses[color]

  return (
    <Card className="group flex-col">
      <div className="flex flex-1 flex-col justify-between gap-3 p-6">
        <div className="aspect-[4/1] md:aspect-[4/1]">
          <div
            className={cn(
              'h-8 w-8 transition-transform duration-300 ease-out group-hover:scale-110 md:h-10 md:w-10',
              textColor,
            )}
          >
            {icon}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="flex items-center text-base font-semibold text-gray-900">{title}</h4>
          <p className="max-w-md text-balance text-sm text-gray-800">{description}</p>
        </div>
      </div>
    </Card>
  )
}
