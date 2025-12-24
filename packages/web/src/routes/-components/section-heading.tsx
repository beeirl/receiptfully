import { cn } from '@beeirl/ui/styles'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  highlight?: string
  className?: string
  centered?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  highlight,
  className,
  centered = true,
}: SectionHeadingProps) {
  const renderSubtitle = () => {
    if (!subtitle) return null

    if (highlight && subtitle.includes(highlight)) {
      const parts = subtitle.split(highlight)
      return (
        <>
          {parts[0]}
          <span className="font-medium text-gray-900">{highlight}</span>
          {parts[1]}
        </>
      )
    }

    return subtitle
  }

  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <span className="mb-3 block text-sm font-medium uppercase tracking-wide text-gray-500">{eyebrow}</span>
      )}
      <h2 className="mx-auto w-full max-w-xl text-balance text-2xl font-semibold leading-[1.2] tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-6 max-w-xl text-pretty text-sm leading-6 text-gray-600 sm:mt-8 sm:text-base sm:leading-7">
          {renderSubtitle()}
        </p>
      )}
    </div>
  )
}
