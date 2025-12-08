import { DateInput } from '@beeirl/ui/date-input'
import { Field } from '@beeirl/ui/field'
import { Select } from '@beeirl/ui/select'
import type { Alignment, DateComponent as DateComponentSchema } from '@receiptfully/core/receipt'

interface DateComponentProps {
  properties: DateComponentSchema['properties']
  onChange: (properties: DateComponentSchema['properties']) => void
}

const ALIGNMENT_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
]

export function DateComponent({ properties, onChange }: DateComponentProps) {
  // Parse the date string to Date object for DateInput
  const dateValue = properties.value ? new Date(properties.value) : new Date()

  return (
    <div className="flex flex-col gap-3">
      <Field.Root size="sm">
        <Field.Label>Date</Field.Label>
        <Field.Control>
          <DateInput
            className="w-full"
            value={dateValue}
            onValueChange={(date) => {
              onChange({ ...properties, value: date.toLocaleString() })
            }}
          />
        </Field.Control>
      </Field.Root>

      <Field.Root size="sm">
        <Field.Label>Alignment</Field.Label>
        <Field.Control>
          <Select.Root
            items={Object.fromEntries(ALIGNMENT_OPTIONS.map((o) => [o.value, o.label]))}
            value={properties.alignment}
            onValueChange={(v) => onChange({ ...properties, alignment: v as Alignment })}
          >
            <Select.Trigger
              nativeButton
              render={
                <Select.InputButton className="w-full">
                  <Select.InputButtonValue />
                </Select.InputButton>
              }
            />
            <Select.Positioner>
              <Select.Popup>
                {ALIGNMENT_OPTIONS.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Popup>
            </Select.Positioner>
          </Select.Root>
        </Field.Control>
      </Field.Root>
    </div>
  )
}
