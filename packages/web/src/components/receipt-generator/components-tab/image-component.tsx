import { Field } from '@beeirl/ui/field'
import { Select } from '@beeirl/ui/select'
import { Slider } from '@beeirl/ui/slider'
import { TextInput } from '@beeirl/ui/text-input'
import type { Alignment, ImageComponent as ImageComponentSchema } from '@receiptfully/core/receipt'

interface ImageComponentProps {
  properties: ImageComponentSchema['properties']
  onChange: (properties: ImageComponentSchema['properties']) => void
}

const ALIGNMENT_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
]

export function ImageComponent({ properties, onChange }: ImageComponentProps) {
  return (
    <div className="flex flex-col gap-3">
      <Field.Root size="sm">
        <Field.Label>Image URL</Field.Label>
        <Field.Control>
          <TextInput
            className="w-full"
            value={properties.url}
            onChange={(e) => onChange({ ...properties, url: e.target.value })}
            placeholder="Enter image URL..."
          />
        </Field.Control>
      </Field.Root>

      {properties.url && (
        <Field.Root size="sm">
          <Field.Label>Size</Field.Label>
          <Field.Control>
            <Slider.Root
              value={properties.size}
              onValueChange={(value) => onChange({ ...properties, size: value as number })}
              min={10}
              max={100}
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
      )}

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
