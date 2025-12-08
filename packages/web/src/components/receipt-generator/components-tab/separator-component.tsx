import { SEPARATOR_STYLES } from '@/components/receipt'
import { Field } from '@beeirl/ui/field'
import { Tabs } from '@beeirl/ui/tabs'
import type { SeparatorComponent as SeparatorComponentSchema, SeparatorStyle } from '@receiptfully/core/receipt'

interface SeparatorComponentProps {
  properties: SeparatorComponentSchema['properties']
  onChange: (properties: SeparatorComponentSchema['properties']) => void
}

export function SeparatorComponent({ properties, onChange }: SeparatorComponentProps) {
  return (
    <div className="flex flex-col gap-3">
      <Field.Root size="sm">
        <Field.Label>Style</Field.Label>
        <Field.Control>
          <Tabs.Root
            value={properties.style}
            onValueChange={(value) => onChange({ ...properties, style: value as SeparatorStyle })}
            variant="surface"
          >
            <Tabs.List className="w-full">
              {SEPARATOR_STYLES.map((style) => (
                <Tabs.Tab key={style} value={style} className="flex-1 font-mono text-xs">
                  {style}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </Field.Control>
      </Field.Root>
    </div>
  )
}
