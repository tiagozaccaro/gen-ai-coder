import { cn } from '@/lib/utils'
import { JSX } from 'react'

export function ChatMessage({ role, content }: { role: string; content: string }): JSX.Element {
  return (
    <div
      className={cn(
        'rounded-2xl p-4 my-2 whitespace-pre-wrap',
        role === 'user' ? 'bg-primary text-primary-foreground self-end' : 'bg-muted self-start'
      )}
    >
      {content}
    </div>
  )
}
