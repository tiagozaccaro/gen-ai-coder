import { SettingsApi } from 'src/preload/api/settingsApi'

const settingsApi: SettingsApi = {
  ...window.api.settings
}

export default settingsApi
