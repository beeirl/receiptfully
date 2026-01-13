import { ReceiptGenerator } from '@/components/receipt-generator'
import type { ReceiptSchema } from '@receiptfully/core/receipt'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_app/')({
  component: GenerateRoute,
})

const exampleReceipt: ReceiptSchema = {
  settings: {
    currency: '$',
    currencyFormat: 'prefix',
    font: 'font1',
    textColor: '#1a1a1a',
    showBackground: true,
  },
  components: [
    {
      id: '2',
      type: 'text',
      properties: {
        content: 'Sunrise Coffee Co.',
        alignment: 'center',
      },
    },
    {
      id: '3',
      type: 'text',
      properties: {
        content: '1847 Main Street\nAustin, TX 78701',
        alignment: 'center',
      },
    },
    {
      id: '4',
      type: 'separator',
      properties: {
        style: '===',
      },
    },
    {
      id: '5',
      type: 'date',
      properties: {
        value: '12/08/2025, 10:23:15 AM',
        alignment: 'center',
      },
    },
    {
      id: '6',
      type: 'text',
      properties: {
        content: 'Order #4782\nServer: Jessica M.\nTable: 12',
        alignment: 'center',
      },
    },
    {
      id: '7',
      type: 'separator',
      properties: {
        style: '---',
      },
    },
    {
      id: '8',
      type: 'line_items',
      properties: {
        items: [
          { id: 'item1', quantity: 2, name: 'Double Espresso', price: 5.0 },
          { id: 'item2', quantity: 1, name: 'Vanilla Latte (Large)', price: 5.75 },
          { id: 'item3', quantity: 2, name: 'Blueberry Muffin', price: 7.0 },
          { id: 'item4', quantity: 1, name: 'NY Cheesecake Slice', price: 6.5 },
          { id: 'item5', quantity: 1, name: 'Turkey Club Sandwich', price: 9.95 },
          { id: 'item6', quantity: 1, name: 'Bottled Water', price: 2.5 },
        ],
        totalLines: [
          { id: 'total1', title: 'Subtotal:', value: 36.7 },
          { id: 'total2', title: 'Tax (8.25%):', value: 3.03 },
        ],
        total: 39.73,
        totalSizeIncrease: 10,
      },
    },
    {
      id: '9',
      type: 'separator',
      properties: {
        style: '---',
      },
    },
    {
      id: '10',
      type: 'payment',
      properties: {
        mode: 'card',
        fields: [
          { id: 'pay1', title: 'Visa ****8341', value: '39.73' },
          { id: 'pay2', title: 'Auth Code', value: 'A7X92K' },
        ],
      },
    },
    {
      id: '11',
      type: 'separator',
      properties: {
        style: '...',
      },
    },
    {
      id: '12',
      type: 'text',
      properties: {
        content: 'Thanks for stopping by!\nSee you soon!',
        alignment: 'center',
      },
    },
    {
      id: '13',
      type: 'text',
      properties: {
        content: 'WiFi: SunriseCoffee\nPassword: brew2025',
        alignment: 'center',
      },
    },
    {
      id: '14',
      type: 'barcode',
      properties: {
        value: '478212082025',
        size: 60,
      },
    },
  ],
}

function GenerateRoute() {
  const [schema, setSchema] = useState<ReceiptSchema>(exampleReceipt)

  return (
    <>
      <h1 className="mx-auto w-full max-w-xl text-center text-2xl leading-[1.2] font-bold tracking-tight text-balance text-gray-900 sm:text-3xl md:text-4xl">
        Free Receipt Generator (beta)
      </h1>
      <p className="mx-auto mt-1 max-w-xl text-center text-sm leading-6 text-balance text-gray-800 sm:mt-2 sm:text-base sm:leading-7">
        Create custom receipts for your business. Free to use, no email required.
      </p>
      <div className="mt-14">
        <ReceiptGenerator schema={schema} onChange={setSchema} defaultSchema={exampleReceipt} />
      </div>
    </>
  )
}
