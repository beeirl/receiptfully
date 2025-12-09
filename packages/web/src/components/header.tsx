import ReceiptfullyLogo from '@/assets/receiptfully-logo.svg?react'
import { SupportDialog } from '@/components/support-dialog'
import { Button } from '@beeirl/ui/button'
import { cn } from '@beeirl/ui/styles'
import React from 'react'

export function Header() {
  const ref = React.useRef<HTMLDivElement>(null)

  const [border, setBorder] = React.useState(false)

  React.useEffect(() => {
    function toggleBorder() {
      if (!ref.current) return
      setBorder(ref.current.getBoundingClientRect().top === -12)
    }
    toggleBorder()
    window.addEventListener('scroll', toggleBorder)
    return () => window.removeEventListener('scroll', toggleBorder)
  }, [])

  return (
    <div
      className={cn('sticky -top-3 z-50 border-b border-transparent bg-white pt-5 pb-2.5', border && 'border-gray-100')}
      ref={ref}
    >
      <nav className="relative mx-auto flex w-full max-w-5xl items-center justify-between px-8 md:px-12 lg:px-16">
        <a
          className="relative flex items-center gap-2 focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          href="/"
        >
          <ReceiptfullyLogo className="size-5" />
          <span className="font-semibold text-gray-900">Receiptfully</span>
        </a>
        <SupportDialog.Root>
          <SupportDialog.Trigger
            render={
              <Button className="rounded-full my-0" color="gray" highContrast size="md" variant="ghost">
                Support
              </Button>
            }
          />
          <SupportDialog.Popup location="header" />
        </SupportDialog.Root>
      </nav>
    </div>
  )
}
