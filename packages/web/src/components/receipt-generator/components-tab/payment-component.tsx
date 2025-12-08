import { Button } from '@beeirl/ui/button'
import { IconButton } from '@beeirl/ui/icon-button'
import { PlusIcon, TrashIcon } from '@beeirl/ui/line-icons'
import { Tabs } from '@beeirl/ui/tabs'
import { TextInput } from '@beeirl/ui/text-input'
import type { PaymentComponent as PaymentComponentSchema, PaymentField } from '@receiptfully/core/receipt'

interface PaymentComponentProps {
  properties: PaymentComponentSchema['properties']
  onChange: (properties: PaymentComponentSchema['properties']) => void
}

const getDefaultCashFields = (): PaymentField[] => [
  { id: crypto.randomUUID(), title: 'Cash', value: '88.23' },
  { id: crypto.randomUUID(), title: 'Change', value: '0.00' },
]

const getDefaultCardFields = (): PaymentField[] => [
  { id: crypto.randomUUID(), title: 'Card number', value: '**** **** **** 4922' },
  { id: crypto.randomUUID(), title: 'Card type', value: 'Debit' },
  { id: crypto.randomUUID(), title: 'Card entry', value: 'Chip' },
  { id: crypto.randomUUID(), title: 'Date/time', value: '11/20/2019 11:09 AM' },
  { id: crypto.randomUUID(), title: 'Reference #', value: '6284528926024624068SC' },
  { id: crypto.randomUUID(), title: 'Status', value: 'APPROVED' },
]

export function PaymentComponent({ properties, onChange }: PaymentComponentProps) {
  const addField = () => {
    const newField: PaymentField = {
      id: crypto.randomUUID(),
      title: '',
      value: '',
    }
    onChange({ ...properties, fields: [...properties.fields, newField] })
  }

  const updateField = (id: string, updates: Partial<PaymentField>) => {
    onChange({
      ...properties,
      fields: properties.fields.map((field) => (field.id === id ? { ...field, ...updates } : field)),
    })
  }

  const removeField = (id: string) => {
    onChange({
      ...properties,
      fields: properties.fields.filter((field) => field.id !== id),
    })
  }

  const handleModeChange = (mode: 'cash' | 'card') => {
    const defaultFields = mode === 'cash' ? getDefaultCashFields() : getDefaultCardFields()
    onChange({ ...properties, mode, fields: defaultFields })
  }

  return (
    <div className="flex flex-col gap-3">
      <Tabs.Root
        value={properties.mode}
        onValueChange={(value) => handleModeChange(value as 'cash' | 'card')}
        variant="surface"
      >
        <Tabs.List className="w-full">
          <Tabs.Tab value="cash" className="flex-1">
            Cash
          </Tabs.Tab>
          <Tabs.Tab value="card" className="flex-1">
            Card
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.Root>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_1fr_32px] gap-2 text-xs font-medium text-gray-500">
          <span>Title</span>
          <span>Value</span>
          <span></span>
        </div>
        {properties.fields.map((field) => (
          <div key={field.id} className="grid grid-cols-[1fr_1fr_32px] items-center gap-2">
            <TextInput
              value={field.title}
              onChange={(e) => updateField(field.id, { title: e.target.value })}
              placeholder="Field name"
              size="sm"
            />
            <TextInput
              value={field.value}
              onChange={(e) => updateField(field.id, { value: e.target.value })}
              placeholder="Value"
              size="sm"
            />
            <IconButton size="sm" color="gray" variant="ghost" className="mx-0" onClick={() => removeField(field.id)}>
              <TrashIcon />
            </IconButton>
          </div>
        ))}
        <Button size="sm" color="gray" variant="soft" className="w-full" onClick={addField}>
          <PlusIcon />
          Add line
        </Button>
      </div>
    </div>
  )
}
