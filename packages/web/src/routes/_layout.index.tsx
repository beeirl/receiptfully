import { ReceiptGenerator } from '@/components/receipt-generator'
import type { ReceiptSchema } from '@receiptfully/core/receipt'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_layout/')({
  component: Page,
})

const exampleReceipt: ReceiptSchema = {
  settings: {
    currency: '$',
    currencyFormat: 'prefix',
    font: 'font1',
    textColor: '#000000',
    showBackground: true,
  },
  components: [
    {
      id: '1',
      type: 'image',
      properties: {
        url: '',
        size: 50,
        alignment: 'center',
      },
    },
    {
      id: '2',
      type: 'text',
      properties: {
        content: 'QuickStop Market',
        alignment: 'center',
      },
    },
    {
      id: '3',
      type: 'separator',
      properties: {
        style: '---',
      },
    },
    {
      id: '4',
      type: 'date',
      properties: {
        value: '9/30/2025, 6:10:37 PM',
        alignment: 'center',
      },
    },
    {
      id: '5',
      type: 'text',
      properties: {
        content: 'Register #01\nQSM-2105\nCashier: T. Morgan',
        alignment: 'center',
      },
    },
    {
      id: '6',
      type: 'line_items',
      properties: {
        items: [
          { id: 'item1', quantity: 2, name: 'Bottled Water (500ml)', price: 3.0 },
          { id: 'item2', quantity: 1, name: 'Chocolate Bar', price: 2.25 },
          { id: 'item3', quantity: 1, name: 'Pack of Chips', price: 3.0 },
          { id: 'item4', quantity: 1, name: 'Canned Soda (12oz)', price: 1.75 },
          { id: 'item5', quantity: 1, name: 'Sandwich', price: 4.5 },
        ],
        totalLines: [
          { id: 'total1', title: 'SubTotal:', value: 14.5 },
          { id: 'total2', title: 'Tax (8.25%):', value: 1.2 },
        ],
        total: 15.7,
        totalSizeIncrease: 0,
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
      type: 'text',
      properties: {
        content: 'Payment Methods',
        alignment: 'center',
      },
    },
    {
      id: '9',
      type: 'payment',
      properties: {
        mode: 'cash',
        fields: [
          { id: 'pay1', title: 'Cash', value: '20.00' },
          { id: 'pay2', title: 'Change', value: '4.30' },
        ],
      },
    },
    {
      id: '10',
      type: 'separator',
      properties: {
        style: '---',
      },
    },
    {
      id: '11',
      type: 'text',
      properties: {
        content: 'Please Come Again!\n\n(303) 555-7812',
        alignment: 'center',
      },
    },
    {
      id: '12',
      type: 'barcode',
      properties: {
        value: '303555781234',
        size: 50,
      },
    },
  ],
}

function Page() {
  const [schema, setSchema] = useState<ReceiptSchema>(exampleReceipt)

  return <ReceiptGenerator schema={schema} onChange={setSchema} defaultSchema={exampleReceipt} />
}
