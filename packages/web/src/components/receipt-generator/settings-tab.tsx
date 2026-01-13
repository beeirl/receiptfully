import { FONT_OPTIONS } from '@/components/receipt'
import { Field } from '@beeirl/ui/field'
import { Select } from '@beeirl/ui/select'
import { Switch } from '@beeirl/ui/switch'
import type { ReceiptSchema } from '@receiptfully/core/receipt'

interface SettingsTabProps {
  schema: ReceiptSchema
  onChange: (schema: ReceiptSchema) => void
}

const CURRENCY_OPTIONS = [
  { value: '$', label: '$ (USD)' },
  { value: 'A$', label: 'A$ (AUD)' },
  { value: '€', label: '€ (EUR)' },
  { value: '£', label: '£ (GBP)' },
  { value: '¥', label: '¥ (JPY/CNY)' },
  { value: '₹', label: '₹ (INR)' },
  { value: '₩', label: '₩ (KRW)' },
]

const FORMAT_OPTIONS = [
  { value: 'prefix', label: '$2.99' },
  { value: 'suffix', label: '2.99$' },
  { value: 'suffix_space', label: '2.99 $' },
]

export function SettingsTab({ schema, onChange }: SettingsTabProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5">
      <Field.Root orientation="horizontal" size="sm">
        <Field.Label>Currency</Field.Label>
        <Field.Control
          render={
            <Select.Root
              items={Object.fromEntries(CURRENCY_OPTIONS.map((o) => [o.value, o.label]))}
              size="sm"
              value={schema.settings.currency}
              onValueChange={(currency) =>
                onChange({
                  ...schema,
                  settings: { ...schema.settings, currency },
                })
              }
            >
              <Select.Trigger
                nativeButton
                render={
                  <Select.InputButton variant="ghost">
                    <Select.InputButtonValue />
                  </Select.InputButton>
                }
              />
              <Select.Positioner>
                <Select.Popup>
                  {CURRENCY_OPTIONS.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Root>
          }
        />
      </Field.Root>

      <Field.Root orientation="horizontal" size="sm">
        <Field.Label>Format</Field.Label>
        <Field.Control
          render={
            <Select.Root
              items={Object.fromEntries(FORMAT_OPTIONS.map((o) => [o.value, o.label]))}
              size="sm"
              value={schema.settings.currencyFormat}
              onValueChange={(currencyFormat) =>
                onChange({
                  ...schema,
                  settings: {
                    ...schema.settings,
                    currencyFormat: currencyFormat as ReceiptSchema['settings']['currencyFormat'],
                  },
                })
              }
            >
              <Select.Trigger
                nativeButton
                render={
                  <Select.InputButton variant="ghost">
                    <Select.InputButtonValue />
                  </Select.InputButton>
                }
              />
              <Select.Positioner>
                <Select.Popup>
                  {FORMAT_OPTIONS.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Root>
          }
        />
      </Field.Root>

      <Field.Root orientation="horizontal" size="sm">
        <Field.Label>Font</Field.Label>
        <Field.Control
          render={
            <Select.Root
              items={Object.fromEntries(FONT_OPTIONS.map((o) => [o.value, o.label]))}
              size="sm"
              value={schema.settings.font}
              onValueChange={(font) =>
                onChange({
                  ...schema,
                  settings: { ...schema.settings, font },
                })
              }
            >
              <Select.Trigger
                nativeButton
                render={
                  <Select.InputButton variant="ghost">
                    <Select.InputButtonValue />
                  </Select.InputButton>
                }
              />
              <Select.Positioner>
                <Select.Popup>
                  {FONT_OPTIONS.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Popup>
              </Select.Positioner>
            </Select.Root>
          }
        />
      </Field.Root>

      <Field.Root orientation="horizontal" size="sm">
        <Field.Label>Show receipt background</Field.Label>
        <Field.Control>
          <Switch
            size="sm"
            checked={schema.settings.showBackground}
            onCheckedChange={(showBackground) =>
              onChange({
                ...schema,
                settings: { ...schema.settings, showBackground },
              })
            }
          />
        </Field.Control>
      </Field.Root>
    </div>
  )
}
