import { Receipt } from '@/components/receipt'
import { SupportDialog } from '@/components/support-dialog'
import { logEvent } from '@/util/analytics'
import { captureElement } from '@/util/capture'
import { Button, ButtonLoader } from '@beeirl/ui/button'
import { DownloadIcon, LightbulbIcon } from '@beeirl/ui/line-icons'
import type { ReceiptSchema } from '@receiptfully/core/receipt'
import { useState } from 'react'

interface PreviewProps {
  schema: ReceiptSchema
}

export function Preview({ schema }: PreviewProps) {
  const [loading, setLoading] = useState(false)

  async function download() {
    setLoading(true)
    try {
      await captureElement(<Receipt schema={schema} />, `receiptfully-receipt-${Date.now()}`, { scale: 2 })
      logEvent('receipt_downloaded')
    } catch (error) {
      console.error('Failed to download receipt:', error)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl bg-gray-50 pb-4 ring ring-gray-100">
      <div className="flex w-full justify-end space-x-1.5 p-3">
        <SupportDialog.Root>
          <SupportDialog.Trigger
            render={
              <Button className="rounded-full shadow-xs hover:bg-gray-100" color="gray" size="md" variant="outline">
                <LightbulbIcon />
                Feedback
              </Button>
            }
          />
          <SupportDialog.Popup defaultCategory="feedback" location="preview" />
        </SupportDialog.Root>
        <Button className="rounded-full" disabled={loading} size="md" onClick={download}>
          <ButtonLoader>
            <DownloadIcon />
          </ButtonLoader>
          Download
        </Button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <Receipt schema={schema} />
        </div>
      </div>
    </div>
  )
}
