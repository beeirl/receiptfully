import { Field } from '@beeirl/ui/field'
import { Select } from '@beeirl/ui/select'
import { TextArea } from '@beeirl/ui/text-area'
import type { Alignment, TextComponent as TextComponentSchema } from '@receiptfully/core/receipt'

interface TextComponentProps {
  properties: TextComponentSchema['properties']
  onChange: (properties: TextComponentSchema['properties']) => void
}

const ALIGNMENT_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
]

export function TextComponent({ properties, onChange }: TextComponentProps) {
  return (
    <div className="flex flex-col gap-3">
      <Field.Root size="sm">
        <Field.Label>Content</Field.Label>
        <Field.Control>
          <TextArea
            className="w-full"
            value={properties.content}
            onChange={(e) => onChange({ ...properties, content: e.target.value })}
            placeholder="Enter text..."
            rows={3}
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
