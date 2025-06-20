import ollamaApi, { OllamaApi } from './ollamaApi'
import settingsApi, { SettingsApi } from './settingsApi'

const api: Api = {
  settings: settingsApi,
  ollama: ollamaApi
}

export interface Api {
  settings: SettingsApi
  ollama: OllamaApi
}

export default api
