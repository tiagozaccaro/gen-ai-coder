import { OllamaApi } from 'src/preload/api/ollamaApi'

const ollamaApi: OllamaApi = {
  ...window.api.ollama
}

export default ollamaApi
