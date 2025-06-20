import ollama, { Message } from 'ollama'
import path from 'path'
import fs from 'fs'
import https from 'https'

function getOllamaBinaryPath(): string {
  const platform = process.platform
  const base = path.join(__dirname, '..', 'electron', 'ollama')
  if (platform === 'win32') return path.join(base, 'ollama.exe')
  if (['darwin', 'linux'].includes(platform)) return path.join(base, 'ollama')
  throw new Error('Unsupported OS')
}

function isOllamaInstalled(): boolean {
  return fs.existsSync(getOllamaBinaryPath())
}

function downloadOllamaBinary(): Promise<void> {
  return new Promise((resolve, reject) => {
    const platform = process.platform
    const arch = process.arch === 'arm64' ? 'arm64' : 'x64'
    let url = ''

    if (platform === 'darwin') url = `https://ollama.com/download/Ollama-darwin-${arch}`
    else if (platform === 'linux') url = `https://ollama.com/download/Ollama-linux-${arch}`
    else if (platform === 'win32') url = `https://ollama.com/download/Ollama-windows-${arch}.exe`
    else return reject(new Error('Unsupported platform'))

    const filePath = getOllamaBinaryPath()
    const stream = fs.createWriteStream(filePath)

    https
      .get(url, (res) => {
        res.pipe(stream)
        stream.on('finish', () => {
          stream.close()
          fs.chmodSync(filePath, 0o755)
          resolve()
        })
      })
      .on('error', (err) => reject(err))
  })
}

export async function ensureOllamaInstalled(): Promise<void> {
  if (!isOllamaInstalled()) {
    console.log('Downloading Ollama...')
    await downloadOllamaBinary()
  }
}

export async function getModels(): Promise<string[]> {
  const res = await ollama.list()
  return res.models.map((m) => m.name)
}

export async function ensureModel(model: string): Promise<void> {
  const models = await getModels()
  if (!models.includes(model)) {
    console.log(`Model "${model}" not found. Pulling...`)
    await ollama.pull({ model })
  }
}

export async function generate(model: string, prompt: string): Promise<string> {
  await ensureModel(model)

  const { response } = await ollama.generate({
    model,
    prompt,
    stream: false
  })

  return response
}

export async function chat(model: string, messages: Message[]): Promise<string> {
  await ensureModel(model)

  // Send conversation history as messages
  const response = await ollama.chat({
    model,
    messages,
    stream: false
  })

  return response.message.content
}
