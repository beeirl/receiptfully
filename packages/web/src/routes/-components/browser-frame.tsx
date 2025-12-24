import { cn } from '@beeirl/ui/styles'

interface BrowserFrameProps {
  children: React.ReactNode
  className?: string
}

export function BrowserFrame({ children, className }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        'relative flex justify-center overflow-hidden rounded-xl shadow-xs transition-all duration-500',
        className,
      )}
      style={{
        aspectRatio: '5 / 3',
        background:
          'radial-gradient(circle at 20% 80%, rgba(115, 115, 115, 0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(229, 229, 229, 0.3), transparent 50%), radial-gradient(circle at 40% 40%, rgba(163, 163, 163, 0.2), transparent 60%), linear-gradient(135deg, rgb(245, 245, 245), rgb(229, 229, 229))',
      }}
    >
      {/* Blur overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 size-full rounded-xl"
        style={{ backdropFilter: 'blur(100px)' }}
      />
      {/* Ring overlay */}
      <div className="pointer-events-none absolute inset-0 z-30 size-full rounded-xl ring-1 ring-inset ring-black/10" />
      {/* Browser window */}
      <div className="absolute inset-x-0 -bottom-20 top-0 z-20 flex w-full justify-center p-6 sm:p-8 md:p-10">
        <div className="h-full w-full overflow-hidden rounded-xl px-1.5 pb-1.5 ring-1 bg-white/50 ring-gray-500/10 backdrop-blur-xl shadow-[0_0_0_1px_#0000000f,0_4px_6px_-1px_#0000001a,0_10px_15px_-3px_#0000001a,0_20px_25px_-5px_#0000001a,0_25px_50px_-12px_#00000040]">
          {/* Window chrome */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-1 px-1">
              <div className="h-2 w-2 rounded-full border transition-colors duration-300 border-gray-950/10 bg-gray-100/30 hover:bg-red-500" />
              <div className="h-2 w-2 rounded-full border transition-colors duration-300 border-gray-950/10 bg-gray-100/30 hover:bg-yellow-500" />
              <div className="h-2 w-2 rounded-full border transition-colors duration-300 border-gray-950/10 bg-gray-100/30 hover:bg-green-500" />
            </div>
          </div>
          {/* Content */}
          <div className="h-auto w-full max-w-full rounded-lg shadow-xs ring-1 ring-gray-500/10 transition-opacity duration-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
