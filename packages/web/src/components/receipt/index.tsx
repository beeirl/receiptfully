import { Barcode } from '@/components/receipt/barcode'
import { renderDivider } from '@/components/receipt/divider'
import type {
  BarcodeComponent,
  ComponentType,
  DateComponent,
  ImageComponent,
  LineItemsComponent,
  PaymentComponent,
  ReceiptComponent,
  ReceiptSchema,
  SeparatorComponent,
  SeparatorStyle,
  TextComponent,
} from '@receiptfully/core/receipt'

// UI-specific constants (not part of persisted schema)
export const COMPONENT_META: Record<ComponentType, { label: string }> = {
  image: { label: 'Image' },
  text: { label: 'Text' },
  date: { label: 'Date' },
  separator: { label: 'Separator' },
  barcode: { label: 'Barcode' },
  payment: { label: 'Payment' },
  line_items: { label: 'Line Items' },
}

export const SEPARATOR_STYLES: SeparatorStyle[] = ['---', '===', '...', ':::', '***']

export const FONT_OPTIONS: { value: string; label: string; fontFamily: string }[] = [
  { value: 'font1', label: 'Font 1', fontFamily: "'VT323', monospace" },
  { value: 'font2', label: 'Font 2', fontFamily: "'Share Tech Mono', monospace" },
  { value: 'font3', label: 'Font 3', fontFamily: "'Courier Prime', monospace" },
]

interface ReceiptProps extends React.ComponentProps<'div'> {
  schema: ReceiptSchema
}

function formatPrice(amount: number, currency: string, format: ReceiptSchema['settings']['currencyFormat']): string {
  const formatted = amount.toFixed(2)
  switch (format) {
    case 'prefix':
      return `${currency}${formatted}`
    case 'suffix':
      return `${formatted}${currency}`
    case 'suffix_space':
      return `${formatted} ${currency}`
    default:
      return `${currency}${formatted}`
  }
}

function ImageComponent({ properties }: { properties: ImageComponent['properties'] }) {
  const justifyClass =
    properties.alignment === 'left'
      ? 'justify-start'
      : properties.alignment === 'right'
        ? 'justify-end'
        : 'justify-center'

  if (!properties.url) return null

  return (
    <div className={`flex ${justifyClass}`}>
      <img
        src={properties.url}
        alt=""
        style={{
          width: `${properties.size}%`,
          objectFit: 'contain',
          filter: properties.grayscale ? 'grayscale(100%)' : undefined,
        }}
      />
    </div>
  )
}

function TextComponent({ properties }: { properties: TextComponent['properties'] }) {
  const alignClass =
    properties.alignment === 'left' ? 'text-left' : properties.alignment === 'right' ? 'text-right' : 'text-center'

  if (!properties.content) return null

  return <div className={`whitespace-pre-wrap ${alignClass}`}>{properties.content}</div>
}

function DateComponent({ properties }: { properties: DateComponent['properties'] }) {
  const alignClass =
    properties.alignment === 'left' ? 'text-left' : properties.alignment === 'right' ? 'text-right' : 'text-center'

  if (!properties.value) return null

  return <div className={`whitespace-pre-wrap ${alignClass}`}>{properties.value}</div>
}

function SeparatorComponent({ properties }: { properties: SeparatorComponent['properties'] }) {
  return <div className="my-2">{renderDivider(properties.style)}</div>
}

function BarcodeComponent({ properties }: { properties: BarcodeComponent['properties'] }) {
  if (!properties.value) return null

  return (
    <div className="flex flex-col items-center">
      <Barcode value={properties.value} size={properties.size} />
    </div>
  )
}

function PaymentComponent({
  properties,
  settings,
}: {
  properties: PaymentComponent['properties']
  settings: ReceiptSchema['settings']
}) {
  return (
    <div className="flex flex-col gap-0.5">
      {properties.fields.map((field) => (
        <div key={field.id} className="flex justify-between">
          <span>{field.title}</span>
          <span>
            {/* Check if value looks like a number for currency formatting */}
            {!isNaN(parseFloat(field.value)) && field.value.match(/^\d+\.?\d*$/)
              ? formatPrice(parseFloat(field.value), settings.currency, settings.currencyFormat)
              : field.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function LineItemsComponent({
  properties,
  settings,
}: {
  properties: LineItemsComponent['properties']
  settings: ReceiptSchema['settings']
}) {
  const totalFontSize = properties.totalSizeIncrease === 0 ? '1em' : `${1 + properties.totalSizeIncrease / 100}em`

  return (
    <div>
      {/* Items */}
      <div className="flex flex-col gap-0.5">
        {properties.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.quantity} {item.name}
            </span>
            <span>{formatPrice(item.price, settings.currency, settings.currencyFormat)}</span>
          </div>
        ))}
      </div>

      {/* Total lines */}
      {properties.totalLines.length > 0 && (
        <div className="mt-2 flex flex-col gap-0.5">
          {properties.totalLines.map((line) => (
            <div key={line.id} className="flex justify-between">
              <span>{line.title}</span>
              <span>{formatPrice(line.value, settings.currency, settings.currencyFormat)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      <div className="mt-1 flex justify-between" style={{ fontSize: totalFontSize }}>
        <span>Total:</span>
        <span className="font-bold">{formatPrice(properties.total, settings.currency, settings.currencyFormat)}</span>
      </div>
    </div>
  )
}

function renderComponent(component: ReceiptComponent, settings: ReceiptSchema['settings']) {
  switch (component.type) {
    case 'image':
      return <ImageComponent properties={component.properties} />
    case 'text':
      return <TextComponent properties={component.properties} />
    case 'date':
      return <DateComponent properties={component.properties} />
    case 'separator':
      return <SeparatorComponent properties={component.properties} />
    case 'barcode':
      return <BarcodeComponent properties={component.properties} />
    case 'payment':
      return <PaymentComponent properties={component.properties} settings={settings} />
    case 'line_items':
      return <LineItemsComponent properties={component.properties} settings={settings} />
    default:
      return null
  }
}

export function Receipt({ schema, ...props }: ReceiptProps) {
  const fontOption = FONT_OPTIONS.find((f) => f.value === schema.settings.font)
  const fontFamily = fontOption ? fontOption.fontFamily : FONT_OPTIONS[0]!.fontFamily

  return (
    <div
      style={{
        fontFamily,
        color: schema.settings.textColor,
        backgroundColor: schema.settings.showBackground ? '#fafafa' : 'transparent',
        width: 320,
        padding: 20,
        fontSize: 14,
        lineHeight: 1.4,
      }}
      {...props}
    >
      {schema.components.map((component) => (
        <div key={component.id} className="mb-2">
          {renderComponent(component, schema.settings)}
        </div>
      ))}
    </div>
  )
}
