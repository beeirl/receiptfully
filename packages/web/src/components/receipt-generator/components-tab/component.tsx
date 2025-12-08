import { COMPONENT_META } from '@/components/receipt'
import { BarcodeComponent } from '@/components/receipt-generator/components-tab/barcode-component'
import { DateComponent } from '@/components/receipt-generator/components-tab/date-component'
import { ImageComponent } from '@/components/receipt-generator/components-tab/image-component'
import { LineItemsComponent } from '@/components/receipt-generator/components-tab/line-items-component'
import { PaymentComponent } from '@/components/receipt-generator/components-tab/payment-component'
import { SeparatorComponent } from '@/components/receipt-generator/components-tab/separator-component'
import { TextComponent } from '@/components/receipt-generator/components-tab/text-component'
import { IconButton } from '@beeirl/ui/icon-button'
import {
  BarcodeIcon,
  CalendarIcon,
  CartIcon,
  CashIcon,
  ChevronDownIcon,
  DragDropIcon,
  ImageIcon,
  MenuLeftIcon,
  MinusIcon,
  TrashIcon,
} from '@beeirl/ui/line-icons'
import { cn } from '@beeirl/ui/styles'
import { useSortable } from '@dnd-kit/react/sortable'
import type { ComponentType, ReceiptComponent } from '@receiptfully/core/receipt'
import * as React from 'react'

const COMPONENT_ICONS: Record<ComponentType, React.ReactNode> = {
  image: <ImageIcon className="size-4" />,
  text: <MenuLeftIcon className="size-4" />,
  date: <CalendarIcon className="size-4" />,
  separator: <MinusIcon className="size-4" />,
  barcode: <BarcodeIcon className="size-4" />,
  payment: <CashIcon className="size-4" />,
  line_items: <CartIcon className="size-4" />,
}

interface ComponentProps {
  component: ReceiptComponent
  index: number
  onUpdate: (component: ReceiptComponent) => void
  onRemove: () => void
}

export function Component({ component, index, onUpdate, onRemove }: ComponentProps) {
  const [expanded, setExpanded] = React.useState(false)
  const { ref, handleRef, isDragSource } = useSortable({ id: component.id, index })

  React.useLayoutEffect(() => {
    if (isDragSource) {
      setExpanded(false)
    }
  }, [isDragSource])

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
    <div ref={ref} className="rounded-lg-plus border border-gray-200 bg-white">
      <div className="flex items-center gap-2 px-2.5 py-3">
        <span ref={handleRef} className="cursor-grab text-gray-400 active:cursor-grabbing">
          <DragDropIcon className="size-3.5" />
        </span>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-gray-500">{icon}</span>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex flex-1 items-center gap-1 text-left"
          >
            <span className="text-sm font-medium text-gray-900">{meta.label}</span>
            <ChevronDownIcon className={cn('size-4 text-gray-400 transition-transform', expanded && 'rotate-180')} />
          </button>
        </div>
        <IconButton size="sm" color="gray" variant="ghost" className="mx-0" onClick={onRemove}>
          <TrashIcon className="text-gray-400 size-3.5!" />
        </IconButton>
      </div>
      {expanded && <div className="border-t border-gray-200 p-3">{renderFields()}</div>}
    </div>
  )
}
