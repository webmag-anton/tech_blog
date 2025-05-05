import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'
import { LoginModal } from '@/features/AuthByUsername'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink'
import { getUserAuthData } from '@/entities/User'
import cls from './Navbar.module.scss'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { NotificationButton } from '@/features/NotificationButton'
import { AvatarDropdown } from '@/features/AvatarDropdown'
import { getRouteArticleCreate } from '@/shared/const/router'
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features'
import EnterIcon from '@/shared/assets/icons/enter.svg'
import { Icon } from '@/shared/ui/redesigned/Icon'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false)
  const authData = useSelector(getUserAuthData)

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.NavbarRedesigned,
    off: () => cls.Navbar
  })

  if (authData) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <header className={classNames(mainClass, {}, [className])}>
            <HStack gap='16' className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        )}
        off={(
          <header className={classNames(mainClass, {}, [className])}>
            <Text
              className={cls.appName}
              title={t('News Blog App')}
              theme={TextTheme.INVERTED}
            />

            <AppLink
              to={getRouteArticleCreate()}
              theme={AppLinkTheme.SECONDARY}
              className={cls.createBtn}
            >
              {t('Создать статью')}
            </AppLink>

            <HStack gap='16' className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        )}
      />
    )
  }

  return (
    <header className={classNames(mainClass, {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <Button
            className={cls.links}
            variant='clear'
            addonLeft={<Icon Svg={EnterIcon} />}
            onClick={onShowModal}
          >
            {t('Войти')}
          </Button>
        )}
        off={(
          <ButtonDeprecated
            className={cls.links}
            onClick={onShowModal}
          >
            {t('Войти')}
          </ButtonDeprecated>
        )}
      />

      {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
    </header>
  )
})
