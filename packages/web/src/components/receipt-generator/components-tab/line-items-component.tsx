import { Button } from '@beeirl/ui/button'
import { Field } from '@beeirl/ui/field'
import { IconButton } from '@beeirl/ui/icon-button'
import { PlusIcon, TrashIcon } from '@beeirl/ui/line-icons'
import { Slider } from '@beeirl/ui/slider'
import { TextInput } from '@beeirl/ui/text-input'
import type { LineItem, LineItemsComponent as LineItemsComponentSchema, TotalLine } from '@receiptfully/core/receipt'

interface LineItemsComponentProps {
  properties: LineItemsComponentSchema['properties']
  onChange: (properties: LineItemsComponentSchema['properties']) => void
}

export function LineItemsComponent({ properties, onChange }: LineItemsComponentProps) {
  const addItem = () => {
    const newItem: LineItem = {
      id: crypto.randomUUID(),
      quantity: 1,
      name: '',
      price: 0,
    }
    onChange({ ...properties, items: [...properties.items, newItem] })
  }

  const updateItem = (id: string, updates: Partial<LineItem>) => {
    onChange({
      ...properties,
      items: properties.items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    })
  }

  const removeItem = (id: string) => {
    onChange({
      ...properties,
      items: properties.items.filter((item) => item.id !== id),
    })
  }

  const addTotalLine = () => {
    const newLine: TotalLine = {
      id: crypto.randomUUID(),
      title: '',
      value: 0,
    }
    onChange({ ...properties, totalLines: [...properties.totalLines, newLine] })
  }

  const updateTotalLine = (id: string, updates: Partial<TotalLine>) => {
    onChange({
      ...properties,
      totalLines: properties.totalLines.map((line) => (line.id === id ? { ...line, ...updates } : line)),
    })
  }

  const removeTotalLine = (id: string) => {
    onChange({
      ...properties,
      totalLines: properties.totalLines.filter((line) => line.id !== id),
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Items */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[60px_1fr_80px_auto] gap-2 text-xs font-medium text-gray-500">
          <span>Quantity</span>
          <span>Item</span>
          <span>Total price</span>
          <span></span>
        </div>
        {properties.items.map((item) => (
          <div key={item.id} className="grid grid-cols-[60px_1fr_80px_auto] items-center gap-2">
            <TextInput
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value) || 0 })}
              size="sm"
            />
            <TextInput
              value={item.name}
              onChange={(e) => updateItem(item.id, { name: e.target.value })}
              placeholder="Item name"
              size="sm"
            />
            <TextInput
              value={item.price}
              onChange={(e) => updateItem(item.id, { price: parseFloat(e.target.value) || 0 })}
              size="sm"
            />
            <IconButton
              size="sm"
              color="gray"
              variant="ghost"
              className="mx-0 justify-self-end"
              onClick={() => removeItem(item.id)}
            >
              <TrashIcon />
            </IconButton>
          </div>
        ))}
        <Button size="sm" color="gray" variant="soft" className="w-full" onClick={addItem}>
          <PlusIcon />
          Add line
        </Button>
      </div>

      {/* Total Lines */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">Total Lines</span>
        <div className="grid grid-cols-[1fr_100px_auto] gap-2 text-xs font-medium text-gray-500">
          <span>Title</span>
          <span>Value</span>
          <span></span>
        </div>
        {properties.totalLines.map((line) => (
          <div key={line.id} className="grid grid-cols-[1fr_100px_auto] items-center gap-2">
            <TextInput
              value={line.title}
              onChange={(e) => updateTotalLine(line.id, { title: e.target.value })}
              placeholder="e.g., SubTotal:"
              size="sm"
            />
            <TextInput
              type="number"
              step="0.01"
              value={line.value}
              onChange={(e) =>
                updateTotalLine(line.id, {
                  value: parseFloat(e.target.value) || 0,
                })
              }
              size="sm"
            />
            <IconButton
              size="sm"
              color="gray"
              variant="ghost"
              className="mx-0 justify-self-end"
              onClick={() => removeTotalLine(line.id)}
            >
              <TrashIcon />
            </IconButton>
          </div>
        ))}
        <Button size="sm" color="gray" variant="soft" className="w-full" onClick={addTotalLine}>
          <PlusIcon />
          Add line
        </Button>
      </div>

      {/* Total */}
      <Field.Root size="sm">
        <Field.Label>Total</Field.Label>
        <Field.Control>
          <div className="grid grid-cols-[1fr_100px] gap-2">
            <TextInput value="Total:" disabled size="sm" />
            <TextInput
              type="number"
              step="0.01"
              value={properties.total}
              onChange={(e) => onChange({ ...properties, total: parseFloat(e.target.value) || 0 })}
              size="sm"
            />
          </div>
        </Field.Control>
      </Field.Root>

      {/* Total size increase */}
      <Field.Root size="sm">
        <Field.Label>Increase "Total" number size</Field.Label>
        <Field.Control>
          <Slider.Root
            value={properties.totalSizeIncrease}
            onValueChange={(value) =>
              onChange({
                ...properties,
                totalSizeIncrease: value as number,
              })
            }
            min={0}
            max={100}
            step={10}
          >
            <Slider.Control>
              <Slider.Track>
                <Slider.Indicator />
              </Slider.Track>
              <Slider.Thumb />
            </Slider.Control>
          </Slider.Root>
        </Field.Control>
      </Field.Root>
    </div>
  )
}
