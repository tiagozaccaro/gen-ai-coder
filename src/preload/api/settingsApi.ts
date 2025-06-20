import { ipcRenderer } from 'electron'

const settingsApi: SettingsApi = {
  getSettings: (): Promise<Record<string, unknown>> => ipcRenderer.invoke('settings:get'),
  saveSetting: (settings: Record<string, unknown>): Promise<void> =>
    ipcRenderer.invoke('settings:save', settings)
}

export interface SettingsApi {
  getSettings(): Promise<Record<string, unknown>>
  saveSetting(settings: Record<string, unknown>): Promise<void>
}

export default settingsApi
