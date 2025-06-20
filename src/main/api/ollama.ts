import { ipcMain } from 'electron'
import {
  ensureOllamaInstalled,
  getModels,
  ensureModel,
  generate,
  chat
} from '../services/ollamaService'
import { Message } from 'ollama'

export function registerOllamaIpcHandlers(): void {
  ipcMain.handle('ollama:ensure-installed', async () => {
    await ensureOllamaInstalled()
  })

  ipcMain.handle('ollama:get-models', async () => {
    return await getModels()
  })

  ipcMain.handle('ollama:ensure-model', async (_event, model: string) => {
    return await ensureModel(model)
  })

  ipcMain.handle('ollama:generate', async (_event, model: string, prompt: string) => {
    return await generate(model, prompt)
  })

  ipcMain.handle('ollama:chat', async (_event, model: string, messages: Message[]) => {
    return await chat(model, messages)
  })
}
