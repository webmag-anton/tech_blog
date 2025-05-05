// описываем состояние для стейта, отвечающего за форму авторизации
export interface LoginSchema {
  username: string
  password: string
  isLoading: boolean
  error?: string
}