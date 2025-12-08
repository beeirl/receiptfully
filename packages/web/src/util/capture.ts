import { snapdom } from '@zumer/snapdom'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

export async function captureElement(
  element: React.ReactElement<{ ref: React.Ref<HTMLElement> }>,
  filename: string,
  options?: {
    scale?: number
  }
) {
  const containerElement = document.createElement('div')
  containerElement.style.position = 'fixed'
  containerElement.style.opacity = '0'
  containerElement.style.pointerEvents = 'none'
  containerElement.style.zIndex = '-9999'
  document.body.appendChild(containerElement)

  const rootElement = document.createElement('div')
  containerElement.appendChild(rootElement)

  const reactRootElement = ReactDOM.createRoot(rootElement)

  await new Promise<void>((resolve, reject) =>
    reactRootElement.render(
      React.cloneElement(element, {
        ref: (el: HTMLElement | null) => {
          if (!el) {
            reject(new Error('Could not capture element'))
            return
          }
          requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve())
          })
        },
      })
    )
  )

  // Use snapdom to download
  await snapdom.download(rootElement, {
    filename,
    scale: options?.scale ?? 2,
    embedFonts: true,
  })

  reactRootElement.unmount()
  document.body.removeChild(containerElement)
}
