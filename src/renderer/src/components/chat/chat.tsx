'use client'

import { JSX, useEffect, useState } from 'react'
import { ChatMessage } from './chat-message'
import { Message } from 'ollama/browser'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { chat, getModels } from '@/services/ollamaService'

export function Chat(): JSX.Element {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'You are a helpful assistant.' }
  ])
  const [models, setModels] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState<string>('mistral')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getModels().then(setModels)
  }, [])

  const sendPrompt = async (): Promise<void> => {
    if (!input.trim()) return
    const prompt = input.trim()

    const newUserMessage = { role: 'user', content: prompt }
    const updatedMessages = [...messages, newUserMessage]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const assistantResponse = await chat(selectedModel, updatedMessages)
      setMessages([...updatedMessages, { role: 'assistant' as const, content: assistantResponse }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content:
            '⚠️ Failed to get response: ' + (err instanceof Error ? err.message : String(err))
        }
      ])
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col h-full max-h-screen p-4 gap-4">
      <div className="flex gap-2">
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Choose model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button disabled={loading} onClick={sendPrompt}>
          Send
        </Button>
      </div>

      <div className="flex flex-col overflow-y-auto flex-1">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
      </div>

      <Input
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendPrompt()
          }
        }}
      />
    </div>
  )
}
