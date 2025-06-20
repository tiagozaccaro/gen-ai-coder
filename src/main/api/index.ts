import { registerOllamaIpcHandlers } from './ollama'
import { registerSettingsHandlers } from './settings'

export function registerIpcHandlers(): void {
  registerSettingsHandlers()
  registerOllamaIpcHandlers()
}
