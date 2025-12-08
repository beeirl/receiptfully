import { Component } from '@/components/receipt-generator/components-tab/component'
import { Button } from '@beeirl/ui/button'
import { Dialog } from '@beeirl/ui/dialog'
import { AlignCenterIcon, CartIcon, ImageIcon, MinusIcon, PlusIcon, StatusIcon } from '@beeirl/ui/line-icons'
import { move } from '@dnd-kit/helpers'
import { DragDropProvider } from '@dnd-kit/react'
import type { ComponentType, ReceiptComponent, ReceiptSchema } from '@receiptfully/core/receipt'
import * as React from 'react'

interface ComponentsTabProps {
  schema: ReceiptSchema
  onChange: (schema: ReceiptSchema) => void
}

export function ComponentsTab({ schema, onChange }: ComponentsTabProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const updateComponents = (components: ReceiptComponent[]) => {
    onChange({ ...schema, components })
  }

  const updateComponent = (index: number, component: ReceiptComponent) => {
    const newComponents = [...schema.components]
    newComponents[index] = component
    onChange({ ...schema, components: newComponents })
  }

  const removeComponent = (index: number) => {
    onChange({
      ...schema,
      components: schema.components.filter((_, i) => i !== index),
    })
  }

  const addComponent = (type: ComponentType) => {
    const id = crypto.randomUUID()
    let newComponent: ReceiptComponent

    switch (type) {
      case 'image':
        newComponent = {
          id,
          type: 'image',
          properties: { url: '', size: 50, alignment: 'center' },
        }
        break
      case 'text':
        newComponent = {
          id,
          type: 'text',
          properties: { content: '', alignment: 'center' },
        }
        break
      case 'date':
        newComponent = {
          id,
          type: 'date',
          properties: { value: new Date().toLocaleString(), alignment: 'center' },
        }
        break
      case 'separator':
        newComponent = {
          id,
          type: 'separator',
          properties: { style: '---' },
        }
        break
      case 'barcode':
        newComponent = {
          id,
          type: 'barcode',
          properties: { value: '', size: 50 },
        }
        break
      case 'payment':
        newComponent = {
          id,
          type: 'payment',
          properties: {
            mode: 'cash',
            fields: [
              { id: crypto.randomUUID(), title: 'Cash', value: '20.00' },
              { id: crypto.randomUUID(), title: 'Change', value: '0.00' },
            ],
          },
        }
        break
      case 'line_items':
        newComponent = {
          id,
          type: 'line_items',
          properties: {
            items: [{ id: crypto.randomUUID(), quantity: 1, name: 'Item', price: 0 }],
            totalLines: [],
            total: 0,
            totalSizeIncrease: 0,
          },
        }
        break
    }

    onChange({ ...schema, components: [...schema.components, newComponent] })
    setDialogOpen(false)
    requestAnimationFrame(() => {
      const lastChild = containerRef.current?.lastElementChild
      lastChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }

  return (
    <>
      <DragDropProvider
        onDragEnd={(event) => {
          updateComponents(move(schema.components, event))
        }}
      >
        <div ref={containerRef} className="flex flex-col gap-2">
          {schema.components.map((component, index) => (
            <Component
              key={component.id}
              component={component}
              index={index}
              onUpdate={(updated) => updateComponent(index, updated)}
              onRemove={() => removeComponent(index)}
            />
          ))}
        </div>
      </DragDropProvider>

      <div className="sticky bottom-0 bg-background pt-3">
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <Dialog.Trigger
            render={
              <Button className="w-full rounded-lg" color="gray" size="md" variant="soft">
                <PlusIcon />
                Add Component
              </Button>
            }
          />
          <Dialog.Popup>
            <Dialog.Header>
              <Dialog.Title>Add Component</Dialog.Title>
            </Dialog.Header>
            <div className="flex flex-col gap-2">
              <Button
                className="w-full justify-center"
                color="gray"
                variant="soft"
                onClick={() => addComponent('image')}
              >
                <ImageIcon />
                Image
              </Button>
              <Button
                className="w-full justify-center"
                color="gray"
                variant="soft"
                onClick={() => addComponent('text')}
              >
                <AlignCenterIcon />
                Text
              </Button>
              <Button
                className="w-full justify-center"
                color="gray"
                variant="soft"
                onClick={() => addComponent('date')}
              >
                <StatusIcon />
                Date
              </Button>
              <Button
                className="w-full justify-center"
                color="gray"
                variant="soft"
                onClick={() => addComponent('separator')}
              >
                <MinusIcon />
                Separator
              </Button>
              <Button
                className="w-full justify-center"
                color="gray"
                variant="soft"
                onClick={() => addComponent('line_items')}
              >
                <CartIcon />
                Line Items
              </Button>
              <Button
                className="w-full justify-center"
                color="gray"
                variant="soft"
                onClick={() => addComponent('payment')}
              >
                <CartIcon />
                Payment
              </Button>
              <Button
                className="w-full justify-center"
                color="gray"
                variant="soft"
                onClick={() => addComponent('barcode')}
              >
                <StatusIcon />
                Barcode
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Root>
      </div>
    </>
  )
}
