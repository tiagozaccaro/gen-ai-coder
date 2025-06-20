import { ipcRenderer } from 'electron'
import { Message } from 'ollama'

const ollamaApi: OllamaApi = {
  ensureInstalled: () => ipcRenderer.invoke('ollama:ensure-installed'),
  getModels: () => ipcRenderer.invoke('ollama:get-models'),
  ensureModel: (model: string) => ipcRenderer.invoke('ollama:ensure-model', model),
  generate: (model: string, prompt: string) => ipcRenderer.invoke('ollama:generate', model, prompt),
  chat: (model: string, messages: Message[]) => ipcRenderer.invoke('ollama:chat', model, messages)
}

export interface OllamaApi {
  ensureInstalled(): Promise<void>
  getModels(): Promise<string[]>
  ensureModel(model: string): Promise<void>
  generate(model: string, prompt: string): Promise<string>
  chat(model: string, messages: Message[]): Promise<string>
}

export default ollamaApi
