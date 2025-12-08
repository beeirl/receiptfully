import type { SeparatorStyle } from '@receiptfully/core/receipt'

export function renderDivider(style: SeparatorStyle): React.ReactNode {
  const char = style === '---' ? '-' : style === '===' ? '=' : style === '...' ? '.' : style === ':::' ? ':' : '*'
  return <div className="w-full overflow-hidden text-center">{char.repeat(50)}</div>
}
