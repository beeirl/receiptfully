import { ComponentsTab } from '@/components/receipt-generator/components-tab'
import { Preview } from '@/components/receipt-generator/preview'
import { SettingsTab } from '@/components/receipt-generator/settings-tab'
import { AlertDialog } from '@beeirl/ui/alert-dialog'
import { Button } from '@beeirl/ui/button'
import { FileTextIcon, SettingsIcon } from '@beeirl/ui/duotone-icons'
import { cn } from '@beeirl/ui/styles'
import { Tabs } from '@beeirl/ui/tabs'
import type { ReceiptSchema } from '@receiptfully/core/receipt'
import { useState } from 'react'

interface ReceiptGeneratorProps {
  schema: ReceiptSchema
  onChange: (schema: ReceiptSchema) => void
  defaultSchema: ReceiptSchema
}

export function ReceiptGenerator({ schema, onChange, defaultSchema }: ReceiptGeneratorProps) {
  const [activeTab, setActiveTab] = useState(0)

  const handleReset = () => {
    onChange(defaultSchema)
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs md:flex-row p-3 md:p-1">
      {/* Left Panel - Settings */}
      <div className="relative flex flex-1 flex-col overflow-hidden pb-3 sm:max-h-[798px] md:py-2 md:pr-3 md:pl-2">
        <div className="flex h-full flex-col gap-3">
          <div className="flex items-center justify-between">
            <Tabs.Root className="flex items-start" variant="surface" onValueChange={setActiveTab}>
              <Tabs.List className="rounded-full">
                <Tabs.IconTab>
                  <FileTextIcon />
                </Tabs.IconTab>
                <Tabs.IconTab>
                  <SettingsIcon />
                </Tabs.IconTab>
              </Tabs.List>
            </Tabs.Root>
            <AlertDialog.Root>
              <AlertDialog.Trigger
                render={
                  <Button className="rounded-full" color="gray" size="md" variant="surface">
                    Reset
                  </Button>
                }
              />
              <AlertDialog.Popup className="max-w-sm">
                <AlertDialog.Header>
                  <AlertDialog.Title>Reset</AlertDialog.Title>
                  <AlertDialog.Description>
                    Are you sure you want to reset? All your changes will be lost and cannot be recovered.
                  </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                  <AlertDialog.Close
                    render={
                      <Button color="gray" variant="soft">
                        Cancel
                      </Button>
                    }
                  />
                  <AlertDialog.Close render={<Button onClick={handleReset}>Reset</Button>} />
                </AlertDialog.Footer>
              </AlertDialog.Popup>
            </AlertDialog.Root>
          </div>

          <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto">
            {/* Components Tab */}
            <div className={cn('flex flex-col gap-3', activeTab !== 0 && 'hidden')}>
              <ComponentsTab schema={schema} onChange={onChange} />
            </div>

            {/* Settings Tab */}
            <div className={cn('flex flex-col gap-3', activeTab !== 1 && 'hidden')}>
              <SettingsTab schema={schema} onChange={onChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <Preview schema={schema} />
    </div>
  )
}
