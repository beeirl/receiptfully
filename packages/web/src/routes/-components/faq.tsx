import { ChevronDownIcon } from '@beeirl/ui/line-icons'
import { cn } from '@beeirl/ui/styles'
import * as React from 'react'
import { Card } from './card'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Card className="mt-14 max-w-xl flex-col">
      <div className="flex flex-col divide-y divide-gray-100 text-left">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className={cn(
                  'flex w-full items-center justify-between px-6 py-4 transition-colors duration-200 hover:bg-gray-100',
                  isOpen && 'bg-gray-100',
                )}
              >
                <h3 className="text-left text-base font-medium text-gray-900 sm:text-lg">{item.question}</h3>
                <ChevronDownIcon
                  className={cn(
                    'h-6 w-6 shrink-0 text-gray-600 transition-transform duration-500',
                    isOpen && '-rotate-180',
                  )}
                />
              </button>
              {isOpen && <p className="px-6 py-4 text-pretty leading-7 text-gray-800">{item.answer}</p>}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
