// Shared types
export type Alignment = 'left' | 'center' | 'right'
export type SeparatorStyle = '---' | '===' | '...' | ':::' | '***'
export type CurrencyFormat = 'prefix' | 'suffix' | 'suffix_space'
export type ComponentType = 'image' | 'text' | 'date' | 'separator' | 'barcode' | 'payment' | 'line_items'

// Image component
export interface ImageComponent {
  id: string
  type: 'image'
  properties: {
    url: string
    size: number // percentage 10-100
    alignment: Alignment
  }
}

// Text component
export interface TextComponent {
  id: string
  type: 'text'
  properties: {
    content: string
    alignment: Alignment
  }
}

// Date component
export interface DateComponent {
  id: string
  type: 'date'
  properties: {
    value: string
    alignment: Alignment
  }
}

// Separator component
export interface SeparatorComponent {
  id: string
  type: 'separator'
  properties: {
    style: SeparatorStyle
  }
}

// Barcode component
export interface BarcodeComponent {
  id: string
  type: 'barcode'
  properties: {
    value: string
    size: number // percentage 20-100
  }
}

// Payment component
export interface PaymentField {
  id: string
  title: string
  value: string
}

export interface PaymentComponent {
  id: string
  type: 'payment'
  properties: {
    mode: 'cash' | 'card'
    fields: PaymentField[]
  }
}

// Line items component
export interface LineItem {
  id: string
  quantity: number
  name: string
  price: number
}

export interface TotalLine {
  id: string
  title: string
  value: number
}

export interface LineItemsComponent {
  id: string
  type: 'line_items'
  properties: {
    items: LineItem[]
    totalLines: TotalLine[]
    total: number
    totalSizeIncrease: number // 0-100 percentage
  }
}

// Union of all components
export type ReceiptComponent =
  | ImageComponent
  | TextComponent
  | DateComponent
  | SeparatorComponent
  | BarcodeComponent
  | PaymentComponent
  | LineItemsComponent

// Receipt settings (global styling)
export interface ReceiptSettings {
  currency: string
  currencyFormat: CurrencyFormat
  font: string
  textColor: string
  showBackground: boolean
}

// Top-level receipt schema
export interface ReceiptSchema {
  components: ReceiptComponent[]
  settings: ReceiptSettings
}
