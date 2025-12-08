import { COMPONENT_META } from '@/components/receipt'
import { BarcodeComponent } from '@/components/receipt-generator/components-tab/barcode-component'
import { DateComponent } from '@/components/receipt-generator/components-tab/date-component'
import { ImageComponent } from '@/components/receipt-generator/components-tab/image-component'
import { LineItemsComponent } from '@/components/receipt-generator/components-tab/line-items-component'
import { PaymentComponent } from '@/components/receipt-generator/components-tab/payment-component'
import { SeparatorComponent } from '@/components/receipt-generator/components-tab/separator-component'
import { TextComponent } from '@/components/receipt-generator/components-tab/text-component'
import { BlocksIcon, ClockIcon, FileTextIcon, MessageTextSquareIcon } from '@beeirl/ui/duotone-icons'
import { IconButton } from '@beeirl/ui/icon-button'
import { ChevronDownIcon, MenuLeftIcon, TrashIcon } from '@beeirl/ui/line-icons'
import { cn } from '@beeirl/ui/styles'
import { useSortable } from '@dnd-kit/react/sortable'
import type { ComponentType, ReceiptComponent } from '@receiptfully/core/receipt'
import { useState } from 'react'

const COMPONENT_ICONS: Record<ComponentType, React.ReactNode> = {
  image: <BlocksIcon className="size-4" />,
  text: <MessageTextSquareIcon className="size-4" />,
  date: <ClockIcon className="size-4" />,
  separator: <FileTextIcon className="size-4" />,
  barcode: <FileTextIcon className="size-4" />,
  payment: <FileTextIcon className="size-4" />,
  line_items: <FileTextIcon className="size-4" />,
}

interface ComponentProps {
  component: ReceiptComponent
  index: number
  onUpdate: (component: ReceiptComponent) => void
  onRemove: () => void
}

export function Component({ component, index, onUpdate, onRemove }: ComponentProps) {
  const [expanded, setExpanded] = useState(false)
  const { ref, handleRef, isDragging } = useSortable({ id: component.id, index })

  const meta = COMPONENT_META[component.type]
  const icon = COMPONENT_ICONS[component.type]

  const renderFields = () => {
    switch (component.type) {
      case 'image':
        return (
          <ImageComponent
            properties={component.properties}
            onChange={(properties) => onUpdate({ ...component, properties })}
          />
        )
      case 'text':
        return (
          <TextComponent
            properties={component.properties}
            onChange={(properties) => onUpdate({ ...component, properties })}
          />
        )
      case 'date':
        return (
          <DateComponent
            properties={component.properties}
            onChange={(properties) => onUpdate({ ...component, properties })}
          />
        )
      case 'separator':
        return (
          <SeparatorComponent
            properties={component.properties}
            onChange={(properties) => onUpdate({ ...component, properties })}
          />
        )
      case 'barcode':
        return (
          <BarcodeComponent
            properties={component.properties}
            onChange={(properties) => onUpdate({ ...component, properties })}
          />
        )
      case 'payment':
        return (
          <PaymentComponent
            properties={component.properties}
            onChange={(properties) => onUpdate({ ...component, properties })}
          />
        )
      case 'line_items':
        return (
          <LineItemsComponent
            properties={component.properties}
            onChange={(properties) => onUpdate({ ...component, properties })}
          />
        )
      default:
        return null
    }
  }

  return (
    <div ref={ref} className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center gap-2 p-3">
        <span ref={handleRef} className="cursor-grab text-gray-400 active:cursor-grabbing">
          <MenuLeftIcon className="size-4" />
        </span>
        <span className="text-gray-500">{icon}</span>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex flex-1 items-center gap-1 text-left"
        >
          <span className="text-sm font-medium text-gray-900">{meta.label}</span>
          <ChevronDownIcon className={cn('size-4 text-gray-400 transition-transform', expanded && 'rotate-180')} />
        </button>
        <IconButton size="sm" color="gray" variant="ghost" className="mx-0" onClick={onRemove}>
          <TrashIcon />
        </IconButton>
      </div>
      {expanded && !isDragging && <div className="border-t border-gray-100 p-3">{renderFields()}</div>}
    </div>
  )
}
