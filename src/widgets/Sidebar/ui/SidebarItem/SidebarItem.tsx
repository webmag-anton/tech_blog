import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { classNames } from '@/shared/lib/classNames/classNames'
import { SidebarItemType } from '../../model/types/sidebar'
import cls from './SidebarItem.module.scss'
import { getUserAuthData } from '@/entities/User'
import { ToggleFeatures } from '@/shared/lib/features'
import { Icon } from '@/shared/ui/redesigned/Icon'

interface SidebarItemProps {
  item: SidebarItemType,
  collapsed: boolean
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const {
    item,
    collapsed
  } = props

  const { t } = useTranslation()

  const isAuth = useSelector(getUserAuthData)

  if (item.authOnly && !isAuth) {
    return null
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <AppLink
          to={item.path}
          className={classNames(cls.itemRedesigned, { [cls.collapsedRedesigned]: collapsed })}
          activeClassName={cls.active}
        >
          <Icon Svg={item.Icon} />
          <span className={cls.link}>
            {t(item.text)}
          </span>
        </AppLink>
      )}
      off={(
        <AppLinkDeprecated
          to={item.path}
          theme={AppLinkTheme.SECONDARY}
          className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
          <item.Icon className={cls.icon} />
          <span className={cls.link}>
            {t(item.text)}
          </span>
        </AppLinkDeprecated>
      )}
    />
  )
})