import JsBarcode from 'jsbarcode'
import { useEffect, useRef } from 'react'

interface BarcodeProps {
  value: string
  size?: number // 0-100, controls scale
  className?: string
}

export function Barcode({ value, size = 50, className }: BarcodeProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        // Scale based on size (0-100) -> height 30-80
        const height = 30 + (size / 100) * 50
        const width = 1 + (size / 100) * 1.5

        JsBarcode(svgRef.current, value, {
          format: 'CODE128',
          width,
          height,
          displayValue: false,
          margin: 0,
          background: 'transparent',
        })
      } catch {
        // Invalid barcode value - clear the SVG
        if (svgRef.current) {
          svgRef.current.innerHTML = ''
        }
      }
    }
  }, [value, size])

  if (!value) {
    return null
  }

  return <svg ref={svgRef} className={className} />
}
