import { Field } from '@beeirl/ui/field'
import { Slider } from '@beeirl/ui/slider'
import { TextInput } from '@beeirl/ui/text-input'
import type { BarcodeComponent as BarcodeComponentSchema } from '@receiptfully/core/receipt'

interface BarcodeComponentProps {
  properties: BarcodeComponentSchema['properties']
  onChange: (properties: BarcodeComponentSchema['properties']) => void
}

export function BarcodeComponent({ properties, onChange }: BarcodeComponentProps) {
  return (
    <div className="flex flex-col gap-3">
      <Field.Root size="sm">
        <Field.Label>Barcode Value</Field.Label>
        <Field.Control>
          <TextInput
            className="w-full"
            value={properties.value}
            onChange={(e) => onChange({ ...properties, value: e.target.value })}
            placeholder="Enter barcode number..."
          />
        </Field.Control>
      </Field.Root>

      <Field.Root size="sm">
        <Field.Label>Size</Field.Label>
        <Field.Control>
          <Slider.Root
            value={properties.size}
            onValueChange={(value) => onChange({ ...properties, size: value as number })}
            min={20}
            max={100}
            className="flex-1"
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
