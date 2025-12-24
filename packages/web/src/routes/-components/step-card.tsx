import { cn } from '@beeirl/ui/styles'
import { Card } from './card'

type StepColor = 'purple' | 'blue' | 'green'

interface StepCardProps {
  step: number
  title: string
  description: string
  icon: React.ReactNode
  color: StepColor
}

const colorClasses: Record<StepColor, { text: string; bg: string }> = {
  purple: { text: 'text-purple-600', bg: 'bg-purple-600' },
  blue: { text: 'text-blue-600', bg: 'bg-blue-600' },
  green: { text: 'text-green-600', bg: 'bg-green-600' },
}

export function StepCard({ step, title, description, icon, color }: StepCardProps) {
  const colors = colorClasses[color]
  const stepNumber = step.toString().padStart(2, '0')

  return (
    <Card className="group min-h-[360px] flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-gray-400 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-gray-400 to-transparent blur-3xl" />
      </div>

      {/* Dot grid decoration */}
      <div className="absolute right-6 top-6 grid grid-cols-3 gap-1.5 opacity-30">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 w-1.5 rounded-full transition-all duration-300',
              i % 3 === 0 ? colors.bg : 'bg-gray-300',
            )}
          />
        ))}
      </div>

      {/* Top accent line */}
      <div className={cn('absolute left-0 right-0 top-0 h-[2px] opacity-20', colors.bg)} />

      {/* Content */}
      <div className="relative flex flex-1 flex-col justify-between gap-6 p-6">
        {/* Step number */}
        <div className={cn('text-4xl font-bold opacity-10', colors.text)}>{stepNumber}</div>

        <div className="flex flex-col gap-4">
          {/* Icon with glow */}
          <div className="relative w-fit">
            <div className={cn('absolute inset-0 scale-150 rounded-full opacity-10 blur-xl', colors.bg)} />
            <div
              className={cn(
                'relative h-10 w-10 transition-all duration-300 ease-out group-hover:scale-110',
                colors.text,
              )}
            >
              {icon}
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2">
            <h4 className="text-base font-semibold text-gray-900">{title}</h4>
            <p className="text-balance text-sm text-gray-800">{description}</p>
          </div>
        </div>

        {/* Bottom accent bars */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
          <div className="flex gap-1">
            <div className={cn('h-0.5 w-12 rounded-full opacity-20', colors.bg)} />
            <div className={cn('h-0.5 w-6 rounded-full opacity-10', colors.bg)} />
            <div className={cn('h-0.5 w-3 rounded-full opacity-5', colors.bg)} />
          </div>
        </div>
      </div>
    </Card>
  )
}
