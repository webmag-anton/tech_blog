import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { getUserInited, initAuthData } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { PageLoader } from '@/widgets/PageLoader'
import { ToggleFeatures } from '@/shared/lib/features'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout'
import { useAppToolbar } from './lib/useAppToolbar'

const App = () => {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()

  const inited = useSelector(getUserInited)

  const toolbar = useAppToolbar()

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData())
    }
  }, [dispatch, inited])

  if (!inited) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <div
            id='app'
            className={classNames('app_redesigned', {}, [theme])}
          >
            <AppLoaderLayout />
          </div>
        )}
        off={<PageLoader />}
      />
    )
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      off={(
        <div id='app' className={classNames('app', {}, [])}>
          <Suspense fallback=''>
            <Navbar />

            <div className='content-page'>
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      )}
      on={(
        <div id='app' className={classNames('app_redesigned', {}, [])}>
          <Suspense fallback=''>
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      )}
    />
  )
}

export default App
