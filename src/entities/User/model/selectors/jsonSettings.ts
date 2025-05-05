import { StateSchema } from '@/app/providers/StoreProvider'

export const getJsonSettings = (state: StateSchema) => state.user?.authData?.jsonSettings
export const getJsonSettingsTheme = (state: StateSchema) => state.user?.authData?.jsonSettings?.theme
export const getJsonSettingsArticlesPage = (state: StateSchema) => state.user?.authData?.jsonSettings?.wasArticlesPageOpened