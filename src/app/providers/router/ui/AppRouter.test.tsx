import { screen, waitFor } from '@testing-library/react'
import { ComponentRender } from '@/shared/lib/tests/ComponentRender/ComponentRender'
import { AppRouter } from './AppRouter'
import { getRouteAbout, getRouteAdmin, getRouteProfile } from '@/shared/const/router'
import { UserRole } from '@/entities/User'

describe('app/providers/router/AppRouter', () => {
  test('Страница должна отрендериться', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAbout()
    })

    const page = await screen.findByTestId('AboutPage')
    expect(page).toBeInTheDocument()
  })

  test('Страница не найдена', async () => {
    ComponentRender(<AppRouter />, {
      route: '/vdflnfg'
    })

    const page = await screen.findByTestId('NotFoundPage')
    expect(page).toBeInTheDocument()
  })

  test('Редирект неавторизованного пользователя на главную', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteProfile('1')
    })

    const page = await screen.findByTestId('MainPage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ к закрытой странице для авторизованного пользователя', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: { _inited: true, authData: {} }
      }
    })

    await waitFor(async () => {
      expect(await screen.findByTestId('ProfilePage')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  test('Доступ запрещен (отсутствует роль)', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: { _inited: true, authData: {} }
      }
    })

    const page = await screen.findByTestId('ForbiddenPage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ разрешен (присутствует роль)', async () => {
    ComponentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: { _inited: true, authData: { roles: [UserRole.ADMIN] } }
      }
    })

    const page = await screen.findByTestId('AdminPanelPage')
    expect(page).toBeInTheDocument()
  })
})