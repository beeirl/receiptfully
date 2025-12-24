import ReceiptfullyLogo from '@/assets/receiptfully-logo.svg?react'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100">
      <div className="custom-container py-12">
        {/* Top section: Logo + Link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2">
              <ReceiptfullyLogo className="size-5" />
              <span className="font-semibold text-gray-900">Receiptfully</span>
            </a>
            <p className="mt-4 text-sm text-gray-500">Professional receipts in seconds.</p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Get Started
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section: Copyright */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Receiptfully. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
