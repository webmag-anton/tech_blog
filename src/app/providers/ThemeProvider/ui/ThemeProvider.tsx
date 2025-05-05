import {
  ReactNode, useEffect, useMemo, useState
} from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { Theme } from '@/shared/const/theme'
import { getJsonSettingsTheme } from '@/entities/User'
import { LOCAL_STORAGE_KEY_THEME } from '@/shared/const/localstorage'

interface ThemeProviderProps {
  initialTheme?: Theme
  children: ReactNode
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_KEY_THEME) as Theme

const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    children,
    initialTheme
  } = props

  const defaultTheme = useSelector(getJsonSettingsTheme)

  const [theme, setTheme] = useState<Theme>(initialTheme || fallbackTheme || Theme.LIGHT)

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

  const [isThemeInited, setThemeInited] = useState(false)

  useEffect(() => {
    if (!isThemeInited && initialTheme) {
      setTheme(initialTheme)
      setThemeInited(true)
    }
  }, [isThemeInited, initialTheme])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_THEME, theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
